import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/wordle-clone/",
  plugins: [tailwindcss()],
});
