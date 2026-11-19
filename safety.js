/* Six ways to show Verdex's safety record. Switch with ?v=1..6 (picker pill at the bottom). */
(() => {
  const LINK = 'https://verdex.com/safety/';
  const PH = '<span class="ph">Placeholder: Verdex\'s current EMR figure</span>';
  const head = (light, extra = '') => `
    <div class="s-head">
      <div class="s-head__t">
        <p class="idx${light ? ' idx--l' : ''}">[ 04 ] Safety record</p>
        <h2 class="display sec-title"><span>Everyone on site</span><span>goes home safe.</span></h2>
      </div>${extra}
    </div>`;
  const F = [
    { v: '100%', t: 'OSHA 10', d: 'Every team member is OSHA 10 certified.' },
    { v: 'OSHA 30', t: 'Superintendents', d: 'Every superintendent holds OSHA 30.' },
    { v: 'Monthly', t: 'Inspections', d: 'Unannounced third-party inspections on every active site.' },
    { v: 'STEP Silver', t: 'ABC award', d: 'Safety management award, 2023 and 2024.' },
  ];
  const NAMES = ['EMR on a scale', 'Report spread', 'Programme sheet', 'Toolbox talk', 'Bento with small charts', 'Homepage layout with the ruler'];

  const V = {
    /* 1. The EMR plotted on a 0 to 1.5 scale against the 1.0 industry line, the four commitments below. */
    1: () => {
      const ticks = Array.from({ length: 16 }, (_, i) => `<span class="g1__tick${i % 5 ? '' : ' is-major'}" style="left:${i / 15 * 100}%">${i % 5 ? '' : `<b>${(i / 10).toFixed(1)}</b>`}</span>`).join('');
      return `<section class="g1 s-sec s-dark"><div class="wrap">
        ${head(true, `<div class="s-head__aside"><p class="s-lede">Our experience modification rate sits well under the 1.0 industry baseline. Lower is safer, and it is what owners and insurers check first.</p><a class="link link--l" href="${LINK}">How our safety committee works</a></div>`)}
        <div class="g1__gauge">
          <div class="g1__labels"><span>Safer</span><span>Riskier</span></div>
          <div class="g1__track"><span class="g1__fill"></span>${ticks}
            <span class="g1__mark g1__mark--us"><span class="g1__flag"><b>0.XX</b>Verdex EMR</span></span>
            <span class="g1__mark g1__mark--ind"><span class="g1__flag"><b>1.0</b>Industry standard</span></span>
          </div>
          ${PH}
        </div>
        <ul class="g1__facts">${F.map((f, i) => `<li><span class="g1__no">0${i + 1}</span><b>${f.v}</b><span>${f.d}</span></li>`).join('')}</ul>
      </div></section>`;
    },

    /* 2. Annual-report spread: the photo holds one half, the numbers are set as a ruled list in the other. */
    2: () => `
      <section class="g2 s-dark">
        <div class="g2__img"><img src="media/safety-top.jpg" alt="Verdex superintendent tied off to a fall-arrest line on site" loading="lazy"><span class="tab tab--on g2__tag">Tied off, every time</span></div>
        <div class="g2__body">
          ${head(true)}
          <ol class="g2__list">
            <li class="g2__emr"><span class="g2__k">EMR</span><b>0.XX</b><span class="g2__d">Experience modification rate. Industry standard is 1.0; lower is safer. ${PH}</span></li>
            ${F.map(f => `<li><span class="g2__k">${f.t}</span><b>${f.v}</b><span class="g2__d">${f.d}</span></li>`).join('')}
          </ol>
          <a class="link link--l" href="${LINK}">How our safety committee works</a>
        </div>
      </section>`,

    /* 3. A programme sheet on light grey: every commitment as a row with who it covers, how often, and the result. */
    3: () => {
      const R = [
        ['OSHA 10 training', 'Every team member', 'On hire', '100%'],
        ['OSHA 30 training', 'Every superintendent', 'Before running a site', '100%'],
        ['Third-party inspection', 'Every active site', 'Monthly, unannounced', 'Monthly'],
        ['ABC STEP programme', 'Company-wide', 'Audited each year', 'Silver · 2023, 2024'],
        ['Experience modification rate', 'Company-wide', 'Rated yearly', '0.XX <small>vs 1.0</small>'],
      ];
      return `<section class="g3 s-sec"><div class="wrap">
        ${head(false, `<p class="s-lede">Five commitments, written down and checked by someone outside the company. Ask for any of them on your project.</p>`)}
        <div class="g3__grid">
          <div class="g3__img cut"><img src="media/jobsite.png" alt="Verdex superintendent walking an active masonry site with the crew" loading="lazy"></div>
          <div class="g3__sheet">
            <div class="g3__row g3__row--h"><span>Programme</span><span>Covers</span><span>How often</span><span>Result</span></div>
            ${R.map((r, i) => `<div class="g3__row"><span class="g3__p"><i>0${i + 1}</i>${r[0]}</span><span data-l="Covers">${r[1]}</span><span data-l="How often">${r[2]}</span><span class="g3__r">${r[3]}</span></div>`).join('')}
            <div class="g3__foot">${PH}<a class="link" href="${LINK}">How our safety committee works</a></div>
          </div>
        </div>
      </div></section>`;
    },

    /* 4. Full-bleed toolbox talk photo; the heading sits on it and the five numbers run along the foot as dark panels. */
    4: () => `
      <section class="g4">
        <div class="g4__img"><img src="media/safety.png" alt="Verdex morning safety meeting with the whole crew in front of the Verdex banner" loading="lazy"></div>
        <div class="g4__in wrap">
          ${head(true, `<a class="link link--l" href="${LINK}">How our safety committee works</a>`)}
          <ul class="g4__panels">
            <li class="g4__emr"><span class="g4__k">EMR</span><b>0.XX</b><span>Industry standard is 1.0</span></li>
            ${F.map(f => `<li><span class="g4__k">${f.t}</span><b>${f.v}</b><span>${f.d}</span></li>`).join('')}
          </ul>
          <span class="ph ph--d g4__ph">Placeholder: Verdex's current EMR figure</span>
        </div>
      </section>`,

    /* 5. Bento: a tall photo, then one cell per commitment, each with a small chart that shows the number. */
    5: () => `
      <section class="g5 s-sec s-dark"><div class="wrap">
        ${head(true, `<a class="link link--l" href="${LINK}">How our safety committee works</a>`)}
        <div class="g5__grid">
          <div class="g5__img cut"><img src="media/safety-top.jpg" alt="Verdex superintendent tied off on site" loading="lazy"><span class="tab tab--on g5__tag">On site, every day</span></div>
          <div class="g5__cell g5__emr">
            <span class="g5__k">Experience modification rate</span>
            <b class="g5__big">0.XX</b>
            <div class="g5__bars">
              <span class="g5__bar g5__bar--us" style="--w:70%"><i>Verdex</i></span>
              <span class="g5__bar g5__bar--ind" style="--w:100%"><i>Industry 1.0</i></span>
            </div>
            ${PH}
          </div>
          <div class="g5__cell">
            <span class="g5__k">OSHA 10</span>
            <span class="g5__ring"><b>100%</b></span>
            <span class="g5__d">of the team certified</span>
          </div>
          <div class="g5__cell">
            <span class="g5__k">Third-party inspections</span>
            <span class="g5__months">${'JFMAMJJASOND'.split('').map(m => `<i>${m}</i>`).join('')}</span>
            <span class="g5__d">Unannounced, every month, every site</span>
          </div>
          <div class="g5__cell">
            <span class="g5__k">OSHA 30</span>
            <b class="g5__mid">Every</b>
            <span class="g5__d">superintendent, before they run a site</span>
          </div>
          <div class="g5__cell">
            <span class="g5__k">ABC STEP award</span>
            <b class="g5__mid">Silver</b>
            <span class="g5__yrs"><span class="tab tab--line">2023</span><span class="tab tab--line">2024</span></span>
          </div>
        </div>
      </div></section>`,
    /* 6. The homepage section exactly, with the blue EMR card swapped for the ruler from option 1. */
    6: () => {
      const ticks = Array.from({ length: 16 }, (_, i) => `<span class="g1__tick${i % 5 ? '' : ' is-major'}" style="left:${i / 15 * 100}%">${i % 5 ? '' : `<b>${(i / 10).toFixed(1)}</b>`}</span>`).join('');
      return `<section class="safety" id="safety">
        <div class="wrap">
          <div class="safety__head">
            <p class="idx idx--l">[ 04 ] Safety record</p>
            <h2 class="display sec-title"><span>Everyone on site</span><span>goes home safe.</span></h2>
          </div>
          <div class="safety__grid">
            <div class="safety__img cut"><img src="media/safety-top.jpg" alt="Verdex team member in hard hat and hi-vis vest on site" loading="lazy"></div>
            <div class="g6">
              <div class="g1__labels"><span>Experience modification rate</span><span>Lower is safer</span></div>
              <div class="g1__track"><span class="g1__fill"></span>${ticks}
                <span class="g1__mark g1__mark--us"><span class="g1__flag"><b>0.XX</b>Verdex</span></span>
                <span class="g1__mark g1__mark--ind"><span class="g1__flag"><b>1.0</b>Industry standard</span></span>
              </div>
              <span class="ph">Placeholder: Verdex's current EMR figure</span>
            </div>
            <ul class="sfacts">
              <li><b>100%</b><span>of our team OSHA 10 certified</span></li>
              <li><b>OSHA 30</b><span>for every superintendent</span></li>
              <li><b>Monthly</b><span>unannounced third-party site inspections</span></li>
              <li><b>STEP Silver</b><span>ABC safety management award, 2023 &amp; 2024</span></li>
            </ul>
          </div>
          <a class="link link--l" href="${LINK}">How our safety committee works</a>
        </div>
      </section>`;
    },
  };

  const qs = new URLSearchParams(location.search);
  let v = +qs.get('v'); if (!(v >= 1 && v <= 6)) v = 1;
  document.getElementById('stage').innerHTML = V[v]();
  document.getElementById('optNo').textContent = v;
  document.getElementById('optName').textContent = NAMES[v - 1];
  document.querySelectorAll('.picker a').forEach(a => a.classList.toggle('is-on', +a.dataset.v === v));
  document.body.dataset.s = v;
})();
