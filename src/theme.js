import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '60px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

const theme = extendTheme({
  taskPro: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  typography: {
    fontFamily: '"Catamaran", sans-serif'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1e2341'
        },
        background: {
          default: '#f0f5ff'
        },
        text: {
          primary: '#000000'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#f0f5ff'
        },
        background: {
          default: '#1E2341'
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
            width: '4px',
            height: '4px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '1px',
            cursor: 'pointer'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#94989c'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' }
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
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    }
  }
});

export default theme;