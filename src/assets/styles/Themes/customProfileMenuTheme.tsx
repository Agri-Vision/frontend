import { createTheme, useTheme } from "@mui/material";

const useProfileMenuTheme = () => {
    const theme = useTheme();

    return createTheme({
        components: {
            MuiListItemText: {
                styleOverrides: {
                    root: {
                        fontFamily: theme.typography.fontFamily,

                    },
                    primary: {
                        fontFamily: theme.typography.fontFamily,
                        fontSize: 14,
                    },
                    secondary: {
                        fontFamily: theme.typography.fontFamily,
                        fontSize: 12,
                    }
                }
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: 18,
                        paddingLeft: 32,
                        paddingRight: 16
                    },
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        width: 30,
                        height: 30,
                        border: '1px solid white',
                        fontSize: 13
                    },
                },
            }
        }
    });
};

export default useProfileMenuTheme;