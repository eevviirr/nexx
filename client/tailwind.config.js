/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            container: {
                center: true,
                padding: "20px",
            },
            colors: {
                accent: "#FF2626",
            },
            fontFamily: {
                sans: ["montserrat", "sans-serif"],
            },
            transitionTimingFunction: {
                pop: "cubic-bezier(.67,-1.65,.38,1.95)",
            },
        },
    },
    plugins: [],
};
