import type { Config } from "tailwindcss";
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      height: {
        "95": "95%",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          80: 'hsl(var(--muted)/0.8)',
          50: 'hsl(var(--muted)/0.5)',
          20: 'hsl(var(--muted)/0.2)',
          10: 'hsl(var(--muted)/0.1)',
          5: 'hsl(var(--muted)/0.05)',
          foreground: 'hsl(var(--muted-foreground))',
          'foreground-50': 'hsl(var(--muted-foreground)/0.5)',
          border: 'hsl(var(--muted-foreground))',
          'border-50': 'hsl(var(--muted-foreground)/0.5)',
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        overlay: {
          DEFAULT: 'hsl(var(--overlay))',
          80: 'hsl(var(--overlay-80))',
          50: 'hsl(var(--overlay-50))',
          20: 'hsl(var(--overlay-20))',
          foreground: 'hsl(var(--overlay-foreground))',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "dotty": {
          // "0%": "content-['']",
          "0%": {
            content: "''"
          },
          "25%": {
            content: "'.'"
          },
          "50%": {
            content: "'..'"
          },
          "75%": {
            content: "'...'"
          },
          "100%": {
            content: "''"
          },
          // "25%": ""
          // 25%  { content: '.'; }
          // 50%  { content: '..'; }
          // 75%  { content: '...'; }
          // 100% { content: ''; }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "dotty": "dotty steps(1,end) 1s infinite",
      },
      screens: {
        desktop: '1025px',
      },
      width: {
        'sidebar-width': 'var(--sidebar-width)'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config