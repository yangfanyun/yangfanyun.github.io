/* ============================================
   杨帆云 - GSAP Animations
   Hero particle animation, scroll-triggered
   fade-in-up, counter animation, stagger cards,
   and parallax effects
   ============================================ */

// Wait for GSAP and ScrollTrigger to be available
(function () {
  'use strict';

  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded - animations disabled');
    return;
  }

  // Register ScrollTrigger plugin if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const isScrollTriggerAvailable = typeof ScrollTrigger !== 'undefined';

  // ==========================================
  // Utility: Debounce
  // ==========================================

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // ==========================================
  // 1. Hero Particle Animation
  // ==========================================

  function initHeroParticles() {
    const heroSection = document.querySelector('[data-hero-particles]');
    if (!heroSection) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full pointer-events-none';
    canvas.style.zIndex = '0';
    heroSection.style.position = 'relative';
    heroSection.insertBefore(canvas, heroSection.firstChild);

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let mouseMoved = false;

    const CONFIG = {
      particleCount: 60,
      connectionDistance: 120,
      particleSize: 2,
      colors: ['rgba(51, 112, 255,', 'rgba(11, 201, 157,', 'rgba(89, 148, 255,'],
      speed: 0.3,
      connectionOpacity: 0.15,
    };

    function resizeCanvas() {
      const rect = heroSection.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    class Particle {
      constructor(w, h) {
        this.reset(w, h);
      }

      reset(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * CONFIG.speed;
        this.vy = (Math.random() - 0.5) * CONFIG.speed;
        this.size = Math.random() * CONFIG.particleSize + 1;
        this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse interaction
        if (mouseMoved) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150 * 0.02;
            this.vx -= dx * force;
            this.vy -= dy * force;
          }
        }

        // Damping
        this.vx *= 0.999;
        this.vy *= 0.999;
      }

      draw(ctx, w, h) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.fill();
      }
    }

    function init() {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      particles = [];
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle(w, h));
      }
    }

    function drawConnections(ctx, w, h) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONFIG.connectionDistance) {
            const opacity = (1 - dist / CONFIG.connectionDistance) * CONFIG.connectionOpacity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(51, 112, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.update(w, h);
        p.draw(ctx, w, h);
      });

      drawConnections(ctx, w, h);

      animationId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseMoved = true;

      // Reset mouseMoved flag after inactivity
      clearTimeout(this._mouseTimeout);
      this._mouseTimeout = setTimeout(() => {
        mouseMoved = false;
      }, 1000);
    }

    resizeCanvas();
    init();
    animate();

    window.addEventListener('resize', debounce(() => {
      resizeCanvas();
      init();
    }, 250));

    heroSection.addEventListener('mousemove', handleMouseMove.bind(this));

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', init);
    };
  }

  // ==========================================
  // 2. Scroll-Triggered Fade-In-Up
  // ==========================================

  function initFadeInUp() {
    const targets = document.querySelectorAll('[data-animate="fade-in-up"]');
    if (!targets.length) return;

    targets.forEach((el, index) => {
      if (isScrollTriggerAvailable) {
        gsap.fromTo(el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            }
          }
        );
      } else {
        // Fallback: animate on scroll using IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
              });
              observer.unobserve(el);
            }
          });
        }, { threshold: 0.1 });

        gsap.set(el, { opacity: 0, y: 60 });
        observer.observe(el);
      }
    });
  }

  // ==========================================
  // 3. Counter Animation for Stats
  // ==========================================

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-counter'), 10);
      const suffix = counter.getAttribute('data-counter-suffix') || '';
      const prefix = counter.getAttribute('data-counter-prefix') || '';
      const duration = parseFloat(counter.getAttribute('data-counter-duration')) || 2;

      // Store original text for restoring if needed
      const originalText = counter.textContent;

      const animateCounter = () => {
        // Don't re-animate if already done
        if (counter._animated) return;
        counter._animated = true;

        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: duration,
          ease: 'power2.out',
          onUpdate: () => {
            const formatted = Math.floor(obj.value).toLocaleString();
            counter.textContent = `${prefix}${formatted}${suffix}`;
          },
          onComplete: () => {
            counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
          }
        });
      };

      if (isScrollTriggerAvailable) {
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 90%',
          onEnter: animateCounter,
          once: true,
        });
      } else {
        // Fallback with IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounter();
              observer.unobserve(counter);
            }
          });
        }, { threshold: 0.5 });
        observer.observe(counter);
      }
    });
  }

  // ==========================================
  // 4. Stagger Card Animations
  // ==========================================

  function initStaggerCards() {
    const containers = document.querySelectorAll('[data-stagger]');

    containers.forEach(container => {
      const items = container.querySelectorAll('[data-stagger-item]');
      if (!items.length) return;

      const staggerValue = parseFloat(container.getAttribute('data-stagger-delay')) || 0.1;

      if (isScrollTriggerAvailable) {
        gsap.fromTo(items,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: staggerValue,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            }
          }
        );
      } else {
        gsap.set(items, { opacity: 0, y: 40, scale: 0.95 });

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.to(items, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: staggerValue,
                ease: 'power2.out',
              });
              observer.unobserve(container);
            }
          });
        }, { threshold: 0.1 });
        observer.observe(container);
      }
    });
  }

  // ==========================================
  // 5. Parallax Effects
  // ==========================================

  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.3;
      const direction = el.getAttribute('data-parallax-direction') || 'up';

      if (isScrollTriggerAvailable) {
        let yStart, yEnd;
        switch (direction) {
          case 'up':
            yStart = 0;
            yEnd = 100 * speed;
            break;
          case 'down':
            yStart = -100 * speed;
            yEnd = 0;
            break;
          default:
            yStart = 0;
            yEnd = 100 * speed;
        }

        // Store original transform
        const originalTransform = el.style.transform || '';

        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const progress = self.progress;
            const y = yStart + (yEnd - yStart) * progress;
            el.style.transform = `${originalTransform} translateY(${y}px)`;
          },
        });
      }
    });

    // Mouse parallax for cards
    const mouseParallaxElements = document.querySelectorAll('[data-parallax-mouse]');

    mouseParallaxElements.forEach(el => {
      const strength = parseFloat(el.getAttribute('data-parallax-strength')) || 20;

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / centerX * strength;
        const moveY = (y - centerY) / centerY * strength;

        // Apply subtle 3D rotation and translation
        gsap.to(el, {
          x: moveX,
          y: moveY,
          rotateX: -moveY * 0.3,
          rotateY: moveX * 0.3,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    });
  }

  // ==========================================
  // 6. Animated Gradient Background
  // ==========================================

  function initAnimatedGradient() {
    const elements = document.querySelectorAll('[data-gradient-animate]');

    elements.forEach(el => {
      gsap.to(el, {
        backgroundPosition: '200% 50%',
        duration: 8,
        repeat: -1,
        ease: 'none',
        yoyo: true,
      });

      el.style.backgroundSize = '200% 200%';
    });
  }

  // ==========================================
  // 7. Typing Effect
  // ==========================================

  function initTypingEffect() {
    const elements = document.querySelectorAll('[data-typing]');

    elements.forEach(el => {
      const text = el.getAttribute('data-typing') || el.textContent;
      const speed = parseInt(el.getAttribute('data-typing-speed')) || 50;
      const cursor = el.getAttribute('data-typing-cursor') !== 'false';

      el.textContent = '';
      if (cursor) {
        el.classList.add('after:content-["|"]', 'after:ml-0.5', 'after:animate-blink');
      }

      let index = 0;

      function type() {
        if (index < text.length) {
          el.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed);
        } else {
          // Dispatch event when typing is complete
          el.dispatchEvent(new CustomEvent('typingComplete'));
        }
      }

      if (isScrollTriggerAvailable) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          onEnter: type,
          once: true,
        });
      } else {
        type();
      }
    });
  }

  // ==========================================
  // Initialize All Animations
  // ==========================================

  function init() {
    // Wait a tick for DOM to be fully ready
    setTimeout(() => {
      initHeroParticles();
      initFadeInUp();
      initCounters();
      initStaggerCards();
      initParallax();
      initAnimatedGradient();
      initTypingEffect();
    }, 100);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run animations when theme changes (if needed)
  document.addEventListener('themeChange', (e) => {
    // Re-trigger any animations that might need updating on theme change
    if (e.detail.darkMode) {
      // Dark mode specific adjustments if needed
    }
  });

  // ==========================================
  // Export public API
  // ==========================================

  window.HermesAnimations = {
    initHeroParticles,
    initFadeInUp,
    initCounters,
    initStaggerCards,
    initParallax,
    initAnimatedGradient,
    initTypingEffect,
    refresh: () => {
      // Refresh ScrollTrigger if available
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }
  };

})();
