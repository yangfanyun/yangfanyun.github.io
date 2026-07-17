/* ============================================
   杨帆云 - Main JavaScript
   Alpine.js initializations, dark mode handler,
   mobile menu, and utility functions
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // ==========================================
  // Dark Mode Handler
  // ==========================================

  const darkModeToggle = document.querySelector('[data-toggle-dark]');
  const htmlElement = document.documentElement;
  const darkModeStorageKey = 'theme';

  /**
   * Initialize dark mode based on saved preference or system preference
   */
  function initDarkMode() {
    const savedTheme = localStorage.getItem(darkModeStorageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      htmlElement.classList.add('dark');
      updateDarkModeIcons(true);
    } else {
      htmlElement.classList.remove('dark');
      updateDarkModeIcons(false);
    }
  }

  /**
   * Toggle dark mode
   */
  function toggleDarkMode() {
    const isDark = htmlElement.classList.toggle('dark');
    localStorage.setItem(darkModeStorageKey, isDark ? 'dark' : 'light');
    updateDarkModeIcons(isDark);

    // Dispatch custom event for other scripts (animations.js, etc.)
    document.dispatchEvent(new CustomEvent('themeChange', {
      detail: { darkMode: isDark }
    }));
  }

  /**
   * Update dark mode toggle icons
   */
  function updateDarkModeIcons(isDark) {
    const moonIcons = document.querySelectorAll('[data-icon-moon]');
    const sunIcons = document.querySelectorAll('[data-icon-sun]');

    moonIcons.forEach(icon => {
      icon.classList.toggle('hidden', isDark);
    });
    sunIcons.forEach(icon => {
      icon.classList.toggle('hidden', !isDark);
    });
  }

  // Dark mode toggle event listener
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(darkModeStorageKey)) {
      if (e.matches) {
        htmlElement.classList.add('dark');
        updateDarkModeIcons(true);
      } else {
        htmlElement.classList.remove('dark');
        updateDarkModeIcons(false);
      }
    }
  });

  // Initialize dark mode on load
  initDarkMode();

  // ==========================================
  // Mobile Menu
  // ==========================================

  const mobileMenuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileMenuOverlay = document.querySelector('[data-menu-overlay]');
  const mobileMenuLinks = document.querySelectorAll('[data-mobile-menu] a');

  let isMenuOpen = false;

  /**
   * Open mobile menu
   */
  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('-translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenuOverlay.classList.add('opacity-100');
    }
    document.body.classList.add('overflow-hidden');
    isMenuOpen = true;
  }

  /**
   * Close mobile menu
   */
  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('-translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
      mobileMenuOverlay.classList.remove('opacity-100');
    }
    document.body.classList.remove('overflow-hidden');
    isMenuOpen = false;
  }

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      isMenuOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  // Close menu when clicking overlay
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking a link
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMobileMenu();
    }
  });

  // ==========================================
  // Header Scroll Effect
  // ==========================================

  const header = document.querySelector('[data-header]');
  let lastScrollY = 0;
  let scrollTimeout;

  /**
   * Handle header visibility on scroll
   */
  function handleHeaderScroll() {
    if (!header) return;

    const currentScrollY = window.scrollY;

    // Add blur background when scrolled
    if (currentScrollY > 50) {
      header.classList.add('bg-primary-950/80', 'backdrop-blur-lg', 'shadow-lg', 'shadow-black/10');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('bg-primary-950/80', 'backdrop-blur-lg', 'shadow-lg', 'shadow-black/10');
      header.classList.add('bg-transparent');
    }

    // Hide/show header on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.classList.add('-translate-y-full');
    } else {
      header.classList.remove('-translate-y-full');
    }

    lastScrollY = currentScrollY;
  }

  // Throttled scroll handler
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(handleHeaderScroll);
  }, { passive: true });

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // Copy to Clipboard
  // ==========================================

  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async function () {
      const textToCopy = this.getAttribute('data-copy');
      const originalText = this.innerHTML;

      try {
        await navigator.clipboard.writeText(textToCopy);
        this.innerHTML = `
          <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="text-green-400">已复制</span>
        `;

        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
        this.innerHTML = `
          <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span class="text-red-400">复制失败</span>
        `;

        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }
    });
  });

  // ==========================================
  // Lazy Loading Images
  // ==========================================

  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          lazyImageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      lazyImageObserver.observe(img);
    });
  }

  // ==========================================
  // Alpine.js Initialization Handler
  // ==========================================

  // If Alpine is loaded, expose our functions
  if (typeof Alpine !== 'undefined') {
    Alpine.data('app', () => ({
      // Mobile menu state
      mobileMenuOpen: false,
      // Search state
      searchQuery: '',
      searchResults: [],

      toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
      },

      closeMobileMenu() {
        this.mobileMenuOpen = false;
      },

      // Search functionality
      performSearch() {
        if (!this.searchQuery.trim()) {
          this.searchResults = [];
          return;
        }
        // Search logic - emits event for other scripts to handle
        document.dispatchEvent(new CustomEvent('search', {
          detail: { query: this.searchQuery }
        }));
      },

      init() {
        // Any Alpine-specific initialization
        this.$watch('mobileMenuOpen', (value) => {
          document.body.classList.toggle('overflow-hidden', value);
        });
      }
    }));
  }

  // ==========================================
  // Performance: Defer non-critical tasks
  // ==========================================

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Initialize analytics, tracking, or other non-critical tasks here
    });
  }

  // ==========================================
  // Console Branding
  // ==========================================

  console.log(
    '%c✈ 杨帆云 %c🚀 高速稳定的网络加速服务',
    'color: #3370ff; font-size: 16px; font-weight: bold;',
    'color: #0bc99d; font-size: 14px;'
  );
});

// ==========================================
// Export for module usage if needed
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleDarkMode: null, // Will be set after DOM ready
    openMobileMenu: null,
    closeMobileMenu: null,
  };
}
