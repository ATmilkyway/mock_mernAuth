import { defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
  base: {
    borderRadius: "md",
  },
  variants: {
    solid: {
      bg: "primary",
      color: "white",
      _hover: {
        bg: "primaryDark",
      },
    },
  },
})  