/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#E2574C',
                    hover: '#C94B41',
                    light: '#FDECEA',
                    dark: '#A83B32',
                },
                surface: {
                    DEFAULT: '#F7F7F8',
                    dark: '#252540',
                    deeper: '#1E1E38',
                },
                border: {
                    DEFAULT: '#E8E8EC',
                    dark: '#3A3A5C',
                },
                ink: {
                    primary: '#1A1A2E',
                    secondary: '#6B6B80',
                    muted: '#9999AA',
                },
                bg: {
                    DEFAULT: '#FFFFFF',
                    dark: '#1A1A2E',
                },
            },
            fontFamily: {
                display: ['Sora', 'sans-serif'],
                body: ['DM Sans', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                card: '12px',
                btn: '8px',
                pill: '9999px',
                icon: '10px',
            },
            boxShadow: {
                card: '0 2px 8px rgba(0,0,0,0.06)',
                'card-hover': '0 8px 24px rgba(226,87,76,0.12)',
                'btn-red': '0 4px 12px rgba(226,87,76,0.35)',
                navbar: '0 1px 0 rgba(0,0,0,0.06)',
                modal: '0 25px 60px rgba(0,0,0,0.18)',
            },
            maxWidth: {
                content: '1200px',
                tool: '800px',
                upload: '640px',
            },
            animation: {
                'fade-up': 'fadeUp 0.5s ease both',
                'fade-in': 'fadeIn 0.4s ease both',
                'bounce-in': 'bounceIn 0.55s cubic-bezier(0.34,1.56,0.64,1) both',
                'slide-down': 'slideDown 0.28s ease both',
                'spin-slow': 'spin 1.5s linear infinite',
            },
            keyframes: {
                fadeUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
                fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
                bounceIn: { from: { opacity: '0', transform: 'scale(0.82)' }, to: { opacity: '1', transform: 'scale(1)' } },
                slideDown: { from: { opacity: '0', transform: 'translateY(-10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
            },
        },
    },
    plugins: [],
}
