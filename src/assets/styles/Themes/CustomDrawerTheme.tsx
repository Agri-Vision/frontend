import { createTheme } from "@mui/material";

const DrawerTheme = createTheme({
    components: {
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: 'white',
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'white',
                    minWidth: 40
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fill: 'white',
                },
            },
        },
    },
});

export { DrawerTheme };