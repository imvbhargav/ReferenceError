// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://referenceerror.xharv.in',
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
