import ModeSelect from '../../components/ModeSelect';
import { Box } from '@mui/material';

function AppBar() {
  return (
    <Box sx={{
      height: (theme) => theme.taskPro.appBarHeight,
      width: '100%',
      backgroundColor: 'primary.light',
      display: 'flex',
      alignItems: 'center'
    }}>
      <ModeSelect />
    </Box>
  );
}

export default AppBar;
