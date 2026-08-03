@echo off
cd /d "c:\Users\bilal\OneDrive\Desktop\bilal-portfolio"
echo Installing pdf-parse...
call npm.cmd install pdf-parse --no-save
echo.
echo Running extraction...
node extract_pdf.js
echo.
echo Done. Check pdf_extracted_text.txt
pause
