import HoverMenu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Check from '@mui/icons-material/Check';
import {
  usePopupState,
  bindFocus,
  bindHover,
  bindMenu
} from 'material-ui-popup-state/hooks';

function Recent() {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'recent'
  });
  return (
    <>
      <Button
        variant="text"
        endIcon={<ExpandMoreIcon />}
        {...bindFocus(popupState)}
        {...bindHover(popupState)}
      >
        Recent
      </Button>
      <HoverMenu
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem>
          <ListItemText inset>Single</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>1.15</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText inset>Double</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          Custom: 1.2
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>Add space before paragraph</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Add space after paragraph</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText>Custom spacing...</ListItemText>
        </MenuItem>
      </HoverMenu>
    </>
  );
}

export default Recent;