'use strict';
const BodyEngine = (() => {
  const BODY_SYSTEMS = {
    smoking: [
      { system: 'cardiovascular', icon: '❤️', label: 'Heart', curve: [[0,30],[24,45],[72,55],[168,65],[720,78],[2160,88],[8760,98]] },
      { system: 'lungs', icon: '🫁', label: 'Lungs', curve: [[0,20],[8,30],[72,45],[336,58],[720,70],[2160,82],[4320,92]] },
      { system: 'circulation', icon: '🩸', label: 'Circulation', curve: [[0,35],[24,42],[168,62],[720,80],[2160,90],[8760,98]] },
      { system: 'sensory', icon: '👃', label: 'Taste/Smell', curve: [[0,25],[48,50],[168,70],[720,90],[2160,98]] },
      { system: 'skin', icon: '✨', label: 'Skin', curve: [[0,40],[168,52],[720,68],[2160,82],[8760,94]] },
      { system: 'immune', icon: '🛡️', label: 'Immunity', curve: [[0,45],[720,60],[2160,75],[8760,92]] },
    ],
    vape: [
      { system: 'lungs', icon: '🫁', label: 'Lungs', curve: [[0,30],[72,50],[336,65],[720,78],[4320,92],[8760,98]] },
      { system: 'cardiovascular', icon: '❤️', label: 'Heart', curve: [[0,40],[24,52],[168,65],[720,80],[8760,98]] },
      { system: 'dopamine', icon: '🧠', label: 'Dopamine', curve: [[0,20],[168,35],[720,60],[2160,80],[4320,95]] },
      { system: 'sensory', icon: '👃', label: 'Taste/Smell', curve: [[0,35],[48,55],[168,75],[720,92]] },
      { system: 'airways', icon: '💨', label: 'Airways', curve: [[0,25],[72,50],[336,72],[720,88],[2160,98]] },
    ],
    nicotine_pouches: [
      { system: 'cardiovascular', icon: '❤️', label: 'Heart', curve: [[0,45],[24,58],[72,68],[720,85],[2160,98]] },
      { system: 'oral', icon: '🦷', label: 'Oral Health', curve: [[0,30],[48,50],[168,70],[720,90],[2160,98]] },
      { system: 'dopamine', icon: '🧠', label: 'Dopamine', curve: [[0,20],[168,40],[720,65],[2160,85],[4320,98]] },
      { system: 'blood_pressure', icon: '📊', label: 'Blood Pressure', curve: [[0,40],[24,55],[72,70],[720,90],[2160,98]] },
    ],
    shisha: [
      { system: 'lungs', icon: '🫁', label: 'Lungs', curve: [[0,15],[12,30],[72,48],[336,62],[720,75],[2160,88],[8760,96]] },
      { system: 'cardiovascular', icon: '❤️', label: 'Heart', curve: [[0,25],[12,45],[24,58],[168,70],[720,82],[8760,96]] },
      { system: 'co_levels', icon: '💨', label: 'CO Levels', curve: [[0,0],[8,50],[12,90],[24,98]] },
      { system: 'heavy_metals', icon: '🔬', label: 'Detox', curve: [[0,10],[168,40],[336,65],[720,85],[2160,98]] },
    ],
    weed: [
      { system: 'sleep', icon: '🌙', label: 'Sleep', curve: [[0,25],[72,35],[336,60],[720,80],[2160,95]] },
      { system: 'cognition', icon: '💡', label: 'Cognition', curve: [[0,30],[168,45],[336,62],[720,80],[2160,96]] },
      { system: 'dopamine', icon: '🧠', label: 'Dopamine', curve: [[0,20],[168,35],[720,60],[2160,82],[4320,96]] },
      { system: 'motivation', icon: '🔥', label: 'Motivation', curve: [[0,25],[336,45],[720,65],[2160,85],[4320,98]] },
      { system: 'lungs', icon: '🫁', label: 'Lungs', curve: [[0,35],[720,60],[2160,80],[4320,95]] },
    ],
    porn: [
      { system: 'dopamine', icon: '🧠', label: 'Dopamine', curve: [[0,15],[168,30],[720,58],[2160,80],[4320,96]] },
      { system: 'focus', icon: '🎯', label: 'Focus', curve: [[0,25],[168,42],[720,65],[2160,85],[4320,98]] },
      { system: 'social', icon: '👥', label: 'Social Ease', curve: [[0,30],[336,48],[720,68],[2160,88],[4320,98]] },
      { system: 'motivation', icon: '🔥', label: 'Motivation', curve: [[0,20],[720,50],[2160,75],[4320,96]] },
    ],
    social_media: [
      { system: 'attention', icon: '🎯', label: 'Attention', curve: [[0,20],[72,35],[336,58],[720,78],[2160,94]] },
      { system: 'sleep', icon: '🌙', label: 'Sleep', curve: [[0,30],[168,55],[720,80],[2160,96]] },
      { system: 'mood', icon: '🌤️', label: 'Mood', curve: [[0,35],[168,50],[720,72],[2160,92]] },
      { system: 'creativity', icon: '✨', label: 'Creativity', curve: [[0,25],[336,50],[720,72],[2160,95]] },
    ],
    gaming: [
      { system: 'motivation', icon: '🔥', label: 'Real Motivation', curve: [[0,15],[168,30],[720,58],[2160,82],[4320,96]] },
      { system: 'sleep', icon: '🌙', label: 'Sleep', curve: [[0,25],[168,50],[720,78],[2160,95]] },
      { system: 'social', icon: '👥', label: 'Social Life', curve: [[0,30],[336,52],[720,72],[2160,92]] },
      { system: 'focus', icon: '🎯', label: 'Focus', curve: [[0,20],[168,38],[720,62],[2160,85]] },
    ],
    sugar: [
      { system: 'blood_sugar', icon: '📊', label: 'Blood Sugar', curve: [[0,25],[72,45],[168,65],[720,85],[2160,97]] },
      { system: 'energy', icon: '⚡', label: 'Energy', curve: [[0,30],[168,55],[720,80],[2160,96]] },
      { system: 'inflammation', icon: '🔬', label: 'Inflammation', curve: [[0,20],[336,45],[720,68],[2160,90]] },
      { system: 'gut', icon: '🦠', label: 'Gut Health', curve: [[0,30],[336,50],[720,72],[2160,95]] },
    ],
    caffeine: [
      { system: 'sleep', icon: '🌙', label: 'Sleep', curve: [[0,30],[72,55],[168,75],[720,96]] },
      { system: 'anxiety', icon: '🧘', label: 'Calm', curve: [[0,25],[72,40],[168,62],[720,88],[2160,98]] },
      { system: 'energy', icon: '⚡', label: 'Natural Energy', curve: [[0,20],[72,30],[168,52],[720,80],[2160,98]] },
      { system: 'heart', icon: '❤️', label: 'Heart Rate', curve: [[0,45],[72,65],[168,80],[720,96]] },
    ],
  };

  function interpolate(curve, hours) {
    if (!curve || curve.length === 0) return 0;
    if (hours <= curve[0][0]) return curve[0][1];
    if (hours >= curve[curve.length - 1][0]) return curve[curve.length - 1][1];
    for (let i = 1; i < curve.length; i++) {
      if (hours <= curve[i][0]) {
        const t = (hours - curve[i-1][0]) / (curve[i][0] - curve[i-1][0]);
        return curve[i-1][1] + t * (curve[i][1] - curve[i-1][1]);
      }
    }
    return curve[curve.length - 1][1];
  }

  function getBodySystems(habitType, hoursClean) {
    const systems = BODY_SYSTEMS[habitType] || BODY_SYSTEMS.smoking;
    return systems.map(s => ({
      ...s,
      pct: Math.round(interpolate(s.curve, hoursClean)),
    }));
  }

  function overallBodyScore(habitType, hoursClean) {
    const systems = getBodySystems(habitType, hoursClean);
    if (!systems.length) return 0;
    return Math.round(systems.reduce((s, x) => s + x.pct, 0) / systems.length);
  }

  return { getBodySystems, overallBodyScore };
})();
window.BodyEngine = BodyEngine;
