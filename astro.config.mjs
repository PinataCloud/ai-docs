// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  redirects: {
    '/ipfs': '/'
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
