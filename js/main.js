// Main JavaScript - Cursor, Navigation, Reveal Animations, Skill Bars, Form, Mobile Menu

// 1. Cursor Animation 
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

// Only enable custom cursor on devices that support hover (non-touch)
if (!('ontouchstart' in window)) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

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
  // Hide custom cursor on touch devices
  if (dot) dot.style.display = 'none';
  if (ring) ring.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// 2. Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  
  let current = '';
  document.querySelectorAll('section[id]').forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) {
      current = section.id;
    }
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#' + current) {
      link.style.color = 'var(--white)';
    } else {
      link.style.color = '';
    }
  });
});

// 3. Mobile Menu
const hamburger = document.getElementById('hamburger');
const mobMenu = document.getElementById('mobMenu');
const mobClose = document.getElementById('mobClose');

if (hamburger && mobMenu && mobClose) {
  hamburger.onclick = () => mobMenu.classList.add('open');
  mobClose.onclick = closeMob;
}

function closeMob() {
  if (mobMenu) mobMenu.classList.remove('open');
}
window.closeMob = closeMob;
// Close mobile menu when a link is clicked (already in inline onclick)

// 4. Reveal Animations (Intersection Observer)
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 5. Skill Bars Animation (One-time)
const skillsSection = document.getElementById('skills');
let skillsAnimated = false; // Flag to prevent re-animation

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const width = bar.dataset.width;
          if (width) {
            bar.style.width = width + '%';
          }
        });
        // unobserve after animation
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

if (skillsSection) {
  barObserver.observe(skillsSection);
}

// 6. Web3Forms AJAX Submission (FormSubmit replacement)
const web3form = document.getElementById('web3form');
const formOk = document.getElementById('form-ok');
const submitBtn = document.getElementById('submitBtn');

if (web3form && submitBtn) {
  web3form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Disable button & show loading state
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Collect form data
    const formData = new FormData(web3form);
    
    try {
      const response = await fetch(web3form.action, {
        method: 'POST',
        body: formData
      });
      
      // Web3Forms returns JSON with success field
      const result = await response.json();
      
      if (result.success) {
        // Success
        web3form.reset();
        if (formOk) {
          formOk.style.display = 'block';
          setTimeout(() => {
            formOk.style.display = 'none';
          }, 8000); // Increased to 8 seconds for better visibility
        }
      } else {
        // Show error message from Web3Forms
        let errorMsg = result.message || 'Something went wrong. Please try again.';
        if (result.code === 'domain_not_verified') {
          errorMsg = 'Domain not verified. Please check your Web3Forms settings.';
        }
        alert('Error: ' + errorMsg);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// 7. Dynamic Copyright Year 
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 8. Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      if (mobMenu && mobMenu.classList.contains('open')) {
        closeMob();
      }
    }
  });
});

// 9. Performance: Reduce canvas load on mobile (optional hint for canvas.js)
if ('ontouchstart' in window) {
  // Add a meta tag or class to body for canvas.js to read
  document.body.classList.add('touch-device');
}