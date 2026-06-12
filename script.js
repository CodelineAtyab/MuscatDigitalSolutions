// Init AOS scroll animations
AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });

// Close other FAQ items when one opens (accordion behavior)
document.querySelectorAll('details.faq').forEach((el) => {
  el.addEventListener('toggle', () => {
    if (el.open) {
      document.querySelectorAll('details.faq').forEach((other) => {
        if (other !== el) other.open = false;
      });
    }
  });
});

// Animate stat numbers on view
const animateNum = (el) => {
  const text = el.textContent.trim();
  const match = text.match(/([\d.]+)/);
  if (!match) return;
  const end = parseFloat(match[1]);
  const prefix = text.slice(0, match.index);
  const suffix = text.slice(match.index + match[0].length);
  let start = 0;
  const duration = 1400;
  const t0 = performance.now();
  const step = (now) => {
    const p = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = (start + (end - start) * eased);
    const display = end >= 10 ? Math.round(val) : val.toFixed(1);
    el.textContent = prefix + display + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateNum(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-num').forEach((el) => observer.observe(el));

// Smooth header background on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) header.classList.add('bg-black/70');
  else header.classList.remove('bg-black/70');
});

// Mobile menu toggle (placeholder)
document.querySelector('.menu-btn')?.addEventListener('click', () => {
  alert('Mobile menu — wire up your nav here.');
});
