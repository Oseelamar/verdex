/* Verdex homepage proposal. Review switches: ?flat turns off motion. */
(() => {
  const qs = new URLSearchParams(location.search);
  const root = document.documentElement;
  const flat = qs.has('flat') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (flat) root.classList.add('flat'); else root.classList.add('js');

  document.getElementById('yr').textContent = new Date().getFullYear();

  /* header: hide utility bar and darken once past the top */
  const hdr = document.getElementById('hdr');
  const onScroll = () => hdr.classList.toggle('is-stuck', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* nav dropdown toggles (touch + keyboard) */
  document.querySelectorAll('.nav__tog').forEach(b => b.addEventListener('click', () => {
    const li = b.parentElement, open = !li.classList.contains('open');
    document.querySelectorAll('.nav__list>li.open').forEach(x => x.classList.remove('open'));
    li.classList.toggle('open', open); b.setAttribute('aria-expanded', open);
  }));
  document.addEventListener('click', e => { if (!e.target.closest('.nav__list')) document.querySelectorAll('.nav__list>li.open').forEach(x => x.classList.remove('open')); });

  /* mobile menu */
  const mm = document.getElementById('mm');
  document.getElementById('burger').addEventListener('click', () => mm.showModal());
  document.getElementById('mmClose').addEventListener('click', () => mm.close());
  mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.close()));
  mm.querySelectorAll('.mm__head').forEach(h => h.addEventListener('click', () => h.parentElement.classList.toggle('open')));

  /* how-we-work accordion: one open at a time */
  const steps = [...document.querySelectorAll('.step')];
  steps.forEach(s => s.querySelector('.step__h').addEventListener('click', () => {
    steps.forEach(x => x.classList.toggle('is-on', x === s));
  }));

  /* ranking climb chart (SFBJ largest GCs in South Florida) */
  const ranks = [[2017,18],[2018,15],[2019,11],[2020,11],[2021,9],[2022,9],[2023,6],[2024,6],[2025,11],[2026,8]];
  const climb = document.getElementById('climb');
  const worst = 20;
  climb.innerHTML = ranks.map(([y, r], i) => {
    const h = Math.round(((worst + 1 - r) / worst) * 100);
    const cls = y === 2026 ? ' cb--now' : (r === 6 ? ' cb--best' : '');
    return `<div class="cb${cls}"><div class="cb__col" style="--h:${h}%;transition-delay:${i * 70}ms"><span class="cb__r">#${r}</span></div><span class="cb__y">${y}</span></div>`;
  }).join('');

  if (flat) return;

  /* split display headings into masked lines */
  document.querySelectorAll('[data-lines]').forEach(h => {
    h.querySelectorAll(':scope > span').forEach((s, i) => {
      s.innerHTML = `<span class="ln" style="transition-delay:${i * 90}ms">${s.innerHTML}</span>`;
    });
  });

  /* frames open from the bottom */
  const frames = document.querySelectorAll('.scard__img, .wcard__img, .how__frame, .safety__img, .lead__img, .door__img, .ncard__img');
  frames.forEach(f => f.classList.add('rv'));

  /* tags inside frames drop in when their own card is in view (works for sideways swipe rows too) */
  const drops = document.querySelectorAll('.wcard__img .tab, .how__tab, .door > .tab');
  drops.forEach(t => t.classList.add('drop'));
  const dio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    dio.unobserve(e.target);
    /* the photo frame opens from the bottom first; the tag sits at its top edge, so wait until the frame has opened
       or the drop happens out of sight behind the frame's mask */
    const f = e.target.querySelector('.rv'), opened = f && f.dataset.t ? performance.now() - f.dataset.t : 0;
    const wait = !f ? 150 : !f.classList.contains('in') ? 1100 : Math.max(150, 1000 - opened);
    e.target.querySelectorAll('.drop').forEach(t => { t.style.setProperty('--d', '0s'); setTimeout(() => t.classList.add('in'), wait); });
  }), { threshold: .3 });
  /* watch the card, not the frame: the frame's own clip-path reveal hides it from the observer */
  new Set([...drops].map(t => t.closest('.wcard, .how__media, .door'))).forEach(c => dio.observe(c));

  /* short lists rise in one item after another */
  const lists = document.querySelectorAll('.sfacts, .awards, .proof__grid');
  lists.forEach(l => l.classList.add('stagger'));

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); e.target.dataset.t = performance.now(); io.unobserve(e.target);
    if (e.target.matches('.proof__grid')) countUp(e.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-lines], .rv, .climb, .proof__grid, .stagger').forEach(el => io.observe(el));

  /* backup sweep for fast flicks: anything already above the fold line gets revealed */
  const sweep = () => document.querySelectorAll('[data-lines]:not(.in), .rv:not(.in), .climb:not(.in), .stagger:not(.in)').forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight * .95) { el.classList.add('in'); el.dataset.t = performance.now(); }
  });
  addEventListener('scroll', sweep, { passive: true }); sweep();

  /* EMR ruler: once any part of the bar is on screen, the fill, the Verdex line and the figure run up from 0 to 0.70 */
  const ruler = document.querySelector('.ruler');
  if (ruler) {
    const track = ruler.querySelector('.ruler__track'), mark = ruler.querySelector('.ruler__mark--us'),
          num = mark.querySelector('b'), flag = mark.querySelector('.ruler__flag'),
          end = parseFloat(num.textContent), max = 1.5;
    num.textContent = '0.00'; mark.classList.add('is-flip');
    const run = () => {
      const t0 = performance.now(), d = 1800;
      const step = t => {
        const k = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - k, 3), v = end * e;
        ruler.style.setProperty('--p', (v / max).toFixed(4));
        num.textContent = v.toFixed(2);
        mark.classList.toggle('is-flip', track.offsetWidth * v / max < flag.offsetWidth + 16);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const ro = new IntersectionObserver(es => { if (es[0].isIntersecting) { ro.disconnect(); run(); } }, { threshold: .3 });
    ro.observe(track);
  }

  /* digits count up once */
  function countUp(box) {
    box.querySelectorAll('[data-count]').forEach(el => {
      const end = +el.dataset.count, t0 = performance.now(), d = 1200;
      const step = t => {
        const p = Math.min(1, (t - t0) / d);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }
})();
