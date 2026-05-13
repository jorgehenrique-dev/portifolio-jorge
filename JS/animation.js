
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function animateCursor() {
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
      rx += (mx - rx) * .15; ry += (my - ry) * .15;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    document.querySelectorAll('a, button, .skill-item, .service-box').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cur.style.width = '20px'; cur.style.height = '20px'; cur.style.background = '#fff';
        ring.style.width = '56px'; ring.style.height = '56px';
      });
      el.addEventListener('mouseleave', () => {
        cur.style.width = '12px'; cur.style.height = '12px';
        ring.style.width = '36px'; ring.style.height = '36px';
      });
    });

    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ── IntersectionObserver: fade-up & skill bars ── */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.classList.contains('skill-item')) {
            const pct = entry.target.dataset.pct;
            entry.target.querySelector('.skill-bar').style.width = pct + '%';
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-up, .skill-item').forEach(el => observer.observe(el));

    /* ── Active nav link ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const secObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => secObs.observe(s));