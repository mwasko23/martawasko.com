/*
 * martawasko.com — conversion instrumentation
 *
 * Before this file existed the site had four gtag events in total, none of
 * which touched the waitlist. A signup could not be counted, let alone
 * attributed to a source.
 *
 * Everything here is delegated from document, so pages need no per-link
 * markup changes and Kit's JS-injected form is covered even though it does
 * not exist at parse time. The four hand-written onclick events already in
 * the pages still fire; these are additive.
 */
(function () {
  'use strict';

  if (typeof window.gtag !== 'function') return;   // GA4 blocked or not loaded

  var page = window.location.pathname;

  function send(name, params) {
    params = params || {};
    params.page_path = page;
    window.gtag('event', name, params);
  }
  window.trackEvent = send;   // available for one-off inline calls

  function textOf(el) {
    return (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);
  }

  /* ---- 1. every link click: outbound, internal, or in-page CTA ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;

    var href = a.getAttribute('href');
    if (!href) return;

    var label = textOf(a);

    if (href.charAt(0) === '#') {
      // in-page CTA — this is how the waitlist buttons behave
      send('cta_click', { cta_target: href, cta_text: label });
      return;
    }

    var isAbsolute = /^https?:\/\//i.test(href);
    var isExternal = isAbsolute && href.indexOf(window.location.hostname) === -1;

    send(isExternal ? 'outbound_click' : 'internal_nav', {
      link_url: href,
      link_text: label
    });
  }, true);

  /* ---- 2. the conversion itself: Kit form submit ------------------------ */
  /* Capture phase, because Kit binds its own submit handler.               */
  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || f.tagName !== 'FORM') return;

    var action = f.getAttribute('action') || '';
    if (!/kit\.com|convertkit/i.test(action)) return;

    send('generate_lead', {
      method: 'kit',
      form_id: f.getAttribute('data-sv-form') || f.getAttribute('data-uid') || 'unknown',
      form_position: Math.round(f.getBoundingClientRect().top + window.pageYOffset)
    });
  }, true);

  /* ---- 3. scroll depth --------------------------------------------------*/
  var marks = [25, 50, 75, 90];
  var fired = {};
  var ticking = false;

  function checkDepth() {
    ticking = false;
    var doc = document.documentElement;
    var scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;

    var pct = ((window.pageYOffset || doc.scrollTop) / scrollable) * 100;
    for (var i = 0; i < marks.length; i++) {
      var m = marks[i];
      if (pct >= m && !fired[m]) {
        fired[m] = true;
        send('scroll_depth', { percent_scrolled: m });
      }
    }
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(checkDepth); }
  }, { passive: true });

  /* ---- 4. did they ever actually SEE the offer and the form? ------------ */
  /* Answers "do people bounce before the form, or see it and not fill it?" */
  if ('IntersectionObserver' in window) {
    var seen = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var name = entry.target.getAttribute('data-track-view');
        if (!name || seen[name]) return;
        seen[name] = true;
        send('section_viewed', { section_name: name });
        io.unobserve(entry.target);
      });
    }, { threshold: 0.25 });

    var watch = function () {
      var nodes = document.querySelectorAll('[data-track-view]');
      for (var i = 0; i < nodes.length; i++) io.observe(nodes[i]);
    };
    watch();

    // Kit injects its form late; pick it up when it lands.
    if ('MutationObserver' in window) {
      var mo = new MutationObserver(function () {
        var form = document.querySelector('form[action*="kit.com"], form[action*="convertkit"]');
        if (form && !seen['waitlist_form']) {
          form.setAttribute('data-track-view', 'waitlist_form');
          io.observe(form);
          mo.disconnect();
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }
  }
})();
