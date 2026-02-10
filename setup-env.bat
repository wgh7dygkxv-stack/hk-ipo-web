@echo off
echo ========================================
echo 香港 IPO 智能分析平台 - 环境配置向导
echo ========================================
echo.

REM 检查 .env.local 是否已存在
if exist .env.local (
    echo [警告] .env.local 文件已存在
    set /p overwrite="是否覆盖? (y/n): "
    if /i not "%overwrite%"=="y" (
        echo 配置已取消
        pause
        exit /b
    )
)

echo.
echo 请输入您的 Supabase 配置信息
echo 从 https://app.supabase.com/ 获取
echo.

set /p supabase_url="Supabase URL (例如: https://xxxxx.supabase.co): "
set /p supabase_key="Supabase Anon Key: "

echo.
echo 正在创建 .env.local 文件...

(
echo # Supabase 配置
echo # 自动生成于 %date% %time%
echo.
echo NEXT_PUBLIC_SUPABASE_URL=%supabase_url%
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=%supabase_key%
) > .env.local

echo.
echo [成功] .env.local 文件已创建！
echo.
echo 下一步：
echo 1. 运行开发服务器: npm run dev
echo 2. 打开浏览器访问: http://localhost:3000
echo.
pause

