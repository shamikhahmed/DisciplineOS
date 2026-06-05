const RelapseEngine = (() => {
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const HOURS = ['midnight', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', 'noon', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

  function logRelapse(habit, note = '') {
    if (!habit.relapses) habit.relapses = [];
    habit.relapses.push({ timestamp: Date.now(), note, previousQuit: habit.quitTime });
    habit.quitTime = new Date().toISOString();
    return habit;
  }

  function getIntegrityScore(habit) {
    const quitOriginal = habit.relapses && habit.relapses.length > 0
      ? habit.relapses[0].previousQuit
      : habit.quitTime;
    const totalDays = Math.max(1, (Date.now() - new Date(quitOriginal).getTime()) / 86400000);
    const relapses = (habit.relapses || []).length;
    const cleanDays = Math.max(0, RecoveryEngine.daysClean(habit.quitTime));
    const integrity = Math.round((cleanDays / totalDays) * 100);
    return { score: Math.min(100, integrity), totalDays: Math.floor(totalDays), relapses, cleanDays };
  }

  function getInsight(habit) {
    const relapses = habit.relapses || [];
    if (relapses.length < 2) return null;

    const dayFreq = new Array(7).fill(0);
    const hourFreq = new Array(24).fill(0);
    for (const r of relapses) {
      const d = new Date(r.timestamp);
      dayFreq[d.getDay()]++;
      hourFreq[d.getHours()]++;
    }

    const riskDay = dayFreq.indexOf(Math.max(...dayFreq));
    const riskHour = hourFreq.indexOf(Math.max(...hourFreq));
    const riskCount = dayFreq[riskDay];

    if (riskCount < 2) return null;
    return {
      message: `${DAYS[riskDay]}s around ${HOURS[riskHour]} appear to be your highest-risk window.`,
      day: DAYS[riskDay],
      hour: HOURS[riskHour],
      count: riskCount,
    };
  }

  function getLongestStreak(habit) {
    const relapses = [...(habit.relapses || [])].sort((a, b) => a.timestamp - b.timestamp);
    if (relapses.length === 0) return RecoveryEngine.daysClean(habit.quitTime);

    let maxStreak = 0;
    let prev = new Date(habit.relapses[0]?.previousQuit || habit.quitTime).getTime();

    for (const r of relapses) {
      const streakDays = (r.timestamp - prev) / 86400000;
      if (streakDays > maxStreak) maxStreak = streakDays;
      prev = r.timestamp;
    }

    const currentStreak = RecoveryEngine.daysClean(habit.quitTime);
    return Math.max(Math.floor(maxStreak), currentStreak);
  }

  function getNeverZeroDisplay(habit) {
    const relapses = habit.relapses || [];
    const currentDays = RecoveryEngine.daysClean(habit.quitTime);
    if (relapses.length === 0) return `${currentDays}`;
    const integrity = getIntegrityScore(habit);
    return `${currentDays}`;
  }

  return { logRelapse, getIntegrityScore, getInsight, getLongestStreak, getNeverZeroDisplay };
})();
