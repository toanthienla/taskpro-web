import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.js';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from '~/redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Inject store to use store outside component (axios error handling)
import { injectStore } from './apis/authAxios.js';
injectStore(store);

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider>
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
            <CssBaseline />
            <App />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              limit={3}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme={'light'}
              transition={Bounce} />
          </ConfirmProvider>
        </CssVarsProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
