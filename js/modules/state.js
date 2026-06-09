'use strict';
const State = (() => {
  const KEY = 'dos_v2';
  const DEFAULT = {
    user: { name: '', currency: 'USD', goals: [], triggers: [], spiritualMode: false, hairTreatment: 'none' },
    habits: [],
    cravingLog: [],
    settings: { currency: 'USD' },
    onboardingComplete: false,
  };

  let data = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      data = raw ? { ...JSON.parse(JSON.stringify(DEFAULT)), ...JSON.parse(raw) } : JSON.parse(JSON.stringify(DEFAULT));
    } catch (e) {
      data = JSON.parse(JSON.stringify(DEFAULT));
    }
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  }

  function get(key) {
    if (!data) load();
    return key ? data[key] : data;
  }

  function set(key, val) {
    if (!data) load();
    data[key] = val;
    save();
  }

  function update(fn) {
    if (!data) load();
    fn(data);
    save();
  }

  function reset() {
    data = JSON.parse(JSON.stringify(DEFAULT));
    save();
  }

  function addHabit(habitData) {
    if (!data) load();
    const habit = {
      id: Date.now().toString(),
      type: habitData.type,
      quitTime: habitData.quitTime || new Date().toISOString(),
      config: habitData.config || {},
      relapses: [],
      createdAt: new Date().toISOString(),
    };
    data.habits.push(habit);
    save();
    return habit;
  }

  function updateHabit(id, changes) {
    if (!data) load();
    const idx = data.habits.findIndex(h => h.id === id);
    if (idx !== -1) {
      data.habits[idx] = { ...data.habits[idx], ...changes };
      save();
    }
  }

  function logRelapse(habitId) {
    if (!data) load();
    const h = data.habits.find(x => x.id === habitId);
    if (h) {
      h.relapses = h.relapses || [];
      h.relapses.push({ at: new Date().toISOString() });
      h.quitTime = new Date().toISOString();
      save();
    }
  }

  function logCraving(habitId, intensity) {
    if (!data) load();
    data.cravingLog = data.cravingLog || [];
    data.cravingLog.push({ habitId, intensity: intensity || 5, at: new Date().toISOString(), survived: true });
    save();
  }

  function exportJSON() {
    return JSON.stringify(data, null, 2);
  }

  function importJSON(str) {
    try {
      data = JSON.parse(str);
      save();
      return true;
    } catch (e) {
      return false;
    }
  }

  function longestStreak() {
    if (!data || !data.habits.length) return 0;
    return Math.max(...data.habits.map(h => {
      const relapses = (h.relapses || []).map(r => new Date(r.at).getTime()).sort();
      if (!relapses.length) return RecoveryEngine.daysClean(h.quitTime);
      let maxGap = relapses[0] - new Date(h.createdAt).getTime();
      for (let i = 1; i < relapses.length; i++) maxGap = Math.max(maxGap, relapses[i] - relapses[i-1]);
      maxGap = Math.max(maxGap, Date.now() - relapses[relapses.length-1]);
      return Math.floor(maxGap / 86400000);
    }));
  }

  load();
  return { get, set, update, save, reset, addHabit, updateHabit, logRelapse, logCraving, exportJSON, importJSON, longestStreak };
})();
window.State = State;
