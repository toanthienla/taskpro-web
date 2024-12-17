import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ReactComponent as OopsSvg } from '~/assets/404/oops.svg';

function NotFound() {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      bgcolor: '#E9F5FE',
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5
    }}>
      <Typography variant="h1" sx={{ fontSize: '3rem', fontWeight: 800 }}>Oops!</Typography>

      <Box sx={{
        width: '55%',
        '& svg': {
          width: '100%',
          height: 'auto'
        }
      }}>
        <OopsSvg />
      </Box>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          startIcon={<KeyboardReturnIcon />}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.25rem'
          }}
        >Go Home</Button>
      </Link>
    </Box>
  );
}

export default NotFound;
