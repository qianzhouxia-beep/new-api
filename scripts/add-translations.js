const fs = require('fs')
const path = require('path')

const ZHPATH = 'D:\\AI\\new-api-source-clean\\web\\default\\src\\i18n\\locales\\zh.json'
const ENPATH = 'D:\\AI\\new-api-source-clean\\web\\default\\src\\i18n\\locales\\en.json'

const zhKeys = {
  "One line": "一行代码",
  "to access top AI models.": "接入主流 AI 模型。",
  "one key for all": "一 Key 通用",
  "TokenMaster is a unified AI API gateway for developers. Top up once, use multiple models. No separate registrations, no multiple keys, no SDK switching.": "TokenMaster 是面向开发者的统一 AI API 网关。充值一次，畅用多个模型。无需分别注册、无需多个 Key、无需切换 SDK。",
  "Sign Up Free": "免费注册",
  "How to Use": "如何使用",
  "series": "系列",
  "Supported Models": "已接入模型",
  "More models being added continuously": "更多模型持续接入中",
  "Lightweight fast inference": "极速轻量推理",
  "Flagship deep reasoning": "旗舰级深度推理",
  "General conversation": "通用对话",
  "Complex logical reasoning": "复杂逻辑推理",
  "OpenAI Compatible": "OpenAI 兼容格式",
  "Zhipu GLM": "智谱 GLM",
  "Next-gen lightweight model": "新一代轻量模型",
  "High cost-performance": "高性价比推理",
  "Multimodal understanding": "多模态理解",
  "Chinese-optimized, reliable": "中文优化，稳定可靠",
  "Qwen (Tongyi Qianwen)": "通义千问 Qwen",
  "Alibaba flagship model": "阿里旗舰模型",
  "Balanced all-rounder": "均衡全能",
  "Cost-effective choice": "性价比之选",
  "Classic series": "经典系列",
  "1M context window support": "百万级上下文支持",
  "Why TokenMaster?": "为什么选择 TokenMaster？",
  "Unified API Gateway": "统一 API 网关",
  "One key for all models, fully OpenAI-compatible. Switch models by changing the model parameter, no SDK changes needed.": "一个 Key 调用多个模型，全部兼容 OpenAI 格式。换模型只需改 model 参数，无需换 SDK。",
  "your_key": "你的 Key",
  "Prepay & Use": "即充即用",
  "USD prepaid balance, pay-per-use. No monthly fees, no subscriptions, no minimum spend.": "美金充值，按量扣费。无月费、无订阅、无最低消费。",
  "No Multiple Sign-ups": "无需多家注册",
  "One TokenMaster account = all models. No need to register, prepay, and manage keys on each platform separately.": "一个 TokenMaster 账号 = 全部模型。不用在 DeepSeek、智谱、阿里云分别注册、分别充值、分别管理 Key。",
  "OpenAI Compatible, Zero Migration": "OpenAI 兼容，零迁移成本",
  "Just change your base_url. Existing OpenAI SDK code needs zero modification. Python, Node.js, cURL all supported.": "改一行 base_url 即可。现存的 OpenAI SDK 代码无需任何修改。Python、Node.js、cURL 全支持。",
  "Quick Start": "快速开始",
  "Three steps, no complex setup": "三步接入，无需复杂配置",
  "Python (3 lines)": "Python（3 行搞定）",
  "cURL (any language)": "cURL（任何语言通用）",
  "3 Steps": "三步上手",
  "Sign up for TokenMaster": "注册 TokenMaster 账户",
  "Top up (USD balance)": "后台充值（美金余额）",
  "Call APIs with your key, pay as you go": "用 Key 调 API，按量扣费",
  "Don't have an account?": "还没账号？",
  "Get your API key instantly.": "注册即拥有 API Key。",
  "FAQ": "常见问题",
  "How is TokenMaster different from using models directly?": "TokenMaster 和直接用模型有什么区别？",
  "TokenMaster provides unified access to top Chinese AI models (DeepSeek, GLM, Qwen) with a single API key. No need to register and prepay on each platform separately.": "TokenMaster 主要接入国内优质模型（DeepSeek、智谱 GLM、通义千问），一个 Key 调用全部模型，免去每个平台分别注册充值。模型定价透明，余额可查。",
  "Which models are supported?": "支持哪些模型？",
  "Currently: DeepSeek (V4 Flash, V4 Pro, Chat, Reasoner), GLM (4.7-Flash, 4.5-Air, 4-Vision, etc.), Qwen (3.7-Max, 3.7-Plus, 3.5 series). More models being added continuously.": "当前已接入 DeepSeek（V4 Flash / V4 Pro / Chat / Reasoner）、智谱 GLM（4.7-Flash / 4.5-Air / 4-Vision 等）、通义千问 Qwen（3.7-Max / 3.7-Plus / 3.5 系列等）。更多模型持续接入中，具体列表和实时价格可查看后台模型广场。",
  "Do I need to bring my own API keys?": "需要准备自己的 API Key 吗？",
  "No. After signing up, you get a dedicated API key that works for all models. No need to prepare keys from DeepSeek, Zhipu, or Alibaba Cloud.": "不需要。在 TokenMaster 注册后即可获取专属 API Key。一个 Key 调用全部模型，无需额外准备 DeepSeek / 智谱 / 阿里云的 Key。",
  "How does billing work?": "怎么收费？",
  "Does my balance expire?": "余额会过期吗？",
  "Balance never expires. Top up once and use it anytime.": "余额长期有效。充多少用多少，不设有效期限制。",
  "How do I get started?": "怎么开始用？",
  "One-stop AI API gateway for developers. One key, all models.": "面向开发者的一站式 AI 模型 API 网关。一个 Key，全部模型。",
  "All rights reserved.": "保留所有权利。",
  "Product": "产品",
  "Models": "模型",
  "Features": "优势",
  "Pricing": "价格",
  "Resources": "资源",
  "Docs": "文档",
  "API Reference": "API 参考",
  "About": "关于",
  "About Us": "关于我们",
  "Contact Us": "联系我们",
  "Legal": "法律",
  "Privacy Policy": "隐私政策",
  "Terms of Service": "服务条款",
  "All Systems Operational": "服务运行正常"
}

// Add English keys (same key = same value)
const enKeys = {}
for (const k of Object.keys(zhKeys)) {
  // For keys that end with colon-sentence patterns in the FAQ, use the key as value
  // Actually en.json already has the same pattern - key=value for English
  enKeys[k] = k
}

// Special fixes for keys that need different zh/en
enKeys["One line"] = "One line"
enKeys["one key for all"] = "one key for all"
enKeys["OpenAI Compatible"] = "OpenAI Compatible"
enKeys["your_key"] = "your_key"

function updateFile(filePath, newKeys) {
  let raw = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(raw)
  Object.assign(data.translation, newKeys)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log('Updated:', filePath)
}

updateFile(ZHPATH, zhKeys)
updateFile(ENPATH, enKeys)
