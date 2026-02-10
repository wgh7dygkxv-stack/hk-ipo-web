# 一键推送脚本 - 香港 IPO 智能分析平台

param(
    [string]$message = "更新代码"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "一键推送到 GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 切换到项目目录
Set-Location D:\Code\hk_ipo_web

# 检查是否有修改
$status = git status --porcelain
if (-not $status) {
    Write-Host "没有需要提交的修改" -ForegroundColor Yellow
    exit 0
}

Write-Host "[1/3] 添加所有修改..." -ForegroundColor Yellow
git add .

Write-Host "[2/3] 提交修改..." -ForegroundColor Yellow
git commit -m $message

Write-Host "[3/3] 推送到 GitHub..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✓ 推送成功！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Vercel 将自动检测更新并重新部署" -ForegroundColor Cyan
    Write-Host "预计 2-3 分钟后生效" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "✗ 推送失败" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "可能的原因：" -ForegroundColor Yellow
    Write-Host "1. 需要输入 GitHub 用户名和 Token" -ForegroundColor White
    Write-Host "2. 网络连接问题" -ForegroundColor White
    Write-Host "3. 远程仓库配置错误" -ForegroundColor White
    Write-Host ""
}

