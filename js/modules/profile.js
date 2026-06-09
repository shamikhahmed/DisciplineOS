'use strict';
const Profile = (() => {
  function render() {
    const screen = document.getElementById('screen-profile');
    if (!screen) return;
    const habits = State.get('habits') || [];
    const user = State.get('user') || {};
    const settings = State.get('settings') || {};
    const spiritualMode = user.spiritualMode === true;
    const hairTreatment = user.hairTreatment || 'none';
    const currency = settings.currency || 'USD';
    const cravingLog = State.get('cravingLog') || [];
    const sym = FinanceEngine.CURRENCY_SYMBOLS[currency] || '$';

    const totalDays = habits.reduce((s, h) => s + RecoveryEngine.daysClean(h.quitTime), 0);
    const totalSaved = FinanceEngine.totalSaved(habits, currency);
    const cravingsSurvived = cravingLog.filter(c => c.survived).length;
    const longest = State.longestStreak ? State.longestStreak() : 0;

    const habitsHtml = habits.map(h => {
      const hCfg = (window.HABITS_CONFIG || {})[h.type] || {};
      const days = RecoveryEngine.daysClean(h.quitTime);
      const hrs = RecoveryEngine.hoursClean(h.quitTime);
      const relapses = (h.relapses || []).length;
      const fin = FinanceEngine.calculate(h, currency);
      return `<div class="card" style="margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <span style="font-size:1.4rem">${hCfg.icon||'✨'}</span>
          <div class="t-heading">${hCfg.name||h.type}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px">
          <div><div class="t-label">Days Clean</div><div style="font-size:1.3rem;font-weight:800;color:var(--text)">${days}</div></div>
          <div><div class="t-label">Relapses</div><div style="font-size:1.3rem;font-weight:800;color:var(--text)">${relapses}</div></div>
          ${fin.hasCost?`<div><div class="t-label">Saved</div><div style="font-size:1.3rem;font-weight:800;color:var(--green)">${sym}${fin.savedTotal.toFixed(2)}</div></div>`:''}
          <div><div class="t-label">Body Score</div><div style="font-size:1.3rem;font-weight:800;color:var(--teal)">${BodyEngine.overallBodyScore(h.type, hrs)}%</div></div>
        </div>
        <button class="btn btn-ghost" style="font-size:0.78rem;padding:10px 16px;width:100%" onclick="Profile._editHabit('${h.id}')">Edit Habit Config</button>
      </div>`;
    }).join('');

    screen.innerHTML = `
      <div class="profile-header">
        <div class="t-display">${user.name ? user.name : 'Your Recovery'}</div>
        <div class="t-caption" style="margin-top:4px">${habits.length} habit${habits.length!==1?'s':''} tracked</div>
      </div>

      <div class="stat-grid">
        <div class="stat-cell">
          <div class="stat-val" style="color:var(--orange)">${totalDays}</div>
          <div class="stat-label">Total Days</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val" style="color:var(--green)">${sym}${totalSaved.toFixed(0)}</div>
          <div class="stat-label">Total Saved</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val" style="color:var(--teal)">${cravingsSurvived}</div>
          <div class="stat-label">Cravings Survived</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val" style="color:var(--gold)">${longest}</div>
          <div class="stat-label">Longest Streak</div>
        </div>
      </div>

      <div class="section-header"><span class="section-title">Your Habits</span></div>
      <div style="padding:0 20px">${habitsHtml}</div>

      <div class="section-header"><span class="section-title">Add Habit</span></div>
      <div style="padding:0 20px 12px">
        <button class="btn btn-ghost" style="width:100%;text-align:center" onclick="Profile._addHabit()">+ Add another habit</button>
      </div>

      <div class="section-header"><span class="section-title">Settings</span></div>
      <div style="padding:0 20px">
        <div class="card" style="margin-bottom:10px">
          <div class="ob-field">
            <div class="ob-label">Name</div>
            <input class="ob-input" type="text" id="p-name" placeholder="Your name" value="${user.name||''}" oninput="Profile._saveName(this.value)">
          </div>
          <div class="ob-field">
            <div class="ob-label">Currency</div>
            <select class="ob-select" id="p-currency" onchange="Profile._saveCurrency(this.value)">
              ${['USD','GBP','AED','PKR','EUR'].map(c=>`<option value="${c}" ${currency===c?'selected':''}>${c}</option>`).join('')}
            </select>
          </div>
          <div class="ob-field" style="margin-bottom:0;display:flex;align-items:center;justify-content:space-between">
            <div class="ob-label" style="margin-bottom:0">Spiritual Mode</div>
            <div onclick="Profile._toggleSpiritual()" style="width:44px;height:26px;background:${spiritualMode ? 'var(--orange)' : 'var(--bg2)'};border-radius:13px;border:1px solid var(--border);position:relative;cursor:pointer;transition:background 0.2s;flex-shrink:0">
              <div style="position:absolute;top:3px;${spiritualMode ? 'right:3px' : 'left:3px'};width:18px;height:18px;border-radius:50%;background:white;transition:all 0.2s;"></div>
            </div>
          </div>
        </div>
      </div>

      ${spiritualMode ? `
      <div class="section-header"><span class="section-title">Prayer Anchors</span></div>
      <div style="padding:0 20px">
        <div style="padding:16px;background:var(--glass);border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px">
          <div class="t-caption t-dim" style="margin-bottom:12px">Use your prayer times as recovery check-ins</div>
          ${[
            { name: 'Fajr', time: 'Morning', note: 'Set your intention for the day. Declare your commitment.' },
            { name: 'Dhuhr', time: 'Midday', note: 'Midday check-in. How are cravings so far?' },
            { name: 'Asr', time: 'Afternoon', note: 'Afternoon reset. High-risk window for many.' },
            { name: 'Maghrib', time: 'Evening', note: 'Evening review. Reflect on your wins today.' },
            { name: 'Isha', time: 'Night', note: 'Night protection. Highest risk window. Guard this time.' },
          ].map((p, i, arr) => `
            <div style="display:flex;gap:12px;align-items:flex-start;padding:10px 0;${i < arr.length-1 ? 'border-bottom:1px solid var(--border)' : ''}">
              <div style="min-width:62px">
                <div style="font-size:0.85rem;font-weight:700;color:var(--text)">${p.name}</div>
                <div style="font-size:0.7rem;color:var(--text3)">${p.time}</div>
              </div>
              <div style="font-size:0.8rem;color:var(--text2);line-height:1.4">${p.note}</div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <div class="section-header"><span class="section-title">Hair Recovery Tracking</span></div>
      <div style="padding:0 20px">
        <div class="t-caption t-dim" style="margin-bottom:12px">Quitting habits supports hair follicle health</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
          ${[
            { id: 'none', icon: '🚫', label: 'No treatment' },
            { id: 'minoxidil', icon: '💧', label: 'Minoxidil' },
            { id: 'finasteride', icon: '💊', label: 'Finasteride / Dut.' },
            { id: 'both', icon: '💊💧', label: 'Both' },
            { id: 'natural', icon: '🌿', label: 'Natural approach' },
            { id: 'transplant', icon: '🏥', label: 'Hair transplant' },
          ].map(t => `
            <div onclick="Profile._setHairTreatment('${t.id}')" style="padding:12px 8px;background:${hairTreatment===t.id ? 'rgba(255,107,53,0.12)' : 'var(--glass)'};border:1px solid ${hairTreatment===t.id ? 'var(--orange)' : 'var(--border)'};border-radius:var(--r-sm);cursor:pointer;touch-action:manipulation;text-align:center">
              <div style="font-size:1.2rem;margin-bottom:4px">${t.icon}</div>
              <div style="font-size:0.7rem;font-weight:600;color:${hairTreatment===t.id ? 'var(--orange)' : 'var(--text2)'}">${t.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="padding:0 20px;margin-bottom:8px">
        <button class="btn btn-ghost" style="width:100%;text-align:center;margin-bottom:8px" onclick="Profile._exportData()">Export Data (JSON)</button>
        <label class="btn btn-ghost" style="width:100%;text-align:center;display:block;cursor:pointer">
          Import Data
          <input type="file" accept=".json" style="display:none" onchange="Profile._importData(event)">
        </label>
      </div>

      <div style="padding:0 20px 20px">
        <button class="btn btn-danger" onclick="Profile._reset()">Reset All Data</button>
      </div>
      <div style="height:8px"></div>

      <div id="profile-modal" style="display:none"></div>
    `;
  }

  function _saveName(val) {
    State.update(d => { d.user.name = val; });
  }

  function _saveCurrency(val) {
    State.update(d => { d.settings.currency = val; d.user.currency = val; });
  }

  function _exportData() {
    const json = State.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'disciplineos-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function _importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      if (State.importJSON(ev.target.result)) {
        App.showToast('Data imported successfully', 'success');
        render();
      } else {
        App.showToast('Import failed — invalid file', 'error');
      }
    };
    reader.readAsText(file);
  }

  function _reset() {
    if (confirm('Reset ALL data? This cannot be undone.')) {
      State.reset();
      App.showToast('Data reset', 'info');
      State.set('onboardingComplete', false);
      document.getElementById('nav').style.display = 'none';
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      if (window.Onboarding) Onboarding.render();
    }
  }

  function _editHabit(id) {
    const habits = State.get('habits') || [];
    const habit = habits.find(h => h.id === id);
    if (!habit) return;
    const hCfg = (window.HABITS_CONFIG || {})[habit.type];
    if (!hCfg) return;
    const modal = document.getElementById('profile-modal');
    if (!modal) return;
    const cfg = habit.config || {};
    modal.style.display = 'block';
    modal.innerHTML = `
      <div style="position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.8);display:flex;align-items:flex-end" onclick="if(event.target===this)Profile._closeModal()">
        <div style="background:var(--bg3);border-radius:var(--r-lg) var(--r-lg) 0 0;padding:24px 20px calc(20px + env(safe-area-inset-bottom));width:100%;max-height:80vh;overflow-y:auto">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
            <div class="t-heading">${hCfg.icon} ${hCfg.name}</div>
            <button onclick="Profile._closeModal()" style="background:none;border:none;color:var(--text3);font-size:1.2rem;cursor:pointer">✕</button>
          </div>
          <div class="ob-field">
            <div class="ob-label">Quit date</div>
            <input class="ob-input" type="datetime-local" id="edit-quit" value="${new Date(habit.quitTime).toISOString().slice(0,16)}">
          </div>
          ${hCfg.configFields.filter(f=>f.type!=='hidden').map(f=>{
            if(f.type==='select') return `<div class="ob-field"><div class="ob-label">${f.label}</div><select class="ob-select" id="edit_${f.id}" name="${f.id}">${(f.options||[]).map(o=>`<option value="${o}" ${cfg[f.id]===o?'selected':''}>${o}</option>`).join('')}</select></div>`;
            return `<div class="ob-field"><div class="ob-label">${f.label}</div><input class="ob-input" type="${f.type==='text'?'text':'number'}" id="edit_${f.id}" name="${f.id}" value="${cfg[f.id]||''}" placeholder="${f.placeholder||''}"></div>`;
          }).join('')}
          <button class="btn btn-primary" onclick="Profile._saveEdit('${id}')">Save Changes</button>
        </div>
      </div>
    `;
  }

  function _saveEdit(id) {
    const habits = State.get('habits') || [];
    const habit = habits.find(h => h.id === id);
    if (!habit) return;
    const hCfg = (window.HABITS_CONFIG || {})[habit.type];
    const quitEl = document.getElementById('edit-quit');
    const newQuit = quitEl ? new Date(quitEl.value).toISOString() : habit.quitTime;
    const newCfg = {};
    if (hCfg) {
      hCfg.configFields.forEach(f => {
        const el = document.getElementById('edit_' + f.id);
        if (el) newCfg[f.id] = el.type === 'number' ? parseFloat(el.value) || 0 : el.value;
      });
    }
    State.updateHabit(id, { quitTime: newQuit, config: newCfg });
    _closeModal();
    App.showToast('Habit updated', 'success');
    render();
  }

  function _closeModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) modal.style.display = 'none';
  }

  function _addHabit() {
    const habits = window.HABITS_CONFIG || {};
    const existing = (State.get('habits') || []).map(h => h.type);
    const available = Object.entries(habits).filter(([k]) => !existing.includes(k));
    if (!available.length) { App.showToast('All habits already tracked', 'info'); return; }
    const modal = document.getElementById('profile-modal');
    if (!modal) return;
    modal.style.display = 'block';
    modal.innerHTML = `
      <div style="position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.8);display:flex;align-items:flex-end" onclick="if(event.target===this)Profile._closeModal()">
        <div style="background:var(--bg3);border-radius:var(--r-lg) var(--r-lg) 0 0;padding:24px 20px calc(20px + env(safe-area-inset-bottom));width:100%;max-height:70vh;overflow-y:auto">
          <div class="t-heading" style="margin-bottom:16px">Add a Habit</div>
          <div class="habit-grid">
            ${available.map(([k,h])=>`
              <div class="habit-chip" onclick="Profile._startAddHabit('${k}')">
                <span class="habit-chip-icon">${h.icon}</span>
                <span class="habit-chip-name">${h.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function _startAddHabit(type) {
    _closeModal();
    State.addHabit({ type, quitTime: new Date().toISOString(), config: {} });
    App.showToast('Habit added', 'success');
    render();
  }

  function _toggleSpiritual() {
    const user = State.get('user') || {};
    State.set('user', { ...user, spiritualMode: !user.spiritualMode });
    render();
  }

  function _setHairTreatment(val) {
    const user = State.get('user') || {};
    State.set('user', { ...user, hairTreatment: val });
    render();
  }

  return { render, _saveName, _saveCurrency, _exportData, _importData, _reset, _editHabit, _saveEdit, _closeModal, _addHabit, _startAddHabit, _toggleSpiritual, _setHairTreatment };
})();
window.Profile = Profile;
