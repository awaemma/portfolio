import './style.css'

// Shared Layout Injection
const app = document.getElementById('app');

const navHTML = `
  <nav class="glass-nav">
    <div class="logo"></div>
    <button class="hamburger" id="hamburger" aria-label="Toggle Menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="nav-links">
      <li><a href="/" class="${window.location.pathname === '/' || window.location.pathname.endsWith('index.html') ? 'active' : ''}">Home</a></li>
      <li><a href="/products.html" class="${window.location.pathname.includes('products') ? 'active' : ''}">Products</a></li>
      <!-- <li><a href="/projects.html" class="${window.location.pathname.includes('projects') ? 'active' : ''}">Projects</a></li> -->
      <li class="dropdown">
        <a href="#" class="${window.location.pathname.includes('academy') ? 'active' : ''}">Academy ▾</a>
        <ul class="dropdown-menu">
          <li><a href="/academy.html">Curated Learning</a></li>
          <li><a href="/my-courses.html">My Courses</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a href="#" class="${window.location.pathname.includes('blogs') || window.location.pathname.includes('ebooks') ? 'active' : ''}">Resources ▾</a>
        <ul class="dropdown-menu">
          <li><a href="/blogs.html">My Blog</a></li>
          <li><a href="/ebooks.html">Ebooks</a></li>
        </ul>
      </li>
      <li><a href="/about.html" class="${window.location.pathname.includes('about') ? 'active' : ''}">About Me</a></li>
      <li>
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Dark Mode">
          <!-- Sun Icon -->
          <svg class="sun-icon" style="display: none;" viewBox="0 0 24 24">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
          </svg>
          <!-- Moon Icon -->
          <svg class="moon-icon" viewBox="0 0 24 24">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
          </svg>
        </button>
      </li>
    </ul>
  </nav>
`;

const footerHTML = `
  <footer>
    <p></p>
  </footer>
`;

// Insert Nav at the start and Footer at the end
if (app) {
  app.insertAdjacentHTML('afterbegin', navHTML);
  app.insertAdjacentHTML('beforeend', footerHTML);

  // Theme Toggle Logic
  const toggleBtn = document.getElementById('theme-toggle');
  const sunIcon = toggleBtn.querySelector('.sun-icon');
  const moonIcon = toggleBtn.querySelector('.moon-icon');

  // Check local storage or system preference
  const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'light') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  });

  // Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Mark app as loaded to prevent FOUC
  app.classList.add('loaded');
}


// Add class for active nav links
const style = document.createElement('style');
style.innerHTML = `
  .nav-links a.active {
    color: var(--accent-color);
    text-shadow: 0 0 10px var(--accent-glow);
  }
`;
document.head.appendChild(style);

// Dynamic Text Effect
const heroText = document.querySelector('.glitch-text');
if (heroText) {
  // Optional: Add more complex text effect here
}

// Link Prefetching for faster navigation
const prefetchCache = new Set();

const prefetchLink = (url) => {
  if (prefetchCache.has(url)) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);

  prefetchCache.add(url);
};

document.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('mouseenter', () => {
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('#')) {
      prefetchLink(href);
    }
  });
});
