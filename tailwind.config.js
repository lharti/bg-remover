import tailwindAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

    theme: {
        extend: {
            keyframes: {
                'shift-filters': {
                    '0%': {
                        filter: 'hue-rotate(0deg) grayscale(0%) blur(0px)',
                    },
                    '25%': {
                        filter: 'hue-rotate(90deg) grayscale(25%) blur(5px)',
                    },
                    '50%': {
                        filter: 'hue-rotate(180deg) grayscale(50%) blur(10px)',
                    },
                    '75%': {
                        filter: 'hue-rotate(270deg) grayscale(75%) blur(5px)',
                    },
                    '100%': {
                        filter: 'hue-rotate(360deg) grayscale(100%) blur(0px)',
                    },
                },
            },

            animation: {
                'shift-filters': 'shift-filters 2s ease-in-out infinite',
            },

            screens: {
                xs: '370px',
            },
        },
    },

    plugins: [tailwindAnimate],
}
