## sgs-tools

一个面向 **三国杀对局辅助** 的「移动端优先」小工具集，提供常用判定和战术决策辅助能力，直接在浏览器中即可使用。

### 功能概览

- **工具首页（Dashboard）**
  - 工具列表入口，展示每个工具的图标、名称、简介和标签（如「对局中高频」「概率工具」）。
- **神荀彧判定（`/tools/sxy`）**
  - 勾选当前场上的锦囊（顺手牵羊、过河拆桥、五谷丰登等）。
  - 选择「奇兵」或「正兵」应对方案，快速做出战术判断。
  - 为移动端优化的按钮布局和点击反馈。
- **李傕概率判定（`/tools/lj`）**
  - 输入三段概率（羊袭 / 狗袭 / 狼袭，总和为 100%）。
  - 内置校验与概率分布可视化，确保输入合理。
  - 一键执行单次随机判定，并以放大结果卡的形式展示。
- **关于页面（`/about`）**
  - 说明项目目标、特点以及技术栈标签。
- **底部导航**
  - 类 App 的底部 Tab（工具列表 / 关于），自动考虑安全区（`safe-area-inset-bottom`）。

### 技术栈

- **前端框架**：React + TypeScript + Vite
- **UI 组件库**：Material UI（MUI），自定义浅色主题、统一圆角与卡片样式
- **样式增强**：Tailwind 基础层（字体、`tap-direct`、`font-jinmeifanglishu` 等工具类）
- **路由**：React Router（懒加载、统一加载状态）
- **构建与部署**：
  - Docker 镜像（Nginx 静态部署）
  - Jenkins 流水线（见 `Jenkinsfile`）

### 路由结构

- `/` → 布局组件 + 顶部卡片 + 底部导航（默认重定向到 `/tools`）
- `/tools` → 工具列表
- `/tools/sxy` → 神荀彧判定工具
- `/tools/lj` → 李傕概率判定工具
- `/about` → 关于页面

### 本地开发

```bash
# 安装依赖
npm install

# 本地启动（Vite 开发服务）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

### 使用 Docker

项目内置生产用 Dockerfile，镜像名统一为 **`sgs-tools`**。

本地构建与运行示例（如需推到 Docker Hub / 私有仓库，请按自己的仓库地址打 tag，只需保证镜像名为 `sgs-tools` 即可）：

```bash
docker build -t sgs-tools .
docker run --rm -p 8080:80 sgs-tools
```

浏览器访问 `http://localhost:8080` 即可看到移动端样式的工具集界面。
