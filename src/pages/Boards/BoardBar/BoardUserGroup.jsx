import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';

// Component Avatar Group to show popover when click on +number
function BoardUserGroup({ boardUsers = [], limit = 4 }) {

  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null);
  const isOpenPopover = Boolean(anchorPopoverElement);
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined;
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
    else setAnchorPopoverElement(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: '4px' }}>
      {[...Array(16)].map((_, index) => {
        if (index < limit) {
          return (
            <Tooltip title="username" key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt="avatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_5LwQ3_Ik8lai147xZGje_6CcRjixf90QWQ&s"
              />
            </Tooltip>
          );
        }
      })}

      {/* Nếu số lượng users nhiều hơn limit thì hiện thêm +number */}
      {[...Array(16)].length > limit &&
        <Tooltip title="Show more">
          <Box
            aria-describedby={popoverId}
            onClick={handleTogglePopover}
            sx={{
              width: 36,
              height: 36,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '50%',
              color: 'white',
              backgroundColor: '#a4b0be'
            }}
          >
            +{[...Array(16)].length - limit}
          </Box>
        </Tooltip>
      }


      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: '235px', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {[...Array(12)].map((_, index) =>
            <Tooltip title="username" key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt="avatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_5LwQ3_Ik8lai147xZGje_6CcRjixf90QWQ&s"
              />
            </Tooltip>
          )}
        </Box>
      </Popover>
    </Box>
  );
}

export default BoardUserGroup;
