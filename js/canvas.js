// Background Canvas Animation - Orbital Rings + Particles + Blob

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, scrollY = 0, lastSY = 0;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
window.addEventListener('scroll', () => { scrollY = window.scrollY; });
const scrollMax = () => Math.max(1, document.body.scrollHeight - window.innerHeight);
const sp = () => scrollY / scrollMax();

// Blob
const blob = { x: 0, y: 0, ready: false };
function drawBlob(t) {
  if (!blob.ready) {
    blob.x = W * 0.72;
    blob.y = H * 0.28;
    blob.ready = true;
  }
  const p = sp();
  const tx = W * (0.72 - p * 0.44);
  const ty = H * (0.28 + p * 0.44);
  blob.x += (tx - blob.x) * 0.035;
  blob.y += (ty - blob.y) * 0.035;
  const R = Math.min(W, H) * 0.30;
  let g = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, R * 1.8);
  g.addColorStop(0, 'rgba(255,77,0,0.068)');
  g.addColorStop(0.5, 'rgba(255,77,0,0.022)');
  g.addColorStop(1, 'rgba(255,77,0,0)');
  ctx.beginPath();
  ctx.arc(blob.x, blob.y, R * 1.8, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  let g2 = ctx.createRadialGradient(blob.x - R * 0.2, blob.y + R * 0.1, 0, blob.x, blob.y, R);
  g2.addColorStop(0, 'rgba(255,190,0,0.05)');
  g2.addColorStop(1, 'rgba(255,77,0,0)');
  ctx.beginPath();
  ctx.arc(blob.x, blob.y, R, 0, Math.PI * 2);
  ctx.fillStyle = g2;
  ctx.fill();
  ctx.save();
  ctx.translate(blob.x, blob.y);
  ctx.beginPath();
  for (let i = 0; i <= 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const w = 1 + 0.22 * Math.sin(i * 1.9 + t * 0.00085) + 0.08 * Math.cos(i * 3.3 + t * 0.0006);
    const r = R * 0.32 * w;
    if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  let g3 = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.42);
  g3.addColorStop(0, 'rgba(255,100,0,0.20)');
  g3.addColorStop(0.5, 'rgba(255,77,0,0.07)');
  g3.addColorStop(1, 'rgba(255,77,0,0)');
  ctx.fillStyle = g3;
  ctx.fill();
  ctx.restore();
}

// Rings
const RINGS = [
  { rf: 0.20, spd: 0.00020, tilt: 0.38, ph: 0, th: 1.3, a: 0.20, af: 0.30 },
  { rf: 0.30, spd: -0.00013, tilt: 0.58, ph: 1.05, th: 0.8, a: 0.13, af: 0.22 },
  { rf: 0.42, spd: 0.00008, tilt: 0.22, ph: 2.09, th: 0.55, a: 0.09, af: 0.18 },
  { rf: 0.56, spd: -0.00005, tilt: 0.72, ph: 3.14, th: 0.4, a: 0.06, af: 0.14 },
];
function drawRings(t) {
  const p = sp();
  const rcx = W * 0.50 + Math.sin(t * 0.00018) * W * 0.05;
  const rcy = H * 0.50 - p * H * 0.25 + H * 0.12;
  RINGS.forEach(ring => {
    const angle = t * ring.spd + ring.ph;
    const r = Math.min(W, H) * (ring.rf + 0.04 * Math.sin(t * 0.00025 + ring.ph));
    ctx.save();
    ctx.translate(rcx, rcy);
    ctx.rotate(angle);
    ctx.scale(1, ring.tilt);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,77,0,${ring.a * 0.7})`;
    ctx.lineWidth = ring.th;
    ctx.shadowBlur = 0;
    ctx.stroke();
    const as = t * ring.spd * 3.5 + ring.ph * 2;
    const ae = as + Math.PI * 2 * ring.af;
    ctx.beginPath();
    ctx.arc(0, 0, r, as, ae);
    ctx.strokeStyle = `rgba(255,${120 + Math.floor(80 * Math.sin(t * 0.0009))},0,${ring.a * 2.8})`;
    ctx.lineWidth = ring.th * 2.2;
    ctx.shadowColor = 'rgba(255,77,0,0.6)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    const hx = Math.cos(ae) * r;
    const hy = Math.sin(ae) * r;
    ctx.beginPath();
    ctx.arc(hx, hy, ring.th * 2.8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,190,0,${ring.a * 4.5})`;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.restore();
  });
}

// Particles
const PCOUNT = 100;
class Pt {
  constructor(boot) { this.reset(boot); }
  reset(boot = false) {
    this.x = Math.random() * W;
    this.y = boot ? Math.random() * H : (Math.random() > .5 ? -8 : H + 8);
    this.vx = (Math.random() - .5) * 0.28;
    this.vy = (Math.random() - .5) * 0.22;
    this.r = Math.random() * 1.6 + 0.35;
    this.a = Math.random() * 0.5 + 0.08;
    this.maxLife = 350 + Math.random() * 300;
    this.age = boot ? Math.random() * this.maxLife : 0;
    this.warm = Math.random() > .72;
  }
  step(dy) {
    this.x += this.vx + (Math.random() - .5) * 0.06;
    this.y += this.vy - dy * 0.008;
    this.age++;
    if (this.age > this.maxLife || this.x < -15 || this.x > W + 15 || this.y < -15 || this.y > H + 15) {
      this.reset(false);
    }
  }
  draw() {
    const fade = Math.min(1, Math.min(this.age / 45, (this.maxLife - this.age) / 45));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.warm ? `rgba(255,184,0,${this.a * fade})` : `rgba(255,80,0,${this.a * fade})`;
    ctx.fill();
  }
}
const parts = Array.from({ length: PCOUNT }, (_, i) => new Pt(true));

function drawLinks() {
  const MD = 105, MD2 = MD * MD;
  for (let i = 0; i < parts.length; i++) {
    for (let j = i + 1; j < parts.length; j++) {
      const dx = parts[i].x - parts[j].x;
      const dy = parts[i].y - parts[j].y;
      const d = dx * dx + dy * dy;
      if (d < MD2) {
        ctx.beginPath();
        ctx.moveTo(parts[i].x, parts[i].y);
        ctx.lineTo(parts[j].x, parts[j].y);
        ctx.strokeStyle = `rgba(255,90,0,${(1 - Math.sqrt(d) / MD) * 0.10})`;
        ctx.lineWidth = 0.5;
        ctx.shadowBlur = 0;
        ctx.stroke();
      }
    }
  }
}

function render(now) {
  const dy = scrollY - lastSY;
  lastSY = scrollY;
  ctx.clearRect(0, 0, W, H);
  drawBlob(now);
  ctx.shadowBlur = 0;
  drawRings(now);
  ctx.shadowBlur = 0;
  drawLinks();
  parts.forEach(p => { p.step(dy); p.draw(); });
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.85);
  vg.addColorStop(0, 'rgba(10,10,15,0)');
  vg.addColorStop(1, 'rgba(10,10,15,0.60)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);