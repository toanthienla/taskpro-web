import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
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
          main: '#000'
        },
        secondary: {
          main: '#00b4d8'
        },
        text: {
          primary: '#000'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#ffffff'
        },
        secondary: {
          main: '#03045e'
        },
        text: {
          primary: '#ffffff'
        }
      }
    }
  }
});

export default theme;
