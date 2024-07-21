import { createTheme } from "@mui/material";

const AppBarTheme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff",
                    zIndex: 1201
                }
            }
        }
    }
})

export { AppBarTheme };