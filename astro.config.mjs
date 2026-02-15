import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import icon from 'astro-icon';

export default defineConfig({
	site: 'https://emrullahyildirim.github.io',
	base: '/portfolio/',
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [react(), icon()]
});
