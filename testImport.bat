@echo off
setlocal

echo.
echo 📤 Testing Import Users from Excel...
echo.

set EXCEL_FILE=D:\NNPTUDM\PhatTrienUngDungMoi7\uploads\test-users.xlsx
set SERVER_URL=http://localhost:3000/import-users/upload

if not exist "%EXCEL_FILE%" (
    echo ❌ File not found: %EXCEL_FILE%
    exit /b 1
)

echo 📋 File: %EXCEL_FILE%
echo 🔗 Server: %SERVER_URL%
echo.

REM Using curl to upload file
for /f "delims=" %%A in ('powershell -NoProfile -Command "(Get-Content '%EXCEL_FILE%' -Encoding Byte | % {[String]::Format('{0:X2}', $_)} ) -join ''"') do (
    set "hexdata=%%A"
)

echo Uploading...
curl -X POST -F "excelFile=@%EXCEL_FILE%" %SERVER_URL%

echo.
echo.
echo ✅ Test completed!
echo 📧 Check Mailtrap Inbox: https://mailtrap.io/inboxes
pause
