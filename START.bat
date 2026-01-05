@echo off
echo ========================================
echo Portfolio Development Server Starter
echo ========================================
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo [1/3] Installing dependencies if needed...
where npm >nul 2>&1
if errorlevel 1 (
    set NPM_CMD="C:\Program Files\nodejs\npm.cmd"
) else (
    set NPM_CMD=npm
)
call %NPM_CMD% install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo.
echo [2/3] Clearing Next.js cache for fresh build...
if exist .next (
    rmdir /s /q .next
    echo Cache cleared successfully
) else (
    echo No cache to clear
)
echo.
echo [3/3] Starting development server...
echo.
echo ========================================
echo Server starting on http://localhost:3000
echo ========================================
echo.
echo IMPORTANT: 
echo - Wait for "Ready" message before opening browser
echo - Press Ctrl+C to stop the server
echo - Hard refresh browser (Ctrl+Shift+R) if styles don't appear
echo.
call %NPM_CMD% run dev
pause
