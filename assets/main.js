/* =========================================================================
   PREHISTORIC ARCHIVE — main.js  (no libraries, path-aware)
   Reads <body data-root="..."> to prefix note links correctly.
     root pages  -> data-root=""        links become "notes/file.html"
     note pages  -> data-root="../"     links become "../notes/... " etc.
   ========================================================================= */
(function () {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const ROOT = document.body.getAttribute("data-root") || ""; // "" or "../"
  const notePath = (file) => (file ? ROOT + "notes/" + file : "");

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from((c || document).querySelectorAll(s));
  const statusClass = (s) => (s || "").toLowerCase().replace(/\s+/g, "-");

  /* ---- inject site text where present ---- */
  if (typeof SITE !== "undefined") {

    $$("[data-site]").forEach((el) => {
      const key = el.getAttribute("data-site");
      if (SITE[key] != null) el.textContent = SITE[key];
    });
  }

  /* ---- hero staged intro ---- */
  if (document.body.classList.contains("page-home")) {
    requestAnimationFrame(() => setTimeout(() => document.body.classList.add("hero-loaded"), 120));
  }

  /* ---- nav ---- */
  const nav = $("#siteNav"), navToggle = $("#navToggle"), navLinks = $("#navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });

    $$("a", navLinks).forEach((a) => a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }));
  }
  if (nav && !nav.classList.contains("solid")) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- atmosphere: dust + rain ---- */
  if (!reduceMotion) {
    const dustHost = $("#particles"), rainHost = $("#rain");
    if (dustHost) for (let i = 0, n = isMobile ? 14 : 30; i < n; i++) {
      const d = document.createElement("span"); d.className = "dust";
      d.style.left = Math.random()*100+"%"; d.style.bottom = Math.random()*40+"%";
      d.style.animationDuration = 14+Math.random()*20+"s";
      d.style.animationDelay = -Math.random()*20+"s"; d.style.opacity = .3+Math.random()*.5;
      dustHost.appendChild(d);
    }
    if (rainHost) for (let i = 0, n = isMobile ? 16 : 34; i < n; i++) {
      const r = document.createElement("span"); r.className = "raindrop";
      r.style.left = Math.random()*100+"%"; r.style.animationDuration = .7+Math.random()*.8+"s";
      r.style.animationDelay = -Math.random()*2+"s"; r.style.opacity = .15+Math.random()*.35;
      rainHost.appendChild(r);
    }
  }

  /* ---- subtle parallax (desktop only) ---- */
  if (!reduceMotion && !isMobile) {
    const els = $$("[data-depth]");
    if (els.length) {
      let tx=0,ty=0,cx=0,cy=0;
      window.addEventListener("mousemove", (e) => {
        tx=(e.clientX/window.innerWidth-.5)*2; ty=(e.clientY/window.innerHeight-.5)*2;
      });
      (function loop(){ cx+=(tx-cx)*.05; cy+=(ty-cy)*.05;
        els.forEach((el)=>{const d=parseFloat(el.dataset.depth)||.05;
          el.style.transform=`translate(${cx*d*60}px,${cy*d*40}px)`;});
        requestAnimationFrame(loop);})();
    }
  }

  /* ---- footprint trail ---- */
  const trail = $("#footprintTrail");
  if (trail && !reduceMotion) {
    for (let i=0;i<6;i++){ const p=document.createElement("span"); p.className="print";
      const t=i/5; p.style.left=t*84+"%"; p.style.top=t*74+(i%2?8:-8)+"%";
      p.style.transform=`rotate(${-8+t*24}deg) scale(${.7+t*.6})`;
      p.style.transitionDelay=i*.12+"s"; trail.appendChild(p);}
    new IntersectionObserver((ents,obs)=>{ents.forEach((e)=>{if(e.isIntersecting){

      $$(".print",trail).forEach((p)=>p.classList.add("show")); obs.disconnect();}});},{threshold:.3}).observe(trail);
  }

  /* ---- render helpers ---- */
  function specCard(e){
    const href = e.file ? `href="${notePath(e.file)}" data-transition` : `href="#" aria-disabled="true"`;
    const thumb = e.image ? `<img class="spec-thumb" src="${ROOT+e.image}" alt="" loading="lazy">` : "";
    return `<a class="spec-card" ${href}>
      <div class="spec-top"><span class="spec-num">EXPEDITION ${e.number}</span>
        <span class="spec-icon" aria-hidden="true">${e.icon||"🦴"}</span></div>
      ${thumb}
      <h3 class="spec-title">${e.title}</h3>
      <p class="spec-class">${e.category}</p>
      <p class="spec-desc">${e.description}</p>
      <div class="spec-foot">
        <span class="spec-status ${statusClass(e.status)}"><span class="pulse-dot"></span>${e.status}</span>
        <span class="spec-examine">Examine →</span></div></a>`;
  }
  function recordRow(e){
    const has=!!e.file, tag=has?"a":"div", attrs=has?`href="${notePath(e.file)}" data-transition`:"";
    const cta=has?"Examine Notes →":"Unexcavated";
    return `<${tag} class="record ${has?"":"locked"}" ${attrs}>
      <div class="rec-id"><span class="icon" aria-hidden="true">${e.icon||"🦴"}</span>
        <span class="exp">Expedition</span><span class="num">${e.number}</span></div>
      <div class="rec-body"><h3 class="rec-title">${e.title}</h3>
        <p class="rec-class">Classification: ${e.category}</p>
        <p class="rec-desc">${e.description}</p></div>
      <div class="rec-meta"><span class="rec-date">${e.date||""}</span>
        <span class="spec-status ${statusClass(e.status)}"><span class="pulse-dot"></span>${e.status}</span>
        <span class="rec-cta">${cta}</span></div></${tag}>`;
  }

  /* ---- home featured ---- */
  const featuredGrid = $("#featuredGrid");
  if (featuredGrid && typeof archiveEntries !== "undefined") {
    const feat = archiveEntries.filter((e)=>e.featured);
    featuredGrid.innerHTML = (feat.length?feat:archiveEntries).slice(0,3).map(specCard).join("");
  }

  /* ---- archive + filters ---- */
  const archiveList = $("#archiveList");
  if (archiveList && typeof archiveEntries !== "undefined") {
    const render = (filter) => {
      const list = (filter&&filter!=="ALL") ? archiveEntries.filter((e)=>e.category===filter) : archiveEntries;
      archiveList.innerHTML = list.map(recordRow).join("");
      const cnt=$("#specimenCount"); if(cnt) cnt.textContent=list.length;
      observeFadeTargets();
    };
    const filterRow = $("#filterRow");
    if (filterRow) {
      const cats = ["ALL", ...new Set(archiveEntries.map((e)=>e.category))];
      filterRow.innerHTML = cats.map((c,i)=>`<button class="filter-btn ${i===0?"active":""}" data-cat="${c}">${c}</button>`).join("");
      filterRow.addEventListener("click",(e)=>{const b=e.target.closest(".filter-btn"); if(!b) return;

        $$(".filter-btn",filterRow).forEach((x)=>x.classList.remove("active")); b.classList.add("active"); render(b.dataset.cat);});
    }
    render("ALL");
  }

  /* ---- discoveries ---- */
  const discoveryList = $("#discoveryList");
  if (discoveryList && typeof discoveryEntries !== "undefined") {
    discoveryList.innerHTML = discoveryEntries.map(recordRow).join("");
  }

  /* ---- about text ---- */
  const aboutMain = $("#aboutMain");
  if (aboutMain && typeof SITE !== "undefined" && SITE.aboutText) {
    aboutMain.innerHTML = SITE.aboutText.map((p,i)=>i===0?`<p class="about-lead">${p}</p>`:`<p>${p}</p>`).join("");
  }

  /* ---- scroll fade-up ---- */
  let fadeObs;
  function observeFadeTargets(){
    const t=$$(".fade-up:not(.in)");
    if (reduceMotion){t.forEach((x)=>x.classList.add("in")); return;}
    if(!fadeObs) fadeObs=new IntersectionObserver((ents)=>{ents.forEach((e)=>{if(e.isIntersecting){
      e.target.classList.add("in"); fadeObs.unobserve(e.target);}});},{threshold:.15});
    t.forEach((x)=>fadeObs.observe(x));
  }
  observeFadeTargets();

  /* ---- cinematic page transition ---- */
  const overlay = $("#pageTransition");
  if (overlay) document.addEventListener("click",(e)=>{
    const link=e.target.closest("a[data-transition]"); if(!link) return;
    const href=link.getAttribute("href");
    if(!href||href==="#"||link.getAttribute("aria-disabled")==="true"){e.preventDefault();return;}
    if(reduceMotion) return;
    e.preventDefault(); overlay.classList.add("active");
    setTimeout(()=>{window.location.href=href;},620);
  });

  /* ---- ambience audio (off by default, safe if file missing) ---- */
  const audio=$("#ambienceAudio"), ambBtn=$("#ambienceToggle");
  if (audio && ambBtn) {
    let on=false;
    ambBtn.addEventListener("click",()=>{
      on=!on; const label=$(".ctrl-label",ambBtn), icon=$(".ctrl-icon",ambBtn);
      if(on){ audio.volume=0; const p=audio.play(); if(p) p.catch(()=>{});
        let v=0; const f=setInterval(()=>{v=Math.min(.4,v+.03); audio.volume=v; if(v>=.4) clearInterval(f);},90);
        ambBtn.classList.add("on"); ambBtn.setAttribute("aria-pressed","true");
        if(label) label.textContent="AMBIENCE ON"; if(icon) icon.textContent="🔊";
      } else { audio.pause(); ambBtn.classList.remove("on"); ambBtn.setAttribute("aria-pressed","false");
        if(label) label.textContent="AMBIENCE OFF"; if(icon) icon.textContent="🔈"; }
    });
  }

    /* ============================================================
     JURASSIC FX PACK
     ============================================================ */

  /* ---- cursor-follow amber glow on cards & records ---- */
  if (!reduceMotion && !isMobile) {
    const glowTargets = () => $$(".spec-card, .record:not(.locked)");
    document.addEventListener("mousemove", (e) => {
      const el = e.target.closest(".spec-card, .record");
      if (!el || el.classList.contains("locked")) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    }, { passive: true });
    // re-bind is unnecessary — event delegation covers dynamically rendered cards
    void glowTargets;
  }

  /* ---- rising embers in the WARNING section ---- */
  if (!reduceMotion) {
    const warnZone = $(".warning");
    if (warnZone) {
      const n = isMobile ? 10 : 22;
      for (let i = 0; i < n; i++) {
        const em = document.createElement("span");
        em.className = "ember";
        em.style.left = Math.random() * 100 + "%";
        em.style.animationDuration = 4 + Math.random() * 5 + "s";
        em.style.animationDelay = -Math.random() * 6 + "s";
        const s = 0.6 + Math.random() * 1.6;
        em.style.width = em.style.height = s * 3 + "px";
        warnZone.appendChild(em);
      }
    }
  }

  /* ---- drifting amber spores in dark sections ---- */
  if (!reduceMotion) {
    const sporeHosts = $$(".featured, .creed, .about-body, .archive-body, .note-body");
    sporeHosts.forEach((host) => {
      if (getComputedStyle(host).position === "static") host.style.position = "relative";
      host.style.overflow = host.style.overflow || "hidden";
      const n = isMobile ? 4 : 9;
      for (let i = 0; i < n; i++) {
        const sp = document.createElement("span");
        sp.className = "spore";
        sp.style.left = Math.random() * 100 + "%";
        sp.style.top = 20 + Math.random() * 70 + "%";
        sp.style.animationDuration = 8 + Math.random() * 10 + "s";
        sp.style.animationDelay = -Math.random() * 12 + "s";
        host.appendChild(sp);
      }
    });
  }

  /* ---- blinking predator eyes in the hero jungle ---- */
  if (!reduceMotion) {
    const scene = $(".hero-scene");
    if (scene) {
      const spots = [
        { l: 38, t: 62 }, { l: 55, t: 70 }, { l: 72, t: 58 }, { l: 20, t: 66 }
      ];
      spots.forEach((s, i) => {
        // eyes come in pairs
        [0, 8].forEach((dx) => {
          const eye = document.createElement("span");
          eye.className = "eye-glow";
          eye.style.left = s.l + dx * 0.4 + "%";
          eye.style.top = s.t + "%";
          eye.style.animationDelay = -(i * 1.7) + "s";
          scene.appendChild(eye);
        });
      });
    }
  }

  /* ---- creed lines carve in on scroll ---- */
  if (!reduceMotion) {
    const creedLines = $$(".creed-line");
    if (creedLines.length) {
      const co = new IntersectionObserver((ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) {
            const idx = creedLines.indexOf(e.target);
            e.target.style.animationDelay = (idx * 0.18) + "s";
            e.target.classList.add("in-view");
            co.unobserve(e.target);
          }
        });
      }, { threshold: 0.6 });
      creedLines.forEach((l) => co.observe(l));
    }
  }

  /* ---- T-Rex roar-lunge when hero enters view (subtle) ---- */
  if (!reduceMotion) {
    const trex = $(".trex");
    if (trex) {
      let lunged = false;
      const lunge = () => {
        if (lunged) return; lunged = true;
        trex.animate(
          [
            { transform: "translateX(0) scale(1)" },
            { transform: "translateX(-3%) scale(1.06)" },
            { transform: "translateX(0) scale(1)" }
          ],
          { duration: 1400, easing: "cubic-bezier(.2,.7,.2,1)" }
        );
      };
      setTimeout(lunge, 2200);
    }
  }       
})();
