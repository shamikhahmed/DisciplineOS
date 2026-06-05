const MissionEngine = (() => {
  const RANKS = [
    { min: 1,  max: 5,   name: 'Survivor',          icon: '🌱' },
    { min: 6,  max: 15,  name: 'Warrior',            icon: '⚔️' },
    { min: 16, max: 30,  name: 'Guardian',           icon: '🛡️' },
    { min: 31, max: 50,  name: 'Elite',              icon: '⭐' },
    { min: 51, max: 75,  name: 'Master',             icon: '🔥' },
    { min: 76, max: 100, name: 'Discipline Legend',  icon: '👑' },
  ];

  function xpToLevel(xp) {
    return Math.floor(xp / 500) + 1;
  }

  function levelProgress(xp) {
    const xpInLevel = xp % 500;
    return { current: xpInLevel, needed: 500, pct: Math.round((xpInLevel / 500) * 100) };
  }

  function getRank(level) {
    return RANKS.find((r) => level >= r.min && level <= r.max) || RANKS[RANKS.length - 1];
  }

  function seededRandom(seed) {
    let s = seed;
    return function () {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 4294967296;
    };
  }

  function getDailyMissions(habitTypes, dateStr) {
    if (!habitTypes || habitTypes.length === 0) return [];
    const db = typeof MISSIONS_DB !== 'undefined' ? MISSIONS_DB : {};
    const seed = dateStr.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const rand = seededRandom(seed);
    const selected = [];

    for (const type of habitTypes) {
      const pool = db[type] || [];
      if (pool.length === 0) continue;
      const idx = Math.floor(rand() * pool.length);
      selected.push(pool[idx]);
      if (selected.length >= 3) break;
    }

    while (selected.length < 3) {
      const allPools = Object.values(db).flat();
      if (allPools.length === 0) break;
      const idx = Math.floor(rand() * allPools.length);
      const m = allPools[idx];
      if (!selected.find((s) => s.id === m.id)) selected.push(m);
    }

    return selected.slice(0, 3);
  }

  function completeMission(missionId, state) {
    const today = new Date().toISOString().split('T')[0];
    if (!state.missions) state.missions = { completed: [], xp: 0 };
    const already = state.missions.completed.find((c) => c.id === missionId && c.date === today);
    if (already) return { alreadyDone: true, xp: 0 };

    const db = typeof ALL_MISSIONS !== 'undefined' ? ALL_MISSIONS : [];
    const mission = db.find((m) => m.id === missionId);
    const xpGain = mission ? mission.xp : 10;

    state.missions.completed.push({ id: missionId, date: today, xp: xpGain });
    state.missions.xp = (state.missions.xp || 0) + xpGain;
    return { alreadyDone: false, xp: xpGain };
  }

  function isMissionCompleted(missionId, state) {
    const today = new Date().toISOString().split('T')[0];
    if (!state.missions) return false;
    return state.missions.completed.some((c) => c.id === missionId && c.date === today);
  }

  function getMissionStreak(state) {
    if (!state.missions || !state.missions.completed.length) return 0;
    const dates = [...new Set(state.missions.completed.map((c) => c.date))].sort().reverse();
    let streak = 0;
    let checkDate = new Date();
    for (const d of dates) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (d === dateStr) { streak++; checkDate.setDate(checkDate.getDate() - 1); }
      else break;
    }
    return streak;
  }

  return { xpToLevel, levelProgress, getRank, getDailyMissions, completeMission, isMissionCompleted, getMissionStreak, RANKS };
})();
