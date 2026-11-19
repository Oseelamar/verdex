/* Eleven ways to show Verdex's eight sectors. Switch with ?v=1..11 (picker pill at the bottom). */
(() => {
  const U = 'https://verdex.com/';
  const S = [
    { n: 'Multifamily', c: 33, d: 'Apartments, student housing', img: 's-multifamily.jpg', url: 'multifamily/', p: ['The Adderley Apartments', 'Vine on Clematis', 'Cortland Royal Palm Beach'] },
    { n: 'Industrial', c: 4, d: 'Logistics, manufacturing', img: 's-industrial.jpg', url: 'industrial-manufacturing/', p: ['Airport Logistics Warehouse', 'Turnpike Business Park', 'South Martin Industrial Park'] },
    { n: 'Commercial / Retail', c: 3, d: 'Mixed use, office, retail', img: 's-commercial.jpg', url: 'commercial-retail-construction/', p: ['Jupiter Mixed Use', '1000 North Restaurant / Club', 'Belcan Office Renovation'] },
    { n: 'Senior Living', c: 5, d: 'Independent and assisted', img: 's-senior.jpg', url: 'senior-living/', p: ['Grand Living West Palm Beach', 'Sovana at Stuart', 'Deer Creek Senior Housing'] },
    { n: 'Hospitality', c: 6, d: 'Hotels, clubhouses', img: 's-hospitality.jpg', url: 'hospitality/', p: ['Canopy Hotel by Hilton', 'Aloft Hotel', 'Marriott TownePlace Suites'] },
    { n: 'Tenant Improvements', c: 14, d: 'Offices, medical, buildouts', img: 's-ti.jpg', url: 'tenant-improvements/', p: ['NDX Office Buildout', 'Neptune Wellness Solutions', 'Mount Sinai Icahn School of Medicine'] },
    { n: 'Government / Education', c: 11, d: 'Civic, schools, campus', img: 's-gov.jpg', url: 'government-public-works-education-construction/', p: ['Village Hall of Royal Palm Beach', 'FAU Campus Recreation Center', 'Banyan Creek Elementary'] },
    { n: 'Non-Profit', c: 5, d: 'Campuses, food bank', img: 's-nonprofit.jpg', url: 'non-profit/', p: ['HomeSafe Bernstein Family Campus', 'HomeSafe Libra Girls Cottage', 'Treasure Coast Food Bank'] },
  ];
  const pad = i => String(i + 1).padStart(2, '0');
  const img = (s, cls = '') => `<img class="${cls}" src="media/${s.img}" alt="${s.n} project by Verdex" loading="lazy">`;
  const NAMES = ['Index list with photo preview', 'Quiet photo grid', 'Sector tabs and one panel', 'Expanding strips', 'Sized by the work', 'Photo frames with an inset name plate', 'Floating plate across the foot', 'Photo set into a grey mat', 'Grey photos that wake on hover', 'Two large, then six', 'Homepage cards, short top, tag drops onto the photo'];

  const V = {
    /* 1. Editorial index: thin rows; the photo beside the list follows the row you point at. */
    1: () => `
      <div class="o1">
        <ol class="o1__list">${S.map((s, i) => `
          <li><a class="o1__row${i ? '' : ' is-on'}" href="${U + s.url}" data-i="${i}">
            <span class="o1__no">${pad(i)}</span>
            <span class="o1__name">${s.n}</span>
            <span class="o1__d">${s.d}</span>
            <span class="o1__c">${s.c} projects</span>
            <span class="o1__thumb">${img(s)}</span>
          </a></li>`).join('')}
        </ol>
        <div class="o1__view cut">${S.map((s, i) => img(s, i ? '' : 'is-on')).join('')}
          <span class="tab tab--on o1__tag" id="o1tag">${S[0].n} · ${S[0].c}</span></div>
      </div>`,

    /* 2. Photo grid: no colour blocks, just the photo with a small tab and one caption line. */
    2: () => `
      <ul class="o2">${S.map((s, i) => `
        <li><a class="o2__card" href="${U + s.url}">
          <span class="o2__img cut">${img(s)}<span class="tab tab--on o2__tab">${pad(i)}</span></span>
          <span class="o2__cap"><span class="o2__name">${s.n}</span><span class="o2__c">${s.c}</span></span>
          <span class="o2__d">${s.d}</span>
        </a></li>`).join('')}
      </ul>`,

    /* 3. One panel at a time, chosen from a row of trapezoid tabs. */
    3: () => `
      <div class="o3">
        <div class="o3__tabs" role="tablist">${S.map((s, i) => `
          <button class="o3__tab${i ? '' : ' is-on'}" role="tab" aria-selected="${!i}" data-i="${i}">${s.n}<span>${s.c}</span></button>`).join('')}
        </div>
        <div class="o3__panel">
          <div class="o3__img cut">${S.map((s, i) => img(s, i ? '' : 'is-on')).join('')}</div>
          <div class="o3__body" id="o3body"></div>
        </div>
      </div>`,

    /* 4. Eight slim strips; the chosen one opens to show its photo. */
    4: () => `
      <div class="o4">${S.map((s, i) => `
        <a class="o4__strip${i ? '' : ' is-on'}" href="${U + s.url}" data-i="${i}">
          ${img(s)}
          <span class="o4__shade"></span>
          <span class="o4__no">${pad(i)}</span>
          <span class="o4__v">${s.n}</span>
          <span class="o4__open"><span class="o4__name">${s.n}</span><span class="o4__d">${s.c} projects · ${s.d}</span><span class="link link--w">See the work</span></span>
        </a>`).join('')}
      </div>`,

    /* 5. Bento: cell size follows how much Verdex has built in each sector. */
    5: () => {
      const order = [0, 5, 6, 4, 3, 7, 1, 2];
      return `<div class="o5">${order.map((k, j) => {
        const s = S[k], photo = j < 3;
        return `<a class="o5__cell o5__cell--${j}${photo ? ' o5__cell--ph' : ''}" href="${U + s.url}">
          ${photo ? `<span class="o5__img">${img(s)}</span>` : ''}
          <span class="o5__c">${s.c}</span>
          <span class="o5__txt"><span class="o5__name">${s.n}</span><span class="o5__d">${s.d}</span></span>
        </a>`;
      }).join('')}</div>`;
    },

    /* 6. Plain rectangular photo frames. A grey plate is set into the bottom-left corner of each,
          like a notch cut out of the photo, holding the name. Hover only turns the name light blue. */
    6: () => `
      <ul class="o6">${S.map((s, i) => `
        <li><a class="o6__card" href="${U + s.url}">
          ${img(s)}
          <span class="o6__plate">
            <span class="o6__no">${pad(i)}</span>
            <span class="o6__name">${s.n}</span>
            <span class="o6__c">${s.c} projects</span>
          </span>
        </a></li>`).join('')}
      </ul>`,
    /* 7. Same plain frame; the plate floats inside the photo with an even margin and runs the full width. */
    7: () => `
      <ul class="o7">${S.map((s, i) => `
        <li><a class="o7__card" href="${U + s.url}">
          ${img(s)}
          <span class="o7__plate"><span class="o7__name">${s.n}</span><span class="o7__c">${s.c}</span></span>
        </a></li>`).join('')}
      </ul>`,

    /* 8. The grey frame is a mat: the photo is indented inside it, the name sits on the mat underneath. */
    8: () => `
      <ul class="o8">${S.map((s, i) => `
        <li><a class="o8__card" href="${U + s.url}">
          <span class="o8__img">${img(s)}</span>
          <span class="o8__foot"><span class="o8__name">${s.n}</span><span class="o8__c">${pad(i)} · ${s.c} projects</span></span>
        </a></li>`).join('')}
      </ul>`,

    /* 9. Photos are toned blue-grey so the whole block reads as one colour; hover brings the photo back and the name turns light blue. */
    9: () => `
      <ul class="o9">${S.map((s, i) => `
        <li><a class="o9__card" href="${U + s.url}">
          ${img(s)}
          <span class="o9__plate"><span class="o9__name">${s.n}</span></span>
          <span class="o9__c">${s.c}</span>
        </a></li>`).join('')}
      </ul>`,

    /* 10. Uneven rhythm: the two biggest sectors run wide, the other six sit three to a row. Plate notched into the top left. */
    10: () => `
      <ul class="o10">${[0, 5, 6, 4, 3, 7, 1, 2].map(k => S[k]).map((s, i) => `
        <li class="${i < 2 ? 'is-wide' : ''}"><a class="o10__card" href="${U + s.url}">
          ${img(s)}
          <span class="o10__plate"><span class="o10__no">${pad(i)}</span><span class="o10__name">${s.n}</span></span>
          <span class="o10__c">${s.c} projects</span>
        </a></li>`).join('')}
      </ul>`,
    /* 11. The homepage cards, slimmed: a short one-line grey top with the corner cut, and the slim tag now sits on the photo,
           sliding down from the top edge on hover. */
    11: () => {
      return `<ul class="o11">${S.map((s, i) => `
        <li><a class="o11__card" href="${U + s.url}">
          <span class="o11__top"><span class="o11__name">${s.n}</span><span class="o11__n">(${String(s.c).padStart(2, '0')})</span></span>
          <span class="o11__img">${img(s)}<span class="o11__bar">${s.c} projects · ${s.d}</span></span>
        </a></li>`).join('')}
      </ul>`;
    },
  };

  const qs = new URLSearchParams(location.search);
  let v = +qs.get('v'); if (!(v >= 1 && v <= 11)) v = 1;
  document.getElementById('stage').innerHTML = V[v]();
  document.getElementById('optNo').textContent = v;
  document.getElementById('optName').textContent = NAMES[v - 1];
  document.querySelectorAll('.picker a').forEach(a => a.classList.toggle('is-on', +a.dataset.v === v));
  document.body.dataset.v = v;

  /* behaviours */
  if (v === 1) {
    const rows = [...document.querySelectorAll('.o1__row')], pics = [...document.querySelectorAll('.o1__view img')], tag = document.getElementById('o1tag');
    const set = i => { rows.forEach((r, k) => r.classList.toggle('is-on', k === i)); pics.forEach((p, k) => p.classList.toggle('is-on', k === i)); tag.textContent = `${S[i].n} · ${S[i].c}`; };
    rows.forEach(r => { r.addEventListener('mouseenter', () => set(+r.dataset.i)); r.addEventListener('focus', () => set(+r.dataset.i)); });
  }
  if (v === 3) {
    const tabs = [...document.querySelectorAll('.o3__tab')], pics = [...document.querySelectorAll('.o3__img img')], body = document.getElementById('o3body');
    const set = i => {
      const s = S[i];
      tabs.forEach((t, k) => { t.classList.toggle('is-on', k === i); t.setAttribute('aria-selected', k === i); });
      pics.forEach((p, k) => p.classList.toggle('is-on', k === i));
      body.innerHTML = `<span class="idx">Sector ${pad(i)}</span>
        <span class="o3__name display">${s.n}</span>
        <span class="o3__c"><b>${s.c}</b> projects delivered</span>
        <span class="o3__d">${s.d}</span>
        <ul class="o3__p">${s.p.map(x => `<li>${x}</li>`).join('')}</ul>
        <a class="link" href="${U + s.url}">See all ${s.n.toLowerCase()} work</a>`;
    };
    tabs.forEach(t => t.addEventListener('click', () => set(+t.dataset.i))); set(0);
  }
  if (v === 4) {
    const strips = [...document.querySelectorAll('.o4__strip')];
    const set = i => strips.forEach((s, k) => s.classList.toggle('is-on', k === i));
    const fine = matchMedia('(hover:hover)').matches;
    strips.forEach(s => {
      if (fine) s.addEventListener('mouseenter', () => set(+s.dataset.i));
      s.addEventListener('focus', () => set(+s.dataset.i));
      /* touch: first tap opens, second tap follows the link */
      s.addEventListener('click', e => { if (!s.classList.contains('is-on')) { e.preventDefault(); set(+s.dataset.i); } });
    });
  }
})();
