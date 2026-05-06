/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': '#080D1A',
        'bg-surface': '#0F1729',
        'bg-elevated': '#162035',
        'bg-overlay': '#1C2A42',
        'accent-cobalt': '#4F7EFF',
        'accent-cobalt-dim': 'rgba(79,126,255,0.12)',
        'accent-amber': '#F5C518',
        'accent-amber-dim': 'rgba(245,197,24,0.12)',
        'accent-violet': '#7C6FFF',
        'risk-critical': '#F87171',
        'risk-high': '#FB923C',
        'risk-medium': '#F5C518',
        'risk-low': '#34D399',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        'text-muted': '#4B5563',
        'text-cobalt': '#4F7EFF',
        'text-amber': '#F5C518',
        'border-default': 'rgba(79,126,255,0.12)',
        'border-active': 'rgba(79,126,255,0.4)',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        plex: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderColor: {
        DEFAULT: 'rgba(79,126,255,0.12)',
      },
    },
  },
  plugins: [],
}
