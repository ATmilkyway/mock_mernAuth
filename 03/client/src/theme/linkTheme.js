import { defineRecipe } from "@chakra-ui/react"

export const linkRecipe = defineRecipe({
  base: {
    color: "primary",
    _hover: {
      textDecoration: "underline",
    },
  },
})