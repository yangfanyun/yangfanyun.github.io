/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.html',
    './_layouts/**/*.html',
    './_includes/**/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Blue tech palette
        primary: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#bcd5ff',
          300: '#8eb9ff',
          400: '#5994ff',
          500: '#3370ff',
          600: '#1a4dff',
          700: '#0f3ae8',
          800: '#1330bd',
          900: '#162e94',
          950: '#0a1628',
        },
        accent: {
          50: '#f0fdfa',
          100: '#ccfbef',
          200: '#99f6e0',
          300: '#5feacb',
          400: '#2dd5b0',
          500: '#0bc99d',
          600: '#019e7a',
          700: '#037e62',
          800: '#07644f',
          900: '#0a5242',
          950: '#002b22',
        },
        surface: {
          DEFAULT: '#0a1628',
          light: '#0f1f3d',
          lighter: '#162a4a',
          card: '#112240',
          border: '#1e3a5f',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.08)',
          heavy: 'rgba(255, 255, 255, 0.12)',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.8s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.8s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(51, 112, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(51, 112, 255, 0.4)',
        'glow-accent': '0 0 20px rgba(11, 201, 157, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(51, 112, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(51, 112, 255, 0.15) 0%, transparent 70%)',
        'card-glow': 'radial-gradient(ellipse at top right, rgba(51, 112, 255, 0.1) 0%, transparent 60%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities, addComponents, theme }) {
      // Glassmorphism utilities
      const glassUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '0.75rem',
        },
        '.glass-dark': {
          background: 'rgba(10, 22, 40, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '0.75rem',
        },
        '.glass-hover': {
          transition: 'all 0.3s ease',
        },
        '.glass-hover:hover': {
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        '.glass-card': {
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '1rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        },
        '.glass-border': {
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
        '.glass-border-light': {
          border: '1px solid rgba(255, 255, 255, 0.15)',
        },
        '.noise-bg': {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          opacity: '0.03',
        },
      };

      addUtilities(glassUtilities, ['responsive', 'hover']);
    },
  ],
};
