const Dashboard = (() => {
  const QUOTES = [
    "Discipline is choosing between what you want now and what you want most.",
    "Every day you don't smoke is a day your body is healing itself.",
    "The chains of habit are too light to be felt until they are too heavy to be broken.",
    "You don't have to be great to start, but you have to start to be great.",
    "Strength does not come from physical capacity. It comes from indomitable will.",
    "The secret of getting ahead is getting started.",
    "One day at a time. That's all it takes.",
    "Your future self is watching you right now through your memories.",
    "The pain you feel today is the strength you feel tomorrow.",
    "Fall seven times, stand up eight.",
  ];

  function render() {
    const state = StateManager.get();
    const habits = (state.habits || []).filter((h) => h.active);
    const el = document.getElementById('screen-dashboard');
    if (!el) return;

    const score = RecoveryEngine.recoveryScore(habits);
    const primaryHabit = habits[0];
    const phase = primaryHabit
      ? RecoveryEngine.recoveryPhase(RecoveryEngine.hoursClean(primaryHabit.quitTime))
      : { name: 'Starting', color: '#ff6b2b', description: 'Begin your recovery journey.' };

    const totalDays = primaryHabit ? RecoveryEngine.daysClean(primaryHabit.quitTime) : 0;
    const totalHours = primaryHabit ? Math.floor(RecoveryEngine.hoursClean(primaryHabit.quitTime)) : 0;

    const rings = buildRingsData(habits, state);
    const quote = QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];
    const xp = state.missions?.xp || 0;
    const level = MissionEngine.xpToLevel(xp);
    const rank = MissionEngine.getRank(level);

    el.innerHTML = `
    <div style="padding-bottom:8px;">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 20px 0;">
        <div>
          <div class="t-label t-dim">RECOVERY OS</div>
          <div class="t-heading" style="margin-top:4px;">
            ${state.user?.name ? `Good ${getTimeOfDay()}, ${state.user.name}` : `Good ${getTimeOfDay()}`}
          </div>
        </div>
        <div style="text-align:right;">
          <div class="badge badge-gold">${rank.icon} ${rank.name}</div>
          <div class="t-caption" style="margin-top:4px;">Lv.${level} · ${xp} XP</div>
        </div>
      </div>

      <!-- Score Ring -->
      <div class="score-ring-wrap">
        ${Charts.ringProgress(score, 'url(#scoreGrad)', 160, 14, `
          <svg width="0" height="0"><defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff6b2b"/>
              <stop offset="100%" stop-color="#4fc3f7"/>
            </linearGradient>
          </defs></svg>
          <div class="ring-label" style="inset:0;">
            <div class="score-val">${score}</div>
            <div class="t-label t-dim">RECOVERY</div>
          </div>
        `)}
      </div>

      <!-- 4 Recovery Rings -->
      <div class="rings-row">
        ${rings.map((r) => `
          <div class="ring-cell">
            ${Charts.ringProgress(r.pct, r.color, 64, 6)}
            <div class="ring-val" style="color:${r.color}">${r.pct}%</div>
            <div class="ring-name">${r.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- Status Card -->
      <div class="status-card">
        <div class="phase-badge">● ${phase.name}</div>
        <div style="display:flex;align-items:flex-end;gap:16px;">
          <div>
            <div class="day-counter" style="color:#f0f0f0;">
              ${totalDays}<span style="font-size:1.5rem;color:#a0a0a0;">d</span>
            </div>
            <div class="day-label">
              ${totalDays === 0 ? `${totalHours}h clean` : `${totalHours % 24}h ${Math.floor((Date.now() - (primaryHabit ? new Date(primaryHabit.quitTime).getTime() : Date.now())) / 60000) % 60}m`}
            </div>
          </div>
          ${habits.length > 1 ? `
          <div style="flex:1;text-align:right;">
            <div class="t-label t-dim">${habits.length} HABITS</div>
            <div class="t-caption">all tracked</div>
          </div>` : ''}
        </div>
        <p class="phase-desc">${phase.description}</p>
      </div>

      <!-- Daily Missions -->
      ${buildMissions(state, habits)}

      <!-- Live Recovery Feed -->
      ${habits.length > 0 ? `
      <div class="section-header">
        <span class="section-title">Recovery Feed</span>
        <span class="section-action">Live</span>
      </div>
      <div class="feed-scroll">
        ${habits.map((h) => buildFeedCard(h)).join('')}
      </div>` : ''}

      <!-- Habit Cards -->
      ${habits.length > 0 ? `
      <div class="section-header" style="margin-top:8px;">
        <span class="section-title">Your Habits</span>
        <span class="section-action" id="add-habit-btn">+ Add</span>
      </div>
      <div class="habit-cards">
        ${habits.map((h) => buildHabitCard(h, state)).join('')}
      </div>` : buildEmptyState()}

      <!-- Quote -->
      <div style="margin:20px;padding:20px;background:var(--glass);border:1px solid var(--border);border-radius:var(--radius);">
        <div class="t-caption" style="margin-bottom:8px;">TODAY'S REMINDER</div>
        <p class="t-body t-muted" style="font-style:italic;line-height:1.6;">"${quote}"</p>
      </div>

      <!-- Quick Actions -->
      <div class="section-header" style="margin-top:4px;">
        <span class="section-title">Quick Actions</span>
      </div>
      <div class="quick-actions">
        <button class="quick-action qa-emergency" id="qa-sos">
          <div class="qa-icon">🚨</div>
          Emergency
        </button>
        <button class="quick-action qa-checkin" id="qa-checkin">
          <div class="qa-icon">✅</div>
          Check In
        </button>
        <button class="quick-action qa-analytics" id="qa-analytics">
          <div class="qa-icon">📊</div>
          Analytics
        </button>
      </div>
    </div>`;

    attachHandlers();
    animateRings();
  }

  function buildRingsData(habits, state) {
    const currency = state.settings?.currency || 'USD';
    if (habits.length === 0) {
      return [
        { label: 'Physical', pct: 0, color: '#ff6b2b' },
        { label: 'Mental',   pct: 0, color: '#4fc3f7' },
        { label: 'Financial',pct: 0, color: '#00e676' },
        { label: 'Time',     pct: 0, color: '#b39ddb' },
      ];
    }

    const primary = habits[0];
    const hrs = RecoveryEngine.hoursClean(primary.quitTime);

    const bodySystems = BodyEngine.getBodySystems(primary.type, hrs);
    const physicalPct = Math.round(bodySystems.reduce((a, s) => a + s.pct, 0) / bodySystems.length);

    const dStage = DopamineEngine.getStage(primary.type, hrs);
    const mentalPct = Math.round((dStage.stageIdx / (dStage.totalStages - 1)) * 100);

    let financialPct = 0;
    if (primary.config?.costPerDay > 0) {
      const fin = FinanceEngine.calculate(primary.config, primary.quitTime);
      financialPct = Math.min(100, Math.round((fin.savedTotal / (primary.config.costPerDay * 365)) * 100));
    }

    const timePct = Math.min(100, Math.round((hrs / 2160) * 100));

    return [
      { label: 'Physical', pct: physicalPct,   color: '#ff6b2b' },
      { label: 'Mental',   pct: mentalPct,     color: '#4fc3f7' },
      { label: 'Financial',pct: financialPct,  color: '#00e676' },
      { label: 'Time',     pct: timePct,       color: '#b39ddb' },
    ];
  }

  function buildMissions(state, habits) {
    if (habits.length === 0) return '';
    const today = new Date().toISOString().split('T')[0];
    const habitTypes = habits.map((h) => h.type);
    const missions = MissionEngine.getDailyMissions(habitTypes, today);
    if (missions.length === 0) return '';

    return `
    <div class="section-header">
      <span class="section-title">Daily Missions</span>
      <span class="section-action">+XP</span>
    </div>
    <div style="padding:0 20px 20px;display:flex;flex-direction:column;gap:10px;">
      ${missions.map((m) => {
        const done = MissionEngine.isMissionCompleted(m.id, state);
        return `
        <div class="card" style="padding:14px;display:flex;align-items:center;gap:12px;${done ? 'opacity:0.5;' : ''}">
          <div style="font-size:1.4rem;width:36px;text-align:center;">${m.icon}</div>
          <div style="flex:1;">
            <div style="font-size:0.88rem;font-weight:600;${done ? 'text-decoration:line-through;' : ''}">${m.title}</div>
            <div class="t-caption" style="margin-top:2px;">${m.description}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div class="badge ${done ? 'badge-green' : 'badge-orange'}">${done ? '✓' : `+${m.xp}XP`}</div>
            ${!done ? `<button class="btn btn-ghost btn-sm mission-complete-btn" data-id="${m.id}" style="margin-top:6px;">Done</button>` : ''}
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }

  function buildFeedCard(habit) {
    const hrs = RecoveryEngine.hoursClean(habit.quitTime);
    const milestone = RecoveryEngine.currentMilestone(habit.type, habit.quitTime);
    if (!milestone) return '';
    const levelClass = { scientific: 'scientific', reported: 'reported', personal: 'personal' }[milestone.level] || 'scientific';
    const levelLabel = { scientific: '🟢 Scientific', reported: '🟡 Reported', personal: '🔵 Personal' }[milestone.level] || '🟢 Scientific';
    return `
    <div class="feed-card">
      <div class="feed-icon">${milestone.icon}</div>
      <div class="feed-title">${milestone.title}</div>
      <div class="feed-body">${milestone.body.slice(0, 80)}...</div>
      <div class="feed-level ${levelClass}">${levelLabel}</div>
    </div>`;
  }

  function buildHabitCard(habit, state) {
    const hrs = RecoveryEngine.hoursClean(habit.quitTime);
    const days = RecoveryEngine.daysClean(habit.quitTime);
    const next = RecoveryEngine.nextMilestone(habit.type, habit.quitTime);
    const pct = RecoveryEngine.progressToNext(habit.type, habit.quitTime);
    const timeUntil = RecoveryEngine.timeUntilNext(habit.type, habit.quitTime);
    const integrity = RelapseEngine.getIntegrityScore(habit);

    return `
    <div class="habit-card" data-habit-id="${habit.id}">
      <div class="habit-icon">${habit.icon || '⭕'}</div>
      <div class="habit-info">
        <div class="habit-name">${habit.name}</div>
        <div class="habit-days">${days}d ${Math.floor(hrs % 24)}h clean${integrity.relapses > 0 ? ` · ${integrity.relapses} relapses` : ''}</div>
        ${next ? `<div class="habit-next">Next: ${next.title} in ${timeUntil}</div>` : '<div class="habit-next" style="color:#00e676">All milestones reached 🎯</div>'}
        <div class="system-bar" style="margin-top:8px;">
          <div class="system-bar-fill" style="width:${pct}%;background:var(--orange);"></div>
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        ${Charts.ringProgress(pct, '#ff6b2b', 44, 4)}
      </div>
    </div>`;
  }

  function buildEmptyState() {
    return `
    <div style="padding:40px 20px;text-align:center;">
      <div style="font-size:3rem;margin-bottom:16px;">🎯</div>
      <div class="t-heading" style="margin-bottom:8px;">No habits tracked yet</div>
      <p class="t-body t-muted">Complete the setup to start tracking your recovery.</p>
    </div>`;
  }

  function attachHandlers() {
    document.getElementById('qa-sos')?.addEventListener('click', () => Navigation.go('emergency'));
    document.getElementById('qa-analytics')?.addEventListener('click', () => Navigation.go('analytics'));
    document.getElementById('qa-checkin')?.addEventListener('click', handleCheckin);
    document.getElementById('add-habit-btn')?.addEventListener('click', showAddHabitModal);

    document.querySelectorAll('.mission-complete-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        StateManager.update((s) => {
          const result = MissionEngine.completeMission(id, s);
          if (!result.alreadyDone) {
            App.showToast(`Mission complete! +${result.xp} XP`, 'success');
          }
        });
        render();
      });
    });

    document.querySelectorAll('.habit-card').forEach((card) => {
      card.addEventListener('click', () => {
        const habitId = card.dataset.habitId;
        Navigation.go('recovery', { habitId });
      });
    });
  }

  function handleCheckin() {
    StateManager.update((s) => {
      if (!s.checkIns) s.checkIns = [];
      s.checkIns.push({ timestamp: Date.now() });
    });
    App.showToast('Check-in recorded! Keep going.', 'success');
  }

  function showAddHabitModal() {
    App.showToast('Restart onboarding to add habits', 'info');
  }

  function animateRings() {
    document.querySelectorAll('.ring-progress').forEach((ring) => {
      ring.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)';
    });
  }

  function getTimeOfDay() {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
  }

  return { render };
})();
