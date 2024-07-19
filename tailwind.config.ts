import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#6528F7',
          400: '#501BCE',
          500: '#3B1791',
          800: '#211F38',
        },
        secondary: '#9333EA',
        accent: '#F59E0B',
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
      },
      animation: {
        shine: "shine 2s linear",
        bounce2: "bounce2 .8s 1 forwards"
      },
      keyframes: {
        shine: {
          '0%': {left: '-100px'},
          '20%': {left: '100%'},
          '100%': {left: '100%'},
        },
        bounce2: {
            '0%': {
                transform: "translate(50%, 0)",
                "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
            },
            '50%': {
                transform: "translate(50%, 25%)",
                "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
            },
            '100%': {
                transform: "translate(50%, 0)",
            },
        },
      },
      backgroundSize: {
        '28%': '28%',
        '60%': '60%',
        '70%': '70%',
        '80%': '80%',
      },
    },
  },
  plugins: [],
};

export default config;
