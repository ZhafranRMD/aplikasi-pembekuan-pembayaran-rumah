@echo off
title FREEZEHOUSE - Aplikasi Pembekuan Pembayaran Rumah (Port 5500)
color 0B
echo ========================================================
echo    MEMBUKA APLIKASI PEMBEKUAN PEMBAYARAN RUMAH
echo    FREEZEHOUSE / SIMPEKA RUMAH (KPR & SENGKETA TERMIN)
echo    Port Server: http://localhost:5500
echo ========================================================
echo.
cd /d "%~dp0"
echo Membuka browser pada port 5500...
start "" http://localhost:5500
npm run dev
pause
