const Recovery = (() => {
  let currentHabitId = null;

  function render(params) {
    if (params && params.habitId) currentHabitId = params.habitId;
    const state = StateManager.get();
    const habits = (state.habits || []).filter(h => h.active);
    const habit = currentHabitId
      ? habits.find(h => h.id === currentHabitId)
      : habits[0];
    const el = document.getElementById('screen-recovery');
    if (!el) return;

    if (!habit) {
      el.innerHTML = '<div style="padding:40px;text-align:center;"><div class="t-body t-muted">No habit selected.</div></div>';
      return;
    }

    const hrs = RecoveryEngine.hoursClean(habit.quitTime);
    const days = RecoveryEngine.daysClean(habit.quitTime);
    const timeline = (typeof TIMELINES !== 'undefined' ? TIMELINES : {})[habit.type] || [];
    const dopStage = DopamineEngine.getStage(habit.type, hrs);
    const bodySystems = BodyEngine.getBodySystems(habit.type, hrs);
    const phase = RecoveryEngine.recoveryPhase(hrs);
    const integrity = RelapseEngine.getIntegrityScore(habit);
    const insight = RelapseEngine.getInsight(habit);

    el.innerHTML = `
    <div style="padding-bottom:20px;">
      <div style="padding:20px 20px 0;display:flex;align-items:center;gap:12px;">
        <div style="font-size:2rem;">${habit.icon}</div>
        <div>
          <div class="t-heading">${habit.name}</div>
          <div class="t-body t-muted">${days}d ${Math.floor(hrs % 24)}h clean</div>
        </div>
      </div>

      <div style="margin:16px 20px;padding:16px;background:var(--glass);border:1px solid var(--border);border-radius:var(--radius);">
        <div class="t-label t-dim" style="margin-bottom:6px;">CURRENT PHASE</div>
        <div style="font-size:1.1rem;font-weight:700;color:${phase.color};">● ${phase.name}</div>
        <p class="t-body t-muted" style="margin-top:6px;">${phase.description}</p>
      </div>

      <div style="margin:0 20px 16px;padding:16px;background:var(--glass);border:1px solid var(--border);border-radius:var(--radius);">
        <div class="t-label t-dim" style="margin-bottom:8px;">DOPAMINE STAGE</div>
        <div style="font-size:1rem;font-weight:700;color:${dopStage.color};">Stage ${dopStage.stage + 1}: ${dopStage.name}</div>
        <p class="t-caption" style="margin-top:4px;">${dopStage.description}</p>
        <div style="margin-top:10px;">
          ${dopStage.symptoms.map(s => `<div class="t-caption" style="padding:3px 0;">• ${s}</div>`).join('')}
        </div>
      </div>

      <div class="section-header"><span class="section-title">Body Recovery</span></div>
      <div style="padding:0 20px;">
        ${bodySystems.map(s => `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">
          <span style="font-size:1.3rem;width:28px;">${s.icon}</span>
          <div style="flex:1;">
            <div style="font-size:0.85rem;font-weight:600;">${s.label}</div>
            <div class="system-bar" style="margin-top:4px;">
              <div class="system-bar-fill" style="width:${s.pct}%;background:${s.color};"></div>
            </div>
          </div>
          <span style="font-size:0.8rem;font-weight:700;color:${s.color};">${s.pct}%</span>
        </div>`).join('')}
      </div>

      <div class="section-header" style="margin-top:16px;"><span class="section-title">Recovery Timeline</span></div>
      <div style="padding:0 20px;">
        ${timeline.map((m, i) => {
          const reached = hrs >= m.hours;
          return `
          <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);opacity:${reached ? 1 : 0.4};">
            <div style="display:flex;flex-direction:column;align-items:center;">
              <div style="width:28px;height:28px;border-radius:50%;background:${reached ? 'transparent' : 'var(--bg3)'};border:2px solid ${reached ? 'var(--orange)' : 'var(--border)'};display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0;">
                ${reached ? (m.icon || '✓') : '○'}
              </div>
            </div>
            <div style="flex:1;">
              <div style="font-size:0.85rem;font-weight:700;color:${reached ? 'var(--text)' : 'var(--text3)'};">${m.title}</div>
              <div class="t-caption" style="margin-top:2px;">${m.body}</div>
              <div style="margin-top:4px;font-size:0.7rem;color:var(--text3);">${RecoveryEngine.formatDuration(m.hours)} after quitting</div>
            </div>
          </div>`;
        }).join('')}
      </div>

      <div style="margin:20px;padding:16px;background:var(--glass);border:1px solid var(--border);border-radius:var(--radius);">
        <div class="t-label t-dim" style="margin-bottom:8px;">RECOVERY INTEGRITY</div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="font-size:2rem;font-weight:900;color:var(--orange);">${integrity.score}%</div>
          <div>
            <div class="t-caption">${integrity.cleanDays} clean days of ${integrity.totalDays} total</div>
            <div class="t-caption">${integrity.relapses} relapses recorded</div>
          </div>
        </div>
        ${insight ? `<div style="margin-top:10px;padding:8px;background:rgba(255,23,68,0.08);border-radius:6px;font-size:0.75rem;color:var(--text2);">⚠️ ${insight.message}</div>` : ''}
      </div>

      <div style="padding:0 20px;">
        <button class="btn btn-ghost btn-full" id="log-relapse-btn" style="border-color:var(--red);color:var(--red);">
          Log Relapse
        </button>
      </div>
    </div>`;

    document.getElementById('log-relapse-btn')?.addEventListener('click', () => {
      if (!window.confirm('Log a relapse for ' + habit.name + '? This will restart your current streak.')) return;
      StateManager.update(s => {
        const h = s.habits.find(x => x.id === habit.id);
        if (h) RelapseEngine.logRelapse(h);
      });
      App.showToast('Relapse logged. You can do this.', 'info');
      render({ habitId: currentHabitId });
    });
  }

  return { render };
})();
