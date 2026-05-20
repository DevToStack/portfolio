/** @type {import('tailwindcss').Config} */
const config = {
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                background: 'var(--color-bg)',
                surface: 'var(--color-surface)',
                text: 'var(--color-text)',
            },
        },
    },
    plugins: [],
};

export default config;
