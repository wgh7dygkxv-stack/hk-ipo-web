@echo off
chcp 65001 >nul
echo ========================================
echo 一键推送到 GitHub
echo ========================================
echo.

cd /d D:\Code\hk_ipo_web

echo [1/3] 添加所有修改...
git add .

echo [2/3] 提交修改...
set /p message="请输入提交说明 (直接回车使用默认): "
if "%message%"=="" set message=更新代码
git commit -m "%message%"

echo [3/3] 推送到 GitHub...
git push

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✓ 推送成功！
    echo ========================================
    echo.
    echo Vercel 将自动检测更新并重新部署
    echo 预计 2-3 分钟后生效
    echo.
) else (
    echo.
    echo ========================================
    echo ✗ 推送失败
    echo ========================================
    echo.
    echo 可能需要输入 GitHub 用户名和 Token
    echo.
)

pause

