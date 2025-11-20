@echo off
setlocal

echo ================================================
echo      Vertex Auth Helper (Python)
echo ================================================
echo.

REM -------------------------------------------------
REM 1) Check if Python exists
REM -------------------------------------------------
where python >nul 2>nul
if errorlevel 1 (
  echo Python 3 is required but was not found on this system.
  echo.

  choice /M "Python 3 is not installed. Open the official Python download page now?"
  if errorlevel 2 (
    echo.
    echo Cannot continue without Python 3. Exiting.
    pause
    exit /b 1
  )

  echo.
  echo Opening the Python download page in your browser...
  start "" "https://www.python.org/downloads/"
  echo.
  echo -------------------------------------------------
  echo After you finish installing Python:
  echo   1) Make sure you check "Add python.exe to PATH"
  echo   2) Then RE-RUN this .bat file
  echo -------------------------------------------------
  echo.
  pause
  exit /b 1
)

echo Python installation found.
echo.

REM -------------------------------------------------
REM 2) Install/update dependencies silently
REM -------------------------------------------------
echo Installing required Python packages (google-auth, requests)...
python -m pip install --user --quiet --upgrade pip
python -m pip install --user --quiet google-auth requests

echo.
echo Dependencies installed successfully.
echo.

REM -------------------------------------------------
REM 3) Run the helper script
REM -------------------------------------------------
echo Starting Vertex Auth Helper server...
echo (Keep this window open while using the Vertex Gemini option.)
echo.

python "%~dp0vertex_auth_helper.py"

echo.
echo Vertex Auth Helper stopped.
pause
endlocal
