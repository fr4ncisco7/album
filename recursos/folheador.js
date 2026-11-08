// Folheador para celular em pé: uma página por vez que gira presa pela lombada (lado esquerdo),
// como um caderno. Acompanha o dedo ao arrastar; toque na direita avança, na esquerda volta.
// Expõe os mesmos métodos que o álbum usa da biblioteca de livro aberto.
window.Folheador = function (container, paginas) {
  const DUR = 750;
  container.classList.add("folheador");
  const folhas = [...paginas].map(p => {
    const f = document.createElement("div");
    f.className = "folha";
    p.classList.add("frente");
    const sombra = document.createElement("div");
    sombra.className = "sombra-giro";
    p.appendChild(sombra);
    const verso = document.createElement("div");
    verso.className = "verso papel";
    f.appendChild(p);
    f.appendChild(verso);
    container.appendChild(f);
    return f;
  });
  const n = folhas.length;
  let atual = 0, ocupado = false;
  const ouvintes = {};
  const avisar = (ev, data) => (ouvintes[ev] || []).forEach(fn => fn({ data }));

  // virada = já passou (fica girada para a esquerda, escondida)
  function arrumar() {
    folhas.forEach((f, i) => {
      f.classList.toggle("virada", i < atual);
      f.style.transform = "";
      f.style.zIndex = i < atual ? 100 + i : 50 - (i - atual);
      f.style.visibility = (i === atual || i === atual + 1) ? "visible" : "hidden";
    });
  }
  function girar(f, graus, animar) {
    f.style.transition = animar ? `transform ${DUR}ms cubic-bezier(.3,.1,.25,1)` : "none";
    f.style.transform = `rotateY(${graus}deg)`;
    const s = f.querySelector(".sombra-giro");
    if (s) s.style.opacity = Math.min(1, Math.abs(graus) / 90).toFixed(2);
  }
  function terminar(novo) {
    setTimeout(() => {
      atual = novo;
      folhas.forEach(f => { f.style.transition = "none"; const s = f.querySelector(".sombra-giro"); if (s) s.style.opacity = 0; });
      arrumar();
      ocupado = false;
      avisar("flip", atual);
    }, DUR + 20);
  }
  function proxima(deGraus) {
    if (ocupado || atual >= n - 1) return;
    ocupado = true;
    const f = folhas[atual];
    folhas[atual + 1].style.visibility = "visible";
    if (deGraus === undefined) girar(f, 0, false);
    requestAnimationFrame(() => requestAnimationFrame(() => girar(f, -180, true)));
    terminar(atual + 1);
  }
  function anterior(deGraus) {
    if (ocupado || atual <= 0) return;
    ocupado = true;
    const f = folhas[atual - 1];
    f.style.visibility = "visible";
    f.style.zIndex = 200;
    if (deGraus === undefined) girar(f, -180, false);
    requestAnimationFrame(() => requestAnimationFrame(() => girar(f, 0, true)));
    terminar(atual - 1);
  }
  function voltarAoLugar(f, para) {
    ocupado = true;
    girar(f, para, true);
    setTimeout(() => { f.style.transition = "none"; arrumar(); ocupado = false; }, DUR + 20);
  }

  // ----- dedo
  let x0 = null, y0 = 0, t0 = 0, alvo = null, modo = null, largura = 1;
  container.addEventListener("touchstart", e => {
    if (ocupado || e.touches.length > 1) return;
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
    largura = container.getBoundingClientRect().width;
    alvo = null; modo = null;
  }, { passive: true });
  container.addEventListener("touchmove", e => {
    if (x0 === null || ocupado) return;
    const dx = e.touches[0].clientX - x0, dy = e.touches[0].clientY - y0;
    if (!modo) {
      if (Math.abs(dx) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) { x0 = null; return; }
      if (dx < 0 && atual < n - 1) { modo = "prox"; alvo = folhas[atual]; folhas[atual + 1].style.visibility = "visible"; }
      else if (dx > 0 && atual > 0) { modo = "ant"; alvo = folhas[atual - 1]; alvo.style.visibility = "visible"; alvo.style.zIndex = 200; }
      else { x0 = null; return; }
    }
    const p = Math.max(0, Math.min(1, Math.abs(dx) / (largura * 0.9)));
    girar(alvo, modo === "prox" ? -180 * p : -180 * (1 - p), false);
  }, { passive: true });
  container.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dt = Date.now() - t0;
    x0 = null;
    if (!modo) { // toque
      if (Math.abs(dx) < 10 && dt < 400) {
        e.preventDefault(); // evita o "clique" que o navegador dispara depois do toque
        const r = container.getBoundingClientRect();
        (e.changedTouches[0].clientX - r.left > r.width * 0.35) ? proxima() : anterior();
      }
      return;
    }
    const rapido = Math.abs(dx) / Math.max(dt, 1) > 0.5;
    const passou = Math.abs(dx) > largura * 0.3 || rapido;
    if (modo === "prox") passou ? proxima(true) : voltarAoLugar(alvo, 0);
    else passou ? anterior(true) : voltarAoLugar(alvo, -180);
    modo = null;
  });
  container.addEventListener("click", e => { // mouse
    if (e.pointerType === "touch") return;
    const r = container.getBoundingClientRect();
    (e.clientX - r.left > r.width * 0.35) ? proxima() : anterior();
  });

  arrumar();
  return {
    getCurrentPageIndex: () => atual,
    getPageCount: () => n,
    getOrientation: () => "portrait",
    flipNext: () => proxima(),
    flipPrev: () => anterior(),
    turnToPage: i => { atual = Math.max(0, Math.min(n - 1, i)); arrumar(); },
    on: (ev, fn) => { (ouvintes[ev] = ouvintes[ev] || []).push(fn); },
    update: () => {},
  };
};
