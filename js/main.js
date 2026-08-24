(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- scroll progress ---- */
  var progress = document.getElementById('progress');
  function updateProgress() {
    var h = document.documentElement;
    var scrolled = h.scrollTop;
    var max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  }

  /* ---- parallax ---- */
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-speed]'));
  function updateParallax() {
    if (reduce) return;
    var vh = window.innerHeight;
    layers.forEach(function (el) {
      var rect = el.parentElement.getBoundingClientRect();
      var center = rect.top + rect.height / 2 - vh / 2;
      var speed = parseFloat(el.getAttribute('data-speed')) || 0.15;
      el.style.transform = 'translateY(' + (-center * speed) + 'px)';
    });
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateProgress();
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---- reveal on scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- chapter nav: active state + click to scroll ---- */
  var sections = ['before', 'now', 'becoming', 'ahead'].map(function (id) { return document.getElementById(id); });
  var navButtons = Array.prototype.slice.call(document.querySelectorAll('#chapterNav button'));
  navButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-target'));
      if (target) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    });
  });
  if ('IntersectionObserver' in window) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var idx = sections.indexOf(entry.target);
        if (idx === -1) return;
        if (entry.isIntersecting) {
          navButtons.forEach(function (b) { b.classList.remove('active'); });
          navButtons[idx].classList.add('active');
        }
      });
    }, { threshold: .4 });
    sections.forEach(function (s) { if (s) navIo.observe(s); });
  }

  /* ---- ember field (chapter IV) ---- */
  var field = document.getElementById('emberField');
  if (field && !reduce) {
    var n = 16;
    for (var i = 0; i < n; i++) {
      var e = document.createElement('span');
      e.className = 'ember';
      e.style.left = (Math.random() * 100) + '%';
      e.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');
      e.style.animationDelay = (Math.random() * 9) + 's';
      e.style.animationDuration = (7 + Math.random() * 6) + 's';
      e.style.opacity = String(.4 + Math.random() * .4);
      field.appendChild(e);
    }
  }

  /* ---- flight map: pause SMIL animation under reduced motion ---- */
  var flightSvg = document.querySelector('.flight-map__svg');
  if (flightSvg && reduce && typeof flightSvg.pauseAnimations === 'function') {
    flightSvg.pauseAnimations();
  }
})();
