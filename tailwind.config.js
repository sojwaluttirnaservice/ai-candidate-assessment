module.exports = {

    // JIT mode is used to generate CSS on-demand, which is more efficient than the default mode.
    mode: "jit",
    content: [
        "./application/views/**/*.ejs",
        "./public/javascript/**/*.js",
        // "./public/stylesheets/**/*.css",
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },
        },
    },
    plugins: [
        {
            tailwindcss: {},
            autoprefixer: {},
        },
    ],
}
