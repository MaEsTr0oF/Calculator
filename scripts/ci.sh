#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: First parameter (source directory) is missing."
    echo "Usage: ./ci.sh <source_dir> <version>"
    exit 1
fi

if [ -z "$2" ]; then
    echo "Error: Second parameter (version) is missing."
    echo "Usage: ./ci.sh <source_dir> <version>"
    exit 1
fi

SRCDIR=$(cd "$1" && pwd)
VERSION=$2
PROJECT_NAME="modular-calculator"

echo "--------------------------------------------------"
echo "Starting CI for $PROJECT_NAME version $VERSION"
echo "Source Directory: $SRCDIR"
echo "--------------------------------------------------"

echo "[0/5] Checking dependencies..."

install_pkg() {
    PKG=$1
    if command -v dnf &> /dev/null; then
        sudo dnf install -y $PKG
        if [ $? -ne 0 ]; then echo "Error: Failed to install $PKG via dnf."; exit 1; fi
    elif command -v yum &> /dev/null; then
        sudo yum install -y $PKG
        if [ $? -ne 0 ]; then echo "Error: Failed to install $PKG via yum."; exit 1; fi
    elif command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y $PKG
        if [ $? -ne 0 ]; then echo "Error: Failed to install $PKG via apt-get."; exit 1; fi
    else
        echo "Error: Package manager not found."
        if [ "$PKG" == "nodejs" ]; then
            echo "--------------------------------------------------"
            echo "It looks like you are on Windows."
            echo "To install Node.js, copy and run this command in PowerShell:"
            echo ""
            echo "    winget install OpenJS.NodeJS"
            echo ""
            echo "After installation, restart your terminal and run this script again."
            echo "--------------------------------------------------"
        else
            echo "Please install $PKG manually."
        fi
        exit 1
    fi
}

if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    install_pkg nodejs
else
    echo "Node.js is already installed."
fi

if ! command -v rpmbuild &> /dev/null; then
    echo "rpmbuild not found. Installing..."
    install_pkg rpm-build
else
    echo "rpmbuild is already installed."
fi

echo "[1/5] Updating source code..."
cd "$SRCDIR" || exit
git pull origin master || echo "Warning: git pull failed (not a git repo?)"

echo "[2/5] Building project..."
if [ -f "index.html" ]; then
    echo "Build successful: index.html found."
else
    echo "Build failed: index.html missing."
    exit 1
fi

echo "[3/5] Running unit tests..."
if [ -f "tests/ci_runner.js" ]; then
    echo "Running tests with Node.js..."
    node tests/ci_runner.js
    TEST_EXIT_CODE=$?
    if [ $TEST_EXIT_CODE -ne 0 ]; then
        echo "Tests failed! Stopping CI process."
        exit 1
    fi
else
    echo "Test runner not found. Skipping."
fi

echo "[4/5] Creating installation package..."

RPMBUILD_DIR=~/rpmbuild
mkdir -p $RPMBUILD_DIR/{BUILD,RPMS,SOURCES,SPECS,SRPMS}

TAR_NAME="$PROJECT_NAME-$VERSION.tar.gz"
echo "Creating tarball: $TAR_NAME"

# Create a temporary directory with the correct name structure for RPM
TMP_BUILD_DIR=$(mktemp -d)
TARGET_NAME="$PROJECT_NAME-$VERSION"
TARGET_PATH="$TMP_BUILD_DIR/$TARGET_NAME"
mkdir -p "$TARGET_PATH"

# Copy source files to the temporary directory
cp -r "$SRCDIR/." "$TARGET_PATH/"

# Remove unwanted files from the copy
rm -rf "$TARGET_PATH/.git"
rm -rf "$TARGET_PATH/.cache"
rm -rf "$TARGET_PATH/.vscode"
rm -rf "$TARGET_PATH/installer"
rm -rf "$TARGET_PATH/tests"

# Create the tarball from the temporary directory
tar -zcf "$RPMBUILD_DIR/SOURCES/$TAR_NAME" -C "$TMP_BUILD_DIR" "$TARGET_NAME"

# Cleanup
rm -rf "$TMP_BUILD_DIR"

SPEC_FILE="installer/calculator.spec"
TARGET_SPEC="$RPMBUILD_DIR/SPECS/$PROJECT_NAME.spec"

if [ -f "$SPEC_FILE" ]; then
    echo "Updating spec file version..."
    sed "s/Version: .*/Version: $VERSION/" "$SPEC_FILE" > "$TARGET_SPEC"
    
    echo "Running rpmbuild..."
    rpmbuild -bb "$TARGET_SPEC"
else
    echo "Spec file not found at $SPEC_FILE"
    exit 1
fi

echo "[5/5] Installing application..."
RPM_FILE="$RPMBUILD_DIR/RPMS/noarch/$PROJECT_NAME-$VERSION-1.noarch.rpm"

if [ -f "$RPM_FILE" ]; then
    echo "Found package: $RPM_FILE"
    if [ "$EUID" -ne 0 ]; then
        echo "Please run the following command to install:"
        echo "sudo rpm -Uvh --force $RPM_FILE"
    else
        rpm -Uvh --force "$RPM_FILE"
    fi
else
    echo "RPM package creation failed."
    exit 1
fi

echo "--------------------------------------------------"
echo "CI Process Complete"
echo "--------------------------------------------------"
