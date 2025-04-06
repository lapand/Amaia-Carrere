import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '350px',
        '3xl': '1800px',
      },
      fontSize: {
        '1.5xl': ['1.4rem', '1.9rem'],
        '2.5xl': ['1.75rem', '2.08rem'],
        '3.5xl': ['2rem', '2.35rem'],
        '4.5xl': ['2.5rem', '2.6rem'],
        '4.8xl': ['2.75rem', '3rem'],
        '5.5xl': ['3.4rem', '3.3rem'],
        '6.5xl': ['4.1rem', '1'],
        '8xl': ['5rem', '1'],
        '9xl': ['6rem', '1'],
        'h1-sm': ['3.5rem', '3.8rem'],
        'h1-xl': ['3.7rem', '4.3rem'],
      },
      colors: {
        primary: {
          200: 'rgb(251,241,225)',
          300: '#6528F7',
          400: '#62564e',
          500: '#3B1791',
          600: 'rgb(44,38,34)',
          800: '#211F38',
        },
        secondary: '#9333EA',
        accent: '#F59E0B',
        accent2: '#ff5500',
        accent3: 'rgb(253,186,116)',
        accent4: 'rgb(224,155,43)',
        surface: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#CBCFD2',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        terracotta: {
          100: '#f4d1c9',
          200: '#e9b2a5',
          300: '#dc8f7d',
          400: '#cf6e5d',
          500: '#ba4a39',
          600: '#9f3d30',
          700: '#832f26',
          800: '#68241d',
          900: '#4d1914',
        },
        aubergine: {
          100: '#e5d8ed',
          200: '#c9addb',
          300: '#ac82c8',
          400: '#8f5db4',
          500: '#5b2d6e',
          600: '#4d265e',
          700: '#3e1e4d',
          800: '#2f163b',
          900: '#210f2a',
        },        
      },
      animation: {
        shine: 'shine 2s linear',
        bounce2: 'bounce2 .8s 1 forwards',
      },
      keyframes: {
        shine: {
          '0%': { left: '-100px' },
          '20%': { left: '100%' },
          '100%': { left: '100%' },
        },
        bounce2: {
          '0%': {
            transform: 'translate(50%, 0)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'translate(50%, 25%)',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
          '100%': {
            transform: 'translate(50%, 0)',
          },
        },
      },
      backgroundSize: {
        '28%': '28%',
        '60%': '60%',
        '70%': '70%',
        '80%': '80%',
      },
      boxShadow: {
        btn: '3px 5px 8px 0px rgba(0, 0, 0, 0.5)',
        'active-btn': '2px 3px 5px 0px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
