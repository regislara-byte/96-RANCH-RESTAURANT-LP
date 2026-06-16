@echo off
title 96 RANCH LP - GitHub Push

echo.
echo ==========================================
echo  96 RANCH RESTAURANT LP - PUSH SYSTEM
echo ==========================================
echo.

git status

echo.
echo Adding files...
git add .

echo.
echo Creating commit...
git commit -m "Update 96 RANCH LP INDEX.HTML, STYLE.CSS, script.js and ALL related files"

echo.
echo Pushing to GitHub...
git push

echo.
echo ==========================================
echo  PUSH COMPLETE
echo ==========================================
echo.

pause