import moment from 'moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice';

function CardActivitySection({ cardComments = [], onAddCardComment }) {
  const currentUser = useSelector(selectCurrentUser);

  const handleAddCardComment = (event) => {
    // User click Enter without Shift key
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Dont add new line when enter
      if (!event.target?.value) return;

      const commentToAdd = {
        avatar: currentUser?.avatar,
        displayName: currentUser?.displayName,
        content: event.target.value.trim()
      };

      onAddCardComment(commentToAdd).then(() => event.target.value = '');
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
      {cardComments.map((comment, index) =>
        <Box sx={{ display: 'flex', gap: 1.5, width: '100%', mb: 1.5 }} key={index}>
          <Avatar
            sx={{ width: 36, height: 36, cursor: 'pointer' }}
            alt="avatar"
            src={comment?.avatar}
          />
          <Box sx={{ width: 'inherit' }}>
            <Typography variant="span" sx={{ fontWeight: '500', mr: 1 }}>
              {comment?.displayName}
            </Typography>

            <Typography variant="span" sx={{ fontSize: '12px' }}>
              {moment(comment?.commentedAt).fromNow()}
            </Typography>

            <Box sx={{
              display: 'block',
              bgcolor: 'background.paper',
              p: '8px 12px',
              mt: '4px',
              border: '0.5px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              wordBreak: 'break-word',
              boxShadow: '0 0 1px rgba(0, 0, 0, 0.2)',
              fontSize: '0.875rem'
            }}>
              {comment?.content}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CardActivitySection;
