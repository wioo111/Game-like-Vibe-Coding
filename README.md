# Code Like Game

一个把 AI Coding 新手引导做成“游戏第一关”的前端原型。

当前版本聚焦最关键的第一个闭环：先教用户获取 `DeepSeek API Key`，再回到产品里完成粘贴与链路验证。整体是单页、黑场、低干扰、偏视觉小说式的引导体验。

## 当前状态

- 已完成 `认知说明 -> 获取钥匙 -> 粘贴验证 -> 第一次对话（过渡态）`
- 已支持 `上一步` 回退，流程不再是单向死路
- 已补充新手友好的 `充值` 和 `创建 Key` 辅助说明
- 已加入 API 备注命名提醒，以及“关闭后可能无法再次完整复制”的提示
- 当前 `第 4 步` 还是过渡页，真正的“下一关”尚未完整展开

## 技术栈

- `React 18`
- `TypeScript`
- `Vite`
- `Tailwind CSS`
- `Zustand`
- `Vitest`
- `ESLint`

## 本地运行

先安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

常用校验命令：

```bash
npm run check
npm run lint
npm run test
npm run build
```

## 目录结构

```text
src/
  components/
    CharacterSilhouette.tsx
    DialogPanel.tsx
  hooks/
    useTypewriter.ts
  pages/
    Home.tsx
    Home.test.tsx
  store/
    useSceneStore.ts
  index.css
```

## 交互说明

- `步骤 1`：告诉用户这一关的唯一目标是先拿到 API Key
- `步骤 2`：引导用户去 DeepSeek 开放平台登录、充值、创建 Key
- `步骤 3`：回到页面粘贴 Key，触发模拟链路验证
- `步骤 4`：展示“第一关完成”的过渡结果，并引出下一关

## 已知限制

- 目前还是前端原型，没有真正请求 DeepSeek 接口
- `API Key` 验证是本地模拟，不是实时联网校验
- 真正的“下一关”还没有拆成完整任务链

## 文档

- 产品文档：`.trae/documents/产品需求文档.md`
- 技术文档：`.trae/documents/技术架构文档.md`

## 下一步

- 把“第一句话”拆成独立关卡
- 增加“如何把钥匙装进工具里”的真实配置引导
- 把过渡页改成真正可玩的任务系统，而不是总结页
