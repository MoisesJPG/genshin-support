@echo off
chcp 65001 > nul
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo Python no est� instalado. Por favor, desc�rgalo e inst�lalo desde https://www.python.org/downloads/
) else (
    python -m http.server
)
pause
