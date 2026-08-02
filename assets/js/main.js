(() => {
  'use strict';

  const init = () => {
    document.documentElement.classList.add('js-ready');
    initNavigation();
    initHeader();
    initReveal();
    initScrollSpy();
    initCounters();
    initForm();
    initFooterYear();
  };

  const initNavigation = () => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.primary-nav');
    if (!toggle || !nav) return;

    const close = (returnFocus = false) => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      if (returnFocus) toggle.focus();
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      if (open) close();
      else {
        nav.classList.add('nav-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
      }
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => close()));
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close(true);
    });
  };

  const initHeader = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const update = () => header.classList.toggle('scrolled', window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
  };

  const initReveal = () => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
  };

  const initScrollSpy = () => {
    const links = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
    const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    if (!('IntersectionObserver' in window) || !sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => observer.observe(section));
  };

  const initCounters = () => {
    const stats = document.querySelectorAll('[data-count]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = (stat) => {
      const value = Number(stat.dataset.count);
      const suffix = stat.dataset.suffix || '';
      if (reduced || !('IntersectionObserver' in window)) {
        stat.textContent = `${value}${suffix}`;
        return;
      }
      let start;
      const duration = 900;
      const tick = (time) => {
        if (!start) start = time;
        const progress = Math.min((time - start) / duration, 1);
        const current = value % 1 ? (value * progress).toFixed(1) : Math.round(value * progress);
        stat.textContent = `${current}${suffix}`;
        if (progress < 1) window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
    };
    if (!('IntersectionObserver' in window)) stats.forEach(show);
    else {
      const observer = new IntersectionObserver((entries, instance) => entries.forEach((entry) => {
        if (entry.isIntersecting) { show(entry.target); instance.unobserve(entry.target); }
      }), { threshold: 0.7 });
      stats.forEach((stat) => observer.observe(stat));
    }
  };

  const initForm = () => {
    const form = document.querySelector('#call-form');
    const status = document.querySelector('#form-status');
    if (!form || !status) return;
    form.addEventListener('submit', async (event) => {

      event.preventDefault();

      form.querySelectorAll('.has-error').forEach((row) => row.classList.remove('has-error'));
      form.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
      const required = [...form.querySelectorAll('[required]')];
      let valid = true;
      required.forEach((field) => {
        const error = document.querySelector(`#${field.id}-error`);
        if (!field.value.trim() || (field.type === 'email' && !field.validity.valid)) {
          valid = false;
          field.closest('.form-row').classList.add('has-error');
          if (error) error.textContent = field.type === 'email' ? 'Please enter a valid email.' : 'This field is required.';
        }
      });

      if (!valid) {
        status.textContent = 'Please check the highlighted fields.';
        status.className = 'form-status error';
        return;
      }

      try{
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if(response.ok) {
          status.textContent = 'Thanks — now sent. I’ll be in touch ASAP.';
          status.className = 'form-status';
        }
        else {
          throw new Error(`Form submission failed with status ${response.status} and message: ${response.statusText}`);
        }
      }
      catch(error) {
        console.error('Error submitting form:', error);
        status.textContent = 'There was an error in sending the form. Please retry or send an email directly.';
        status.className = 'form-status error';
        return;
      }
      // Static-site demo: connect this form to Formspree or a serverless endpoint for production.

      form.reset();
    });
  };

  const initFooterYear = () => {
    const year = document.querySelector('#current-year');
    if (year) year.textContent = new Date().getFullYear();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
