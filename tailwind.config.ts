import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--bg-0))',
        foreground: 'hsl(var(--fg))',
        'fg-dim': 'hsl(var(--fg-dim))',
        'fg-mute': 'hsl(var(--fg-mute))',
        'fg-ghost': 'hsl(var(--fg-ghost))',
        teal: 'hsl(var(--teal))',
        'teal-soft': 'hsl(var(--teal-soft))',
        violet: 'hsl(var(--violet))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
