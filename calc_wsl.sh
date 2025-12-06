#!/bin/bash

# путь в linux
FILE="/usr/share/modular-calculator/index.html"

# преобразуем в Windows-путь
WIN_PATH=$(wslpath -w "$FILE")

# открываем в браузере Windows
cmd.exe /c "start $WIN_PATH"
