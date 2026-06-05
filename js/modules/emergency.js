const Emergency = (() => {
  let currentPhase = 0;
  let timerInterval = null;
  let breathInterval = null;
  let breathPhase = 'inhale';
  let breathCount = 0;

  const PHASES = [
    { name: 'Delay', icon: '⏱️', title: 'Delay 5 Minutes', subtitle: 'Cravings peak at 20 minutes then pass' },
    { name: 'Breathe', icon: '🫁', title: 'Breathing Protocol', subtitle: '4-7-8 breathing — activates parasympathetic system' },
    { name: 'Motivate', icon: '💪', title: 'Your Why', subtitle: 'Remember what you\'re fighting for' },
    { name: 'Timeline', icon: '📈', title: 'Look How Far', subtitle: 'See what your body has already healed' },
    { name: 'Challenge', icon: '🎯', title: 'Mini Challenge', subtitle: 'Convert craving energy into action' },
  ];

  const MOTIVATION_QUOTES = [
    { quote: "The present moment always will have been. Every second you hold is permanent.", author: "Naval Ravikant" },
    { quote: "You are exactly one decision away from a completely different life.", author: "Unknown" },
    { quote: "Between stimulus and response there is a space. In that space is our power to choose.", author: "Viktor Frankl" },
    { quote: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
    { quote: "The craving is temporary. The regret lasts forever.", author: "Recovery Community" },
    { quote: "Every warrior of the light has felt afraid of going into battle. Every warrior of the light has, at some point in the past, lied or betrayed someone. But warriors of the light don't lose hope of being better than they are.", author: "Paulo Coelho" },
    { quote: "You were given this mountain to show others it can be moved.", author: "Unknown" },
    { quote: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
    { quote: "Your addiction was a coping mechanism. Your recovery is replacing it with something better.", author: "Dr. Gabor Maté" },
    { quote: "One day at a time is not a cliché. It's an architecture for survival.", author: "Recovery Wisdom" },
  ];

  const MINI_CHALLENGES = [
    { title: '20 Push-ups', desc: 'Drop and do them right now. Channel the energy.', icon: '💪', xp: 50 },
    { title: '2-Minute Cold Water', desc: 'Splash cold water on your face or take a cold shower.', icon: '❄️', xp: 40 },
    { title: 'Walk Outside Now', desc: 'Leave the room. Walk for 5 minutes. Change your environment.', icon: '🚶', xp: 45 },
    { title: 'Call Someone', desc: 'Call a friend or family member right now. Just say hi.', icon: '📞', xp: 40 },
    { title: '30 Jumping Jacks', desc: 'Burst of cardio resets your nervous system instantly.', icon: '⚡', xp: 35 },
    { title: 'Drink Water Slowly', desc: 'Fill a full glass. Drink it all, slowly and deliberately.', icon: '💧', xp: 20 },
  ];

  function render() {
    const state = StateManager.get();
    const habits = (state.habits || []).filter((h) => h.active);
    const primaryHabit = habits[0];
    const el = document.getElementById('screen-emergency');
    if (!el) return;

    currentPhase = 0;
    clearAllIntervals();

    el.innerHTML = `
    <div class="emergency-wrap">
      <div class="emergency-header">
        <div>
          <div class="t-label" style="color:var(--red);">EMERGENCY PROTOCOL</div>
          <div class="t-heading" style="margin-top:4px;">Craving Defense</div>
        </div>
        <button class="btn btn-ghost btn-sm" id="em-close">✕ Exit</button>
      </div>

      <div class="emergency-phases" id="em-phases">
        ${PHASES.map((p, i) => `<div class="eph${i === 0 ? ' active' : ''}" data-phase="${i}"></div>`).join('')}
      </div>

      <div class="emergency-content" id="em-content">
        ${renderPhase(0, primaryHabit)}
      </div>

      <div style="width:100%;margin-top:24px;">
        <button class="btn btn-primary btn-full btn-lg" id="em-next">
          ${currentPhase < PHASES.length - 1 ? `Complete: ${PHASES[0].name}` : 'Finish Protocol'}
        </button>
        <button class="btn btn-ghost btn-full" id="em-log-craving" style="margin-top:10px;">
          Log Craving & Skip Protocol
        </button>
      </div>
    </div>`;

    attachHandlers(primaryHabit);
    startPhaseAction(0, primaryHabit);
  }

  function renderPhase(phase, habit) {
    switch (phase) {
      case 0: return renderDelay();
      case 1: return renderBreathing();
      case 2: return renderMotivation();
      case 3: return renderTimeline(habit);
      case 4: return renderChallenge();
      default: return renderComplete();
    }
  }

  function renderDelay() {
    return `
    <div class="sos-icon">⏱️</div>
    <h2 class="t-title" style="margin-bottom:8px;">Delay 5 Minutes</h2>
    <p class="t-body t-muted" style="max-width:280px;">Cravings peak at 20 minutes and then physically subside. All you have to do is wait them out.</p>
    <div class="countdown-timer" id="delay-timer">5:00</div>
    <p class="t-caption">The craving will pass. It always does.</p>`;
  }

  function renderBreathing() {
    return `
    <h2 class="t-title" style="margin-bottom:4px;">4-7-8 Breathing</h2>
    <p class="t-caption" style="margin-bottom:24px;">Activates parasympathetic response</p>
    <div class="breath-circle" id="breath-circle">
      <span id="breath-label">Inhale</span>
    </div>
    <div id="breath-count-display" style="margin-top:16px;" class="t-caption">Breath 1 of 5</div>
    <div style="margin-top:16px;padding:16px;background:var(--glass);border-radius:var(--radius-sm);text-align:left;width:100%;">
      <div class="t-label t-dim" style="margin-bottom:8px;">TECHNIQUE</div>
      <div style="font-size:0.82rem;color:var(--text2);line-height:1.8;">
        🫁 Inhale through nose — 4 seconds<br>
        ⏸ Hold breath — 7 seconds<br>
        💨 Exhale through mouth — 8 seconds
      </div>
    </div>`;
  }

  function renderMotivation() {
    const q = MOTIVATION_QUOTES[Math.floor(Math.random() * MOTIVATION_QUOTES.length)];
    const state = StateManager.get();
    const goals = state.user?.goals || [];
    const goalLabels = {
      health: '❤️ Better Health', discipline: '🎯 Discipline', confidence: '💪 Confidence',
      religion: '🤲 Faith & Religion', relationships: '👥 Relationships', fitness: '🏋️ Fitness',
      productivity: '⚡ Productivity', money: '💰 Save Money'
    };
    return `
    <div class="sos-icon">💪</div>
    <h2 class="t-title" style="margin-bottom:8px;">Remember Your Why</h2>
    ${goals.length > 0 ? `
    <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:20px;">
      ${goals.map((g) => `<div class="badge badge-orange">${goalLabels[g] || g}</div>`).join('')}
    </div>` : ''}
    <div style="padding:20px;background:var(--glass);border:1px solid var(--border2);border-radius:var(--radius);text-align:center;max-width:320px;">
      <p class="t-body" style="font-style:italic;line-height:1.7;margin-bottom:12px;">"${q.quote}"</p>
      <div class="t-caption">— ${q.author}</div>
    </div>`;
  }

  function renderTimeline(habit) {
    if (!habit) return `<div class="t-body t-muted">No habit tracked yet.</div>`;
    const hrs = RecoveryEngine.hoursClean(habit.quitTime);
    const days = RecoveryEngine.daysClean(habit.quitTime);
    const timeline = (typeof TIMELINES !== 'undefined' ? TIMELINES : {})[habit.type] || [];
    const reached = timeline.filter((m) => hrs >= m.hours);
    const bodySystems = BodyEngine.getBodySystems(habit.type, hrs);

    return `
    <h2 class="t-title" style="margin-bottom:4px;">Look How Far You've Come</h2>
    <p class="t-body t-muted" style="margin-bottom:20px;">${days} days · ${Math.floor(hrs)} hours of healing</p>
    <div style="width:100%;max-height:240px;overflow-y:auto;">
      ${reached.slice(-3).reverse().map((m) => `
      <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="font-size:1.3rem;">${m.icon}</span>
        <div>
          <div style="font-size:0.85rem;font-weight:600;color:var(--green);">✓ ${m.title}</div>
          <div class="t-caption" style="margin-top:2px;">${m.body.slice(0,80)}...</div>
        </div>
      </div>`).join('')}
      ${bodySystems.slice(0,3).map((s) => `
      <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="font-size:1.2rem;">${s.icon}</span>
        <div style="flex:1;">
          <div style="font-size:0.82rem;font-weight:600;">${s.label}: ${s.pct}% healed</div>
          <div class="system-bar" style="margin-top:4px;">
            <div class="system-bar-fill" style="width:${s.pct}%;background:${s.color};"></div>
          </div>
        </div>
      </div>`).join('')}
    </div>`;
  }

  function renderChallenge() {
    const c = MINI_CHALLENGES[Math.floor(Math.random() * MINI_CHALLENGES.length)];
    return `
    <div class="sos-icon">${c.icon}</div>
    <h2 class="t-title" style="margin-bottom:8px;">${c.title}</h2>
    <p class="t-body t-muted" style="max-width:280px;margin-bottom:24px;">${c.desc}</p>
    <div class="badge badge-gold" style="font-size:0.8rem;padding:8px 16px;">+${c.xp} XP on completion</div>
    <p class="t-caption" style="margin-top:16px;">Complete this, then hit "Finish Protocol"</p>`;
  }

  function renderComplete() {
    return `
    <div class="sos-icon">🏆</div>
    <h2 class="t-title" style="color:var(--green);margin-bottom:8px;">Craving Defeated</h2>
    <p class="t-body t-muted" style="max-width:280px;">You completed the emergency protocol. You just proved to yourself that you are stronger than your cravings.</p>
    <div style="margin-top:20px;" class="badge badge-green" style="font-size:1rem;padding:10px 20px;">+100 XP Earned</div>`;
  }

  function attachHandlers(habit) {
    document.getElementById('em-close')?.addEventListener('click', () => {
      clearAllIntervals();
      Navigation.go('dashboard');
    });

    document.getElementById('em-next')?.addEventListener('click', () => nextPhase(habit));

    document.getElementById('em-log-craving')?.addEventListener('click', () => {
      StateManager.logCraving(habit?.id, 7);
      App.showToast('Craving logged', 'info');
      clearAllIntervals();
      Navigation.go('dashboard');
    });
  }

  function nextPhase(habit) {
    clearAllIntervals();
    currentPhase++;

    if (currentPhase >= PHASES.length) {
      StateManager.update((s) => {
        if (!s.missions) s.missions = { completed: [], xp: 0 };
        s.missions.xp = (s.missions.xp || 0) + 100;
      });
      document.getElementById('em-content').innerHTML = renderComplete();
      document.getElementById('em-next').textContent = 'Return to Dashboard';
      document.getElementById('em-next').removeEventListener('click', () => {});
      document.getElementById('em-next').addEventListener('click', () => {
        clearAllIntervals();
        Navigation.go('dashboard');
      });
      document.getElementById('em-log-craving').classList.add('hidden');
      App.showToast('Protocol complete! +100 XP', 'success');
      return;
    }

    updatePhaseIndicators();
    document.getElementById('em-content').innerHTML = renderPhase(currentPhase, habit);
    document.getElementById('em-next').textContent = `Complete: ${PHASES[currentPhase].name}`;
    startPhaseAction(currentPhase, habit);
  }

  function updatePhaseIndicators() {
    document.querySelectorAll('.eph').forEach((el, i) => {
      el.classList.remove('active', 'done');
      if (i < currentPhase) el.classList.add('done');
      else if (i === currentPhase) el.classList.add('active');
    });
  }

  function startPhaseAction(phase, habit) {
    if (phase === 0) startCountdown(300);
    if (phase === 1) startBreathing();
  }

  function startCountdown(seconds) {
    let remaining = seconds;
    updateTimer(remaining);
    timerInterval = setInterval(() => {
      remaining--;
      updateTimer(remaining);
      if (remaining <= 0) clearInterval(timerInterval);
    }, 1000);
  }

  function updateTimer(s) {
    const el = document.getElementById('delay-timer');
    if (!el) return;
    const m = Math.floor(s / 60);
    const sec = s % 60;
    el.textContent = `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function startBreathing() {
    breathCount = 0;
    breathPhase = 'inhale';
    runBreathCycle();
  }

  function runBreathCycle() {
    if (breathCount >= 5) return;
    const circle = document.getElementById('breath-circle');
    const label = document.getElementById('breath-label');
    const countEl = document.getElementById('breath-count-display');

    const phases = [
      { phase: 'inhale', label: 'Inhale', duration: 4000, class: 'inhale' },
      { phase: 'hold',   label: 'Hold',   duration: 7000, class: 'hold' },
      { phase: 'exhale', label: 'Exhale', duration: 8000, class: 'exhale' },
    ];

    let phaseIdx = 0;

    function runNext() {
      if (!document.getElementById('breath-circle')) return;
      const p = phases[phaseIdx];
      if (circle) { circle.className = `breath-circle ${p.class}`; }
      if (label) label.textContent = p.label;

      breathInterval = setTimeout(() => {
        phaseIdx++;
        if (phaseIdx >= phases.length) {
          breathCount++;
          phaseIdx = 0;
          if (countEl) countEl.textContent = `Breath ${Math.min(breathCount + 1, 5)} of 5`;
          if (breathCount < 5) runNext();
        } else {
          runNext();
        }
      }, p.duration);
    }

    runNext();
  }

  function clearAllIntervals() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    if (breathInterval) { clearTimeout(breathInterval); breathInterval = null; }
  }

  return { render };
})();
