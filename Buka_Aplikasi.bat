@echo off
title FREEZEHOUSE - Aplikasi Pembekuan Pembayaran Rumah
color 0B
echo ========================================================
echo    MEMBUKA APLIKASI PEMBEKUAN PEMBAYARAN RUMAH
echo    FREEZEHOUSE / SIMPEKA RUMAH (KPR & SENGKETA TERMIN)
echo ========================================================
echo.
cd /d "%~dp0"
echo Memulai server lokal Vite...
start "" http://localhost:5174
npm run dev
pause

