/* Data loading and filtering */
const PTH = {
  bank: null,
  blueprints: null,

  async loadBank() {
    if (this.bank) return this.bank;
    const res = await fetch('data/questions.json');
    if (!res.ok) throw new Error('Could not load question bank');
    this.bank = await res.json();
    return this.bank;
  },

  async loadBlueprints() {
    if (this.blueprints) return this.blueprints;
    const res = await fetch('data/blueprints.json');
    if (!res.ok) throw new Error('Could not load blueprints');
    const data = await res.json();
    this.blueprints = Array.isArray(data) ? data : (data.blueprints || []);
    return this.blueprints;
  },

  filter(questions, { exam, subject, difficulty, search } = {}) {
    return questions.filter(q => {
      if (exam && !q.exam_tags.some(t => t.toLowerCase().includes(exam.toLowerCase()))) return false;
      if (subject && q.subject.toLowerCase() !== subject.toLowerCase()) return false;
      if (difficulty && q.difficulty !== difficulty) return false;
      if (search) {
        const s = search.toLowerCase();
        const hay = `${q.prompt} ${q.topic} ${q.subject} ${q.exam_tags.join(' ')}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  },

  unique(questions, key) {
    const set = new Set();
    questions.forEach(q => {
      if (key === 'exam') q.exam_tags.forEach(t => set.add(t));
      else if (typeof q[key] === 'string') set.add(q[key]);
    });
    return [...set].sort();
  },

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  pick(questions, n) {
    return this.shuffle(questions).slice(0, Math.min(n, questions.length));
  },

  // localStorage helpers
  getBookmarks() {
    try { return JSON.parse(localStorage.getItem('pth-bookmarks') || '[]'); }
    catch { return []; }
  },
  setBookmarks(ids) {
    localStorage.setItem('pth-bookmarks', JSON.stringify(ids));
  },
  toggleBookmark(id) {
    const ids = this.getBookmarks();
    const i = ids.indexOf(id);
    if (i >= 0) ids.splice(i, 1);
    else ids.push(id);
    this.setBookmarks(ids);
    return ids.includes(id);
  },
  saveResult(result) {
    localStorage.setItem('pth-last-result', JSON.stringify(result));
  },
  getResult() {
    try { return JSON.parse(localStorage.getItem('pth-last-result') || 'null'); }
    catch { return null; }
  },
  saveSessionQuestions(qs) {
    localStorage.setItem('pth-last-questions', JSON.stringify(qs));
  },
  getSessionQuestions() {
    try { return JSON.parse(localStorage.getItem('pth-last-questions') || '[]'); }
    catch { return []; }
  },
  getTheme() {
    return localStorage.getItem('pth-theme') || 'system';
  },
  setTheme(t) {
    localStorage.setItem('pth-theme', t);
    this.applyTheme(t);
  },
  applyTheme(t) {
    const resolved = t === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : t;
    document.documentElement.classList.toggle('dark', resolved === 'dark');
  }
};

// Apply theme on load
PTH.applyTheme(PTH.getTheme());
