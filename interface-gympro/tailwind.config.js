/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f97316',
          hover:   '#ea6c0a',
          light:   '#fff7ed',
        },
        danger: {
          DEFAULT: '#ef4444',
          light:   '#fee2e2',
        },
        success: {
          DEFAULT: '#22c55e',
          light:   '#dcfce7',
        },
        gym: {
          bg:      '#f4f4f4',
          card:    '#ffffff',
          border:  '#e5e7eb',
          text:    '#111827',
          muted:   '#6b7280',
          nav:     '#f97316',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
        btn:  '9999px',
      },
      boxShadow: {
        card: '0 2px 12px 0 rgba(0,0,0,0.07)',
      },
    },
  },
  plugins: [],
}