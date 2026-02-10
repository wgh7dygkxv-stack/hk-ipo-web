# 🚀 快速推送指南

## 方法 1：使用一键脚本（最简单）

### PowerShell 版本
```powershell
cd D:\Code\hk_ipo_web
.\push.ps1
```

或者带自定义提交信息：
```powershell
.\push.ps1 -message "添加新功能"
```

### 批处理版本
双击运行：`push.bat`

---

## 方法 2：手动推送（3 条命令）

```powershell
cd D:\Code\hk_ipo_web

git add .
git commit -m "更新说明"
git push
```

---

## 方法 3：使用 VS Code / Cursor

1. 点击左侧 "Source Control" 图标
2. 在 "Message" 框输入提交说明
3. 点击 "✓ Commit"
4. 点击 "..." → "Push"

---

## 🔑 首次推送配置

### 设置远程仓库（只需一次）

```powershell
cd D:\Code\hk_ipo_web

# 方法 A：使用 HTTPS（推荐）
git remote set-url origin https://github.com/wgh7dygkxv-stack/hk-ipo-web.git

# 方法 B：使用 Token（更安全）
git remote set-url origin https://YOUR_TOKEN@github.com/wgh7dygkxv-stack/hk-ipo-web.git
```

### 配置 Git 用户信息（只需一次）

```powershell
git config --global user.name "wgh7dygkxv-stack"
git config --global user.email "your-email@example.com"
```

---

## 💡 推送时的认证

### 方法 A：使用 Token（推荐）

当提示输入密码时：
- **Username**: `wgh7dygkxv-stack`
- **Password**: 粘贴您的 GitHub Token（不是密码！）

### 方法 B：保存凭据（一次输入，永久记住）

```powershell
# 启用凭据存储
git config --global credential.helper wincred

# 下次推送时输入 Token，之后会自动记住
git push
```

---

## 🎯 完整的首次推送流程

```powershell
# 1. 配置远程仓库
cd D:\Code\hk_ipo_web
git remote set-url origin https://github.com/wgh7dygkxv-stack/hk-ipo-web.git

# 2. 配置用户信息
git config --global user.name "wgh7dygkxv-stack"
git config --global user.email "your-email@example.com"

# 3. 启用凭据存储
git config --global credential.helper wincred

# 4. 推送代码
git push -u origin main
# 输入用户名: wgh7dygkxv-stack
# 输入密码: 粘贴您的 Token

# 5. 以后每次推送只需：
.\push.ps1
```

---

## 🔄 日常更新流程

修改代码后，只需运行：

```powershell
.\push.ps1
```

或者：

```powershell
git add .
git commit -m "更新说明"
git push
```

**Vercel 会自动检测并重新部署！** 🚀

---

## 📱 查看部署状态

1. 访问 https://vercel.com/
2. 登录后查看项目
3. 可以看到每次部署的状态和日志

---

## ⚡ 快捷方式

### 创建桌面快捷方式

1. 右键 `push.bat` → 发送到 → 桌面快捷方式
2. 以后双击桌面图标即可推送

### 添加到右键菜单

在项目文件夹右键 → "Git Bash Here" → 输入：
```bash
git add . && git commit -m "update" && git push
```

---

## 🎉 完成！

现在您有多种方式推送代码：
- ✅ 双击 `push.bat`（最简单）
- ✅ 运行 `.\push.ps1`（PowerShell）
- ✅ 手动 3 条命令
- ✅ 使用 IDE 的 Git 功能

选择您最喜欢的方式！🚀

