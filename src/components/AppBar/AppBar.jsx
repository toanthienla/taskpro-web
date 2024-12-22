import ModeSelect from '~/components/ModeSelect/ModeSelect';
import Box from '@mui/material/Box';
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
import Account from './Menu/Profile';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';

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

        <AppsIcon sx={{ color: 'primary.main' }} />

        <Link to={'/'} style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SvgIcon component={TaskProIcon} inheritViewBox />
          <Typography variant='span' sx={{ color: 'primary.main', fontWeight: 'bold', fontSize: '1.3rem' }}>TaskPro</Typography>
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined" startIcon={<AddToPhotosIcon />}>
            Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField id="outlined-search" label="Search field" type="search" size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'primary.main', fontSize: '20px' }} />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: '120px',
            '& label': { color: 'primary.main' },
            '& input': { color: 'primary.dark' },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.light'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => `${theme.palette.primary.main} !important`
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main'
            },
            '& label.Mui-focused': {
              color: 'primary.main'
            }
          }}
        />
        <ModeSelect />

        <Tooltip title="Notification">
          <Badge variant="dot" color='error' sx={{
            cursor: 'pointer'
          }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
          <HelpOutlineIcon sx={{ color: 'primary.main' }} />
        </Tooltip>

        <Account />
      </Box>
    </Box >
  );
}

export default AppBar;
