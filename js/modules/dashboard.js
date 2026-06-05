'use strict';
const Dashboard = (() => {
  function render() {
    const screen = document.getElementById('screen-dashboard');
    if (!screen) return;
    const habits = State.get('habits') || [];
    const settings = State.get('settings') || {};
    const currency = settings.currency || 'USD';
    const score = RecoveryEngine.recoveryScore(habits);
    const primaryHabit = habits[0] || null;

    const scoreColor = score < 40 ? 'var(--orange)' : score < 70 ? 'var(--teal)' : 'var(--green)';
    const scoreSize = 180;
    const scoreR = (scoreSize - 14) / 2;
    const scoreCirc = 2 * Math.PI * scoreR;
    const scoreOffset = scoreCirc - (score / 100) * scoreCirc;

    const phase = primaryHabit ? RecoveryEngine.recoveryPhase(RecoveryEngine.hoursClean(primaryHabit.quitTime)) : null;
    const days = primaryHabit ? RecoveryEngine.daysClean(primaryHabit.quitTime) : 0;
    const hours = primaryHabit ? Math.floor(RecoveryEngine.hoursClean(primaryHabit.quitTime) % 24) : 0;

    const rings4 = buildRings4(habits, currency);
    const feed = buildFeed(habits);
    const habitCards = buildHabitCards(habits);
    const bodySystems = buildBodySystems(primaryHabit);
    const moneySaved = buildMoney(habits, currency);
    const insight = RecoveryEngine.todayInsight();

    const cravingLog = State.get('cravingLog') || [];

    screen.innerHTML = `
      <div class="score-ring-wrap">
        <div class="ring-wrap" style="width:${scoreSize}px;height:${scoreSize}px">
          <svg width="${scoreSize}" height="${scoreSize}" viewBox="0 0 ${scoreSize} ${scoreSize}" style="transform:rotate(-90deg)">
            <circle class="ring-track" cx="${scoreSize/2}" cy="${scoreSize/2}" r="${scoreR}" stroke-width="14"/>
            <circle class="ring-fill" cx="${scoreSize/2}" cy="${scoreSize/2}" r="${scoreR}" stroke="${scoreColor}" stroke-width="14"
              stroke-dasharray="${scoreCirc}" stroke-dashoffset="${scoreCirc}"
              data-offset="${scoreOffset}"/>
          </svg>
          <div class="ring-center">
            <div class="score-val">${score}</div>
            <div class="score-label">RECOVERY</div>
          </div>
        </div>
      </div>

      <div class="status-card">
        ${phase ? `<div class="phase-pill">${phase.name}</div>` : ''}
        <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:6px">
          <span class="day-num">${days}</span><span class="day-unit">days</span>
          <span class="day-unit" style="font-size:0.9rem;color:var(--text3)">${hours}h</span>
        </div>
        ${phase ? `<div class="t-caption">${phase.description}</div>` : '<div class="t-caption t-dim">Start tracking to see your recovery phase.</div>'}
      </div>

      ${rings4}

      ${feed}

      ${habitCards}

      ${bodySystems}

      <div class="craving-btn card-press" onclick="Navigation.go('emergency')">
        <div style="font-size:1.1rem;font-weight:700;color:var(--teal)">I have a craving right now</div>
        <div style="font-size:0.8rem;color:var(--text2);margin-top:4px">Tap to start the SOS protocol</div>
      </div>

      ${moneySaved}

      ${insight ? `
        <div class="insight-card" style="margin:0 20px 20px">
          <div class="insight-emoji">${insight.emoji}</div>
          <div>
            <div class="insight-text">${insight.text}</div>
            <div style="font-size:0.65rem;color:var(--text3);margin-top:6px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em">— ${insight.source}</div>
          </div>
        </div>
      ` : ''}
      <div style="height:16px"></div>
    `;

    setTimeout(() => Charts.animateRings(), 60);
  }

  function buildRings4(habits, currency) {
    if (!habits.length) return '';
    const primary = habits[0];
    const h = RecoveryEngine.hoursClean(primary.quitTime);
    const physical = BodyEngine.overallBodyScore(primary.type, h);
    const mental = DopamineEngine.progressInStage(primary.type, h);
    const timeScore = Math.min(100, Math.round((h / (8760)) * 100));
    let financial = 0;
    const fin = FinanceEngine.calculate(primary, currency);
    if (fin.hasCost && fin.annualProjection > 0) {
      financial = Math.min(100, Math.round((fin.savedTotal / (fin.annualProjection)) * 100 * 3));
    }

    const items = [
      { label: 'Physical', val: physical, color: 'var(--green)' },
      { label: 'Mental', val: mental, color: 'var(--purple)' },
      { label: 'Financial', val: financial, color: 'var(--gold)' },
      { label: 'Time', val: timeScore, color: 'var(--teal)' },
    ];

    const rSize = 52;
    const rR = (rSize - 6) / 2;
    const rCirc = 2 * Math.PI * rR;

    return `<div class="rings-row">
      ${items.map(item => {
        const offset = rCirc - (item.val / 100) * rCirc;
        return `<div class="ring-cell">
          <div class="ring-wrap" style="width:${rSize}px;height:${rSize}px">
            <svg width="${rSize}" height="${rSize}" viewBox="0 0 ${rSize} ${rSize}" style="transform:rotate(-90deg)">
              <circle class="ring-track" cx="${rSize/2}" cy="${rSize/2}" r="${rR}" stroke-width="5"/>
              <circle class="ring-fill" cx="${rSize/2}" cy="${rSize/2}" r="${rR}" stroke="${item.color}" stroke-width="5"
                stroke-dasharray="${rCirc}" stroke-dashoffset="${rCirc}" data-offset="${offset}"/>
            </svg>
            <div class="ring-center"><span class="ring-cell-val" style="color:${item.color}">${item.val}%</span></div>
          </div>
          <span class="ring-cell-name">${item.label}</span>
        </div>`;
      }).join('')}
    </div>`;
  }

  function buildFeed(habits) {
    if (!habits.length) return '';
    const cards = habits.map(h => {
      const curr = RecoveryEngine.currentMilestone(h.type, h.quitTime);
      const next = RecoveryEngine.nextMilestone(h.type, h.quitTime);
      const hCfg = (window.HABITS_CONFIG || {})[h.type] || {};
      if (!curr) return '';
      return `<div class="feed-card">
        <div class="feed-icon">${curr.icon || hCfg.icon || '✨'}</div>
        <div class="feed-milestone">${curr.title}</div>
        <div class="feed-body">${curr.body.substring(0, 90)}…</div>
        ${next ? `<div class="feed-level ${curr.level || ''}" style="margin-top:auto;font-size:0.65rem;font-weight:600;color:${curr.level==='scientific'?'var(--green)':'var(--gold)'};text-transform:uppercase;letter-spacing:0.06em">Next: ${next.title} in ${RecoveryEngine.timeUntilNext(h.type, h.quitTime)}</div>` : `<div style="font-size:0.65rem;color:var(--green);font-weight:700;margin-top:auto">COMPLETE ✓</div>`}
      </div>`;
    }).join('');

    return `<div>
      <div class="section-header"><span class="section-title">Live Recovery Feed</span></div>
      <div class="feed-scroll">${cards}</div>
    </div>`;
  }

  function buildHabitCards(habits) {
    if (!habits.length) {
      return `<div style="padding:0 20px;text-align:center;color:var(--text3);font-size:0.85rem;margin:20px 0">No habits tracked yet.</div>`;
    }
    const rSize = 44;
    const rR = (rSize - 5) / 2;
    const rCirc = 2 * Math.PI * rR;
    const cards = habits.map(h => {
      const hCfg = (window.HABITS_CONFIG || {})[h.type] || {};
      const days = RecoveryEngine.daysClean(h.quitTime);
      const hrs = RecoveryEngine.hoursClean(h.quitTime);
      const next = RecoveryEngine.nextMilestone(h.type, h.quitTime);
      const prog = RecoveryEngine.progressToNext(h.type, h.quitTime);
      const score = BodyEngine.overallBodyScore(h.type, hrs);
      const offset = rCirc - (score / 100) * rCirc;
      const timeUntil = next ? `Next: ${next.title} in ${RecoveryEngine.timeUntilNext(h.type, h.quitTime)}` : 'All milestones reached';
      return `<div class="habit-card card-press" onclick="Navigation.go('recovery',{habitId:'${h.id}'})">
        <div style="position:relative;width:${rSize}px;height:${rSize}px;flex-shrink:0">
          <svg width="${rSize}" height="${rSize}" viewBox="0 0 ${rSize} ${rSize}" style="transform:rotate(-90deg)">
            <circle class="ring-track" cx="${rSize/2}" cy="${rSize/2}" r="${rR}" stroke-width="4.5"/>
            <circle class="ring-fill" cx="${rSize/2}" cy="${rSize/2}" r="${rR}" stroke="${hCfg.color||'var(--orange)'}" stroke-width="4.5"
              stroke-dasharray="${rCirc}" stroke-dashoffset="${rCirc}" data-offset="${offset}"/>
          </svg>
          <div class="ring-center"><span style="font-size:0.6rem;font-weight:700;color:${hCfg.color||'var(--orange)'}">${score}%</span></div>
        </div>
        <div class="habit-info">
          <div class="habit-name">${hCfg.icon||''} ${hCfg.name||h.type}</div>
          <div class="habit-days">${days}d ${Math.floor(hrs%24)}h clean</div>
          <div class="habit-next">${timeUntil}</div>
          <div class="prog-bar"><div class="prog-fill" style="width:${prog}%;background:${hCfg.color||'var(--orange)'}"></div></div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`;
    }).join('');
    return `<div>
      <div class="section-header"><span class="section-title">Your Habits</span></div>
      <div class="habit-cards">${cards}</div>
    </div>`;
  }

  function buildBodySystems(habit) {
    if (!habit) return '';
    const hrs = RecoveryEngine.hoursClean(habit.quitTime);
    const systems = BodyEngine.getBodySystems(habit.type, hrs);
    if (!systems.length) return '';
    const rows = systems.map(s => {
      const barColor = s.pct > 70 ? 'var(--green)' : s.pct > 40 ? 'var(--teal)' : 'var(--orange)';
      return `<div class="system-row">
        <span class="system-icon">${s.icon}</span>
        <span class="system-label">${s.label}</span>
        <div class="system-bar"><div class="system-fill" style="width:0%;background:${barColor}" data-width="${s.pct}%"></div></div>
        <span class="system-pct" style="color:${barColor}">${s.pct}%</span>
      </div>`;
    }).join('');
    return `<div>
      <div class="section-header"><span class="section-title">Body Recovery</span></div>
      <div class="systems-list">${rows}</div>
    </div>`;
  }

  function buildMoney(habits, currency) {
    const habitsWithCost = habits.filter(h => {
      const cfg = window.HABITS_CONFIG && window.HABITS_CONFIG[h.type];
      return cfg && cfg.computeCostPerDay(h.config || {}) > 0;
    });
    if (!habitsWithCost.length) return '';
    const total = FinanceEngine.totalSaved(habitsWithCost, currency);
    if (total < 0.01) return '';
    const sym = FinanceEngine.CURRENCY_SYMBOLS[currency] || '$';
    return `<div class="money-card" style="margin:0 20px 16px">
      <div class="t-label" style="margin-bottom:6px">Money Saved</div>
      <div class="money-amount">${sym}${total.toFixed(2)}</div>
      <div class="t-caption" style="margin-top:4px">Since you quit</div>
    </div>`;
  }

  return { render };
})();
window.Dashboard = Dashboard;
