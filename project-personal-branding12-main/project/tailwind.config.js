/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        typewriter: ['"Special Elite"', 'monospace'],
        terminal: ['"VT323"', 'monospace'],
        courier: ['"Courier Prime"', 'monospace'],
      },
      colors: {
        // Tema berbasis CSS variable → otomatis berganti saat mode gelap ("lights off")
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        aged: 'rgb(var(--aged) / <alpha-value>)',
        file: 'rgb(var(--file) / <alpha-value>)',
        // Warna tetap (tidak berubah antar tema) untuk blok yang harus selalu gelap / krem
        night: '#161614',
        cream: '#e8e4d8',
      },
      boxShadow: {
        stamp: '2px 2px 0 0 rgb(var(--ink))',
        hard: '6px 6px 0 0 rgb(var(--ink))',
        'hard-sm': '3px 3px 0 0 rgb(var(--ink))',
        'hard-lg': '10px 10px 0 0 rgb(var(--ink))',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '45%': { opacity: '0.85' },
          '50%': { opacity: '0.6' },
          '55%': { opacity: '0.9' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        stampIn: {
          '0%': { transform: 'rotate(-18deg) scale(2.4)', opacity: '0' },
          '60%': { transform: 'rotate(-14deg) scale(1.1)', opacity: '1' },
          '100%': { transform: 'rotate(-12deg) scale(1)', opacity: '1' },
        },
        typeIn: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(-4deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pinDrop: {
          '0%': { transform: 'translateY(-30px) scale(1.6)', opacity: '0' },
          '70%': { transform: 'translateY(2px) scale(0.95)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        drawLine: {
          to: { strokeDashoffset: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(250%)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        modalIn: {
          '0%': { opacity: '0', transform: 'scale(0.92) rotate(-2deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0)' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        flicker: 'flicker 3s infinite',
        scan: 'scan 6s linear infinite',
        stampIn: 'stampIn 0.5s ease-out forwards',
        typeIn: 'typeIn 1.8s steps(40) forwards',
        marquee: 'marquee 28s linear infinite',
        floaty: 'floaty 9s ease-in-out infinite',
        fadeUp: 'fadeUp 0.7s ease-out both',
        pinDrop: 'pinDrop 0.5s ease-out both',
        drawLine: 'drawLine 1.4s ease-out forwards',
        shimmer: 'shimmer 2.4s ease-in-out infinite',
        modalIn: 'modalIn 0.3s ease-out both',
        shake: 'shake 0.3s ease-in-out 2',
      },
    },
  },
  plugins: [],
};
