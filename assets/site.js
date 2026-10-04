/* Shiv Accounting — interactions & motion */
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* mobile menu */
  var b = document.querySelector('.menu-btn'), m = document.getElementById('mobile-menu');
  if (b && m) b.addEventListener('click', function () {
    var o = m.classList.toggle('open');
    b.setAttribute('aria-expanded', o ? 'true' : 'false');
    b.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
  });
  var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();

  /* software filter tabs */
  document.querySelectorAll('[data-sw]').forEach(function (wrap) {
    var tabs = wrap.querySelectorAll('.sw-tab'), cards = wrap.querySelectorAll('.logo-card'), count = wrap.querySelector('.sw-count');
    function show(cat) {
      var n = 0;
      tabs.forEach(function (t) { t.setAttribute('aria-pressed', t.dataset.cat === cat ? 'true' : 'false'); });
      cards.forEach(function (c, i) {
        var on = cat === 'all' || c.dataset.cat === cat;
        c.hidden = !on;
        if (on) { n++; if (!reduce) { c.classList.remove('pop'); void c.offsetWidth; c.style.animationDelay = (Math.min(n, 12) * 35) + 'ms'; c.classList.add('pop'); } }
      });
      if (count) count.textContent = n + (n === 1 ? ' platform' : ' platforms');
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.dataset.cat); }); });
    show('all');
  });

  if (reduce || !('IntersectionObserver' in window)) return;
  doc.classList.add('motion');

  /* scroll reveal with gentle stagger among siblings */
  var sel = '.reveal, .card, .head-row, .ind, .visual, .tl, .trust > div, .ctile, .quote > *, .pills .pill, .split > div, .g > div, .cta-block > *';
  var els = Array.prototype.slice.call(document.querySelectorAll(sel)).filter(function (e) {
    return !e.closest('.hero-copy') && !e.closest('.collage') && !e.closest('.site-header') && !e.closest('[data-sw]') && !e.parentElement.closest('.card');
  });
  els.forEach(function (e) {
    var sibs = Array.prototype.filter.call(e.parentElement.children, function (s) { return els.indexOf(s) > -1; });
    e.style.setProperty('--d', (Math.min(sibs.indexOf(e), 6) * 70) + 'ms');
    e.classList.add('rv');
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (e) { io.observe(e); });

  /* animated counters: any .stat or [data-count] */
  function countUp(el) {
    var txt = el.textContent.trim(), mt = txt.match(/^(\D*)(\d+)(.*)$/);
    if (!mt) return;
    var pre = mt[1], end = parseInt(mt[2], 10), post = mt[3], t0 = null, dur = 1200;
    if (end > 3000 || /^[–-]/.test(post)) return; /* skip years and ranges */
    function step(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + Math.round(end * e) + post; if (p < 1) requestAnimationFrame(step); }
    el.textContent = pre + '0' + post; requestAnimationFrame(step);
  }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } });
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat, [data-count]').forEach(function (e) { cio.observe(e); });

  /* timeline bars / AR bars fill when visible */
  var bio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); bio.unobserve(en.target); } });
  }, { threshold: 0.4 });
  document.querySelectorAll('.timeline-bar, .bar, .draw').forEach(function (e) { e.classList.add('grow'); bio.observe(e); });
})();
