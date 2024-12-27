import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import { capitalizeFirstLetter } from '~/utils/formatters';
import BoardUserGroup from './BoardUserGroup';

const MENU_STYLES = {
  color: 'primary.main',
  backgroundColor: 'transparent',
  px: '5px',
  borderRadius: '4px',
  border: 'none',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    backgroundColor: (theme) => (alpha(theme.palette.primary.main, 0.05))
  }
};

function BoardBar({ board }) {
  return (
    <Box sx={{
      height: (theme) => theme.taskPro.boardBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 2,
      overflowX: 'auto',
      backgroundColor: (theme) => (alpha(theme.palette.primary.main, 0.1))
    }}>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip icon={<DashboardIcon />} label={board?.title} sx={MENU_STYLES} clickable />
        </Tooltip>
        <Chip icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} sx={MENU_STYLES} clickable />
        <Chip icon={<AddToDriveIcon />} label="Add To Google Drive" sx={MENU_STYLES} clickable />
        <Chip icon={<AutoFixHighIcon />} label="Automation" sx={MENU_STYLES} clickable />
        <Chip icon={<FilterListIcon />} label="Filter" sx={MENU_STYLES} clickable />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddAlt1Icon />}>
          Invite
        </Button>

        {/* Avatars Group */}
        <BoardUserGroup />
      </Box>
    </Box>
  );
}

export default BoardBar;
