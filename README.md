# Teleprompter（提词器）

一个专业的在线提词器系统，帮助演讲者、创作者和专业人士提供流畅的脚本提示。

## 开发日志

核心规则：
- 按照版本号递增的顺序记录更新内容
- 每个版本记录新增、改进和修复的内容
- 每个版本记录受影响的文件
- 每个版本记录测试结果和下一步计划
- 最新的版本号在最上面
- 本规则不能被删除。

### v0.1.0 (2024-03-24)

**新增:**
- 创建了基础Next.js应用框架
- 实现了主页UI设计和布局
- 添加了HomeTeleprompter预览组件
- 添加了基本的编辑器页面
- 添加了播放控制功能

**改进:**
- 调整了提示条定位，确保准确框住当前行
- 优化了文本滚动和显示逻辑
- 英文化界面文本和示例内容
- 增强控制按钮的用户反馈效果

**修复:**
- 修复了橙色提示条错位问题
- 修复了文本播放时的定位错误
- 修复了播放结束后的状态重置问题

**受影响的文件:**
- `components/HomeTeleprompter.tsx`
- `app/page.tsx`
- `app/editor/page.tsx`
- `app/playback/page.tsx`

**测试结果:**
- 主页提词器预览正常运行
- 播放/暂停功能正常工作
- 速度调节功能正常工作
- "观看演示"按钮能正确触发预览播放

**下一步计划:**
- 增加更丰富的用户交互选项
- 实现脚本保存和加载功能
- 优化移动端适配
- 添加更多自定义样式选项

## 项目概述

Teleprompter.today 是一个现代化的网页应用，旨在提供专业品质的提词器功能。无论是录制视频、进行演讲还是直播，这个工具都能帮助您流畅地阅读脚本，避免视线漂移，保持专业表现。

## 核心功能

- **实时脚本编辑**：直观的编辑界面，支持实时输入和调整
- **可调节播放速度**：根据您的说话节奏自定义滚动速度（0.5x-3.0x）
- **字体和显示定制**：调整字体大小、行高以适应您的视觉偏好
- **行追踪**：突出显示当前阅读行，帮助保持专注
- **全屏模式**：提供专注的提词显示环境
- **键盘快捷键**：支持快捷控制播放、速度调整等操作
- **倒数计时**：开始播放前的倒计时，帮助准备就绪
- **独立播放页面**：可以在独立窗口或设备中显示

## 技术栈

- **Next.js 15**：React框架，提供高性能的服务端渲染和静态站点生成
- **React 19**：用于构建用户界面的JavaScript库
- **TypeScript**：提供类型安全的JavaScript超集
- **Tailwind CSS**：用于快速UI开发的实用工具类CSS框架
- **Radix UI**：无障碍设计组件库
- **Lucide Icons**：现代图标库

## 使用指南

### 编辑器使用

1. 在主页点击"开始使用"或"创建新脚本"按钮进入编辑器
2. 在编辑区输入您的脚本内容
3. 使用底部控制面板调整字体大小、播放速度和行高
4. 点击播放按钮开始预览

### 播放控制

- **空格键**：播放/暂停
- **↑/↓箭头**：调整速度
- **←/→箭头**：手动切换行
- **ESC键**：退出播放返回编辑器
- **H键**：隐藏/显示控制面板

### 全屏模式

点击右上角的扩展图标切换全屏模式，沉浸式体验更专注。

## 安装和开发

### 前提条件

- Node.js 18+ 
- npm, yarn 或 pnpm

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/yourusername/teleprompter.git
cd teleprompter

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 项目结构

```
teleprompter/
├── app/                   # Next.js 应用目录
│   ├── editor/            # 编辑器页面
│   ├── playback/          # 播放页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 应用布局
│   └── page.tsx           # 首页
├── components/            # 可复用组件
│   ├── control-panel.tsx  # 控制面板组件
│   ├── line-indicator.tsx # 行指示器组件
│   ├── theme-provider.tsx # 主题提供者
│   └── ui/                # UI组件库
├── public/                # 静态资源
├── styles/                # 样式文件
└── ...                    # 其他配置文件
```

## 特色优势

- **无需注册**：直接在浏览器中使用，无需下载或注册
- **响应式设计**：适配桌面和移动设备
- **低延迟**：即时响应的控制系统，无明显延迟
- **现代界面**：专业、简约的用户界面设计

## 贡献指南

欢迎提交问题报告和功能请求！如果您想为项目做贡献，请：

1. Fork 这个仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

项目维护者 - [您的名字](mailto:youremail@example.com)

项目链接：[https://github.com/yourusername/teleprompter](https://github.com/yourusername/teleprompter) 