@echo off
chcp 65001 > nul
title ScreenDemo v2.2.0 打包工具

echo.
echo ================================================
echo   ScreenDemo v2.2.0  打包工具
echo ================================================
echo.

REM ---- 检查 Node.js ----
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未找到 Node.js，请先安装 Node.js 18 或更高版本
    echo        下载地址：https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo [OK] Node.js %NODE_VER%

REM ---- 检查 npm ----
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未找到 npm
    pause
    exit /b 1
)
for /f "tokens=*" %%v in ('npm -v') do set NPM_VER=%%v
echo [OK] npm %NPM_VER%
echo.

REM ---- 安装依赖 ----
if not exist "node_modules\" (
    echo [1/3] 安装依赖（首次运行，可能需要几分钟）...
    npm install
    if %errorlevel% neq 0 (
        echo [错误] npm install 失败，请检查网络或 package.json
        pause
        exit /b 1
    )
    echo [OK] 依赖安装完成
) else (
    echo [1/3] 依赖已存在，跳过安装
)
echo.

REM ---- 清理旧的打包产物 ----
echo [2/3] 清理旧的 dist 目录...
if exist "dist\" (
    rmdir /s /q dist
    echo [OK] 旧 dist 已清理
) else (
    echo [OK] 无旧 dist，跳过
)
echo.

REM ---- 执行打包 ----
echo [3/3] 开始打包（生成安装包 + 绿色便携版）...
echo       请耐心等待，不要关闭此窗口...
echo.
npm run build
if %errorlevel% neq 0 (
    echo.
    echo [错误] 打包失败！请查看上方错误信息
    pause
    exit /b 1
)

echo.
echo ================================================
echo   打包成功！
echo ================================================
echo.
echo 输出文件位于：dist\
echo.
echo   安装包：ScreenDemo Setup 2.2.0.exe     （推荐分发给同事）
echo   便携版：ScreenDemo_Portable_2.2.0.exe  （无需安装，直接运行）
echo.
echo 分发给同事时，同时附上《同事使用指南.md》
echo 同事安装后按指南完成飞书设置即可使用全部功能
echo.

REM ---- 打开 dist 目录 ----
explorer dist

pause
