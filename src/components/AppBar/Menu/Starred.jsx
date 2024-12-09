import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Check from '@mui/icons-material/Check';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect, useRef } from 'react';

const Starred = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        endIcon={<ExpandMoreIcon />}
      >
        Starred
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{
                    borderRadius: '3px',
                    bgcolor: 'hsl(0deg 0% 100% / 0.08)'
                  }}
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
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div >
  );
};

export default Starred;