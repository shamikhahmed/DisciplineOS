'use strict';
const TriggerEngine = (() => {

  function analysePatterns(cravingLog, habits) {
    const relapses = [];
    (habits || []).forEach(h => {
      (h.relapses || []).forEach(r => relapses.push({ ...r, habitId: h.id }));
    });
    const events = [
      ...(cravingLog || []).map(c => ({ ...c, type: 'craving' })),
      ...relapses.map(r => ({ at: r.at, type: 'relapse' }))
    ];
    if (events.length < 3) return null;

    const hourCounts = new Array(24).fill(0);
    events.forEach(e => { const h = new Date(e.at).getHours(); hourCounts[h]++; });
    const peakHour = hourCounts.indexOf(Math.max(...hourCounts));
    const peakHourCount = hourCounts[peakHour];

    const dayCounts = new Array(7).fill(0);
    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    events.forEach(e => { dayCounts[new Date(e.at).getDay()]++; });
    const peakDay = dayCounts.indexOf(Math.max(...dayCounts));

    const buckets = { morning: 0, afternoon: 0, evening: 0, night: 0 };
    events.forEach(e => {
      const h = new Date(e.at).getHours();
      if (h >= 5 && h < 12) buckets.morning++;
      else if (h >= 12 && h < 17) buckets.afternoon++;
      else if (h >= 17 && h < 22) buckets.evening++;
      else buckets.night++;
    });
    const peakBucket = Object.entries(buckets).sort((a,b) => b[1]-a[1])[0][0];
    const total = events.length;
    const nowHour = new Date().getHours();
    const riskNow = hourCounts[nowHour] / Math.max(1, total);

    const insights = [];

    if (peakHourCount >= 2 && total >= 3) {
      const pct = Math.round((peakHourCount / total) * 100);
      insights.push({
        type: 'peak_hour',
        message: `${pct}% of your cravings occur around ${formatHour(peakHour)}`,
        severity: pct > 50 ? 'high' : 'medium',
        icon: '⏰'
      });
    }

    if (total >= 5) {
      const dayPct = Math.round((dayCounts[peakDay] / total) * 100);
      if (dayPct > 30) {
        insights.push({
          type: 'peak_day',
          message: `${dayNames[peakDay]}s are your highest-risk day (${dayPct}% of events)`,
          severity: 'medium',
          icon: '📅'
        });
      }
    }

    const bucketLabels = { morning: 'mornings', afternoon: 'afternoons', evening: 'evenings', night: 'late nights' };
    const peakBucketPct = Math.round((buckets[peakBucket] / total) * 100);
    if (peakBucketPct > 40 && total >= 4) {
      insights.push({
        type: 'peak_time',
        message: `You struggle most during ${bucketLabels[peakBucket]} (${peakBucketPct}% of events)`,
        severity: peakBucketPct > 60 ? 'high' : 'medium',
        icon: '🕐'
      });
    }

    return { insights, riskNow, peakHour, peakDay, peakBucket, total, hourCounts, dayCounts };
  }

  function currentRiskLevel(cravingLog, habits) {
    const analysis = analysePatterns(cravingLog, habits);
    if (!analysis) return { level: 'unknown', label: null };
    const risk = analysis.riskNow;
    if (risk > 0.25) return { level: 'high', label: 'High Risk Window', color: '#FF3B30', analysis };
    if (risk > 0.12) return { level: 'medium', label: 'Moderate Risk', color: '#FFD60A', analysis };
    return { level: 'low', label: null, analysis };
  }

  function forecastCard(cravingLog, habits, primaryHabit) {
    const risk = currentRiskLevel(cravingLog, habits);
    const analysis = risk.analysis;

    let withdrawalWarning = null;
    if (primaryHabit) {
      const days = Math.floor((Date.now() - new Date(primaryHabit.quitTime).getTime()) / 86400000);
      const type = primaryHabit.type;
      if ((type === 'smoking' || type === 'vape' || type === 'nicotine_pouches') && days >= 1 && days <= 4) {
        withdrawalWarning = `Day ${days} is peak nicotine withdrawal. Cravings are most intense now and will reduce significantly after day 4.`;
      }
      if (type === 'porn' && days >= 7 && days <= 21) {
        withdrawalWarning = `Week 2-3 is the flatline period. Low motivation and mood are normal and temporary.`;
      }
      if (type === 'weed' && days >= 1 && days <= 7) {
        withdrawalWarning = `First week cannabis withdrawal — sleep disruption and irritability are expected and will pass.`;
      }
    }

    return { risk, withdrawalWarning, analysis };
  }

  function formatHour(h) {
    if (h === 0) return 'midnight';
    if (h < 12) return `${h}am`;
    if (h === 12) return 'noon';
    return `${h - 12}pm`;
  }

  return { analysePatterns, currentRiskLevel, forecastCard, formatHour };
})();
window.TriggerEngine = TriggerEngine;
