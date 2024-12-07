import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <App />
    <ToastContainer pauseOnFocusLoss={false} newestOnTop />
  </CssVarsProvider>
  // </React.StrictMode>
);
