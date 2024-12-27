import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice';

function CardActivitySection() {
  const currentUser = useSelector(selectCurrentUser);

  const handleAddCardComment = (event) => {
    // User click Enter without Shift key
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Dont add new line when enter
      if (!event.target?.value) return;

      const commentToAdd = {
        userAvatar: currentUser?.avatar,
        userDisplayName: currentUser?.displayName,
        content: event.target.value.trim()
      };
      console.log(commentToAdd);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <Avatar
          sx={{ width: 36, height: 36, cursor: 'pointer' }}
          alt="trungquandev"
          src={currentUser?.avatar}
        />
        <TextField
          fullWidth
          placeholder="Write a comment..."
          type="text"
          variant="outlined"
          multiline
          onKeyDown={handleAddCardComment}
        />
      </Box>

      {/* Show list comments */}
      {/* {[...Array(0)].length === 0 &&
        <Typography sx={{ pl: '45px', fontSize: '14px', fontWeight: '500', color: '#b1b1b1' }}>No activity found!</Typography>
      } */}
      {[...Array(2)].map((_, index) =>
        <Box sx={{ display: 'flex', gap: 1.5, width: '100%', mb: 1.5 }} key={index}>
          <Tooltip title="avatar">
            <Avatar
              sx={{ width: 36, height: 36, cursor: 'pointer' }}
              alt="avatar"
              src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png"
            />
          </Tooltip>
          <Box sx={{ width: 'inherit' }}>
            <Typography variant="span" sx={{ fontWeight: 'bold', mr: 1 }}>
              Toan La
            </Typography>

            <Typography variant="span" sx={{ fontSize: '12px' }}>
              {moment().format('llll')}
            </Typography>

            <Box sx={{
              display: 'block',
              bgcolor: 'background.paper',
              p: '8px 12px',
              mt: '4px',
              border: '0.5px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              wordBreak: 'break-word',
              boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)'
            }}>
              ...
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CardActivitySection;
