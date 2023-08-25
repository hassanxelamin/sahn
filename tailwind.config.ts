import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'mono': ['Mono', 'helvetica', 'sans-serif'],
        'inter': ['Inter', 'helvetica', 'sans-serif'],
        'roboto': ['Mono', 'helvetica', 'sans-serif'],
        'sf': ['SF', 'helvetica', 'sans-serif'],
        'sk': ['SK', 'helvetica', 'sans-serif'],
        'vcr': ['VCR', 'helvetica', 'sans-serif'],
        'styrene': ['Styrene', 'helvetica', 'sans-serif'],
      },
      backgroundColor: {
        'custom-blue': 'rgba(48, 49, 49, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config
