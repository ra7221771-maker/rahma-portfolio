const yearElement = document.getElementById('year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

document.querySelectorAll('.case-story-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-9px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


document.querySelectorAll('.proof-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.proof);
    if (!panel) return;
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) loadDeferredImages(panel);
    button.textContent = panel.classList.contains('open') ? 'Hide insights' : 'View insights';
  });
});




const snapshotTrigger = document.querySelector('.snapshot-popup-trigger');
const snapshotModal = document.getElementById('snapshot-modal');

function openSnapshotModal() {
  if (!snapshotModal) return;
  snapshotModal.hidden = false;
  loadDeferredImages(snapshotModal);
  document.body.classList.add('snapshot-modal-open');
}

function closeSnapshotModal() {
  if (!snapshotModal) return;
  snapshotModal.hidden = true;
  document.body.classList.remove('snapshot-modal-open');
}

if (snapshotTrigger && snapshotModal) {
  snapshotTrigger.addEventListener('click', openSnapshotModal);

  snapshotModal.querySelectorAll('[data-close-snapshot]').forEach((el) => {
    el.addEventListener('click', closeSnapshotModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !snapshotModal.hidden) closeSnapshotModal();
  });
}

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform =
      `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) translateY(-5px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ======================================================
   HERO 3D INTERACTIONS
   ====================================================== */
const heroTiltCard = document.querySelector('.hero-tilt-card');
if (heroTiltCard) {
  heroTiltCard.addEventListener('mousemove', (e) => {
    const rect = heroTiltCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;

    heroTiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    heroTiltCard.style.setProperty('--spot-x', `${x * 100}%`);
    heroTiltCard.style.setProperty('--spot-y', `${y * 100}%`);
  });

  heroTiltCard.addEventListener('mouseleave', () => {
    heroTiltCard.style.transform = '';
    heroTiltCard.style.setProperty('--spot-x', '72%');
    heroTiltCard.style.setProperty('--spot-y', '22%');
  });
}

document.querySelectorAll('.hero-btn-3d').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    btn.style.transform = `translateY(-4px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});


/* ======================================================
   NAVBAR 3D INTERACTION
   ====================================================== */
const navBar = document.querySelector('.nav');

if (navBar) {
  navBar.addEventListener('mousemove', (e) => {
    const rect = navBar.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    navBar.style.transform = `translateY(-1px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.8).toFixed(2)}deg)`;
  });

  navBar.addEventListener('mouseleave', () => {
    navBar.style.transform = '';
  });
}


/* ======================================================
   ABOUT PHOTO 3D INTERACTION + REVEAL
   ====================================================== */
const aboutPhotoCard = document.querySelector('.about-photo-3d');

if (aboutPhotoCard) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutPhotoCard.classList.add('in-view');
        aboutObserver.unobserve(aboutPhotoCard);
      }
    });
  }, { threshold: 0.28 });

  aboutObserver.observe(aboutPhotoCard);

  aboutPhotoCard.addEventListener('mousemove', (e) => {
    const rect = aboutPhotoCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 8;

    aboutPhotoCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  aboutPhotoCard.addEventListener('mouseleave', () => {
    aboutPhotoCard.style.transform = '';
  });
}


/* ======================================================
   GENERIC 3D TILT FOR CARDS
   ====================================================== */
(function(){
  const cards = document.querySelectorAll('.pop-3d, .contact-card-3d, .tool-card');

  const finePointer = window.matchMedia('(pointer:fine)').matches;
  if(!finePointer) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 8;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ======================================================
   VIDEO RESULTS POPOUT 3D INTERACTION
   ====================================================== */
document.querySelectorAll('.tilt-popout').forEach((panel) => {
  panel.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 900) return;
    const rect = panel.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    panel.style.transform =
      `perspective(1200px) translateY(10px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) scale(1.01)`;
  });

  panel.addEventListener('mouseleave', () => {
    panel.style.transform = '';
  });
});


/* ======================================================
   RESULTS COUNTER ANIMATION
   ====================================================== */
(function(){
  const resultsSection = document.querySelector('.results-counter-section');
  if(!resultsSection) return;

  const counters = resultsSection.querySelectorAll('.counter-value');
  if(!counters.length) return;

  const formatCounter = (value, formatType) => {
    const num = Number(value);

    if (formatType === 'K+') {
      if (num >= 1000) return `${Math.round(num / 1000)}K+`;
      return `${Math.round(num)}+`;
    }

    if (formatType === 'K') {
      return `${(num / 1000).toFixed(1)}K`;
    }

    return `${Math.round(num)}`;
  };

  const animateCounter = (el) => {
    const target = Number(el.dataset.target || 0);
    const formatType = el.dataset.format || '';
    const duration = 1700;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = formatCounter(current, formatType);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatCounter(target, formatType);
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        counters.forEach((counter, idx) => {
          setTimeout(() => animateCounter(counter), idx * 140);
        });
        observer.unobserve(resultsSection);
      }
    });
  }, { threshold: 0.35 });

  observer.observe(resultsSection);
})();


/* ======================================================
   MOBILE NAV MENU
   ====================================================== */
(function(){
  const header = document.querySelector('.nav');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = header ? header.querySelector('nav') : null;

  if(!header || !toggle || !menu) return;

  const closeMenu = () => {
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if(!header.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeMenu();
  });
})();


/* Fetch hidden proof images only when their panel is opened. */
function loadDeferredImages(container) {
  container.querySelectorAll('img[data-deferred-src]').forEach((img) => {
    img.src = img.dataset.deferredSrc;
    delete img.dataset.deferredSrc;
  });
}

/* Posters load near the viewport; video bytes load only after Play. */
(function () {
  const videos = document.querySelectorAll('.deferred-video video');
  const loadPoster = (video) => {
    if (video.dataset.deferredPoster) {
      video.poster = video.dataset.deferredPoster;
      delete video.dataset.deferredPoster;
    }
  };
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadPoster(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {rootMargin: '250px 0px'}) : null;
  videos.forEach((video) => {
    if (observer) observer.observe(video); else loadPoster(video);
    const button = video.parentElement.querySelector('.deferred-video-play');
    button.addEventListener('click', () => {
      loadPoster(video);
      video.querySelectorAll('source[data-deferred-src]').forEach((source) => {
        source.src = source.dataset.deferredSrc;
        delete source.dataset.deferredSrc;
      });
      video.controls = true;
      video.load();
      button.hidden = true;
      const playRequest = video.play();
      if (playRequest) playRequest.catch(() => {
        /* Native controls remain available if playback needs another tap. */
      });
    }, {once: true});
  });
})();
