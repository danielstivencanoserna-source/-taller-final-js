/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#c0fa72',
                'primary-container': '#9be35c', // A slightly darker green for variants
                'rick-blue': '#a1d5e3',
                'on-surface': '#ffffff',
                'on-surface-variant': '#b0b0b0', // Light gray for variants
                background: '#0d0d16',
                'outline-variant': '#404040', // For borders
            },
            fontFamily: {
                headline: ['Space Grotesk', 'sans-serif'],
                body: ['Manrope', 'sans-serif'],
                label: ['Plus Jakarta Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
}