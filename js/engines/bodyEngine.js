const BodyEngine = (() => {
  const SYSTEMS = {
    smoking: [
      { system: 'heart',       icon: '❤️', label: 'Cardiovascular', curve: [[0,30],[8,50],[24,60],[72,70],[168,78],[720,85],[4320,92],[8760,95]] },
      { system: 'lungs',       icon: '🫁', label: 'Lung Function',  curve: [[0,20],[72,35],[168,50],[720,65],[2160,78],[8760,88]] },
      { system: 'circulation', icon: '🩸', label: 'Circulation',    curve: [[0,40],[24,55],[72,65],[168,75],[720,83],[4320,90]] },
      { system: 'brain',       icon: '🧠', label: 'Brain Clarity',  curve: [[0,45],[48,55],[168,65],[720,75],[2160,85],[8760,92]] },
      { system: 'skin',        icon: '✨', label: 'Skin Health',    curve: [[0,35],[168,50],[720,65],[2160,78],[8760,88]] },
      { system: 'energy',      icon: '⚡', label: 'Energy',         curve: [[0,30],[72,50],[168,65],[720,78],[4320,88]] },
    ],
    porn: [
      { system: 'brain',       icon: '🧠', label: 'Dopamine System', curve: [[0,20],[72,30],[168,42],[720,60],[2160,78],[4320,90]] },
      { system: 'focus',       icon: '🎯', label: 'Focus & Drive',   curve: [[0,30],[72,40],[168,55],[720,70],[2160,85],[4320,93]] },
      { system: 'social',      icon: '👥', label: 'Social Ease',     curve: [[0,35],[168,50],[720,65],[2160,80],[4320,90]] },
      { system: 'energy',      icon: '⚡', label: 'Life Energy',     curve: [[0,40],[72,50],[168,62],[720,75],[2160,87]] },
      { system: 'sleep',       icon: '😴', label: 'Sleep Quality',   curve: [[0,55],[168,65],[720,78],[2160,88]] },
    ],
    weed: [
      { system: 'brain',       icon: '🧠', label: 'Cognition',       curve: [[0,40],[72,50],[168,60],[720,75],[2160,90]] },
      { system: 'sleep',       icon: '😴', label: 'Sleep Quality',   curve: [[0,30],[72,50],[168,65],[720,80],[2160,92]] },
      { system: 'lungs',       icon: '🫁', label: 'Lung Function',   curve: [[0,50],[168,62],[720,75],[2160,88]] },
      { system: 'motivation',  icon: '🔥', label: 'Motivation',      curve: [[0,25],[72,38],[168,52],[720,70],[2160,85]] },
      { system: 'energy',      icon: '⚡', label: 'Energy',          curve: [[0,35],[168,50],[720,70],[2160,85]] },
    ],
    social_media: [
      { system: 'focus',       icon: '🎯', label: 'Attention Span',  curve: [[0,20],[72,35],[168,52],[720,72],[2160,88]] },
      { system: 'sleep',       icon: '😴', label: 'Sleep Quality',   curve: [[0,45],[72,58],[168,70],[720,84]] },
      { system: 'mood',        icon: '😊', label: 'Mood Baseline',   curve: [[0,40],[168,55],[720,70],[2160,83]] },
      { system: 'presence',    icon: '🌿', label: 'Presence',        curve: [[0,30],[72,50],[168,65],[720,80]] },
    ],
    sugar: [
      { system: 'energy',      icon: '⚡', label: 'Stable Energy',   curve: [[0,30],[24,45],[72,58],[168,70],[720,85]] },
      { system: 'inflammation',icon: '🛡️', label: 'Inflammation',    curve: [[0,40],[168,55],[720,72],[2160,88]] },
      { system: 'gut',         icon: '🦠', label: 'Gut Health',      curve: [[0,35],[72,48],[168,60],[720,78],[2160,90]] },
      { system: 'skin',        icon: '✨', label: 'Skin Clarity',    curve: [[0,40],[168,55],[720,70],[2160,85]] },
    ],
    caffeine: [
      { system: 'sleep',       icon: '😴', label: 'Sleep Quality',   curve: [[0,40],[48,55],[96,68],[168,78],[336,88]] },
      { system: 'energy',      icon: '⚡', label: 'Natural Energy',  curve: [[0,20],[96,40],[168,58],[336,72],[720,85]] },
      { system: 'brain',       icon: '🧠', label: 'Mental Clarity',  curve: [[0,45],[96,58],[168,68],[336,78],[720,88]] },
      { system: 'anxiety',     icon: '🧘', label: 'Calm Baseline',   curve: [[0,35],[96,52],[168,65],[336,78]] },
    ],
    vape: [
      { system: 'lungs',       icon: '🫁', label: 'Lung & Airway',   curve: [[0,25],[72,38],[168,52],[720,68],[2160,80],[8760,90]] },
      { system: 'heart',       icon: '❤️', label: 'Cardiovascular',  curve: [[0,40],[24,52],[72,62],[168,72],[720,82],[4320,90]] },
      { system: 'brain',       icon: '🧠', label: 'Dopamine System', curve: [[0,22],[72,32],[168,45],[720,62],[2160,80],[4320,92]] },
      { system: 'throat',      icon: '🗣️', label: 'Airways',         curve: [[0,30],[168,48],[720,65],[2160,80],[8760,90]] },
      { system: 'energy',      icon: '⚡', label: 'Natural Energy',  curve: [[0,35],[72,48],[168,60],[720,75],[2160,88]] },
    ],
  };

  function interpolate(curve, hours) {
    if (hours <= curve[0][0]) return curve[0][1];
    if (hours >= curve[curve.length - 1][0]) return curve[curve.length - 1][1];
    for (let i = 0; i < curve.length - 1; i++) {
      const [h0, v0] = curve[i];
      const [h1, v1] = curve[i + 1];
      if (hours >= h0 && hours <= h1) {
        const t = (hours - h0) / (h1 - h0);
        return Math.round(v0 + t * (v1 - v0));
      }
    }
    return curve[curve.length - 1][1];
  }

  function systemColor(pct) {
    if (pct >= 80) return '#00e676';
    if (pct >= 60) return '#4fc3f7';
    if (pct >= 40) return '#ffd700';
    return '#ff6b2b';
  }

  function getBodySystems(habitType, hoursClean) {
    const systems = SYSTEMS[habitType] || SYSTEMS.smoking;
    return systems.map((s) => {
      const pct = interpolate(s.curve, hoursClean);
      return {
        ...s,
        pct,
        color: systemColor(pct),
        detail: pct < 40 ? 'Early recovery' : pct < 60 ? 'Recovering' : pct < 80 ? 'Good progress' : 'Strong recovery',
      };
    });
  }

  function overallBodyScore(habitType, hoursClean) {
    const systems = getBodySystems(habitType, hoursClean);
    return Math.round(systems.reduce((a, s) => a + s.pct, 0) / systems.length);
  }

  return { getBodySystems, overallBodyScore };
})();
