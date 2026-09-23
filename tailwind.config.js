/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Lora"', 'Georgia', 'ui-serif', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        paper: {
          DEFAULT: '#F7F6F1',
          surface: '#FFFFFF',
          border: '#DDD9CE',
        },
        ink: {
          DEFAULT: '#1B1F1C',
          muted: '#52564F',
        },
        pine: {
          50: '#EAF4F1',
          100: '#CFE6DE',
          300: '#7FBBA9',
          500: '#1F6F63',
          600: '#195A50',
          700: '#134139',
        },
        amber: {
          300: '#EBC98B',
          500: '#C98A2B',
          600: '#A16C1E',
        },
        rust: {
          400: '#D97757',
          500: '#B3452E',
          600: '#8F3623',
        },
        night: {
          DEFAULT: '#14181A',
          surface: '#1C2225',
          border: '#333B3D',
        },
        cream: {
          DEFAULT: '#E9E6DC',
          muted: '#A7ADA6',
        },
      },
    },
  },
  plugins: [],
};
