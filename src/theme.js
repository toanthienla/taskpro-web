import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const theme = extendTheme({
  taskPro: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  typography: {
    allVariants: {
      fontFamily: 'Poppins'
    }
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#2e86de'
        },
        background: {
          default: '#ffffff'
        },
        text: {
          primary: '#000000'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#77CDFF'
        },
        background: {
          default: '#121212'
        },
        text: {
          primary: '#ffffff'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body:
        {
          '*::-webkit-scrollbar': {
            height: '4px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '10px',
            cursor: 'pointer'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08)
          }
        })
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root:
        {
          fontSize: '0.875rem'
        }
      }
    }
  }
});

export default theme;