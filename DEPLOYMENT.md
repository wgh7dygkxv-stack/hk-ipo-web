# 🚀 部署指南 - Vercel

## 📋 部署步骤

### 第一步：推送代码到 GitHub

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 仓库名称：`hk-ipo-web`（或您喜欢的名字）
   - 设置为 Public（公开）或 Private（私有）
   - **不要**勾选 "Add a README file"
   - 点击 "Create repository"

2. **推送代码**
   
   在 PowerShell 中运行：
   ```powershell
   cd D:\Code\hk_ipo_web
   
   # 添加远程仓库（替换 YOUR_USERNAME 为您的 GitHub 用户名）
   git remote add origin https://github.com/YOUR_USERNAME/hk-ipo-web.git
   
   # 推送代码
   git branch -M main
   git push -u origin main
   ```

---

### 第二步：部署到 Vercel

1. **访问 Vercel**
   - 打开 https://vercel.com/
   - 点击 "Sign Up" 或 "Log In"
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择您刚创建的 `hk-ipo-web` 仓库
   - 点击 "Import"

3. **配置环境变量**
   - 在 "Environment Variables" 部分添加：
     ```
     NEXT_PUBLIC_SUPABASE_URL = https://uuvqopczgbtlqhildxgm.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY = 您的anon_key
     ```
   - 点击 "Add"

4. **部署**
   - 点击 "Deploy"
   - 等待 2-3 分钟
   - 部署完成！🎉

5. **访问网站**
   - Vercel 会给您一个域名，例如：
     `https://hk-ipo-web.vercel.app`
   - 点击链接即可访问

---

## 🔄 后续更新代码

每次修改代码后，只需：

```powershell
cd D:\Code\hk_ipo_web

# 添加修改
git add .

# 提交修改
git commit -m "更新说明"

# 推送到 GitHub
git push
```

**Vercel 会自动检测到更新并重新部署！** 🚀

---

## 🌐 自定义域名（可选）

如果您有自己的域名：

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加您的域名
3. 按照提示配置 DNS
4. 等待生效（通常几分钟）

---

## 📱 分享链接

部署完成后，您可以：
- ✅ 在任何设备上访问
- ✅ 分享给朋友使用
- ✅ 在手机上添加到主屏幕

---

## 🔧 常见问题

### Q: 部署失败怎么办？
A: 检查 Vercel 的构建日志，通常是环境变量配置问题。

### Q: 如何查看部署状态？
A: 在 Vercel Dashboard 可以看到每次部署的状态和日志。

### Q: 可以回滚到之前的版本吗？
A: 可以！Vercel 保留所有历史部署，可以一键回滚。

### Q: 部署后数据库连接不上？
A: 确保在 Vercel 中正确配置了环境变量。

---

## 💡 其他部署选项

### Netlify（备选方案）
- 访问 https://netlify.com/
- 类似 Vercel 的操作流程
- 同样免费且支持自动部署

### Cloudflare Pages（备选方案）
- 访问 https://pages.cloudflare.com/
- 全球 CDN 加速
- 免费且快速

---

## 🎉 完成！

部署完成后，您的 IPO 平台就可以在全球访问了！

**下一步：**
- 分享链接给朋友
- 在手机上体验
- 继续开发新功能
- 每次更新只需 `git push`

祝您使用愉快！🚀

