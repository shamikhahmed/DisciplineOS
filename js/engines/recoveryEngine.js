const RecoveryEngine = (() => {
  const PHASES = [
    { name: 'Withdrawal',     hours: [0, 72],    color: '#ff1744', description: 'Your body is clearing the substance. Symptoms peak and then decline.' },
    { name: 'Adjustment',     hours: [72, 336],  color: '#ff6b2b', description: 'Acute withdrawal has passed. Brain chemistry is recalibrating.' },
    { name: 'Recalibration',  hours: [336, 1344],color: '#ffd700', description: 'Neural pathways are restructuring. New habits are forming.' },
    { name: 'Stabilization',  hours: [1344, 4320],color: '#4fc3f7', description: 'Your new baseline is establishing. Life feels more normal.' },
    { name: 'Optimization',   hours: [4320, Infinity], color: '#00e676', description: 'You have reclaimed your full self. You are building upward.' },
  ];

  function hoursClean(quitTime) {
    return Math.max(0, (Date.now() - new Date(quitTime).getTime()) / 3600000);
  }

  function daysClean(quitTime) {
    return Math.floor(hoursClean(quitTime) / 24);
  }

  function recoveryPhase(hours) {
    for (const phase of PHASES) {
      if (hours >= phase.hours[0] && hours < phase.hours[1]) return phase;
    }
    return PHASES[PHASES.length - 1];
  }

  function currentMilestone(habitType, quitTime) {
    const timeline = (typeof TIMELINES !== 'undefined' ? TIMELINES : {})[habitType] || [];
    const hrs = hoursClean(quitTime);
    let last = null;
    for (const m of timeline) {
      if (hrs >= m.hours) last = m;
      else break;
    }
    return last;
  }

  function nextMilestone(habitType, quitTime) {
    const timeline = (typeof TIMELINES !== 'undefined' ? TIMELINES : {})[habitType] || [];
    const hrs = hoursClean(quitTime);
    return timeline.find((m) => m.hours > hrs) || null;
  }

  function progressToNext(habitType, quitTime) {
    const timeline = (typeof TIMELINES !== 'undefined' ? TIMELINES : {})[habitType] || [];
    const hrs = hoursClean(quitTime);
    const nextIdx = timeline.findIndex((m) => m.hours > hrs);
    if (nextIdx <= 0) return nextIdx === -1 ? 100 : 0;
    const prev = timeline[nextIdx - 1].hours;
    const next = timeline[nextIdx].hours;
    return Math.min(100, Math.round(((hrs - prev) / (next - prev)) * 100));
  }

  function recoveryScore(habits) {
    if (!habits || habits.length === 0) return 0;
    let total = 0;
    for (const h of habits) {
      if (!h.active) continue;
      const hrs = hoursClean(h.quitTime);
      const days = daysClean(h.quitTime);
      const relapses = (h.relapses || []).length;
      const baseScore = Math.min(100, (hrs / 8760) * 100);
      const relapsePenalty = Math.min(40, relapses * 8);
      const streakBonus = Math.min(20, days / 5);
      total += Math.max(0, baseScore - relapsePenalty + streakBonus);
    }
    return Math.round(total / habits.filter((h) => h.active).length);
  }

  function formatDuration(hours) {
    if (hours < 1) return `${Math.round(hours * 60)}m`;
    if (hours < 24) return `${Math.floor(hours)}h`;
    if (hours < 168) return `${Math.floor(hours / 24)}d`;
    if (hours < 720) return `${Math.floor(hours / 168)}w`;
    if (hours < 8760) return `${Math.floor(hours / 720)}mo`;
    return `${Math.floor(hours / 8760)}y`;
  }

  function timeUntilNext(habitType, quitTime) {
    const next = nextMilestone(habitType, quitTime);
    if (!next) return null;
    const hrs = hoursClean(quitTime);
    return formatDuration(next.hours - hrs);
  }

  return { hoursClean, daysClean, recoveryPhase, currentMilestone, nextMilestone, progressToNext, recoveryScore, timeUntilNext, formatDuration };
})();
