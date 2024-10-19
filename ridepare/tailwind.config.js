/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#d6c4a7",
          DEFAULT: "#C4A77D",
          dark: "#b28d57"
        },
        secondary: {
          light: "#f3b99d",
          DEFAULT: "#EF946C",
          dark: "#eb713b"
        },
        accent: {
          light: "#b3a6a6",
          DEFAULT: "#998888",
          dark: "#7f6a6a"
        },
        light: {
          light: "#f2f0ee",
          DEFAULT: "#EADEDA",
          dark: "#e2ccc6"
        },
        neutral: {
          light: "#b5abab",
          DEFAULT: "#A29393",
          dark: "#8f7b7b"
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontSize: {
        'xxs': '.65rem',
        '2.5xl': '1.75rem',
        '4.5xl': '2.5rem',
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      // backgroundImage: {
      //   'hero-pattern': "url('/path/to/hero-pattern.svg')",
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      // },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),

  ],
}
