const Analytics = (() => {
  function render() {
    const state = StateManager.get();
    const habits = (state.habits || []).filter((h) => h.active);
    const el = document.getElementById('screen-analytics');
    if (!el) return;

    const currency = state.settings?.currency || 'USD';
    const finData = buildFinanceData(habits, currency);
    const scoreHistory = buildScoreHistory(habits);
    const cravingData = buildCravingData(state);
    const timeData = buildTimeData(habits);

    el.innerHTML = `
    <div>
      <div class="analytics-header">
        <div class="t-label t-dim">INSIGHTS</div>
        <h2 class="t-title" style="margin-top:4px;">Recovery Analytics</h2>
        <p class="t-body t-muted" style="margin-top:4px;">All data stored locally on your device</p>
      </div>

      <!-- Recovery Score History -->
      <div class="chart-card">
        <div class="chart-title">Recovery Score — Last 30 Days</div>
        <div class="chart-wrap" id="chart-score"></div>
      </div>

      <!-- Money Saved -->
      ${finData ? `
      <div class="money-grid">
        <div class="money-cell">
          <div class="m-label">Today</div>
          <div class="m-value">${finData.fmt(finData.savedToday)}</div>
        </div>
        <div class="money-cell">
          <div class="m-label">This Week</div>
          <div class="m-value">${finData.fmt(finData.savedWeek)}</div>
        </div>
        <div class="money-cell">
          <div class="m-label">This Month</div>
          <div class="m-value">${finData.fmt(finData.savedMonth)}</div>
        </div>
        <div class="money-cell">
          <div class="m-label">Total Saved</div>
          <div class="m-value">${finData.fmt(finData.savedTotal)}</div>
        </div>
      </div>
      <div class="chart-card" style="margin-top:0;">
        <div class="chart-title">Money Saved — Cumulative (${currency})</div>
        <div class="chart-wrap" id="chart-money"></div>
        ${finData.equivalents.length > 0 ? `
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);">
          <div class="t-label t-dim" style="margin-bottom:8px;">THAT'S EQUIVALENT TO</div>
          ${finData.equivalents.map((e) => `
          <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:0.82rem;">
            <span class="t-muted">${e.label}</span>
            <span style="color:var(--green);font-weight:700;">${e.count}×</span>
          </div>`).join('')}
        </div>` : ''}
      </div>` : ''}

      <!-- Craving Log -->
      <div class="chart-card">
        <div class="chart-title">Craving Log — Last 7 Days</div>
        <div class="chart-wrap" id="chart-cravings"></div>
      </div>

      <!-- Time Reclaimed -->
      <div class="chart-card">
        <div class="chart-title">Time Reclaimed (hours)</div>
        <div class="chart-wrap" id="chart-time"></div>
      </div>

      <!-- Body Systems -->
      ${habits.length > 0 ? `
      <div class="chart-card">
        <div class="chart-title">Body Systems Recovery</div>
        <div id="chart-body-systems"></div>
      </div>` : ''}

      <!-- Habit Breakdown -->
      ${habits.length > 1 ? `
      <div class="chart-card">
        <div class="chart-title">Habit Breakdown</div>
        <div style="display:flex;justify-content:center;" id="chart-donut"></div>
      </div>` : ''}

      <!-- Per-Habit Stats -->
      ${habits.length > 0 ? `
      <div class="chart-card">
        <div class="chart-title">Per-Habit Stats</div>
        ${habits.map((h) => buildHabitStat(h, currency)).join('')}
      </div>` : ''}

      <div style="height:20px;"></div>
    </div>`;

    renderCharts(scoreHistory, finData, cravingData, timeData, habits);
  }

  function buildHabitStat(habit, currency) {
    const hrs = RecoveryEngine.hoursClean(habit.quitTime);
    const days = RecoveryEngine.daysClean(habit.quitTime);
    const integrity = RelapseEngine.getIntegrityScore(habit);
    const longest = RelapseEngine.getLongestStreak(habit);
    const insight = RelapseEngine.getInsight(habit);

    let finStr = '';
    if (habit.config?.costPerDay > 0) {
      const fin = FinanceEngine.calculate(habit.config, habit.quitTime);
      finStr = `<div style="font-size:0.75rem;color:var(--green);margin-top:4px;">Saved: ${fin.fmt(fin.savedTotal)}</div>`;
    }

    return `
    <div style="padding:12px 0;border-bottom:1px solid var(--border);">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="font-size:1.3rem;">${habit.icon || '⭕'}</span>
        <span style="font-size:0.9rem;font-weight:600;">${habit.name}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
        <div style="text-align:center;padding:8px;background:var(--glass);border-radius:8px;">
          <div style="font-size:1.2rem;font-weight:700;color:var(--orange)">${days}</div>
          <div class="t-caption">Current</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--glass);border-radius:8px;">
          <div style="font-size:1.2rem;font-weight:700;color:var(--blue)">${longest}</div>
          <div class="t-caption">Best Streak</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--glass);border-radius:8px;">
          <div style="font-size:1.2rem;font-weight:700;color:var(--${integrity.relapses === 0 ? 'green' : 'gold'})">${integrity.relapses}</div>
          <div class="t-caption">Relapses</div>
        </div>
      </div>
      ${finStr}
      ${insight ? `<div style="margin-top:8px;padding:8px;background:rgba(255,23,68,0.08);border:1px solid rgba(255,23,68,0.2);border-radius:8px;font-size:0.72rem;color:var(--text2);">⚠️ Pattern: ${insight.message}</div>` : ''}
    </div>`;
  }

  function buildScoreHistory(habits) {
    return Array.from({ length: 30 }, (_, i) => {
      const daysAgo = 29 - i;
      const fakeHabits = habits.map((h) => ({
        ...h,
        quitTime: new Date(new Date(h.quitTime).getTime() + daysAgo * 86400000).toISOString(),
      }));
      return Math.max(0, RecoveryEngine.recoveryScore(fakeHabits) - Math.random() * 5);
    });
  }

  function buildFinanceData(habits, currency) {
    const habitsWithCost = habits.filter((h) => (h.config?.costPerDay || 0) > 0);
    if (habitsWithCost.length === 0) return null;
    const totalCostPerDay = habitsWithCost.reduce((a, h) => a + (h.config?.costPerDay || 0), 0);
    const earliestQuit = habitsWithCost.reduce((earliest, h) =>
      new Date(h.quitTime) < new Date(earliest) ? h.quitTime : earliest, habitsWithCost[0].quitTime);
    return FinanceEngine.calculate({ costPerDay: totalCostPerDay, currency }, earliestQuit);
  }

  function buildCravingData(state) {
    const cravings = state.cravingLog || [];
    const days = 7;
    const counts = new Array(days).fill(0);
    const now = Date.now();
    for (const c of cravings) {
      const daysAgo = Math.floor((now - c.timestamp) / 86400000);
      if (daysAgo < days) counts[days - 1 - daysAgo]++;
    }
    return counts;
  }

  function buildTimeData(habits) {
    if (habits.length === 0) return new Array(30).fill(0);
    const primary = habits[0];
    const hrs = RecoveryEngine.hoursClean(primary.quitTime);
    return Array.from({ length: 30 }, (_, i) => {
      return Math.min(hrs, ((i + 1) / 30) * hrs);
    });
  }

  function renderCharts(scoreHistory, finData, cravingData, timeData, habits) {
    const scoreEl = document.getElementById('chart-score');
    if (scoreEl) scoreEl.innerHTML = Charts.lineChart(scoreHistory, { color: '#ff6b2b', height: 120, min: 0, max: 100, fill: true });

    if (finData) {
      const moneyEl = document.getElementById('chart-money');
      if (moneyEl) {
        const days = RecoveryEngine.daysClean(habits.find((h) => h.config?.costPerDay > 0)?.quitTime || new Date().toISOString());
        const moneyHistory = Array.from({ length: Math.min(30, days + 1) }, (_, i) =>
          (finData.savedTotal / Math.max(1, days)) * (i + 1)
        );
        moneyEl.innerHTML = Charts.lineChart(moneyHistory, { color: '#00e676', height: 100, fill: true });
      }
    }

    const cravingEl = document.getElementById('chart-cravings');
    if (cravingEl) cravingEl.innerHTML = Charts.barChart(cravingData, { color: '#ff6b2b', height: 100 });

    const timeEl = document.getElementById('chart-time');
    if (timeEl) timeEl.innerHTML = Charts.lineChart(timeData, { color: '#4fc3f7', height: 100, fill: true });

    if (habits.length > 0) {
      const bodyEl = document.getElementById('chart-body-systems');
      if (bodyEl) {
        const primary = habits[0];
        const hrs = RecoveryEngine.hoursClean(primary.quitTime);
        const systems = BodyEngine.getBodySystems(primary.type, hrs);
        bodyEl.innerHTML = systems.map((s) => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;">
            <span style="font-size:1.2rem;width:28px;">${s.icon}</span>
            <span style="font-size:0.8rem;width:100px;color:var(--text2);">${s.label}</span>
            <div style="flex:1;height:6px;background:var(--border);border-radius:3px;overflow:hidden;">
              <div style="height:100%;width:${s.pct}%;background:${s.color};border-radius:3px;transition:width 1s;"></div>
            </div>
            <span style="font-size:0.75rem;font-weight:700;color:${s.color};width:36px;text-align:right;">${s.pct}%</span>
          </div>`).join('');
      }
    }

    if (habits.length > 1) {
      const donutEl = document.getElementById('chart-donut');
      if (donutEl) {
        const segments = habits.map((h, i) => ({
          value: RecoveryEngine.daysClean(h.quitTime) + 1,
          color: ['#ff6b2b', '#4fc3f7', '#00e676', '#b39ddb', '#ffd700'][i % 5],
          label: h.name,
        }));
        donutEl.innerHTML = Charts.donutChart(segments, { size: 160 });
      }
    }
  }

  return { render };
})();
