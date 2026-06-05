'use strict';
const Charts = (() => {
  function ringProgress(pct, color, size, strokeWidth, innerHTML) {
    size = size || 80;
    strokeWidth = strokeWidth || 6;
    const r = (size - strokeWidth) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (pct / 100) * circ;
    const cx = size / 2;
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg)">
      <circle class="ring-track" cx="${cx}" cy="${cx}" r="${r}" stroke-width="${strokeWidth}"/>
      <circle class="ring-fill" cx="${cx}" cy="${cx}" r="${r}" stroke="${color}" stroke-width="${strokeWidth}"
        stroke-dasharray="${circ}" stroke-dashoffset="${circ}"
        data-offset="${offset}" style="transition:stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)"/>
    </svg>${innerHTML ? `<div class="ring-center" style="transform:none">${innerHTML}</div>` : ''}`;
  }

  function animateRings() {
    requestAnimationFrame(() => {
      document.querySelectorAll('.ring-fill[data-offset]').forEach(el => {
        el.style.strokeDashoffset = el.dataset.offset;
      });
    });
  }

  return { ringProgress, animateRings };
})();
window.Charts = Charts;
