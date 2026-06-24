const API = '/api/admin';
const TOKEN_KEY = 'artikel_admin_token';

const SCHEMAS = {
  words: {
    title: 'Kelime',
    columns: ['id', 'word', 'article', 'tr', 'en', 'uk', 'ar', 'category', 'active'],
    fields: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'word', label: 'Kelime (DE)', required: true },
      { name: 'article', label: 'Artikel', type: 'select', options: ['der', 'die', 'das'], required: true },
      { name: 'tr', label: '🇹🇷 Türkçe', required: true },
      { name: 'en', label: '🇬🇧 English', required: true },
      { name: 'de', label: '🇩🇪 Deutsch' },
      { name: 'uk', label: '🇺🇦 Українська' },
      { name: 'ar', label: '🇸🇦 العربية' },
      { name: 'category', label: 'Kategori' },
      { name: 'difficulty', label: 'Zorluk', type: 'number' },
      { name: 'suffix', label: 'Son ek' },
      { name: 'is_exception', label: 'İstisna', type: 'checkbox' },
      { name: 'active', label: 'Aktif', type: 'checkbox' }
    ]
  },
  'suffix-rules': {
    title: 'Son Ek Kuralı',
    columns: ['id', 'article', 'suffix', 'example', 'priority', 'active'],
    fields: [
      { name: 'article', label: 'Artikel', type: 'select', options: ['der', 'die', 'das'], required: true },
      { name: 'suffix', label: 'Ek', required: true },
      { name: 'example', label: 'Örnek', required: true },
      { name: 'desc', label: 'Açıklama', type: 'textarea', required: true },
      { name: 'priority', label: 'Öncelik %', type: 'number' },
      { name: 'active', label: 'Aktif', type: 'checkbox' }
    ]
  },
  'category-rules': {
    title: 'Kategori Kuralı',
    columns: ['id', 'article', 'category', 'icon', 'priority', 'active'],
    fields: [
      { name: 'article', label: 'Artikel', type: 'select', options: ['der', 'die', 'das'], required: true },
      { name: 'category', label: 'Kategori', required: true },
      { name: 'icon', label: 'İkon (emoji)' },
      { name: 'examples_json', label: 'Örnekler (JSON dizi)', type: 'textarea', placeholder: '["der Mann","der Vater"]' },
      { name: 'priority', label: 'Öncelik %', type: 'number' },
      { name: 'active', label: 'Aktif', type: 'checkbox' }
    ]
  },
  exceptions: {
    title: 'İstisna',
    columns: ['id', 'word', 'article', 'category', 'active'],
    fields: [
      { name: 'word', label: 'Kelime', required: true },
      { name: 'article', label: 'Artikel', type: 'select', options: ['der', 'die', 'das'], required: true },
      { name: 'category', label: 'Açıklama', type: 'textarea', required: true },
      { name: 'icon', label: 'İkon' },
      { name: 'active', label: 'Aktif', type: 'checkbox' }
    ]
  },
  cases: {
    title: 'Hal Alıştırması',
    columns: ['id', 'case_name', 'word', 'declined_article', 'tr', 'active'],
    fields: [
      { name: 'sentence_pre', label: 'Cümle başı', required: true },
      { name: 'word', label: 'Kelime', required: true },
      { name: 'suffix', label: 'Ek' },
      { name: 'sentence_post', label: 'Cümle sonu' },
      { name: 'tr', label: 'Türkçe', required: true },
      { name: 'base_article', label: 'Temel artikel', type: 'select', options: ['der', 'die', 'das'], required: true },
      { name: 'declined_article', label: 'Çekimli artikel', required: true },
      { name: 'declined_noun', label: 'Çekimli isim' },
      { name: 'case_name', label: 'Hal', required: true },
      { name: 'focus_word', label: 'Odak kelime' },
      { name: 'explanation', label: 'Açıklama', type: 'textarea', required: true },
      { name: 'sort_order', label: 'Sıra', type: 'number' },
      { name: 'active', label: 'Aktif', type: 'checkbox' }
    ]
  },
  achievements: {
    title: 'Başarı',
    columns: ['id', 'slug', 'title', 'xp', 'active'],
    fields: [
      { name: 'slug', label: 'Slug (benzersiz)', required: true },
      { name: 'title', label: 'Başlık', required: true },
      { name: 'desc', label: 'Açıklama', required: true },
      { name: 'icon', label: 'İkon' },
      { name: 'xp', label: 'XP', type: 'number' },
      { name: 'active', label: 'Aktif', type: 'checkbox' }
    ]
  },
  'daily-tips': {
    title: 'Günlük İpucu',
    columns: ['id', 'lang', 'icon', 'text', 'active'],
    fields: [
      { name: 'lang', label: 'Dil', type: 'select', options: ['tr', 'en', 'de', 'uk', 'ar'], required: true },
      { name: 'icon', label: 'İkon' },
      { name: 'text', label: 'Metin', type: 'textarea', required: true },
      { name: 'active', label: 'Aktif', type: 'checkbox' }
    ]
  }
};

const CATEGORY_LABELS = {
  days: 'Günler', months: 'Aylar', seasons: 'Mevsimler', weather: 'Hava',
  directions: 'Yönler', drinks: 'İçecekler', food: 'Yiyecek', animals: 'Hayvanlar',
  profession: 'Meslekler', family: 'Aile', places: 'Yerler', furniture: 'Mobilya',
  technology: 'Teknoloji', nature: 'Doğa', transport: 'Ulaşım', money: 'Para',
  time: 'Zaman', body: 'Vücut', clothing: 'Giyim', hobbies: 'Hobiler',
  abstract: 'Soyut', school: 'Okul', people: 'İnsanlar', general: 'Genel',
  rooms: 'Odalar', objects: 'Nesneler', materials: 'Materyal', events: 'Etkinlik',
  health: 'Sağlık', science: 'Bilim'
};

const TITLES = {
  dashboard: 'Özet',
  'ai-automation': 'AI Kategori Otomasyonu',
  words: 'Kelimeler',
  'suffix-rules': 'Son Ek Kuralları',
  'category-rules': 'Kategori Kuralları',
  exceptions: 'İstisnalar',
  cases: 'Hal Alıştırmaları',
  achievements: 'Başarılar',
  'daily-tips': 'Günlük İpuçları'
};

let currentSection = 'dashboard';
let modalState = { resource: null, id: null, data: null };
let wordsCache = [];
let aiPreviewWords = [];
let lastAudit = null;

function token() { return localStorage.getItem(TOKEN_KEY); }
function setToken(t) { localStorage.setItem(TOKEN_KEY, t); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }

async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token()) headers.Authorization = `Bearer ${token()}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (res.status === 401) {
    clearToken();
    showLogin();
    throw new Error('Oturum sonlandı');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'İstek başarısız');
  return data;
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

function showLogin() {
  document.getElementById('login-view').classList.remove('hidden');
  document.getElementById('admin-view').classList.add('hidden');
}

function showAdmin(username) {
  document.getElementById('login-view').classList.add('hidden');
  document.getElementById('admin-view').classList.remove('hidden');
  document.getElementById('admin-user').textContent = username;
}

function switchSection(section) {
  currentSection = section;
  document.querySelectorAll('.nav-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.section === section);
  });
  document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
  document.getElementById(`section-${section}`)?.classList.add('active');
  document.getElementById('page-title').textContent = TITLES[section] || section;
  if (section !== 'dashboard') loadTable(section);
  if (section === 'ai-automation') loadCategorySuggestions();
  closeMobileMenu();
}

function openMobileMenu() {
  document.getElementById('sidebar')?.classList.add('open');
  document.getElementById('sidebar-overlay')?.classList.add('show');
  const toggle = document.getElementById('menu-toggle');
  toggle?.classList.add('open');
  toggle?.setAttribute('aria-expanded', 'true');
  toggle?.setAttribute('aria-label', 'Menüyü kapat');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.remove('show');
  const toggle = document.getElementById('menu-toggle');
  toggle?.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Menüyü aç');
  document.body.style.overflow = '';
}

async function loadVersion() {
  try {
    const meta = await fetch('/api/version').then((r) => r.json());
    document.getElementById('content-version').textContent = `v${meta.version}`;
  } catch { /* */ }
}

async function loadDashboard() {
  const stats = await api('/stats');
  const grid = document.getElementById('stats-grid');
  const items = [
    ['Kelimeler', stats.words, 'words'],
    ['Son Ekler', stats.suffixRules, 'suffix-rules'],
    ['Kategoriler', stats.categoryRules, 'category-rules'],
    ['İstisnalar', stats.exceptions, 'exceptions'],
    ['Haller', stats.cases, 'cases'],
    ['Başarılar', stats.achievements, 'achievements'],
    ['İpuçları', stats.dailyTips, 'daily-tips']
  ];
  grid.innerHTML = items.map(([lbl, num, section]) => `
    <button type="button" class="stat-box clickable" data-quick-section="${section}">
      <div class="num">${num}</div>
      <div class="lbl">${lbl}</div>
    </button>
  `).join('');
  loadVersion();
}

function handleQuickAction(el) {
  const section = el.dataset.quickSection;
  const action = el.dataset.quickAction;
  const focusId = el.dataset.quickFocus;

  if (section) {
    switchSection(section);
    if (section === 'dashboard') loadDashboard();
    if (focusId) {
      setTimeout(() => document.getElementById(focusId)?.focus(), 120);
    }
    return;
  }

  if (action === 'add-word') {
    switchSection('words');
    setTimeout(() => openModal('words'), 80);
  }
}

function formatCell(key, val) {
  if (key === 'article' || key === 'base_article' || key === 'declined_article') {
    return `<span class="tag ${val}">${val}</span>`;
  }
  if (key === 'active') return val ? '✅' : '<span class="tag off">pasif</span>';
  if (key === 'category') {
    const s = String(val || '');
    if (!s) return '—';
    const label = CATEGORY_LABELS[s] || s;
    return `${label} <span style="opacity:.45;font-size:11px">${s}</span>`;
  }
  if (key === 'text' || key === 'explanation') {
    const s = String(val || '');
    return s.length > 60 ? s.slice(0, 60) + '…' : s;
  }
  return val ?? '—';
}

function getWordsFilters() {
  return {
    q: document.getElementById('words-search')?.value?.trim().toLowerCase() || '',
    category: document.getElementById('words-filter-category')?.value || '',
    article: document.getElementById('words-filter-article')?.value || '',
    difficulty: document.getElementById('words-filter-difficulty')?.value || '',
    status: document.getElementById('words-filter-status')?.value || '',
    exception: document.getElementById('words-filter-exception')?.value || '',
    sort: document.getElementById('words-filter-sort')?.value || 'word-asc'
  };
}

function filterWords(rows) {
  const f = getWordsFilters();
  let result = rows.filter((r) => {
    if (f.category && r.category !== f.category) return false;
    if (f.article && r.article !== f.article) return false;
    if (f.difficulty && String(r.difficulty) !== f.difficulty) return false;
    if (f.status === 'active' && !r.active) return false;
    if (f.status === 'inactive' && r.active) return false;
    if (f.exception === 'yes' && !r.is_exception) return false;
    if (f.exception === 'no' && r.is_exception) return false;
    if (f.q) {
      const hay = [
        r.word, r.tr, r.en, r.de, r.uk, r.ar, r.category, r.suffix,
        CATEGORY_LABELS[r.category],
        r.translations?.tr, r.translations?.en, r.translations?.uk, r.translations?.ar
      ].filter(Boolean).join(' ').toLowerCase();
      if (!hay.includes(f.q)) return false;
    }
    return true;
  });

  const [sortKey, sortDir] = f.sort.split('-');
  result.sort((a, b) => {
    let av = a[sortKey] ?? '';
    let bv = b[sortKey] ?? '';
    if (typeof av === 'string') av = av.toLowerCase();
    if (typeof bv === 'string') bv = bv.toLowerCase();
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
  return result;
}

function populateWordsFilterOptions(rows) {
  const sel = document.getElementById('words-filter-category');
  if (!sel) return;
  const current = sel.value;
  const counts = {};
  rows.forEach((r) => {
    if (r.category) counts[r.category] = (counts[r.category] || 0) + 1;
  });
  const cats = Object.keys(counts).sort((a, b) =>
    (CATEGORY_LABELS[a] || a).localeCompare(CATEGORY_LABELS[b] || b, 'tr')
  );
  sel.innerHTML = '<option value="">Tüm kategoriler</option>' +
    cats.map((c) => `<option value="${c}">${CATEGORY_LABELS[c] || c} (${counts[c]})</option>`).join('');
  if (cats.includes(current)) sel.value = current;
}

function updateWordsFilterCount(shown, total) {
  const el = document.getElementById('words-filter-count');
  if (!el) return;
  el.textContent = shown === total ? `${total} kelime` : `${shown} / ${total} kelime`;
}

function renderWordsTable() {
  const schema = SCHEMAS.words;
  const filtered = filterWords(wordsCache);
  updateWordsFilterCount(filtered.length, wordsCache.length);

  const table = document.getElementById('table-words');
  table.innerHTML = `
    <thead><tr>
      ${schema.columns.map((c) => `<th>${c}</th>`).join('')}
      <th>İşlem</th>
    </tr></thead>
    <tbody>
      ${filtered.length ? filtered.map((row) => `
        <tr>
          ${schema.columns.map((c) => `<td>${formatCell(c, row[c])}</td>`).join('')}
          <td class="actions">
            <button class="btn btn-sm btn-ghost" data-edit="words" data-id="${row.id}">Düzenle</button>
            <button class="btn btn-sm btn-danger" data-delete="words" data-id="${row.id}">Sil</button>
          </td>
        </tr>
      `).join('') : '<tr><td colspan="10" style="text-align:center;color:var(--muted);padding:24px">Sonuç bulunamadı</td></tr>'}
    </tbody>
  `;
}

function applyWordsFilters() {
  if (!wordsCache.length) return;
  renderWordsTable();
}

function clearWordsFilters() {
  const ids = [
    'words-search', 'words-filter-category', 'words-filter-article',
    'words-filter-difficulty', 'words-filter-status', 'words-filter-exception'
  ];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const sort = document.getElementById('words-filter-sort');
  if (sort) sort.value = 'word-asc';
  applyWordsFilters();
}

async function loadTable(resource) {
  const schema = SCHEMAS[resource];
  if (!schema) return;
  const rows = await api(`/${resource}`);
  if (resource === 'words') {
    wordsCache = rows;
    populateWordsFilterOptions(rows);
    renderWordsTable();
    return;
  }

  const table = document.getElementById(`table-${resource}`);
  const idField = resource === 'levels' ? 'level' : 'id';

  table.innerHTML = `
    <thead><tr>
      ${schema.columns.map((c) => `<th>${c}</th>`).join('')}
      <th>İşlem</th>
    </tr></thead>
    <tbody>
      ${rows.map((row) => `
        <tr>
          ${schema.columns.map((c) => `<td>${formatCell(c, row[c])}</td>`).join('')}
          <td class="actions">
            <button class="btn btn-sm btn-ghost" data-edit="${resource}" data-id="${row[idField]}">Düzenle</button>
            <button class="btn btn-sm btn-danger" data-delete="${resource}" data-id="${row[idField]}">Sil</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;
}

function openModal(resource, row = null) {
  const schema = SCHEMAS[resource];
  modalState = { resource, id: row?.id ?? row?.level ?? null, data: row };
  document.getElementById('modal-title').textContent = row ? `${schema.title} Düzenle` : `Yeni ${schema.title}`;
  const form = document.getElementById('modal-form');
  const rowData = row ? {
    ...row,
    de: row.de || row.translations?.de || row.word,
    uk: row.uk || row.translations?.uk,
    ar: row.ar || row.translations?.ar
  } : null;
  form.innerHTML = schema.fields.map((f) => {
    const val = rowData ? rowData[f.name] : (f.type === 'checkbox' ? 1 : '');
    if (f.type === 'select') {
      return `<label>${f.label}<select name="${f.name}" ${f.required ? 'required' : ''}>
        ${f.options.map((o) => `<option value="${o}" ${val === o ? 'selected' : ''}>${o}</option>`).join('')}
      </select></label>`;
    }
    if (f.type === 'textarea') {
      const tv = f.name === 'examples_json' && row?.examples_json
        ? (typeof row.examples_json === 'string' ? row.examples_json : JSON.stringify(row.examples_json))
        : (val ?? '');
      return `<label>${f.label}<textarea name="${f.name}" ${f.required ? 'required' : ''} placeholder="${f.placeholder || ''}">${tv}</textarea></label>`;
    }
    if (f.type === 'checkbox') {
      const checked = val === 1 || val === true;
      return `<label><input type="checkbox" name="${f.name}" ${checked ? 'checked' : ''}> ${f.label}</label>`;
    }
    return `<label>${f.label}<input name="${f.name}" type="${f.type || 'text'}" value="${val ?? ''}" ${f.required ? 'required' : ''}></label>`;
  }).join('');
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  modalState = { resource: null, id: null, data: null };
}

function collectFormData(form, schema) {
  const body = {};
  schema.fields.forEach((f) => {
    if (f.type === 'checkbox') {
      body[f.name] = form.elements[f.name]?.checked ? 1 : 0;
      return;
    }
    const el = form.elements[f.name];
    if (!el) return;
    let v = el.value;
    if (f.type === 'number') v = v === '' ? 0 : parseInt(v, 10);
    if (f.name === 'examples_json') {
      try { body[f.name] = JSON.parse(v || '[]'); } catch { body[f.name] = []; }
      return;
    }
    body[f.name] = v === '' ? null : v;
  });
  return body;
}

async function saveModal(e) {
  e.preventDefault();
  const { resource, id } = modalState;
  const schema = SCHEMAS[resource];
  const body = collectFormData(e.target, schema);

  if (resource === 'words' && !id && !body.id) {
    const maxId = wordsCache.reduce((m, w) => Math.max(m, w.id), 0);
    body.id = maxId + 1;
  }

  try {
    if (id) {
      await api(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(body) });
      toast('Güncellendi');
    } else {
      await api(`/${resource}`, { method: 'POST', body: JSON.stringify(body) });
      toast('Eklendi');
    }
    closeModal();
    loadTable(resource);
    loadVersion();
  } catch (err) {
    toast(err.message);
  }
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-user').value.trim();
  const password = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');
  try {
    const data = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then((r) => r.json());
    if (!data.token) throw new Error(data.error || 'Giriş başarısız');
    setToken(data.token);
    errEl.classList.add('hidden');
    showAdmin(data.username);
    await loadDashboard();
  } catch (err) {
    errEl.textContent = err.message;
    errEl.classList.remove('hidden');
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  closeMobileMenu();
  clearToken();
  showLogin();
});

document.getElementById('menu-toggle')?.addEventListener('click', () => {
  const open = document.getElementById('sidebar')?.classList.contains('open');
  if (open) closeMobileMenu();
  else openMobileMenu();
});

document.getElementById('sidebar-overlay')?.addEventListener('click', closeMobileMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMobileMenu();
});

document.getElementById('section-dashboard')?.addEventListener('click', (e) => {
  const quick = e.target.closest('[data-quick-section], [data-quick-action]');
  if (!quick || quick.tagName === 'A') return;
  e.preventDefault();
  handleQuickAction(quick);
});

document.getElementById('nav').addEventListener('click', (e) => {
  const btn = e.target.closest('.nav-btn');
  if (!btn) return;
  switchSection(btn.dataset.section);
  if (btn.dataset.section === 'dashboard') loadDashboard();
});

document.querySelector('.main').addEventListener('click', async (e) => {
  const addBtn = e.target.closest('[data-action="add"]');
  if (addBtn) {
    openModal(addBtn.dataset.resource);
    return;
  }
  const editBtn = e.target.closest('[data-edit]');
  if (editBtn) {
    const resource = editBtn.dataset.edit;
    const id = editBtn.dataset.id;
    const rows = resource === 'words' ? wordsCache : await api(`/${resource}`);
    const row = rows.find((r) => String(r.id) === String(id));
    openModal(resource, row);
    return;
  }
  const delBtn = e.target.closest('[data-delete]');
  if (delBtn) {
    if (!confirm('Bu kaydı silmek istediğinize emin misiniz?')) return;
    try {
      await api(`/${delBtn.dataset.delete}/${delBtn.dataset.id}`, { method: 'DELETE' });
      toast('Silindi');
      loadTable(delBtn.dataset.delete);
      loadVersion();
    } catch (err) { toast(err.message); }
  }
});

document.getElementById('modal-cancel').addEventListener('click', closeModal);
document.getElementById('modal-form').addEventListener('submit', saveModal);
document.getElementById('words-search')?.addEventListener('input', applyWordsFilters);
['words-filter-category', 'words-filter-article', 'words-filter-difficulty', 'words-filter-status', 'words-filter-exception', 'words-filter-sort'].forEach((id) => {
  document.getElementById(id)?.addEventListener('change', applyWordsFilters);
});
document.getElementById('words-filter-clear')?.addEventListener('click', clearWordsFilters);

function renderAiResults(words, warning) {
  aiPreviewWords = words;
  const box = document.getElementById('ai-results');
  const saveBtn = document.getElementById('ai-save-all-btn');
  if (!words.length) {
    box.innerHTML = '';
    saveBtn.classList.add('hidden');
    return;
  }
  saveBtn.classList.remove('hidden');
  box.innerHTML = words.map((w) => `
    <div class="ai-card">
      <div class="ai-card-head">
        <span class="tag ${w.article}">${w.article}</span>
        <span class="ai-card-word">${w.word}</span>
        <span style="font-size:12px;color:var(--muted)">📁 ${w.category} · zorluk ${w.difficulty}</span>
        ${w.suffix ? `<span style="font-size:11px">${w.suffix}</span>` : ''}
        ${w.is_exception ? '<span class="tag off">istisna</span>' : ''}
      </div>
      <div class="ai-trans-grid">
        ${['tr','en','de','uk','ar'].map((lang) => `
          <div class="ai-trans-item"><strong>${lang}</strong>${w.translations?.[lang] || w[lang] || '—'}</div>
        `).join('')}
      </div>
      ${w.reason ? `<div class="ai-card-reason">💡 ${w.reason}</div>` : ''}
    </div>
  `).join('');
  document.getElementById('ai-status').textContent = warning || `${words.length} kelime hazır — kontrol edip kaydedin.`;
}

async function loadCategorySuggestions() {
  const dl = document.getElementById('category-suggestions');
  if (!dl) return;
  try {
    const cats = await api('/ai/categories');
    dl.innerHTML = cats.map((c) =>
      `<option value="${c.label}">${c.label} (${c.wordCount} kelime)</option>`
    ).join('');
  } catch { /* */ }
}

function renderAuditReport(audit) {
  lastAudit = audit;
  const report = document.getElementById('auto-report');
  const applyBtn = document.getElementById('auto-apply-btn');
  report.classList.remove('hidden');

  const cov = audit.coverage || {};
  document.getElementById('auto-stats').innerHTML = `
    <div class="auto-stat"><div class="val">${cov.percent ?? 0}%</div><div class="lbl">Kapsam</div></div>
    <div class="auto-stat"><div class="val">${cov.existing ?? 0}</div><div class="lbl">Mevcut</div></div>
    <div class="auto-stat"><div class="val">${cov.missing ?? 0}</div><div class="lbl">Eksik</div></div>
    <div class="auto-stat"><div class="val">${(audit.suggestedCases || []).length}</div><div class="lbl">Hal</div></div>
  `;
  document.getElementById('auto-summary').textContent = audit.summary || '';
  document.getElementById('auto-existing-count').textContent = (audit.existing || []).length;
  document.getElementById('auto-existing-list').innerHTML = (audit.existing || [])
    .map((w) => `<li>${w.article} ${w.word} — ${w.tr || ''}</li>`).join('') || '<li>—</li>';

  const missing = audit.missingWords || [];
  document.getElementById('auto-missing-count').textContent = missing.length;
  document.getElementById('auto-missing-list').innerHTML = missing.length
    ? missing.map((w) => `
      <div class="ai-card">
        <div class="ai-card-head">
          <span class="tag ${w.article}">${w.article}</span>
          <span class="ai-card-word">${w.word}</span>
        </div>
        <div class="ai-trans-grid">
          ${['tr','en','de','uk','ar'].map((lang) => `
            <div class="ai-trans-item"><strong>${lang}</strong>${w.translations?.[lang] || w[lang] || '—'}</div>
          `).join('')}
        </div>
        ${w.reason ? `<div class="ai-card-reason">💡 ${w.reason}</div>` : ''}
      </div>
    `).join('')
    : '<p style="color:var(--muted);font-size:13px">Eksik kelime yok 🎉</p>';

  const cases = audit.suggestedCases || [];
  const casesBlock = document.getElementById('auto-cases-block');
  if (cases.length) {
    casesBlock.classList.remove('hidden');
    document.getElementById('auto-cases-count').textContent = cases.length;
    document.getElementById('auto-cases-list').innerHTML = cases.map((c) => `
      <div class="auto-case-card">
        <span class="case-name">${c.case_name}</span>
        <div class="sentence">${c.sentence_pre} <b>${c.declined_article}</b> ${c.word}${c.sentence_post || ''}</div>
        <div style="color:var(--muted)">${c.tr}</div>
        <div style="font-size:11px;margin-top:4px">${c.explanation || ''}</div>
      </div>
    `).join('');
  } else {
    casesBlock.classList.add('hidden');
  }

  const suggestions = audit.suggestions || [];
  const sugBlock = document.getElementById('auto-suggestions-block');
  if (suggestions.length) {
    sugBlock.classList.remove('hidden');
    document.getElementById('auto-suggestions-list').innerHTML = suggestions.map((s) => `<li>${s}</li>`).join('');
  } else {
    sugBlock.classList.add('hidden');
  }

  const hasWork = missing.length || cases.length;
  applyBtn.classList.toggle('hidden', !hasWork);
}

document.getElementById('auto-scan-btn')?.addEventListener('click', async () => {
  const query = document.getElementById('auto-category-input')?.value?.trim();
  if (!query) { toast('Kategori girin (örn: Günler)'); return; }
  const status = document.getElementById('auto-status');
  const btn = document.getElementById('auto-scan-btn');
  const includeCases = document.getElementById('auto-include-cases')?.checked ?? true;
  btn.disabled = true;
  status.textContent = '⏳ AI kategoriyi tarıyor (30–90 sn sürebilir)...';
  document.getElementById('auto-report')?.classList.add('hidden');
  document.getElementById('auto-apply-btn')?.classList.add('hidden');
  try {
    const audit = await api('/ai/audit-category', {
      method: 'POST',
      body: JSON.stringify({ query, includeCases, maxNewWords: 25 })
    });
    renderAuditReport(audit);
    status.textContent = audit.aiUsed
      ? `✓ AI taraması tamam — ${audit.missingWords?.length || 0} eksik bulundu`
      : `⚠️ Kural tabanlı tarama — ${audit.missingWords?.length || 0} eksik`;
    toast('Tarama tamamlandı');
  } catch (err) {
    status.textContent = `❌ Hata: ${err.message}`;
    toast(err.message);
  } finally {
    btn.disabled = false;
  }
});

document.getElementById('auto-apply-btn')?.addEventListener('click', async () => {
  if (!lastAudit) return;
  const missing = lastAudit.missingWords?.length || 0;
  const cases = lastAudit.suggestedCases?.length || 0;
  if (!missing && !cases) return;
  if (!confirm(`${missing} kelime ve ${cases} hal alıştırması kaydedilsin mi?`)) return;
  try {
    const result = await api('/ai/apply-audit', {
      method: 'POST',
      body: JSON.stringify({ audit: lastAudit, saveWords: true, saveCases: true })
    });
    toast(`✅ ${result.wordsSaved || 0} kelime, ${result.casesSaved || 0} hal kaydedildi`);
    document.getElementById('auto-status').textContent = 'Kayıt tamamlandı';
    document.getElementById('auto-apply-btn').classList.add('hidden');
    loadVersion();
    loadCategorySuggestions();
  } catch (err) {
    toast(err.message);
  }
});

document.getElementById('ai-analyze-btn')?.addEventListener('click', async () => {
  const text = document.getElementById('ai-words-input').value.trim();
  if (!text) { toast('Kelime girin'); return; }
  const status = document.getElementById('ai-status');
  const btn = document.getElementById('ai-analyze-btn');
  btn.disabled = true;
  status.textContent = '⏳ AI analiz ediyor...';
  try {
    const result = await api('/ai/analyze', { method: 'POST', body: JSON.stringify({ text }) });
    renderAiResults(result.words || [], result.warning);
    toast(`✨ ${result.words?.length || 0} kelime analiz edildi`);
  } catch (err) {
    status.textContent = '';
    toast(err.message);
  } finally {
    btn.disabled = false;
  }
});

document.getElementById('ai-save-all-btn')?.addEventListener('click', async () => {
  if (!aiPreviewWords.length) return;
  if (!confirm(`${aiPreviewWords.length} kelime veritabanına eklensin mi?`)) return;
  try {
    const result = await api('/ai/save-words', {
      method: 'POST',
      body: JSON.stringify({ words: aiPreviewWords })
    });
    toast(`✅ ${result.count} kelime kaydedildi`);
    document.getElementById('ai-words-input').value = '';
    document.getElementById('ai-results').innerHTML = '';
    document.getElementById('ai-status').textContent = '';
    document.getElementById('ai-save-all-btn').classList.add('hidden');
    aiPreviewWords = [];
    loadTable('words');
    loadVersion();
  } catch (err) {
    toast(err.message);
  }
});

async function init() {
  if (!token()) { showLogin(); return; }
  try {
    const me = await api('/me');
    showAdmin(me.username);
    await loadDashboard();
    try {
      const ai = await api('/ai/status');
      const hint = document.querySelector('.ai-desc');
      if (hint && !ai.configured) {
        hint.innerHTML += ' <span style="color:#F59E0B">⚠️ MINIMAX_API_KEY tanımlı değil — sadece kural tabanlı tahmin yapılır.</span>';
      } else if (hint && ai.configured) {
        hint.innerHTML += ` <span style="color:#4ADE80">✓ AI: ${ai.provider} (${ai.model})</span>`;
      }
    } catch { /* */ }
  } catch {
    showLogin();
  }
}

init();
