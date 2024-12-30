import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';
import { mapOrder } from '~/utils/sorts';
import { useSelector } from 'react-redux';
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice';

function CardUserGroup({ cardMemberIds = [], handleUpdateCardMembers }) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null);
  const isOpenPopover = Boolean(anchorPopoverElement);
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined;
  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget);
    else setAnchorPopoverElement(null);
  };

  // Use activeBoard from Redux to get user details for activeCard memberIds
  const board = useSelector(selectCurrentActiveBoard);
  const cardMembers = mapOrder(board?.FE_allUsers.filter(user => cardMemberIds.includes(user?._id)), cardMemberIds, '_id');

  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap', mt: 1 }}>
      {/* Show members of card */}
      {cardMembers.map((user, index) =>
        <Tooltip title={user?.displayName} key={index}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: 'pointer' }}
            alt="userAvatar"
            src={user?.avatar}
          />
        </Tooltip>
      )}

      {/* Add new member in board to card */}
      <Tooltip title="Manage Task Assignment">
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
            fontWeight: '600',
            borderRadius: '50%',
            color: 'primary.main',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2f3542' : theme.palette.grey[200],
            '&:hover': {
              color: (theme) => theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
            }
          }}
        >
          <AddIcon fontSize="small" />
        </Box>
      </Tooltip>

      {/* Popover to add new member  */}
      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: '260px', display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {board?.FE_allUsers.map((user, index) =>
            <Tooltip title={user?.displayName} key={index} onClick={() => handleUpdateCardMembers(user)}>
              <Badge
                overlap="circular"
                variant={cardMemberIds.includes(user?._id) ? 'dot' : 'standard'}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                color='success'
                sx={{
                  cursor: 'pointer',
                  '& .MuiBadge-dot': {
                    outline: '1px solid white'
                  }
                }}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt="userAvatar"
                  src={user?.avatar}
                />
              </Badge>
            </Tooltip>
          )}
        </Box>
      </Popover >
    </Box >
  );
}

export default CardUserGroup;
