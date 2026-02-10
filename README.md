# 香港 IPO 智能分析平台 - Web 前端

基于 Next.js 14 的现代化 Web 应用，展示香港新股 IPO 数据和 AI 分析结果。

## 🚀 快速开始

### 1. 配置环境变量

复制 `.env.example` 文件为 `.env.local`：

```bash
cp .env.example .env.local
```

然后编辑 `.env.local`，填入您的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**获取 Supabase 配置的步骤：**

1. 访问 https://app.supabase.com/
2. 选择您的项目
3. 点击左侧菜单的 **Settings** → **API**
4. 复制 **Project URL** 和 **anon public** key

### 2. 安装依赖

```bash
npm install
```

### 3. 运行开发服务器

```bash
npm run dev
```

打开浏览器访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
hk_ipo_web/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 全局布局（导航栏、页脚）
│   ├── page.tsx             # 首页
│   └── ipos/
│       ├── page.tsx         # IPO 列表页
│       └── [id]/
│           └── page.tsx     # IPO 详情页
├── components/              # 可复用组件
│   ├── IpoCard.tsx         # IPO 卡片
│   ├── RatingBadge.tsx     # 评分徽章
│   ├── StatCard.tsx        # 统计卡片
│   └── LoadingStates.tsx   # 加载状态
├── lib/                     # 工具库
│   ├── supabase.ts         # Supabase 客户端
│   ├── types.ts            # TypeScript 类型定义
│   └── utils.ts            # 工具函数
└── public/                  # 静态资源

```

## 🎨 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **图标**: Lucide React
- **部署**: Vercel (推荐)

## 📊 功能特性

### 已实现 ✅

- [x] 首页 Dashboard（统计数据 + 最新 IPO）
- [x] IPO 列表页（所有新股展示）
- [x] IPO 详情页（完整信息 + AI 分析）
- [x] AI 评分可视化
- [x] 响应式设计
- [x] 现代化 UI/UX

### 待开发 🚧

- [ ] 用户登录系统
- [ ] 资金管理功能
- [ ] 智能申购推荐
- [ ] 实时通知
- [ ] 数据可视化图表
- [ ] 搜索和筛选功能

## 🔗 相关项目

- **后端数据抓取**: `../hk_ipo_bot/` (Python)
- **数据库**: Supabase PostgreSQL

## 📝 开发说明

### 数据流程

1. Python 后端定时抓取新股数据（集思录）
2. AI 分析新股并生成评分和建议
3. 数据存入 Supabase 数据库
4. Next.js 前端从 Supabase 读取并展示

### 添加新页面

在 `app/` 目录下创建新文件夹和 `page.tsx`：

```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <div>新页面</div>
}
```

### 添加新组件

在 `components/` 目录下创建新组件：

```typescript
// components/NewComponent.tsx
export function NewComponent() {
  return <div>新组件</div>
}
```

## 🚀 部署到 Vercel

1. 将代码推送到 GitHub
2. 访问 https://vercel.com/
3. 点击 "Import Project"
4. 选择您的 GitHub 仓库
5. 配置环境变量（NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY）
6. 点击 "Deploy"

## 🐛 常见问题

### 1. 页面显示 "暂无 IPO 数据"

**原因**: 数据库中还没有数据

**解决方案**: 
- 确保已创建数据库表（运行 `../hk_ipo_bot/init_db.py`）
- 运行 Python 后端抓取数据（`python run_once.py`）

### 2. 连接 Supabase 失败

**原因**: 环境变量配置错误

**解决方案**:
- 检查 `.env.local` 文件是否存在
- 确认 Supabase URL 和 Key 是否正确
- 重启开发服务器

### 3. 样式显示异常

**原因**: Tailwind CSS 未正确编译

**解决方案**:
```bash
rm -rf .next
npm run dev
```

## 📄 License

MIT

## 👨‍💻 作者

香港 IPO 智能分析平台团队
