import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        retro: ['"Press Start 2P"', 'cursive']
      },
      dropShadow: {
        retro: [
          '2px 2px 0 #ffcc00',
          '4px 4px 0 #ff6f61',
          '6px 6px 0 #00bcd4'
        ]
      }
    }
  }
}