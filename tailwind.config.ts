import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        
        'mq-lightred': '#a6192e',
        'mq-darkred':'#76232f',
        'mq-black':'#000000',
        'mq-grey':'#373a36',
        'mq-lightgrey':'#373a36',
        "mq-rice":"#edebe5"
        
      }
    },
  },
  plugins: [],
}
export default config
