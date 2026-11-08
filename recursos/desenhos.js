// Rabiscos "feitos à mão" usados no álbum. Cada desenho ocupa uma caixa de 100 x 100.
// classe "v" = caneta vermelha · classe "f" = preenchido com a tinta
(function () {
  const coracao = "M50 84 C 22 64, 8 46, 18 28 C 27 13, 45 16, 50 32 C 55 16, 73 12, 82 27 C 93 45, 78 64, 50 84 Z";
  const brilho = "M50 8 Q53 47 92 50 Q53 53 50 92 Q47 53 8 50 Q47 47 50 8 Z";
  const em = (d, x, y, s, cls = "", extra = "") =>
    `<path class="${cls}" d="${d}" transform="translate(${x} ${y}) scale(${s}) translate(-50 -50)" ${extra}/>`;
  const raios = (cx, cy, r1, r2, n, cls = "", fase = 0) => {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = fase + (i * 2 * Math.PI) / n;
      s += `<path class="${cls}" d="M${(cx + r1 * Math.cos(a)).toFixed(1)} ${(cy + r1 * Math.sin(a)).toFixed(1)} L${(cx + r2 * Math.cos(a)).toFixed(1)} ${(cy + r2 * Math.sin(a)).toFixed(1)}"/>`;
    }
    return s;
  };
  const peixe = (x, y, s, espelho) => `<g transform="translate(${x} ${y}) scale(${espelho ? -s : s} ${s})">
      <path d="M-28 0 C -14 -18, 12 -18, 24 0 C 12 18, -14 18, -28 0 Z"/>
      <path d="M24 0 L 40 -13 L 38 13 Z"/><circle class="f" cx="-16" cy="-3" r="2.3"/>
      <path d="M-8 -9 Q -3 0 -8 9"/></g>`;

  const D = {
    coracao: em(coracao, 50, 52, 0.95, "v"),
    coracoes: em(coracao, 34, 60, 0.6, "v") + em(coracao, 72, 34, 0.42, "v") + em(coracao, 74, 80, 0.26, "v"),
    estrelas: em(brilho, 44, 54, 0.75) + em(brilho, 82, 20, 0.3) + em(brilho, 18, 18, 0.22) +
      `<circle class="f" cx="84" cy="74" r="1.8"/><circle class="f" cx="14" cy="80" r="1.5"/>`,
    sol: `<circle cx="50" cy="50" r="17"/>` + raios(50, 50, 25, 38, 10) +
      `<path d="M42 48 Q 44 46 46 48 M54 48 Q 56 46 58 48 M43 56 Q 50 62 57 56"/>`,
    ondas: [36, 52, 68].map((y, i) => `<path d="M${6 + i * 4} ${y} q 10.5 -9 21 0 t 21 0 t 21 0 t 21 0"/>`).join(""),
    peixes: peixe(36, 34, 0.75) + peixe(64, 70, 0.55, true) +
      `<circle cx="80" cy="26" r="3.4"/><circle cx="87" cy="15" r="2.3"/><circle cx="78" cy="9" r="1.6"/>`,
    barco: `<path d="M14 62 L 86 62 L 74 78 L 26 78 Z"/><path d="M50 62 L 50 14"/>
      <path d="M53 18 L 53 58 L 82 58 Z"/><path d="M47 26 L 47 58 L 27 58 Z"/>
      <path d="M4 88 q 11 -8 22 0 t 22 0 t 22 0 t 22 0"/>` + em(coracao, 66, 44, 0.16, "v"),
    nuvem: `<path d="M24 66 C 8 66, 8 44, 24 45 C 24 28, 46 24, 53 38 C 59 27, 80 30, 77 47 C 92 47, 93 66, 77 66 Z"/>` +
      em(coracao, 50, 52, 0.22, "v"),
    lua: `<path d="M58 12 A 38 38 0 1 0 90 66 A 30 30 0 1 1 58 12 Z"/>` + em(brilho, 80, 24, 0.24) + em(brilho, 88, 86, 0.16) +
      `<circle class="f" cx="66" cy="44" r="1.5"/>`,
    fogos: raios(34, 38, 7, 24, 10) + raios(34, 38, 28, 29.5, 10) +
      raios(72, 70, 5, 17, 9, "v", 0.3) + raios(72, 70, 20, 21.5, 9, "v", 0.3) +
      `<path d="M34 96 Q 32 70 34 64" stroke-dasharray="3 4"/>`,
    flor: `<circle cx="50" cy="38" r="7"/>` +
      [0, 60, 120, 180, 240, 300].map(a => `<ellipse cx="50" cy="23" rx="6.5" ry="11" transform="rotate(${a} 50 38)"/>`).join("") +
      `<path d="M50 50 Q 45 72 52 94"/><path d="M49 76 Q 64 64 72 72 Q 62 84 49 76 Z"/>`,
    folhas: `<path d="M16 92 Q 48 62 84 12"/>` +
      `<path d="M34 74 Q 22 58 36 50 Q 44 64 34 74 Z"/><path d="M50 58 Q 60 42 72 48 Q 62 62 50 58 Z"/>` +
      `<path d="M56 46 Q 46 30 60 22 Q 68 36 56 46 Z"/><path d="M70 30 Q 80 16 90 24 Q 80 36 70 30 Z"/>`,
    notas: `<ellipse class="f" cx="30" cy="74" rx="8" ry="6" transform="rotate(-20 30 74)"/><path d="M37 72 L 37 30"/>` +
      `<ellipse class="f" cx="66" cy="64" rx="8" ry="6" transform="rotate(-20 66 64)"/><path d="M73 62 L 73 22"/>` +
      `<path class="f" d="M37 30 L 73 22 L 73 30 L 37 38 Z"/>` + em(brilho, 88, 80, 0.18),
    arvore: `<path d="M50 14 L 30 40 L 40 40 L 22 64 L 34 64 L 16 86 L 84 86 L 66 64 L 78 64 L 60 40 L 70 40 Z"/>` +
      `<path d="M45 86 L 45 95 L 55 95 L 55 86"/>` + em(brilho, 50, 10, 0.2, "v") +
      `<circle class="v" cx="44" cy="52" r="2.6"/><circle class="v" cx="58" cy="70" r="2.6"/><circle class="v" cx="36" cy="76" r="2.6"/>`,
    copo: `<path d="M30 32 L 70 32 L 62 90 L 38 90 Z"/><path d="M33 50 L 67 50"/>` +
      `<path d="M56 32 L 64 6 L 72 9"/><circle cx="70" cy="34" r="9"/><path d="M70 25 L 70 43 M61 34 L 79 34"/>`,
    diabinho: em(coracao, 50, 56, 0.72, "v") +
      `<path class="v" d="M32 34 Q 24 22 24 10 Q 36 18 40 30"/><path class="v" d="M68 34 Q 76 22 76 10 Q 64 18 60 30"/>` +
      `<path class="v" d="M70 76 Q 90 80 86 94"/><path class="v" d="M86 94 L 79 89 L 92 87 Z"/>`,
    coroa: `<path d="M18 70 L 16 32 L 34 50 L 50 22 L 66 50 L 84 32 L 82 70 Z"/><path d="M18 78 L 82 78"/>` +
      `<circle class="f" cx="16" cy="30" r="2.5"/><circle class="f" cx="50" cy="20" r="2.5"/><circle class="f" cx="84" cy="30" r="2.5"/>` +
      em(coracao, 50, 60, 0.15, "v"),
    seta: `<path d="M10 76 Q 36 20 84 34"/><path d="M71 24 L 86 34 L 72 45"/>`,
  };

  // traço duplo levemente deslocado + filtro de tremido = cara de caneta
  window.rabisco = function (nome, classe = "") {
    const d = D[nome];
    if (!d) return "";
    return `<svg class="rabisco ${classe}" viewBox="0 0 100 100" aria-hidden="true">
      <g filter="url(#mao)">${d}<g class="eco" transform="translate(0.9 0.7) rotate(0.8 50 50)">${d}</g></g></svg>`;
  };
  window.DESENHOS_DISPONIVEIS = Object.keys(D);
})();
