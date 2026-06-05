const StateManager = (() => {
  const KEY = 'dos_v1';

  const DEFAULT_STATE = {
    user: { name: '', age: '', gender: '', country: '', goals: [], triggers: [] },
    habits: [],
    missions: { completed: [], xp: 0 },
    settings: { theme: 'dark', currency: 'USD', notifications: false },
    onboardingComplete: false,
    checkIns: [],
    cravingLog: [],
    version: 1,
  };

  let _state = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      _state = raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : { ...DEFAULT_STATE };
    } catch {
      _state = { ...DEFAULT_STATE };
    }
    return _state;
  }

  function get(key) {
    if (!_state) load();
    return key ? _state[key] : _state;
  }

  function set(key, value) {
    if (!_state) load();
    _state[key] = value;
    save();
  }

  function update(updater) {
    if (!_state) load();
    updater(_state);
    save();
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(_state));
    } catch (e) {
      console.warn('DisciplineOS: Could not save state', e);
    }
  }

  function reset() {
    _state = { ...DEFAULT_STATE };
    localStorage.removeItem(KEY);
  }

  function exportData() {
    return JSON.stringify(_state, null, 2);
  }

  function importData(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      _state = { ...DEFAULT_STATE, ...data };
      save();
      return true;
    } catch {
      return false;
    }
  }

  function addHabit(habit) {
    if (!_state) load();
    const id = `h_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
    const newHabit = { id, ...habit, relapses: [], active: true, createdAt: Date.now() };
    _state.habits.push(newHabit);
    save();
    return newHabit;
  }

  function logCraving(habitId, intensity = 5) {
    if (!_state) load();
    if (!_state.cravingLog) _state.cravingLog = [];
    _state.cravingLog.push({ habitId, intensity, timestamp: Date.now() });
    save();
  }

  load();
  return { get, set, update, save, reset, exportData, importData, addHabit, logCraving };
})();
