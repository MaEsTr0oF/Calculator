param (
    [string]$InstallPath = "$env:LOCALAPPDATA\ModularCalculator"
)

$ErrorActionPreference = "Stop"

Write-Host "Installing Modular Calculator to $InstallPath..." -ForegroundColor Cyan

if (-not (Test-Path -Path $InstallPath)) {
    New-Item -ItemType Directory -Path $InstallPath | Out-Null
    Write-Host "Created directory: $InstallPath" -ForegroundColor Green
}

$SourceDir = Join-Path $PSScriptRoot ".."

$FilesToCopy = @("index.html", "css", "js", "README.md")

foreach ($File in $FilesToCopy) {
    $SourcePath = Join-Path $SourceDir $File
    $DestPath = Join-Path $InstallPath $File
    
    if (Test-Path -Path $SourcePath) {
        Copy-Item -Path $SourcePath -Destination $InstallPath -Recurse -Force
        Write-Host "Copied: $File" -ForegroundColor Green
    } else {
        Write-Warning "Source file/directory not found: $SourcePath"
    }
}

$WshShell = New-Object -ComObject WScript.Shell
$DesktopPath = [Environment]::GetFolderPath("Desktop")
$ShortcutPath = Join-Path $DesktopPath "Modular Calculator.lnk"
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = Join-Path $InstallPath "index.html"
$Shortcut.Description = "Launch Modular Calculator"
$Shortcut.Save()

Write-Host "Shortcut created on Desktop." -ForegroundColor Green
Write-Host "Installation complete!" -ForegroundColor Cyan
