# 香港 IPO 智能分析平台 - 环境配置向导

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "香港 IPO 智能分析平台 - 环境配置向导" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 .env.local 是否已存在
if (Test-Path .env.local) {
    Write-Host "[警告] .env.local 文件已存在" -ForegroundColor Yellow
    $overwrite = Read-Host "是否覆盖? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "配置已取消" -ForegroundColor Red
        exit
    }
}

Write-Host ""
Write-Host "请输入您的 Supabase 配置信息" -ForegroundColor Green
Write-Host "从 https://app.supabase.com/ 获取" -ForegroundColor Green
Write-Host ""

$supabaseUrl = Read-Host "Supabase URL (例如: https://xxxxx.supabase.co)"
$supabaseKey = Read-Host "Supabase Anon Key"

Write-Host ""
Write-Host "正在创建 .env.local 文件..." -ForegroundColor Yellow

$envContent = @"
# Supabase 配置
# 自动生成于 $(Get-Date)

NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl
NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabaseKey
"@

$envContent | Out-File -FilePath .env.local -Encoding UTF8

Write-Host ""
Write-Host "[成功] .env.local 文件已创建！" -ForegroundColor Green
Write-Host ""
Write-Host "下一步：" -ForegroundColor Cyan
Write-Host "1. 运行开发服务器: npm run dev" -ForegroundColor White
Write-Host "2. 打开浏览器访问: http://localhost:3000" -ForegroundColor White
Write-Host ""


