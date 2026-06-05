'use strict';
const FinanceEngine = (() => {
  const CURRENCY_SYMBOLS = { USD: '$', GBP: '£', AED: 'د.إ', PKR: '₨', EUR: '€' };

  const EQUIVALENTS = [
    { label: 'gym months', unitCost: 40 },
    { label: 'restaurant meals', unitCost: 25 },
    { label: 'books', unitCost: 12 },
    { label: 'streaming months', unitCost: 15 },
    { label: 'coffees', unitCost: 4 },
    { label: 'cinema tickets', unitCost: 14 },
  ];

  function calculate(habit, currency) {
    const cfg = window.HABITS_CONFIG;
    const habCfg = cfg && cfg[habit.type];
    const costPerDay = habCfg ? (habCfg.computeCostPerDay(habit.config || {}) || 0) : 0;
    const h = Math.max(0, (Date.now() - new Date(habit.quitTime).getTime()) / 3600000);
    const days = h / 24;
    const sym = CURRENCY_SYMBOLS[currency || 'USD'] || '$';

    function fmt(n) {
      if (n >= 1000) return sym + (n / 1000).toFixed(1) + 'k';
      return sym + n.toFixed(2);
    }

    const savedTotal = costPerDay * days;
    const equivalents = EQUIVALENTS.map(e => ({
      label: e.label,
      count: Math.floor(savedTotal / e.unitCost),
    })).filter(e => e.count >= 1).slice(0, 3);

    return {
      costPerDay,
      savedTotal,
      savedToday: costPerDay,
      savedWeek: costPerDay * 7,
      savedMonth: costPerDay * 30,
      savedYear: costPerDay * 365,
      annualProjection: costPerDay * 365,
      fmt,
      equivalents,
      hasCost: costPerDay > 0,
    };
  }

  function totalSaved(habits, currency) {
    return habits.reduce((sum, h) => sum + calculate(h, currency).savedTotal, 0);
  }

  return { calculate, totalSaved, CURRENCY_SYMBOLS };
})();
window.FinanceEngine = FinanceEngine;
