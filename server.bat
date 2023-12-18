@echo off
chcp 65001 > nul
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo Python no está instalado. Por favor, descárgalo e instálalo desde https://www.python.org/downloads/
) else (
    python -m http.server
)
pause
