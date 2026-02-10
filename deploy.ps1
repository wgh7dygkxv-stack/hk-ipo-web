# 快速部署脚本

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "香港 IPO 智能分析平台 - 快速部署" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否已配置 Git 远程仓库
$remoteUrl = git remote get-url origin 2>$null

if (-not $remoteUrl) {
    Write-Host "[步骤 1] 配置 GitHub 远程仓库" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请先在 GitHub 创建仓库：https://github.com/new" -ForegroundColor Green
    Write-Host ""
    $username = Read-Host "请输入您的 GitHub 用户名"
    $repoName = Read-Host "请输入仓库名称 (默认: hk-ipo-web)"
    
    if (-not $repoName) {
        $repoName = "hk-ipo-web"
    }
    
    $remoteUrl = "https://github.com/$username/$repoName.git"
    
    Write-Host ""
    Write-Host "添加远程仓库: $remoteUrl" -ForegroundColor Yellow
    git remote add origin $remoteUrl
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[错误] 添加远程仓库失败" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "[步骤 2] 推送代码到 GitHub" -ForegroundColor Yellow
Write-Host ""

# 确保在 main 分支
git branch -M main

# 推送代码
Write-Host "正在推送代码..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "[错误] 推送失败，可能需要先登录 GitHub" -ForegroundColor Red
    Write-Host "请运行: git push -u origin main" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "[成功] 代码已推送到 GitHub！" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "下一步：部署到 Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 访问 https://vercel.com/" -ForegroundColor White
Write-Host "2. 使用 GitHub 账号登录" -ForegroundColor White
Write-Host "3. 点击 'Add New...' → 'Project'" -ForegroundColor White
Write-Host "4. 选择您的仓库并导入" -ForegroundColor White
Write-Host "5. 配置环境变量：" -ForegroundColor White
Write-Host "   NEXT_PUBLIC_SUPABASE_URL" -ForegroundColor Gray
Write-Host "   NEXT_PUBLIC_SUPABASE_ANON_KEY" -ForegroundColor Gray
Write-Host "6. 点击 'Deploy' 开始部署" -ForegroundColor White
Write-Host ""
Write-Host "部署完成后，您将获得一个公网访问地址！" -ForegroundColor Green
Write-Host ""

