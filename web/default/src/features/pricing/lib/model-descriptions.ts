/*
 * TokenMaster 模型描述映射
 * 当后端未返回 description 字段时，使用此映射补充模型描述。
 */
const DESCRIPTIONS: Record<string, string> = {
  // ===== DeepSeek 系列 =====
  'deepseek-v4-flash':
    'DeepSeek V4 Flash 是 DeepSeek 最新一代轻量级推理模型，速度极快，适合高并发和实时对话场景。',
  'deepseek-v4-pro':
    'DeepSeek V4 Pro 是 DeepSeek 旗舰级推理模型，在数学、编程、逻辑推理等复杂任务上表现优异，适合高精度场景。',
  'deepseek-chat':
    'DeepSeek Chat (V3) 是 DeepSeek 通用对话模型，兼顾速度与质量，适合日常对话、内容生成、代码辅助等通用任务。',
  'deepseek-reasoner':
    'DeepSeek Reasoner (R1) 是 DeepSeek 深度推理模型，擅长复杂逻辑推理、数学证明、科学分析等需要深度思考的场景。',

  // ===== 智谱 GLM 系列 =====
  'GLM-4.7-Flash':
    '智谱 GLM-4.7-Flash 是智谱最新一代轻量级模型，推理速度快，性价比高，适合高频调用场景。',
  'glm-4.7-flash':
    '智谱 GLM-4.7-Flash 是智谱最新一代轻量级模型，推理速度快，性价比高，适合高频调用场景。',
  'glm-4.5-air':
    '智谱 GLM-4.5-Air 是智谱高性价比推理模型，平衡了性能与成本，适合通用对话和内容生成任务。',
  'glm-4':
    '智谱 GLM-4 是智谱第四代通用大语言模型，具备强大的中文理解与生成能力，支持多轮对话和复杂任务。',
  'glm-4v':
    '智谱 GLM-4V 是多模态视觉语言模型，支持图像理解与描述，可处理图文混合输入。',
  'glm-4v-plus':
    '智谱 GLM-4V-Plus 是增强版多模态模型，图像理解能力更强，适合复杂的视觉分析任务。',
  'glm-4-plus':
    '智谱 GLM-4-Plus 是 GLM-4 的增强版本，性能全面提升，适合对质量要求较高的各类任务。',
  'glm-4-airx':
    '智谱 GLM-4-AirX 是 Air 系列的加速版本，推理速度更快，适合对延迟敏感的场景。',
  'glm-4-long':
    '智谱 GLM-4-Long 是长文本优化版本，支持超长上下文处理，适合文档分析、长篇内容生成等场景。',
  'glm-4-alltools':
    '智谱 GLM-4-AllTools 是集成工具调用能力的增强版本，支持函数调用、代码执行等扩展功能。',

  // ===== 通义千问 Qwen 系列 =====
  'qwen3.5-flash':
    '通义千问 Qwen3.5-Flash 是阿里云轻量级推理模型，速度极快，成本极低，适合大规模高频调用。',
  'qwen3.5-plus':
    '通义千问 Qwen3.5-Plus 是阿里云均衡型推理模型，在速度和质量之间取得良好平衡，适合通用任务。',
  'qwen3.7-plus':
    '通义千问 Qwen3.7-Plus 是阿里云最新一代均衡模型，性能较前代显著提升，综合能力强。',
  'qwen3.7-max':
    '通义千问 Qwen3.7-Max 是阿里云旗舰级大语言模型，在多项基准测试中表现领先，适合复杂分析、深度推理等高要求场景。',
  'qwen-plus':
    '通义千问 Qwen-Plus 是阿里云高性能通用模型，支持丰富的应用场景，具备稳定可靠的推理能力。',
  'qwen-turbo':
    '通义千问 Qwen-Turbo 是阿里云快速推理模型，响应速度快，适合实时对话和轻量级任务。',
  'qwen-long':
    '通义千问 Qwen-Long 是阿里云长文本处理模型，支持百万级 Token 上下文，适合超长文档分析、深度阅读等场景。',

  // ===== 其他常见模型（中文描述）=====
  'qwen3.6-flash':
    '通义千问 Qwen3.6-Flash 是阿里云轻量快速模型，在成本与性能之间取得良好平衡。',
  'gpt-4o':
    'OpenAI GPT-4o 是多模态旗舰模型，支持文本、图像输入，综合能力业界领先。',
  'gpt-4o-mini':
    'OpenAI GPT-4o-mini 是轻量版多模态模型，成本更低，适合高频调用场景。',
  'gpt-4.1': 'OpenAI GPT-4.1 是 GPT-4 系列的增强版本，指令遵循能力更强。',
  'gpt-4.1-mini': 'OpenAI GPT-4.1-mini 是 GPT-4.1 的轻量版本，性价比优秀。',
  'gpt-4.1-nano': 'OpenAI GPT-4.1-nano 是 GPT-4.1 系列最小模型，极速响应。',
  'claude-sonnet-4':
    'Anthropic Claude Sonnet 4 是 Claude 4 系列的速度优先版，兼顾质量与响应速度。',
  'claude-haiku-3.5':
    'Anthropic Claude Haiku 3.5 是 Claude 系列最快模型，成本极低，适合实时应用。',
  'claude-opus-4':
    'Anthropic Claude Opus 4 是 Claude 系列最强模型，在复杂推理、长文本理解方面表现顶尖。',
  'gemini-2.5-flash': 'Google Gemini 2.5 Flash 是 Google 快速推理模型，响应极快。',
  'gemini-2.5-pro': 'Google Gemini 2.5 Pro 是 Google 旗舰模型，支持超长上下文。',
}

export function getModelDescription(modelName: string): string | undefined {
  return DESCRIPTIONS[modelName]
}

export function enrichWithDescriptions<T extends { model_name: string; description?: string }>(
  models: T[]
): T[] {
  return models.map((m) => ({
    ...m,
    description: m.description || getModelDescription(m.model_name),
  }))
}

export default DESCRIPTIONS
