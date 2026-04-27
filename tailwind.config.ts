import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        portfolio: {
          bg: '#f7f4ef',
          fg: '#1c1917',
          muted: '#6b6560',
          border: '#ddd8d0',
          surface: '#eeeae3',
        },
      },
    },
  },
  plugins: [],
}

export default config
