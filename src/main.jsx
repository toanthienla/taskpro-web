import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from '~/redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider>
          <CssBaseline />
          <App />
          <ToastContainer pauseOnFocusLoss={false} newestOnTop />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
);
