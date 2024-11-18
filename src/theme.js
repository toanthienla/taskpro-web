import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

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
          main: '#0d47a1'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#00b4d8'
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
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '10px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#005CB2'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => (
          {
            color: theme.palette.primary.main,
            fontSize: '0.875rem'
          }
        )
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => (
          {
            color: theme.palette.primary.main,
            fontSize: '0.875rem',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            }
          }
        )
      }
    }
  }
});

export default theme;
