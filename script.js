/* =========================================================
   SANJANA MUSHAM — PORTFOLIO SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('done'), 500);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('done'), 2500);

  /* ---------- AOS ---------- */
  if (window.AOS) {
    AOS.init({ duration: 800, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ---------- Typed.js ---------- */
  if (window.Typed) {
    new Typed('#typed', {
      strings: [
        'secure REST APIs.',
        'scalable MEAN stack apps.',
        'RBAC-protected dashboards.',
        'AES-encrypted services.',
        'pixel-tight Angular UIs.'
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1400,
      loop: true,
      showCursor: false
    });
  }

  /* ---------- Particles.js ---------- */
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: ['#7c5cff', '#00d9c0', '#ffb020'] },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true },
        size: { value: 2.6, random: true },
        line_linked: { enable: true, distance: 130, color: '#7c5cff', opacity: 0.15, width: 1 },
        move: { enable: true, speed: 0.8, random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  /* ---------- Custom cursor ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  if (cursorDot && cursorRing && window.matchMedia('(hover:hover)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    const animRing = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(animRing);
    };
    animRing();
    document.querySelectorAll('a, button, .tilt, .chip, .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('grow'));
    });
  }

  /* ---------- Scroll progress bar ---------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const updateScrollProgress = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';
  };
  window.addEventListener('scroll', updateScrollProgress);

  /* ---------- Navbar scroll state + active link + back to top ---------- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('show', window.scrollY > 500);

    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Mobile nav ---------- */
  const navBurger = document.getElementById('navBurger');
  const navLinksWrap = document.getElementById('navLinks');
  navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('open');
    navLinksWrap.classList.toggle('open');
  });
  navLinksWrap.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navBurger.classList.remove('open');
    navLinksWrap.classList.remove('open');
  }));

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const iconMoon = document.getElementById('iconMoon');
  const iconSun = document.getElementById('iconSun');
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    iconMoon.style.display = theme === 'dark' ? 'block' : 'none';
    iconSun.style.display = theme === 'light' ? 'block' : 'none';
  };
  applyTheme(localStorage.getItem('portfolio-theme') || 'dark');
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      current += step;
      if (current >= target) { el.textContent = target; return; }
      el.textContent = current;
      requestAnimationFrame(tick);
    };
    tick();
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Skill bars ---------- */
  const bars = document.querySelectorAll('.bar span');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));

  /* ---------- Tilt effect on cards ---------- */
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateY(0) rotateX(0) translateY(0)';
    });
  });

  /* ---------- Ripple effect on buttons ---------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-el';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- Project filtering ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('hide', !show);
      });
    });
  });

  /* ---------- GSAP scroll-triggered reveals ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.section-head', {
      scrollTrigger: { trigger: '.section-head', start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.9, ease: 'power3.out'
    });

    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 85%' },
        x: i % 2 === 0 ? -40 : 40, opacity: 0, duration: 0.8, ease: 'power3.out'
      });
    });

    gsap.to('.blob-1', { y: 80, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 } });
    gsap.to('.blob-2', { y: -60, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 } });
  }

  /* ---------- Contact form (EmailJS) ---------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // Replace these with your own EmailJS credentials to activate live sending.
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

  if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('.btn-text').textContent;

    if (!window.emailjs || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      formStatus.textContent = 'Demo mode: add your EmailJS keys in script.js to enable sending.';
      formStatus.className = 'form-status err';
      return;
    }

    submitBtn.querySelector('.btn-text').textContent = 'Sending…';
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        formStatus.textContent = 'Message sent — thank you! I will get back to you soon.';
        formStatus.className = 'form-status ok';
        form.reset();
      })
      .catch(() => {
        formStatus.textContent = 'Something went wrong. Please email me directly instead.';
        formStatus.className = 'form-status err';
      })
      .finally(() => {
        submitBtn.querySelector('.btn-text').textContent = originalText;
      });
  });

  /* ---------- GitHub API: latest repos ---------- */
  const repoList = document.getElementById('repoList');
  const GITHUB_USERNAME = 'sanjana-musham';

  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
    .then(res => {
      if (!res.ok) throw new Error('GitHub API error');
      return res.json();
    })
    .then(repos => {
      if (!Array.isArray(repos) || repos.length === 0) {
        repoList.innerHTML = '<p class="repo-empty">No public repositories found yet — check back soon.</p>';
        return;
      }
      repoList.innerHTML = repos.map(repo => `
        <div class="repo-card">
          <h4>${repo.name}</h4>
          <p>${repo.description ? repo.description.slice(0, 80) : 'No description provided.'}</p>
          <div class="repo-meta">
            <span>★ ${repo.stargazers_count}</span>
            <span>${repo.language || '—'}</span>
          </div>
        </div>
      `).join('');
    })
    .catch(() => {
      repoList.innerHTML = '<p class="repo-empty">Unable to load repositories right now. Visit the GitHub profile directly.</p>';
    });

  /* ---------- Smooth in-page nav scrolling with offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
