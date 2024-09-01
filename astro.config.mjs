import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), icon(), sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["fr", "en"]
  },
  site: "https://vinsg.ca"
});