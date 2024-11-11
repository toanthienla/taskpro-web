import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({

  taskPro: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },

  colorSchemes: {
    light: {
      palette: {

      }
    },
    dark: {
      palette: {

      }
    }
  }
}
);

export default theme;