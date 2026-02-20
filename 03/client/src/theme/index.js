import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./buttonTheme";
import { linkRecipe } from "./linkTheme";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#3182ce" },
        primaryDark: { value: "#2b6cb0" },
        mutedText: { value: "#a0aec0" },
      },
    },
    recipes: {
      button: buttonRecipe,
      link: linkRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, config);
