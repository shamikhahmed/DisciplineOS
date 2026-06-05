const DopamineEngine = (() => {
  const STAGES = [
    {
      stage: 0, name: 'Withdrawal', color: '#ff1744',
      description: 'Dopamine receptors are at their lowest density. Your brain is adapting to the absence of the substance.',
      symptoms: ['Intense cravings', 'Irritability', 'Low energy', 'Difficulty concentrating', 'Sleep disruption'],
      tips: ['Ride the waves — cravings peak at 20 minutes then pass', 'Cold water, exercise, and deep breathing are your tools', 'This phase is temporary and will end'],
    },
    {
      stage: 1, name: 'Adaptation', color: '#ff6b2b',
      description: 'Acute withdrawal is easing. Your brain is beginning to upregulate receptor density. The hardest part is behind you.',
      symptoms: ['Variable mood', 'Occasional flatness', 'Improved but imperfect sleep', 'Fluctuating motivation'],
      tips: ['Establish routine — it reduces cognitive load', 'Exercise daily to supplement natural dopamine', 'Small wins build momentum'],
    },
    {
      stage: 2, name: 'Rebalancing', color: '#ffd700',
      description: 'Significant receptor recovery underway. Natural rewards are beginning to feel satisfying again.',
      symptoms: ['More stable mood', 'Improved energy', 'Better sleep', 'Occasional strong cravings still possible'],
      tips: ['Build new rewarding habits to anchor the recovery', 'Track your progress — you\'ve come far', 'Social connection strengthens recovery'],
    },
    {
      stage: 3, name: 'Stabilization', color: '#4fc3f7',
      description: 'Your dopamine system is approaching its natural baseline. Life is beginning to feel genuinely satisfying.',
      symptoms: ['Stable mood', 'Good energy', 'Strong motivation', 'Rare cravings'],
      tips: ['Protect your new baseline — stress and poor sleep can temporarily destabilize', 'You are establishing a new identity', 'Help someone else who is earlier in their journey'],
    },
    {
      stage: 4, name: 'Optimization', color: '#00e676',
      description: 'Full dopamine receptor density restored. Your reward system is clean, sensitive, and powerful.',
      symptoms: ['High intrinsic motivation', 'Deep satisfaction from real accomplishments', 'Strong emotional regulation', 'Natural pleasure from ordinary life'],
      tips: ['Maintain the lifestyle that got you here', 'You are an example of what discipline achieves', 'Keep growing — the best is still ahead'],
    },
  ];

  const STAGE_THRESHOLDS = {
    porn:         [0, 72,  336,  1344, 4320],
    smoking:      [0, 72,  504,  2160, 8760],
    vape:         [0, 72,  504,  2160, 8760],
    weed:         [0, 72,  336,  1344, 4320],
    social_media: [0, 24,  168,  720,  2160],
    sugar:        [0, 72,  336,  1344, 4320],
    caffeine:     [0, 48,  168,  720,  2160],
  };

  function getStage(habitType, hoursClean) {
    const thresholds = STAGE_THRESHOLDS[habitType] || STAGE_THRESHOLDS.smoking;
    let stageIdx = 0;
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (hoursClean >= thresholds[i]) { stageIdx = i; break; }
    }
    return { ...STAGES[Math.min(stageIdx, STAGES.length - 1)], stageIdx, totalStages: STAGES.length };
  }

  function progressInStage(habitType, hoursClean) {
    const thresholds = STAGE_THRESHOLDS[habitType] || STAGE_THRESHOLDS.smoking;
    let stageIdx = 0;
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (hoursClean >= thresholds[i]) { stageIdx = i; break; }
    }
    if (stageIdx >= thresholds.length - 1) return 100;
    const start = thresholds[stageIdx];
    const end = thresholds[stageIdx + 1];
    return Math.round(((hoursClean - start) / (end - start)) * 100);
  }

  return { getStage, progressInStage, STAGES };
})();
