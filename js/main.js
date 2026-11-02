// Main JavaScript - Cursor, Navigation, Reveal Animations, Form, Mobile Menu

// True only for a real mouse/trackpad device (not phones, tablets or touch-only screens)
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// 1. Cursor Animation (desktop only)
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');

if (hasFinePointer && dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  (function tick() {
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
  })();
} else {
  // Touch devices: hide custom cursor and keep the normal one
  if (dot) dot.style.display = 'none';
  if (ring) ring.style.display = 'none';
  document.body.style.cursor = 'auto';
  document.body.classList.add('touch-device');
}

// 2. Navbar scroll effect + active link (throttled to one update per frame)
let scrollTicking = false;
function onScroll() {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);

  let current = '';
  document.querySelectorAll('section[id]').forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) current = section.id;
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--white)' : '';
  });
  scrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });
onScroll();

// 3. Mobile Menu (accessible, locks page scroll while open, closes with Escape)
const hamburger = document.getElementById('hamburger');
const mobMenu = document.getElementById('mobMenu');
const mobClose = document.getElementById('mobClose');

function openMob() {
  if (!mobMenu) return;
  mobMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
}
function closeMob() {
  if (!mobMenu) return;
  mobMenu.classList.remove('open');
  document.body.style.overflow = '';
  if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
}
window.closeMob = closeMob;

if (hamburger) hamburger.addEventListener('click', openMob);
if (mobClose) mobClose.addEventListener('click', closeMob);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMob();
});
// Leaving the phone layout (rotate / resize) must not leave the menu stuck open
window.matchMedia('(min-width: 769px)').addEventListener('change', e => {
  if (e.matches) closeMob();
});

// 4. Reveal animations (Intersection Observer)
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 5. Contact form (Web3Forms, AJAX) with inline status messages
const web3form = document.getElementById('web3form');
const formOk = document.getElementById('form-ok');
const submitBtn = document.getElementById('submitBtn');

function showFormMessage(text, isError) {
  if (!formOk) return;
  formOk.textContent = text;
  formOk.style.color = isError ? '#ff6b6b' : '';
  formOk.style.display = 'block';
  clearTimeout(showFormMessage.timer);
  showFormMessage.timer = setTimeout(() => { formOk.style.display = 'none'; }, 8000);
}

if (web3form && submitBtn) {
  if (formOk) formOk.setAttribute('role', 'status');
  web3form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch(web3form.action, {
        method: 'POST',
        body: new FormData(web3form)
      });
      const result = await response.json();

      if (result.success) {
        web3form.reset();
        showFormMessage('✓ Message sent! I\'ll get back to you soon.', false);
      } else {
        let errorMsg = result.message || 'Something went wrong. Please try again.';
        if (result.code === 'domain_not_verified') {
          errorMsg = 'Domain not verified. Please check your Web3Forms settings.';
        }
        showFormMessage('Error: ' + errorMsg, true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showFormMessage('Network error. Please check your connection and try again.', true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// 6. Dynamic copyright year
const yearSpan = document.getElementById('currentYear');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// 7. Smooth scroll for same-page anchor links (and close the mobile menu)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMob();
    }
  });
});