/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // MTN Brand Colors
        'mtn-yellow': '#FFCB05',
        'mtn-yellow-light': '#FFD633',
        'mtn-yellow-dark': '#E6B800',
        'mtn-blue': '#0066CC',
        'mtn-blue-light': '#3385D6',
        'mtn-blue-dark': '#004C99',
        
        // Background layers
        'bg-base': '#0A0E1A',
        'bg-surface': '#111827',
        'bg-elevated': '#1F2937',
        'bg-overlay': '#374151',
        
        // Primary (MTN Yellow)
        'primary': '#FFCB05',
        'primary-dim': 'rgba(255,203,5,0.1)',
        'primary-hover': '#FFD633',
        
        // Secondary (Blue)
        'secondary': '#0066CC',
        'secondary-dim': 'rgba(0,102,204,0.1)',
        'secondary-hover': '#3385D6',
        
        // Status colors
        'status-success': '#10B981',
        'status-warning': '#F59E0B',
        'status-error': '#EF4444',
        'status-info': '#3B82F6',
        
        // Risk levels
        'risk-critical': '#DC2626',
        'risk-high': '#F97316',
        'risk-medium': '#FFCB05',
        'risk-low': '#10B981',
        
        // Text
        'text-primary': '#F9FAFB',
        'text-secondary': '#D1D5DB',
        'text-muted': '#6B7280',
        'text-yellow': '#FFCB05',
        'text-blue': '#60A5FA',
        
        // Borders
        'border-default': 'rgba(255,203,5,0.15)',
        'border-active': 'rgba(255,203,5,0.5)',
        'border-subtle': 'rgba(156,163,175,0.2)',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        plex: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderColor: {
        DEFAULT: 'rgba(255,203,5,0.15)',
      },
    },
  },
  plugins: [],
}
