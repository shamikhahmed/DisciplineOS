'use strict';
const Journal = (() => {
  const STORAGE_KEY = 'dos_journal_v1';

  function getEntries() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  }

  const TRIGGERS = ['Stress', 'Boredom', 'Loneliness', 'Night', 'Anxiety', 'Social', 'Work', 'Habit'];

  function saveEntry(text, mood, triggers) {
    const entries = getEntries();
    const today = new Date().toISOString().split('T')[0];
    const existing = entries.findIndex(e => e.date === today);
    const entry = { date: today, text: text.trim(), mood: mood || null, triggers: triggers || [], ts: Date.now() };
    if (existing >= 0) entries[existing] = entry;
    else entries.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 365)));
    return entry;
  }

  function getTodayEntry() {
    const today = new Date().toISOString().split('T')[0];
    return getEntries().find(e => e.date === today) || null;
  }

  function getStreak() {
    const entries = getEntries();
    if (!entries.length) return 0;
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today); d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      if (entries.find(e => e.date === ds)) streak++;
      else break;
    }
    return streak;
  }

  function render() {
    const screen = document.getElementById('screen-journal');
    if (!screen) return;
    const entries = getEntries();
    const todayEntry = getTodayEntry();
    const today = new Date().toISOString().split('T')[0];
    const journalStreak = getStreak();
    const moods = [
      { id: 'strong', emoji: '💪', label: 'Strong' },
      { id: 'ok', emoji: '😐', label: 'Okay' },
      { id: 'hard', emoji: '😔', label: 'Hard' },
      { id: 'relapsed', emoji: '🔁', label: 'Slipped' },
    ];

    screen.innerHTML = `
    <div style="padding-bottom:20px;">
      <div style="padding:calc(env(safe-area-inset-top,20px) + 20px) 20px 20px;">
        <div class="t-label t-dim">DAILY LOG</div>
        <div class="t-title" style="margin-top:4px;">Recovery Journal</div>
        ${journalStreak > 0 ? `<div class="t-caption" style="margin-top:4px;">${journalStreak} day streak</div>` : ''}
      </div>

      <div style="margin:0 20px 20px;padding:20px;background:var(--glass);border:1px solid var(--border);border-radius:var(--r);">
        <div class="t-label t-dim" style="margin-bottom:12px;">TODAY</div>
        <div style="display:flex;gap:8px;margin-bottom:14px;">
          ${moods.map(m => `
            <div class="mood-btn ${todayEntry?.mood === m.id ? 'selected' : ''}" data-mood="${m.id}" style="flex:1;padding:10px 4px;background:${todayEntry?.mood === m.id ? 'rgba(255,107,53,0.15)' : 'var(--glass2)'};border:1px solid ${todayEntry?.mood === m.id ? 'var(--orange)' : 'var(--border)'};border-radius:var(--r-sm);text-align:center;cursor:pointer;touch-action:manipulation;">
              <div style="font-size:1.3rem;">${m.emoji}</div>
              <div style="font-size:0.6rem;font-weight:600;color:var(--text3);margin-top:3px;">${m.label}</div>
            </div>
          `).join('')}
        </div>
        <div class="t-label t-dim" style="margin:14px 0 8px;">Triggers today (optional)</div>
        <div id="journal-triggers" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">
          ${TRIGGERS.map(t => {
            const on = (todayEntry?.triggers || []).includes(t);
            return `<button type="button" class="trigger-chip${on ? ' on' : ''}" data-trigger="${t}" style="padding:6px 10px;border-radius:99px;border:1px solid ${on ? 'var(--orange)' : 'var(--border)'};background:${on ? 'rgba(255,107,53,0.12)' : 'var(--glass2)'};color:${on ? 'var(--orange)' : 'var(--text3)'};font-size:0.68rem;font-weight:600;cursor:pointer;">${t}</button>`;
          }).join('')}
        </div>
        <textarea id="journal-input" placeholder="One sentence about today..." style="width:100%;background:transparent;border:none;border-bottom:1px solid var(--border);color:var(--text);font:0.9rem/1.6 var(--font);resize:none;outline:none;padding:8px 0;min-height:60px;box-sizing:border-box;">${todayEntry?.text || ''}</textarea>
        <button id="journal-save" class="btn btn-primary" style="margin-top:14px;width:100%;">Save Entry</button>
      </div>

      ${entries.filter(e => e.date !== today).length > 0 ? `
      <div class="section-header"><span class="section-title">Past Entries</span></div>
      <div style="display:flex;flex-direction:column;gap:8px;padding:0 20px;">
        ${entries.filter(e => e.date !== today).slice(0, 30).map(e => {
          const mood = moods.find(m => m.id === e.mood);
          const dateStr = new Date(e.date + 'T12:00:00').toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
          return `
          <div style="padding:14px 16px;background:var(--glass);border:1px solid var(--border);border-radius:var(--r-sm);">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
              <div class="t-caption">${dateStr}</div>
              ${mood ? `<div style="font-size:0.9rem;">${mood.emoji}</div>` : ''}
            </div>
            <div style="font-size:0.85rem;color:var(--text2);line-height:1.5;">${e.text || ''}</div>
          </div>`;
        }).join('')}
      </div>` : ''}
    </div>`;

    let selectedMood = todayEntry?.mood || null;
    let selectedTriggers = [...(todayEntry?.triggers || [])];

    screen.querySelectorAll('.trigger-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.trigger;
        if (selectedTriggers.includes(t)) selectedTriggers = selectedTriggers.filter(x => x !== t);
        else selectedTriggers.push(t);
        screen.querySelectorAll('.trigger-chip').forEach(b => {
          const on = selectedTriggers.includes(b.dataset.trigger);
          b.style.borderColor = on ? 'var(--orange)' : 'var(--border)';
          b.style.background = on ? 'rgba(255,107,53,0.12)' : 'var(--glass2)';
          b.style.color = on ? 'var(--orange)' : 'var(--text3)';
        });
      });
    });

    screen.querySelectorAll('.mood-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedMood = btn.dataset.mood;
        screen.querySelectorAll('.mood-btn').forEach(b => {
          const sel = b.dataset.mood === selectedMood;
          b.style.background = sel ? 'rgba(255,107,53,0.15)' : 'var(--glass2)';
          b.style.borderColor = sel ? 'var(--orange)' : 'var(--border)';
        });
      });
    });

    document.getElementById('journal-save')?.addEventListener('click', () => {
      const text = document.getElementById('journal-input')?.value?.trim();
      if (!text) { App.showToast('Write something first', 'error'); return; }
      saveEntry(text, selectedMood, selectedTriggers);
      App.showToast('Entry saved', 'success');
      render();
    });
  }

  return { render, getEntries, getTodayEntry, getStreak, saveEntry };
})();
window.Journal = Journal;
