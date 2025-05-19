import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */

const config = {
    kit: {
        adapter: adapter(),

        paths: {
            base: '',
            relative: true
        },
        prerender: {
            entries: ['*'], // Prerender all pages
        },
    },
};

export default config;