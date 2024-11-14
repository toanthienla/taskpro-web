import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

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
        primary: blue
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
