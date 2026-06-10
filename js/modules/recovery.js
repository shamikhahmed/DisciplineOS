'use strict';
const Recovery = (() => {
  let currentHabitId = null;

  function habitType(habit) {
    return habit.isCustom ? 'custom' : habit.type;
  }

  function render(habitId) {
    const screen = document.getElementById('screen-recovery');
    if (!screen) return;
    const habits = State.getAllHabits();

    if (!habits.length) {
      screen.innerHTML = `<div style="padding:40px 20px;text-align:center;color:var(--text3)">No habits tracked yet.<br><br>
        <button class="btn btn-primary" onclick="Navigation.go('dashboard')" style="max-width:200px;margin:0 auto">Go Home</button></div>`;
      return;
    }

    currentHabitId = habitId || (habits[0] && habits[0].id);
    const habit = habits.find(h => h.id === currentHabitId) || habits[0];
    if (!habit) return;

    const hCfg = State.habitConfig(habit.type, habit.isCustom, habit);
    const type = habitType(habit);
    const hrs = RecoveryEngine.hoursClean(habit.quitTime);
    const days = RecoveryEngine.daysClean(habit.quitTime);
    const phase = RecoveryEngine.recoveryPhase(hrs);
    const dopStage = DopamineEngine.getStage(type, hrs);
    const dopProg = DopamineEngine.progressInStage(type, hrs);
    const timeline = (window.RECOVERY_TIMELINES || {})[type] || [];
    const systems = BodyEngine.getBodySystems(type, hrs);
    const relapses = (habit.relapses || []).length;
    const integrityPct = relapses === 0 ? 100 : Math.max(0, Math.round(100 - (relapses / (days + 1)) * 100 * 7));
    const currentM = RecoveryEngine.currentMilestone(type, habit.quitTime);
    const cravingLog = State.get('cravingLog') || [];
    let triggerHtml = '';
    if (window.TriggerEngine) {
      const journalEntries = (window.Journal && Journal.getEntries) ? Journal.getEntries() : [];
      const forecast = TriggerEngine.forecastCard(cravingLog, habits, habit, journalEntries);
      const { risk, withdrawalWarning, analysis } = forecast;
      const parts = [];
      if (withdrawalWarning) {
        parts.push(`<div style="padding:12px 14px;background:rgba(255,107,53,0.1);border:1px solid rgba(255,107,53,0.3);border-radius:var(--r-sm);margin-bottom:8px">
          <div style="font-size:0.7rem;font-weight:700;color:var(--orange);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">Withdrawal Alert</div>
          <div style="font-size:0.82rem;color:var(--text2);line-height:1.5">${withdrawalWarning}</div></div>`);
      }
      if (risk.level === 'high' || risk.level === 'medium') {
        parts.push(`<div style="padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid ${risk.color}40;border-radius:var(--r-sm);margin-bottom:8px">
          <div style="font-size:0.7rem;font-weight:700;color:${risk.color};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px">${risk.label}</div>
          <div style="font-size:0.82rem;color:var(--text2)">Higher-risk window based on your patterns.</div></div>`);
      }
      if (analysis && analysis.insights) {
        analysis.insights.forEach(ins => {
          parts.push(`<div style="display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
            <span>${ins.icon}</span><span style="font-size:0.82rem;color:var(--text2);line-height:1.4">${ins.message}</span></div>`);
        });
      }
      if (parts.length) {
        triggerHtml = `<div style="padding:0 20px;margin-bottom:12px"><div class="section-title" style="margin-bottom:8px">Trigger forecast</div>${parts.join('')}</div>`;
      }
    }

    const selectorHtml = habits.length > 1 ? `
      <div style="display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding:0 20px 16px">
        ${habits.map(h => {
          const hc = State.habitConfig(h.type, h.isCustom, h);
          return `<button onclick="Recovery.render('${h.id}')" style="flex-shrink:0;padding:6px 14px;border-radius:99px;border:1px solid ${h.id===currentHabitId?'var(--orange)':'var(--border)'};background:${h.id===currentHabitId?'rgba(255,107,53,0.1)':'transparent'};color:${h.id===currentHabitId?'var(--orange)':'var(--text3)'};font-size:0.78rem;font-weight:600;cursor:pointer">${hc.icon||''} ${hc.name||h.type}</button>`;
        }).join('')}
      </div>` : '';

    const hourlyCount = timeline.filter(m => m.hours <= 72).length;
    const timelineHtml = timeline.map(m => {
      const reached = hrs >= m.hours;
      const isCurrent = currentM && currentM.hours === m.hours;
      const isHourly = m.hours <= 72;
      return `<div style="display:flex;gap:14px;padding:14px 0;border-bottom:1px solid var(--border);align-items:flex-start${isHourly ? ';opacity:' + (reached ? '1' : '0.85') : ''}">
        <div style="width:32px;height:32px;border-radius:50%;border:2px solid ${reached?'var(--green)':isCurrent?'var(--orange)':'var(--border)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;background:${reached?'rgba(6,214,160,0.1)':'transparent'}">
          <span style="font-size:1rem">${reached?'✓':m.icon||'○'}</span>
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:0.88rem;font-weight:700;color:${reached?'var(--text)':isCurrent?'var(--orange)':'var(--text3)'}">${m.title}</div>
          <div style="font-size:0.75rem;color:var(--text3);margin-top:2px">${RecoveryEngine.formatDuration(m.hours)} ${reached?'— reached':''}${isHourly ? ' · hourly' : ''}</div>
          ${reached||isCurrent?`<div style="font-size:0.78rem;color:var(--text2);margin-top:6px;line-height:1.5">${m.body}</div>`:''}
          <div style="font-size:0.65rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;margin-top:4px;color:${m.level==='scientific'?'var(--green)':'var(--gold)'}">${m.level}</div>
        </div>
      </div>`;
    }).join('');

    const systemsHtml = systems.map(s => {
      const col = s.pct > 70 ? 'var(--green)' : s.pct > 40 ? 'var(--teal)' : 'var(--orange)';
      return `<div class="system-row">
        <span class="system-icon">${s.icon}</span>
        <span class="system-label">${s.label}</span>
        <div class="system-bar"><div class="system-fill" style="width:${s.pct}%;background:${col}"></div></div>
        <span class="system-pct" style="color:${col}">${s.pct}%</span>
      </div>`;
    }).join('');

    screen.innerHTML = `
      <div style="padding:calc(env(safe-area-inset-top,20px) + 16px) 20px 16px;border-bottom:1px solid var(--border)">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:2rem">${hCfg.icon||'✨'}</span>
          <div>
            <div class="t-title">${hCfg.name||habit.type}</div>
            <div class="t-caption">${days}d ${Math.floor(hrs%24)}h clean</div>
          </div>
        </div>
      </div>

      ${selectorHtml}
      ${triggerHtml}

      <div style="padding:0 20px;margin-bottom:12px">
        <div class="card" style="background:linear-gradient(135deg,${phase.color}18,transparent)">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <div style="width:8px;height:8px;border-radius:50%;background:${phase.color}"></div>
            <span style="font-size:0.78rem;font-weight:700;color:${phase.color};text-transform:uppercase;letter-spacing:0.08em">${phase.name} Phase</span>
          </div>
          <div class="t-body">${phase.description}</div>
        </div>
      </div>

      <div style="padding:0 20px;margin-bottom:12px">
        <div class="card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <span style="font-size:0.78rem;font-weight:700;color:${dopStage.color};text-transform:uppercase;letter-spacing:0.06em">Dopamine: ${dopStage.name}</span>
            <span style="font-size:0.75rem;color:var(--text3)">${dopProg}% through stage</span>
          </div>
          <div class="prog-bar" style="margin-bottom:12px"><div class="prog-fill" style="width:${dopProg}%;background:${dopStage.color}"></div></div>
          <div class="t-body" style="margin-bottom:10px">${dopStage.description}</div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px">Symptoms</div>
          ${dopStage.symptoms.map(s=>`<div style="font-size:0.78rem;color:var(--text2);margin-bottom:4px">· ${s}</div>`).join('')}
          <div style="font-size:0.75rem;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:0.06em;margin:10px 0 6px">What helps</div>
          ${dopStage.tips.map(t=>`<div style="font-size:0.78rem;color:var(--text2);margin-bottom:4px">· ${t}</div>`).join('')}
        </div>
      </div>

      <div class="section-header"><span class="section-title">Body Healing Timeline</span></div>
      <div style="padding:0 20px 8px"><div class="t-caption">${hourlyCount} hourly milestones in first 72h, then daily & weekly</div></div>
      <div style="padding:0 20px">${timelineHtml}</div>

      <div class="section-header"><span class="section-title">Body Systems</span></div>
      <div class="systems-list">${systemsHtml}</div>

      <div style="padding:0 20px;margin-top:20px">
        <div class="card-sm card" style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div class="t-label">Integrity Score</div>
            <div style="font-size:1.5rem;font-weight:800;color:${integrityPct>70?'var(--green)':integrityPct>40?'var(--gold)':'var(--red)'}">${integrityPct}%</div>
          </div>
          <div style="text-align:right">
            <div class="t-label">Relapses</div>
            <div style="font-size:1.5rem;font-weight:800;color:var(--text)">${relapses}</div>
          </div>
        </div>
      </div>

      <div style="padding:20px">
        <button class="btn btn-danger" onclick="Recovery._confirmRelapse('${habit.id}',${!!habit.isCustom})">Log Relapse</button>
      </div>
      <div style="height:8px"></div>
    `;
  }

  function _confirmRelapse(id, isCustom) {
    if (confirm('Log a relapse? This will reset your clean time for this habit.')) {
      State.logRelapse(id, isCustom);
      if (window.App) App.showToast('Relapse logged. Your streak resets now. Keep going.', 'info');
      render(id);
    }
  }

  return { render, _confirmRelapse };
})();
window.Recovery = Recovery;
