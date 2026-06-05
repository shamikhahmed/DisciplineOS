const Charts = (() => {
  function ringProgress(pct, color, size = 80, strokeWidth = 6, inner = '') {
    const r = (size - strokeWidth * 2) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (Math.min(pct, 100) / 100) * circumference;

    return `
    <div class="ring-container" style="width:${size}px;height:${size}px;flex-shrink:0;">
      <svg class="ring-svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle class="ring-track" cx="${cx}" cy="${cy}" r="${r}" stroke-width="${strokeWidth}"/>
        <circle class="ring-progress"
          cx="${cx}" cy="${cy}" r="${r}"
          stroke="${color}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
        />
      </svg>
      ${inner}
    </div>`;
  }

  function lineChart(data, opts = {}) {
    const { color = '#ff6b2b', height = 120, fill = false, min: minVal, max: maxVal } = opts;
    if (!data || data.length === 0) return '<div style="height:' + height + 'px;display:flex;align-items:center;justify-content:center;color:var(--text3);font-size:0.8rem;">No data yet</div>';

    const W = 300;
    const H = height;
    const PAD = 8;
    const dataMin = minVal !== undefined ? minVal : Math.min(...data);
    const dataMax = maxVal !== undefined ? maxVal : Math.max(...data);
    const range = dataMax - dataMin || 1;
    const n = data.length;

    const points = data.map((v, i) => {
      const x = PAD + (i / (n - 1 || 1)) * (W - PAD * 2);
      const y = H - PAD - ((v - dataMin) / range) * (H - PAD * 2);
      return [x, y];
    });

    const pathD = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

    let fillPath = '';
    if (fill && points.length > 0) {
      const lastX = points[points.length - 1][0];
      const firstX = points[0][0];
      fillPath = `<path d="${pathD} L ${lastX} ${H - PAD} L ${firstX} ${H - PAD} Z" fill="${color}" opacity="0.08"/>`;
    }

    const gridLines = [0.25, 0.5, 0.75, 1].map((t) => {
      const y = H - PAD - t * (H - PAD * 2);
      return `<line x1="${PAD}" y1="${y.toFixed(1)}" x2="${W - PAD}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`;
    }).join('');

    const lastVal = data[data.length - 1];
    const lastPt = points[points.length - 1];

    return `
    <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" style="overflow:visible;">
      ${gridLines}
      ${fillPath}
      <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      ${lastPt ? `<circle cx="${lastPt[0].toFixed(1)}" cy="${lastPt[1].toFixed(1)}" r="3" fill="${color}"/>` : ''}
      ${lastPt ? `<text x="${Math.min(lastPt[0] + 6, W - 30)}" y="${lastPt[1] + 4}" fill="${color}" font-size="10" font-weight="600">${Math.round(lastVal)}</text>` : ''}
    </svg>`;
  }

  function barChart(data, opts = {}) {
    const { color = '#ff6b2b', height = 100 } = opts;
    if (!data || data.length === 0) return '<div style="height:' + height + 'px;display:flex;align-items:center;justify-content:center;color:var(--text3);font-size:0.8rem;">No data yet</div>';

    const W = 300;
    const H = height;
    const PAD = 8;
    const n = data.length;
    const maxVal = Math.max(...data, 1);
    const barW = (W - PAD * 2) / n * 0.7;
    const gap = (W - PAD * 2) / n * 0.3;

    const bars = data.map((v, i) => {
      const x = PAD + i * ((W - PAD * 2) / n) + gap / 2;
      const barH = (v / maxVal) * (H - PAD * 2 - 16);
      const y = H - PAD - barH;
      const opacity = v === 0 ? 0.15 : 0.85;
      return `
      <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(2, barH).toFixed(1)}"
        fill="${color}" opacity="${opacity}" rx="3"/>
      ${v > 0 ? `<text x="${(x + barW / 2).toFixed(1)}" y="${(y - 4).toFixed(1)}" fill="${color}" font-size="9" text-anchor="middle">${v}</text>` : ''}`;
    });

    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const labels = data.map((_, i) => {
      const x = PAD + i * ((W - PAD * 2) / n) + (W - PAD * 2) / n / 2;
      const label = n === 7 ? days[i] : `${i + 1}`;
      return `<text x="${x.toFixed(1)}" y="${H - 1}" fill="rgba(255,255,255,0.3)" font-size="9" text-anchor="middle">${label}</text>`;
    });

    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${bars.join('')}${labels.join('')}</svg>`;
  }

  function donutChart(segments, opts = {}) {
    const { size = 160 } = opts;
    if (!segments || segments.length === 0) return '';

    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.35;
    const strokeW = size * 0.12;
    const circumference = 2 * Math.PI * r;
    const total = segments.reduce((a, s) => a + s.value, 0);

    let offset = 0;
    const arcs = segments.map((s) => {
      const pct = s.value / total;
      const dash = pct * circumference;
      const arc = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none"
        stroke="${s.color}" stroke-width="${strokeW}"
        stroke-dasharray="${dash.toFixed(2)} ${(circumference - dash).toFixed(2)}"
        stroke-dashoffset="${(-offset).toFixed(2)}"
        transform="rotate(-90 ${cx} ${cy})"
        stroke-linecap="round"
        opacity="0.9"/>`;
      offset += dash;
      return arc;
    });

    const legend = segments.map((s) => `
      <div style="display:flex;align-items:center;gap:6px;font-size:0.72rem;color:var(--text2);">
        <div style="width:8px;height:8px;border-radius:2px;background:${s.color};flex-shrink:0;"></div>
        ${s.label}
      </div>`).join('');

    return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:16px;">
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border)" stroke-width="${strokeW}"/>
        ${arcs.join('')}
      </svg>
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">${legend}</div>
    </div>`;
  }

  return { ringProgress, lineChart, barChart, donutChart };
})();
