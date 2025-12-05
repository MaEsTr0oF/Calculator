@echo off
pushd "%~dp0"
powershell -ExecutionPolicy Bypass -File "install.ps1"
popd
pause
