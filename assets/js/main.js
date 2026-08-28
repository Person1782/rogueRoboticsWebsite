(function () {
  'use strict';

  const root = document.documentElement;

  /* ---------- mobile nav ---------- */
  const navBtn = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('primary-nav');
  if (navBtn && nav) {
    navBtn.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      navBtn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        navBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navBtn.setAttribute('aria-expanded', 'false');
        navBtn.focus();
      }
    });
  }

  /* ---------- sticky header shadow ---------- */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- scroll reveal ---------- */
  const revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  let embedded = false;
  try {
    embedded = window.self !== window.top;
  } catch (err) {
    embedded = true;
  }
  /* Inside an iframe the parent frame may do the scrolling, so the observer
     can never fire — skip the fade-in there and show everything up front. */
  if (revealables.length && 'IntersectionObserver' in window && !embedded) {
    root.classList.add('js-anim');
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '240px 0px 0px 0px', threshold: 0 }
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
    /* Safety net: if this page is embedded somewhere the observer never fires
       (an iframe that handles its own scrolling, for instance), show every
       section rather than leaving content invisible. */
    window.setTimeout(function () {
      const stuck = revealables.filter(function (el) {
        return !el.classList.contains('is-in');
      });
      if (stuck.length === revealables.length) {
        io.disconnect();
        stuck.forEach(function (el) {
          el.classList.add('is-in');
        });
      }
    }, 1600);
  }

  /* ---------- lightbox galleries ---------- */
  const triggers = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
  if (triggers.length) {
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photo viewer');
    box.innerHTML =
      '<div class="lightbox__bar"><button class="lightbox__btn" type="button" data-lb-close aria-label="Close photo viewer">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" data-lb-prev aria-label="Previous photo">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 5l-7 7 7 7"/></svg></button>' +
      '<img alt="">' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" data-lb-next aria-label="Next photo">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 5l7 7-7 7"/></svg></button>' +
      '<p class="lightbox__count"></p>';
    document.body.appendChild(box);

    const bigImg = box.querySelector('img');
    const counter = box.querySelector('.lightbox__count');
    let group = [];
    let index = 0;
    let lastFocus = null;

    function show(i) {
      index = (i + group.length) % group.length;
      const t = group[index];
      bigImg.src = t.getAttribute('data-lightbox');
      bigImg.alt = t.querySelector('img') ? t.querySelector('img').alt : '';
      counter.textContent = index + 1 + ' / ' + group.length;
    }
    function open(t) {
      const name = t.getAttribute('data-group');
      group = triggers.filter(function (x) {
        return x.getAttribute('data-group') === name;
      });
      lastFocus = t;
      show(group.indexOf(t));
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      box.querySelector('[data-lb-close]').focus();
    }
    function close() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    triggers.forEach(function (t) {
      t.addEventListener('click', function () {
        open(t);
      });
    });
    box.querySelector('[data-lb-close]').addEventListener('click', close);
    box.querySelector('[data-lb-prev]').addEventListener('click', function () {
      show(index - 1);
    });
    box.querySelector('[data-lb-next]').addEventListener('click', function () {
      show(index + 1);
    });
    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }
})();
