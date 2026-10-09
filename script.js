const menuButton = document.getElementById('menu');
const navLinks = document.getElementById('navLinks');
const themeButton = document.getElementById('theme');
const progress = document.getElementById('progress');
const backTop = document.getElementById('backTop');

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));

// Theme preference is saved locally in this browser.
const savedTheme = localStorage.getItem('diwakar-portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light');
themeButton.textContent = document.body.classList.contains('light') ? '☾' : '☼';
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const theme = document.body.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('diwakar-portfolio-theme', theme);
  themeButton.textContent = theme === 'light' ? '☾' : '☼';
});

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = amount + '%';
  backTop.classList.toggle('show', window.scrollY > 450);
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('year').textContent = new Date().getFullYear();

// Highlight the navigation item for the section currently in view.
const sections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

// Set your email address here before using the contact form.
const PORTFOLIO_EMAIL = 'YOUR_EMAIL@example.com';
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const feedback = document.getElementById('feedback');
  if (PORTFOLIO_EMAIL === 'YOUR_EMAIL@example.com') {
    feedback.textContent = 'Please open script.js and replace YOUR_EMAIL@example.com with your email first.';
    return;
  }
  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
  window.location.href = `mailto:${PORTFOLIO_EMAIL}?subject=${subject}&body=${body}`;
  feedback.textContent = 'Your email app should open with the message prepared.';
});
