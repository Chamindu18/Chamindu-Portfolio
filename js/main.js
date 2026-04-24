// Main JavaScript - Cursor, Navigation, Reveal Animations, Skill Bars, Form, Mobile Menu

// Cursor Animation
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

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

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  
  let current = '';
  document.querySelectorAll('section[id]').forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) {
      current = section.id;
    }
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--white)' : '';
  });
});

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const mobMenu = document.getElementById('mobMenu');
const mobClose = document.getElementById('mobClose');

hamburger.onclick = () => mobMenu.classList.add('open');
mobClose.onclick = closeMob;

function closeMob() {
  mobMenu.classList.remove('open');
}
window.closeMob = closeMob;

// Reveal Animations (Intersection Observer)
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Skill Bars Animation
const skillsSection = document.getElementById('skills');
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  },
  { threshold: 0.25 }
);

barObserver.observe(skillsSection);

// Form Submission
function submitForm() {
  const ids = ['fname', 'lname', 'email', 'subject', 'message'];
  const allFilled = ids.every(id => document.getElementById(id).value.trim() !== '');
  
  if (!allFilled) {
    alert('Please fill in all fields.');
    return;
  }
  
  ids.forEach(id => document.getElementById(id).value = '');
  document.getElementById('form-ok').style.display = 'block';
}
window.submitForm = submitForm;

// Hide custom cursor on touch devices
if ('ontouchstart' in window) {
  dot.style.display = 'none';
  ring.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// Web3Forms AJAX submission
const web3form = document.getElementById('web3form');
const formOk = document.getElementById('form-ok');
const submitBtn = document.getElementById('submitBtn');

if (web3form) {
  web3form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Disable button & show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Collect form data
    const formData = new FormData(web3form);
    
    try {
      const response = await fetch(web3form.action, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      
      if (result.success) {
        // Success
        web3form.reset();
        formOk.style.display = 'block';
        setTimeout(() => {
          formOk.style.display = 'none';
        }, 5000);
      } else {
        alert('Error: ' + (result.message || 'Something went wrong. Please try again.'));
      }
    } catch (error) {
      alert('Network error. Please check your connection and try again.');
    } finally {
      // Re-enable button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
    }
  });
}