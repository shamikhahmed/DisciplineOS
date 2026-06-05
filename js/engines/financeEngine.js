const FinanceEngine = (() => {
  const CURRENCY_SYMBOLS = { PKR: '₨', USD: '$', GBP: '£', AED: 'AED', EUR: '€' };

  const EQUIVALENTS = [
    { label: 'gym memberships', cost: 30, unit: 'month' },
    { label: 'premium coffees', cost: 5, unit: 'cup' },
    { label: 'books', cost: 15, unit: 'book' },
    { label: 'streaming months', cost: 12, unit: 'month' },
    { label: 'weekend trips', cost: 200, unit: 'trip' },
    { label: 'new shoes', cost: 80, unit: 'pair' },
    { label: 'restaurant meals', cost: 25, unit: 'meal' },
    { label: 'smartphone cases', cost: 20, unit: 'case' },
    { label: 'new laptops', cost: 800, unit: 'laptop' },
    { label: 'flight tickets', cost: 150, unit: 'ticket' },
  ];

  function calculate(config, quitTime) {
    const { costPerDay = 0, currency = 'USD' } = config;
    const hrs = Math.max(0, (Date.now() - new Date(quitTime).getTime()) / 3600000);
    const days = hrs / 24;

    const savedTotal = costPerDay * days;
    const savedToday = costPerDay * Math.min(1, days);
    const savedWeek  = costPerDay * Math.min(7, days);
    const savedMonth = costPerDay * Math.min(30, days);
    const savedYear  = costPerDay * Math.min(365, days);

    const symbol = CURRENCY_SYMBOLS[currency] || currency;
    const fmt = (n) => `${symbol}${n.toFixed(2)}`;

    const equivalents = EQUIVALENTS.map((e) => ({
      count: Math.floor(savedTotal / e.cost),
      label: e.label,
      unit: e.unit,
    })).filter((e) => e.count > 0).slice(0, 4);

    const annualProjection = costPerDay * 365;

    return { savedTotal, savedToday, savedWeek, savedMonth, savedYear, annualProjection, fmt, symbol, currency, equivalents };
  }

  function formatMoney(amount, currency) {
    const symbol = CURRENCY_SYMBOLS[currency] || currency;
    if (amount >= 1000000) return `${symbol}${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `${symbol}${(amount / 1000).toFixed(1)}K`;
    return `${symbol}${amount.toFixed(2)}`;
  }

  return { calculate, formatMoney, CURRENCY_SYMBOLS };
})();
