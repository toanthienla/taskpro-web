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
    backgroundColor: 'primary.50'
  }
};

function BoardBar() {
  return (
    <Box sx={{
      height: (theme) => theme.taskPro.boardBarHeight,
      width: '100%',
      borderTop: '1px solid',
      borderColor: 'primary.main',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 2
    }}>

      <Box>
        <Chip icon={<DashboardIcon />} label="Project's Name" sx={MENU_STYLES} onClick='{}' />
        <Chip icon={<VpnLockIcon />} label="Public/Private Workspace" sx={MENU_STYLES} onClick='{}' />
        <Chip icon={<AddToDriveIcon />} label="Add To Google Drive" sx={MENU_STYLES} onClick='{}' />
        <Chip icon={<AutoFixHighIcon />} label="Automation" sx={MENU_STYLES} onClick='{}' />
        <Chip icon={<FilterListIcon />} label="Filter" sx={MENU_STYLES} onClick='{}' />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddAlt1Icon />}>
          Invite
        </Button>
        <AvatarGroup max={4} sx={{
          '& .MuiAvatar-root': {
            fontSize: '16px',
            width: '34px',
            height: '34px'
          }
        }}>
          <Avatar alt="ToanLa" src="hamster.jpg" />
          <Avatar alt="ToanLa" src="hamster.jpg" />
          <Avatar alt="ToanLa" src="hamster.jpg" />
          <Avatar alt="ToanLa" src="hamster.jpg" />
          <Avatar alt="ToanLa" src="hamster.jpg" />
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
