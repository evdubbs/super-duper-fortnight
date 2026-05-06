// Smooth scrolling helper
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Theme toggle (persisted in localStorage)
const themeToggle = document.getElementById('theme-toggle');
function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    if (themeToggle) themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
}

document.addEventListener('DOMContentLoaded', function () {
    const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(saved);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }

    // Smooth-scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const id = href.slice(1);
                scrollToSection(id);
            }
        });
    });

    // Contact form: open mail client with prefilled message
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = (this.name && this.name.value) || '';
            const email = (this.email && this.email.value) || '';
            const message = (this.message && this.message.value) || '';
            const subject = encodeURIComponent('Website message from ' + name);
            const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>');
            window.location.href = 'mailto:evandubey@example.com?subject=' + subject + '&body=' + body;
        });
    }

    // Reveal sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
});

function downloadResume() {
    // placeholder resume link — replace with resume.pdf in repo
    window.open('resume.pdf', '_blank');
}

console.log('Site script loaded — enjoy editing!');