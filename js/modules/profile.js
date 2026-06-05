const Profile = (() => {
  function render() {
    const state = StateManager.get();
    const user = state.user || {};
    const habits = (state.habits || []).filter((h) => h.active);
    const xp = state.missions?.xp || 0;
    const level = MissionEngine.xpToLevel(xp);
    const rank = MissionEngine.getRank(level);
    const lvlProgress = MissionEngine.levelProgress(xp);
    const missionStreak = MissionEngine.getMissionStreak(state);
    const currency = state.settings?.currency || 'USD';
    const totalDays = habits.reduce((sum, h) => sum + RecoveryEngine.daysClean(h.quitTime), 0);
    const totalRelapses = habits.reduce((sum, h) => sum + (h.relapses || []).length, 0);

    const el = document.getElementById('screen-profile');
    if (!el) return;

    el.innerHTML = `
    <div>
      <!-- Profile Header -->
      <div class="profile-header">
        <div class="avatar-wrap">${user.name ? user.name.charAt(0).toUpperCase() : '⚡'}</div>
        <div class="t-title">${user.name || 'Recovery Warrior'}</div>
        ${user.age || user.country ? `<div class="t-caption" style="margin-top:4px;">${[user.age ? `Age ${user.age}` : '', user.country].filter(Boolean).join(' · ')}</div>` : ''}
        <div class="rank-badge">${rank.icon} ${rank.name}</div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-cell">
          <div class="sv t-orange">${level}</div>
          <div class="sl">Level</div>
        </div>
        <div class="stat-cell">
          <div class="sv t-blue">${xp.toLocaleString()}</div>
          <div class="sl">Total XP</div>
        </div>
        <div class="stat-cell">
          <div class="sv t-green">${missionStreak}</div>
          <div class="sl">Day Streak</div>
        </div>
        <div class="stat-cell">
          <div class="sv">${totalDays}</div>
          <div class="sl">Clean Days</div>
        </div>
        <div class="stat-cell">
          <div class="sv">${habits.length}</div>
          <div class="sl">Habits</div>
        </div>
        <div class="stat-cell">
          <div class="sv" style="color:${totalRelapses === 0 ? 'var(--green)' : 'var(--gold)'};">${totalRelapses}</div>
          <div class="sl">Relapses</div>
        </div>
      </div>

      <!-- XP Progress Bar -->
      <div class="xp-bar-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="t-label t-dim">XP TO LEVEL ${level + 1}</span>
          <span class="t-caption">${lvlProgress.current} / ${lvlProgress.needed}</span>
        </div>
        <div class="xp-bar-bg">
          <div class="xp-bar-fill" style="width:${lvlProgress.pct}%;"></div>
        </div>
      </div>

      <!-- Per-Habit Stats -->
      ${habits.length > 0 ? `
      <div class="section-header">
        <span class="section-title">Habit Stats</span>
      </div>
      <div style="padding:0 20px 20px;display:flex;flex-direction:column;gap:10px;">
        ${habits.map((h) => buildHabitStat(h, currency)).join('')}
      </div>` : ''}

      <!-- Recovery Goals -->
      ${user.goals?.length ? `
      <div class="section-header">
        <span class="section-title">Your Goals</span>
      </div>
      <div style="padding:0 20px 20px;display:flex;flex-wrap:wrap;gap:8px;">
        ${user.goals.map((g) => `<div class="badge badge-orange">${g.replace(/_/g,' ')}</div>`).join('')}
      </div>` : ''}

      <!-- Settings -->
      <div class="section-header">
        <span class="section-title">Settings</span>
      </div>
      <div class="settings-section">
        <div class="settings-item">
          <div>
            <div class="si-label">Currency</div>
            <div class="si-desc">Used for financial tracking</div>
          </div>
          <select id="currency-select" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:6px 10px;border-radius:8px;font-size:0.8rem;">
            <option value="USD" ${currency === 'USD' ? 'selected' : ''}>USD</option>
            <option value="GBP" ${currency === 'GBP' ? 'selected' : ''}>GBP</option>
            <option value="EUR" ${currency === 'EUR' ? 'selected' : ''}>EUR</option>
            <option value="AED" ${currency === 'AED' ? 'selected' : ''}>AED</option>
            <option value="PKR" ${currency === 'PKR' ? 'selected' : ''}>PKR</option>
          </select>
        </div>
        <div class="settings-item">
          <div>
            <div class="si-label">Notifications</div>
            <div class="si-desc">Daily check-in reminders</div>
          </div>
          <div class="toggle${state.settings?.notifications ? ' on' : ''}" id="notif-toggle"></div>
        </div>
      </div>

      <!-- Data Actions -->
      <div class="section-header">
        <span class="section-title">Data</span>
      </div>
      <div class="settings-section">
        <div class="settings-item">
          <div>
            <div class="si-label">Export Backup</div>
            <div class="si-desc">Download your data as JSON</div>
          </div>
          <button class="btn btn-ghost btn-sm" id="export-btn">Export</button>
        </div>
        <div class="settings-item">
          <div>
            <div class="si-label">Import Backup</div>
            <div class="si-desc">Restore from a backup file</div>
          </div>
          <button class="btn btn-ghost btn-sm" id="import-btn">Import</button>
          <input type="file" id="import-file" accept=".json" style="display:none;">
        </div>
        <div class="settings-item" style="border-bottom:none;">
          <div>
            <div class="si-label" style="color:var(--red);">Reset Vault</div>
            <div class="si-desc">Delete all data. Cannot be undone.</div>
          </div>
          <button class="btn btn-danger btn-sm" id="reset-btn">Reset</button>
        </div>
      </div>

      <!-- App Info -->
      <div style="padding:20px;text-align:center;">
        <div class="t-caption">DisciplineOS v1.0</div>
        <div class="t-caption" style="margin-top:4px;">All data stored locally. No accounts. No servers.</div>
      </div>
    </div>`;

    attachHandlers();
  }

  function buildHabitStat(habit, currency) {
    const days = RecoveryEngine.daysClean(habit.quitTime);
    const longest = RelapseEngine.getLongestStreak(habit);
    const integrity = RelapseEngine.getIntegrityScore(habit);
    let savings = '';
    if (habit.config?.costPerDay > 0) {
      const fin = FinanceEngine.calculate(habit.config, habit.quitTime);
      savings = `<div class="badge badge-green" style="margin-top:6px;">Saved ${fin.fmt(fin.savedTotal)}</div>`;
    }

    return `
    <div class="card-elevated" style="padding:14px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
        <span style="font-size:1.3rem;">${habit.icon || '⭕'}</span>
        <span style="font-size:0.9rem;font-weight:600;">${habit.name}</span>
        <span style="margin-left:auto;" class="badge ${integrity.score >= 70 ? 'badge-green' : 'badge-gold'}">${integrity.score}% Integrity</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;text-align:center;">
        <div style="padding:8px;background:var(--glass);border-radius:8px;">
          <div style="font-size:1.1rem;font-weight:700;color:var(--orange);">${days}</div>
          <div class="t-caption">Current</div>
        </div>
        <div style="padding:8px;background:var(--glass);border-radius:8px;">
          <div style="font-size:1.1rem;font-weight:700;color:var(--blue);">${longest}</div>
          <div class="t-caption">Best</div>
        </div>
        <div style="padding:8px;background:var(--glass);border-radius:8px;">
          <div style="font-size:1.1rem;font-weight:700;color:${integrity.relapses === 0 ? 'var(--green)' : 'var(--gold)'};">${integrity.relapses}</div>
          <div class="t-caption">Relapses</div>
        </div>
      </div>
      ${savings}
      ${habit.type === 'vape' && habit.config?.nicStrength ? `
      <div style="margin-top:8px;font-size:0.75rem;color:var(--text2);">
        ${[habit.config.deviceType, habit.config.deviceBrand].filter(Boolean).join(' ')}${habit.config.deviceType||habit.config.deviceBrand?' · ':''}${habit.config.nicStrength}mg ${habit.config.nicType||''}${habit.config.dailyPuffs ? ' · ' + habit.config.dailyPuffs + ' puffs/day' : ''}
      </div>` : ''}
      <button class="btn btn-ghost btn-sm" style="margin-top:10px;color:var(--red);" data-habit-id="${habit.id}" data-habit-name="${habit.name}" id="relapse-btn-${habit.id}">
        Log Relapse
      </button>
    </div>`;
  }

  function attachHandlers() {
    document.getElementById('currency-select')?.addEventListener('change', (e) => {
      StateManager.update((s) => { s.settings.currency = e.target.value; });
      App.showToast('Currency updated', 'success');
    });

    document.getElementById('notif-toggle')?.addEventListener('click', (e) => {
      const current = StateManager.get('settings')?.notifications;
      StateManager.update((s) => { s.settings.notifications = !current; });
      e.target.classList.toggle('on', !current);
    });

    document.getElementById('export-btn')?.addEventListener('click', () => {
      const data = StateManager.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `disciplineos-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      App.showToast('Backup exported', 'success');
    });

    document.getElementById('import-btn')?.addEventListener('click', () => {
      document.getElementById('import-file')?.click();
    });

    document.getElementById('import-file')?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const success = StateManager.importData(ev.target.result);
        if (success) {
          App.showToast('Data imported successfully', 'success');
          setTimeout(() => render(), 300);
        } else {
          App.showToast('Invalid backup file', 'error');
        }
      };
      reader.readAsText(file);
    });

    document.getElementById('reset-btn')?.addEventListener('click', () => {
      const modal = document.getElementById('modal-overlay');
      if (modal) {
        modal.innerHTML = `
        <div class="modal-sheet">
          <div class="modal-handle"></div>
          <h3 class="t-heading" style="margin-bottom:8px;color:var(--red);">Reset All Data?</h3>
          <p class="t-body t-muted" style="margin-bottom:24px;">This will permanently delete all your recovery data, habits, and progress. This cannot be undone.</p>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-ghost" style="flex:1" id="cancel-reset">Cancel</button>
            <button class="btn btn-danger" style="flex:1" id="confirm-reset">Yes, Reset</button>
          </div>
        </div>`;
        modal.classList.add('open');

        document.getElementById('cancel-reset')?.addEventListener('click', () => modal.classList.remove('open'));
        document.getElementById('confirm-reset')?.addEventListener('click', () => {
          StateManager.reset();
          modal.classList.remove('open');
          window.location.reload();
        });
      }
    });

    document.querySelectorAll('[id^="relapse-btn-"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const habitId = btn.dataset.habitId;
        const habitName = btn.dataset.habitName;
        showRelapseModal(habitId, habitName);
      });
    });
  }

  function showRelapseModal(habitId, habitName) {
    const modal = document.getElementById('modal-overlay');
    if (!modal) return;
    modal.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-handle"></div>
      <h3 class="t-heading" style="margin-bottom:4px;">Log Relapse</h3>
      <p class="t-body t-muted" style="margin-bottom:16px;">${habitName} — Your streak resets but your recovery continues.</p>
      <div class="field">
        <label>Note (optional)</label>
        <input type="text" id="relapse-note" placeholder="What triggered it?">
      </div>
      <div style="display:flex;gap:10px;margin-top:8px;">
        <button class="btn btn-ghost" style="flex:1" id="cancel-relapse">Cancel</button>
        <button class="btn btn-danger" style="flex:1" id="confirm-relapse">Log It</button>
      </div>
    </div>`;
    modal.classList.add('open');

    document.getElementById('cancel-relapse')?.addEventListener('click', () => modal.classList.remove('open'));
    document.getElementById('confirm-relapse')?.addEventListener('click', () => {
      const note = document.getElementById('relapse-note')?.value || '';
      StateManager.update((s) => {
        const habit = s.habits.find((h) => h.id === habitId);
        if (habit) RelapseEngine.logRelapse(habit, note);
      });
      modal.classList.remove('open');
      App.showToast('Relapse logged. Streak reset. Keep going.', 'info');
      render();
    });
  }

  return { render };
})();
