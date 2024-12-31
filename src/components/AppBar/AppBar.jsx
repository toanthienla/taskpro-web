import ModeSelect from '~/components/ModeSelect/ModeSelect';
import Box from '@mui/material/Box';
import AppsIcon from '@mui/icons-material/Apps';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as TaskProIcon } from '~/assets/TaskProIcon.svg';
import Typography from '@mui/material/Typography';
// import Workspaces from './Menu/Workspaces';
// import Recent from './Menu/Recent';
// import Starred from './Menu/Starred';
// import Templates from './Menu/Templates';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Account from './Menu/Profile';
// import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Link } from 'react-router-dom';
import Notifications from './Notifications/Notifications';
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard';

function AppBar() {
  return (
    <Box sx={{
      height: (theme) => theme.taskPro.appBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 2,
      gap: 2,
      overflowX: 'auto'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        <Link to='/boards' state={{ openCreateModal: true }}>
          <Tooltip title="List Boards">
            <AppsIcon sx={{ color: 'primary.main', verticalAlign: 'middle' }} />
          </Tooltip>
        </Link>

        <Link to={'/'} style={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <SvgIcon component={TaskProIcon} inheritViewBox />
          <Typography variant='span' sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.3rem' }}>TaskPro</Typography>
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {/* <Workspaces /> */}
          {/* <Recent /> */}
          {/* <Starred /> */}
          {/* <Templates /> */}
          {/* <Link to={'/boards'}>
            <Button variant="outlined" startIcon={<AddToPhotosIcon />}>
              Create
            </Button>
          </Link> */}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        {/* Search board textField */}
        <AutoCompleteSearchBoard />

        {/* Handle dark/light mode */}
        <ModeSelect />

        {/* Handle notifications */}
        <Notifications />

        {/* <Tooltip title="Help" >
          <HelpOutlineIcon sx={{ color: 'primary.main', cursor: 'pointer' }} />
        </Tooltip> */}

        <Account />
      </Box>
    </Box >
  );
}

export default AppBar;
