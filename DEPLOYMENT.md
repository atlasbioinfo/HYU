# 部署和预览指南

## 🚀 本地测试（推荐先在本地测试）

### 开发模式（热更新）
```bash
npm run dev
```
访问 http://localhost:5173/HYU/

### 生产模式预览（和线上完全一样）
```bash
npm run build
npm run preview
```

---

## 🌐 Vercel 预览部署（为每个分支创建预览）

### 第一次设置：

1. **访问 Vercel**：https://vercel.com/

2. **导入 GitHub 仓库**：
   - 用 GitHub 账号登录 Vercel
   - 点击 "Add New..." → "Project"
   - 选择 `atlasbioinfo/HYU` 仓库
   - 点击 "Import"

3. **配置项目**：
   - Framework Preset: 选择 "Vite"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - 点击 "Deploy"

### 自动预览功能：

✅ **每次推送分支 → 自动创建预览链接**
- 例如：`claude-improve-background-xxx.vercel.app`

✅ **每个 PR → 自动评论预览链接**
- GitHub PR 中会看到 Vercel bot 的评论，直接点击预览

✅ **main 分支 → 生产环境**
- 例如：`hyu.vercel.app`

### 工作流程：
```
1. 在本地开发和测试
   ↓
2. 推送到分支
   ↓
3. Vercel 自动部署 → 获得预览链接
   ↓
4. 在预览链接中测试 ✓
   ↓
5. 没问题了再创建 PR 和 merge
```

---

## 📦 GitHub Pages 部署

当前配置：只有 merge 到 main 分支才会部署到 GitHub Pages。

访问地址：https://atlasbioinfo.github.io/HYU/

---

## 💡 推荐工作流

```bash
# 1. 本地开发
npm run dev

# 2. 本地测试构建
npm run build && npm run preview

# 3. 推送到分支（如果配置了 Vercel，会自动创建预览）
git push

# 4. 在预览链接中测试完毕后，再创建 PR 合并
```

这样可以避免：
- ❌ 直接 merge 到 main 发现问题
- ❌ 来回回滚代码
- ❌ 破坏生产环境
