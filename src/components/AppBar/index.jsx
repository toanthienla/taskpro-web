import ModeSelect from '~/components/ModeSelect';
import { Box } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as TaskProIcon } from '~/assets/TaskProIcon.svg';
import Typography from '@mui/material/Typography';
import Workspaces from './Menu/Workspaces';
import Recent from './Menu/Recent';
import Starred from './Menu/Starred';
import Templates from './Menu/Templates';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Account from './Menu/Account';

function AppBar() {
  return (
    <Box sx={{
      height: (theme) => theme.taskPro.appBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 3
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TaskProIcon} inheritViewBox />
          <Typography variant='span' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>TaskPro</Typography>
        </Box>

        <Workspaces />
        <Recent />
        <Starred />
        <Templates />

        <Button variant="outlined">
          Create
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField id="outlined-search" label="Search field" type="search" size='small' />
        <ModeSelect />

        <Tooltip title="Notification">
          <Badge variant="dot" sx={{
            '& .MuiBadge-badge': {
              backgroundColor: 'red'
            },
            cursor: 'pointer'
          }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
          <HelpOutlineIcon />
        </Tooltip>

        <Account />
      </Box>
    </Box >
  );
}

export default AppBar;
