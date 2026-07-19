# TokenMaster 每周上游定价巡检 — 2026-07-13 (周一)

## 执行摘要

### 检测到的关键变化

1. **DeepSeek 旧模型名即将废弃** (2026-07-24)
   - `deepseek-chat` → 映射到 `deepseek-v4-flash` (非思考模式)
   - `deepseek-reasoner` → 映射到 `deepseek-v4-flash` (思考模式)
   - 倒计时：11天

2. **新增模型需要配置 Ratio**
   - `deepseek-v4-flash` — 未在 defaultModelRatio 中配置
   - `deepseek-v4-pro` — 未在 defaultModelRatio 中配置

3. **DeepSeek 峰谷定价新模式**
   - 高峰时段(9-12点, 14-18点)价格翻倍
   - V4-Flash: 输入 ¥2/1M, 输出 ¥4/1M (高峰)

### 后端更新 (setting/ratio_setting/model_ratio.go)
- 新增 `deepseek-v4-flash`: 0.135
- 新增 `deepseek-v4-pro`: 0.40

### 前端更新

1. **home/index.tsx**:
   - Python SDK 示例: `deepseek-reasoner` → `deepseek-v4-flash`
   - ChatBox 客户端推荐: `deepseek-reasoner` → `deepseek-v4-flash`
   - 模型徽章: 移除 "Chat" 和 "Reasoner" 标签，替换为 "V3 Series"

2. **channel-type-config.ts**:
   - DeepSeek 渠道默认模型: `deepseek-chat,deepseek-coder` → `deepseek-v4-flash,deepseek-v4-pro`

### 未完成
- 远程 API (api-tokenmaster.com) 无法登录 — 需管理员手动更新生产环境 ModelRatio
- Qwen3/DeepSeek V4 新模型在 defaultModelRatio 中缺失，待渠道确认后补充
