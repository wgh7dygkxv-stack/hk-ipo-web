# 🚀 快速配置指南

## 第一步：配置 Supabase 环境变量

### 1. 获取 Supabase 配置

1. 访问 https://app.supabase.com/
2. 选择您的项目
3. 点击左侧菜单的 **Settings** → **API**
4. 复制以下两个值：
   - **Project URL** (例如: https://xxxxx.supabase.co)
   - **anon public** key (一长串字符)

### 2. 创建 .env.local 文件

在项目根目录创建 `.env.local` 文件（与 package.json 同级），内容如下：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**重要**: 将上面的值替换为您实际的 Supabase 配置！

## 第二步：运行开发服务器

```bash
npm run dev
```

打开浏览器访问: http://localhost:3000

## 第三步：确保有数据

如果页面显示"暂无 IPO 数据"，需要先运行 Python 后端抓取数据：

```bash
cd ../hk_ipo_bot/hk_ipo_bot
python run_once.py
```

## 常见问题

### Q: 如何创建 .env.local 文件？

**Windows (PowerShell)**:
```powershell
New-Item -Path .env.local -ItemType File
notepad .env.local
```

**Windows (命令提示符)**:
```cmd
type nul > .env.local
notepad .env.local
```

然后粘贴配置内容并保存。

### Q: 修改 .env.local 后不生效？

重启开发服务器：
1. 按 `Ctrl + C` 停止服务器
2. 重新运行 `npm run dev`

### Q: 页面报错 "Missing Supabase environment variables"

说明 `.env.local` 文件不存在或配置错误，请检查：
1. 文件名是否正确（`.env.local`，注意前面有个点）
2. 文件位置是否正确（在项目根目录）
3. 环境变量名是否正确（必须以 `NEXT_PUBLIC_` 开头）

## 下一步

配置完成后，您可以：

1. ✅ 浏览首页查看统计数据
2. ✅ 查看 IPO 列表
3. ✅ 点击任意 IPO 查看详情和 AI 分析
4. 🚀 部署到 Vercel（可选）

## 需要帮助？

如果遇到问题，请检查：
- [ ] Supabase 数据库表是否已创建
- [ ] Python 后端是否已运行并抓取数据
- [ ] .env.local 文件配置是否正确
- [ ] 开发服务器是否正常运行

