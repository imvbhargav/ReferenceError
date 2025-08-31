// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  markdown: {
    shikiConfig: {
      wrap: true,
      themes: {
        light: 'catppuccin-latte',
        dark: 'aurora-x',
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
