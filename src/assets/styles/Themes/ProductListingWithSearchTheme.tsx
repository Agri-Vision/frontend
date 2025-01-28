import { createTheme, useTheme } from "@mui/material";

const useProductListingWithSearchTheme = () => {
    const theme = useTheme();

    return createTheme({
        palette: {
            primary: {
                main: theme.palette.primary.main,
            },
            secondary: {
                main: theme.palette.primary.main,
            },
        },
        components: {
            MuiTypography: {
                styleOverrides: {
                    root: {
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: 'bold',
                        lineHeight: 1.4,
                        fontStretch: 'normal',
                        letterSpacing: 'normal',
                        fontSize: '1.7857rem'
                    }
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '4px',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main, // No change on hover
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main, // No change on focus
                            },
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: '10px',
                        },
                    },
                },
            },
        }
    });
};

export default useProductListingWithSearchTheme;