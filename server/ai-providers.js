// Sunucu tarafı AI sağlayıcıları: anahtar ve ayarlar .env'den okunur, çağrılar ortak çekirdekte (ai-core).
// Anahtarlar yalnızca sunucuda durur; istemciye asla gönderilmez.
const core = require('./ai-core/providers');

const ENV = {
  gemini: { key: 'GEMINI_API_KEY', model: 'GEMINI_MODEL', baseUrl: 'GEMINI_BASE_URL' },
  // Uygulamaya özel adlar: başka araçların CLAUDE_* / ANTHROPIC_BASE_URL değişkenleriyle çakışmaz
  claude: { key: 'ANTHROPIC_API_KEY', model: 'AI_CLAUDE_MODEL', baseUrl: 'AI_CLAUDE_BASE_URL', effort: 'AI_CLAUDE_EFFORT' },
  minimax: { key: 'MINIMAX_API_KEY', model: 'MINIMAX_MODEL', baseUrl: 'MINIMAX_BASE_URL' },
  openai: { key: 'OPENAI_API_KEY', model: 'OPENAI_MODEL', baseUrl: 'OPENAI_BASE_URL' }
};

const ORDER = ['gemini', 'claude', 'minimax', 'openai'];

function envConfig(id) {
  const e = ENV[id];
  return {
    id,
    apiKey: process.env[e.key],
    model: process.env[e.model],
    baseUrl: process.env[e.baseUrl],
    effort: e.effort ? process.env[e.effort] : undefined,
    timeoutMs: parseInt(process.env.AI_TIMEOUT_MS || '120000', 10)
  };
}

function listConfigured() {
  return ORDER.filter((id) => !!process.env[ENV[id].key]);
}

// İstenen sağlayıcı yapılandırılmışsa onu, yoksa AI_PROVIDER'ı, yoksa ilk yapılandırılmış olanı kullan
function resolveProvider(requested) {
  const configured = listConfigured();
  const want = String(requested || '').toLowerCase();
  if (configured.includes(want)) return want;
  const preferred = String(process.env.AI_PROVIDER || '').toLowerCase();
  if (configured.includes(preferred)) return preferred;
  return configured[0] || null;
}

function providerInfo(id) {
  const d = core.PROVIDER_DEFAULTS[id];
  return d ? { id, label: d.label, model: process.env[ENV[id].model] || d.model } : null;
}

async function chatJSON({ provider, ...req }) {
  const id = resolveProvider(provider);
  if (!id) throw new Error('AI anahtarı yok. .env dosyasına GEMINI_API_KEY, ANTHROPIC_API_KEY veya MINIMAX_API_KEY ekleyin.');
  return core.chatJSON(envConfig(id), req);
}

module.exports = { listConfigured, resolveProvider, providerInfo, chatJSON, parseJsonContent: core.parseJsonContent };
