// theme.js
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    components: {
        Button: {
            // 1. We can update the base styles
            baseStyle: {
                fontWeight: "bold", // Normally, it is "semibold",
                borderRadius: "none",
                
            },
            // 3. We can add a new visual variant
            variants: {
                "primary": {
                    bg: "red.400",
                },
                "secondary" : {
                    bg: "gray.300",
                },
                "basic": {
                    fontSize: "18px",
                }
            },
        },
    },
})

export default theme