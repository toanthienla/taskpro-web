import { Box } from '@mui/material';

function BoardBar() {
  return (
    <Box sx={{
      height: (theme) => theme.taskPro.boardBarHeight,
      width: '100%',
      backgroundColor: 'primary.dark'
    }}></Box>
  );
}

export default BoardBar;
