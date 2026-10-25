// Ortama bağımsız AI sağlayıcı çekirdeği — hem sunucuda (Node) hem uygulamada (tarayıcı paketi) çalışır.
// Anahtar ve ayarlar çağırandan gelir: sunucu .env'den, uygulama kullanıcının kendi anahtarından verir.
const Anthropic = require('@anthropic-ai/sdk');
const { zodOutputFormat } = require('@anthropic-ai/sdk/helpers/zod');

const PROVIDER_DEFAULTS = {
  gemini: { label: 'Gemini', model: 'gemini-3.7-flash', baseUrl: 'https://generativelanguage.googleapis.com/v1beta' },
  claude: { label: 'Claude', model: 'claude-opus-5-5', baseUrl: 'https://api.anthropic.com', effort: 'low' },
  minimax: { label: 'MiniMax', model: 'MiniMax-M3', baseUrl: 'https://api.minimax.io/v1' },
  openai: { label: 'OpenAI', model: 'gpt-4o-mini', baseUrl: 'https://api.openai.com/v1' }
};

// Sunucu tarafı reddetme yedeği (server-side fallback) desteklenen Claude modelleri
const CLAUDE_FALLBACK_MODELS = ['claude-opus-5-5', 'claude-opus-5', 'claude-fable-5-1', 'claude-sonnet-5-5'];

// Düşünme blokları, kod çitleri veya önündeki metin olsa da JSON nesnesini çıkar
function extractBalancedJson(str, start) {
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < str.length; i++) {
    const c = str[i];
    if (escape) { escape = false; continue; }
    if (inString) {
      if (c === '\\') escape = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return str.slice(start, i + 1);
  }
  return null;
}

function parseJsonContent(content) {
  let text = String(content || '').trim();
  if (!text) throw new Error('AI boş yanıt döndü');
  text = text.replace(/[\s\S]*?<\/think>/gi, '').trim();
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  try { return JSON.parse(text); } catch { /* devam */ }
  for (let i = text.length - 1; i >= 0; i--) {
    if (text[i] !== '{') continue;
    const chunk = extractBalancedJson(text, i);
    if (!chunk) continue;
    try {
      const parsed = JSON.parse(chunk);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch { /* önceki adayı dene */ }
  }
  throw new Error('AI yanıtı JSON olarak ayrıştırılamadı');
}

function settings(cfg) {
  const d = PROVIDER_DEFAULTS[cfg.id];
  if (!d) throw new Error(`Bilinmeyen AI sağlayıcısı: ${cfg.id}`);
  if (!cfg.apiKey) throw new Error(`${d.label} için API anahtarı yok`);
  return {
    ...d,
    ...Object.fromEntries(Object.entries(cfg).filter(([, v]) => v !== undefined && v !== null && v !== '')),
    baseUrl: String(cfg.baseUrl || d.baseUrl).replace(/\/$/, ''),
    fetch: cfg.fetch || globalThis.fetch.bind(globalThis),
    timeoutMs: cfg.timeoutMs || 120000
  };
}

async function httpJson(s, url, init) {
  let res;
  try {
    res = await s.fetch(url, { ...init, signal: AbortSignal.timeout(s.timeoutMs) });
  } catch (err) {
    if (err.name === 'TimeoutError') throw new Error('AI yanıt vermedi (zaman aşımı)');
    throw new Error(`${s.label} servisine ulaşılamadı: ${err.message}`);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error?.message || data.base_resp?.status_msg || data.message || `${s.label} hatası (${res.status})`;
    throw Object.assign(new Error(msg), { status: res.status });
  }
  return data;
}

async function callGemini(s, { system, user, maxTokens }) {
  const data = await httpJson(s, `${s.baseUrl}/models/${encodeURIComponent(s.model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': s.apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: user }] }],
      generationConfig: { responseMimeType: 'application/json', maxOutputTokens: maxTokens }
    })
  });
  const parts = data.candidates?.[0]?.content?.parts || [];
  const text = parts.filter((part) => !part.thought).map((part) => part.text || '').join('');
  if (!text) throw new Error(`Gemini yanıt üretmedi (${data.candidates?.[0]?.finishReason || 'bilinmiyor'})`);
  return text;
}

const claudeClients = new Map();
async function callClaude(s, { system, user, maxTokens, schema }) {
  const cacheKey = `${s.apiKey}|${s.baseUrl}`;
  let client = claudeClients.get(cacheKey);
  if (!client) {
    // Kimlik ve adres açıkça verilir; ortamdaki başka Anthropic ayarları devralınmaz.
    // Tarayıcıda (uygulama) kullanıcının KENDİ anahtarıyla çalışır; bu yüzden tarayıcı erişimine izin verilir.
    client = new Anthropic({
      apiKey: s.apiKey,
      authToken: null,
      baseURL: s.baseUrl,
      timeout: s.timeoutMs,
      maxRetries: 1,
      fetch: s.fetch,
      dangerouslyAllowBrowser: typeof window !== 'undefined'
    });
    claudeClients.set(cacheKey, client);
  }
  const params = {
    model: s.model,
    max_tokens: Math.max(maxTokens, 16000),
    system,
    messages: [{ role: 'user', content: user }],
    // Kısa, kural tabanlı açıklamalar: düşük efor yeterli ve hızlı
    output_config: {
      effort: s.effort || 'low',
      ...(schema ? { format: zodOutputFormat(schema) } : {})
    }
  };
  const res = CLAUDE_FALLBACK_MODELS.includes(s.model)
    ? await client.beta.messages.create({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' })
    : await client.messages.create(params);
  if (res.stop_reason === 'refusal') throw new Error('Claude bu isteği yanıtlamadı');
  const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  if (!text) throw new Error(`Claude yanıt üretmedi (${res.stop_reason})`);
  return text;
}

async function callOpenAICompatible(s, { system, user, maxTokens }) {
  const data = await httpJson(s, `${s.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${s.apiKey}` },
    body: JSON.stringify({
      model: s.model,
      temperature: 0.2,
      max_tokens: maxTokens,
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }]
    })
  });
  return data.choices?.[0]?.message?.content;
}

/**
 * JSON üreten tek AI çağrısı.
 * @param {object} cfg  { id, apiKey, model?, baseUrl?, effort?, fetch?, timeoutMs? }
 * @param {object} req  { system, user, schema? (zod), maxTokens? }
 */
async function chatJSON(cfg, { system, user, schema, maxTokens = 4096 }) {
  const s = settings(cfg);
  let text;
  if (s.id === 'gemini') text = await callGemini(s, { system, user, maxTokens });
  else if (s.id === 'claude') text = await callClaude(s, { system, user, maxTokens, schema });
  else text = await callOpenAICompatible(s, { system, user, maxTokens });

  let data = parseJsonContent(text);
  if (schema) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const issue = parsed.error.issues?.[0];
      throw new Error(`AI yanıtı beklenen biçimde değil (${issue?.path?.join('.') || ''}: ${issue?.message || 'geçersiz'})`);
    }
    data = parsed.data;
  }
  return { data, provider: s.id, label: s.label, model: s.model };
}

module.exports = { PROVIDER_DEFAULTS, chatJSON, parseJsonContent };
