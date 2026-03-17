/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0B',
        surface: '#131316',
        'surface-hover': '#1A1A1E',
        border: '#1E1E21',
        'border-light': '#2A2A2E',
        'text-primary': '#F5F5F5',
        'text-secondary': '#8B8B8B',
        'text-muted': '#5C5C5C',
        accent: {
          DEFAULT: '#FF9500',
          light: '#FFB340',
          dark: '#E07800',
        },
        // Keep base scale for compatibility
        base: {
          950: '#0A0A0B',
          900: '#131316',
          800: '#1E1E21',
          700: '#2A2A2E',
          600: '#5C5C5C',
          500: '#8B8B8B',
          400: '#8B8B8B',
          300: '#D4D4D8',
          200: '#E4E4E7',
          100: '#F4F4F5',
          50: '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"SF Mono"', '"Fira Code"', '"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        pill: '20px',
      },
      maxWidth: {
        container: '1200px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [
    function addVariablesForColors({ addBase, theme }) {
      function flatten(colors, prefix = '') {
        return Object.entries(colors).reduce((acc, [key, val]) => {
          const name = prefix ? `${prefix}-${key}` : key;
          if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
            Object.assign(acc, flatten(val, name));
          } else {
            acc[name] = val;
          }
          return acc;
        }, {});
      }

      const allColors = flatten(theme('colors'));
      const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );
      addBase({ ':root': newVars });
    },
  ],
};
