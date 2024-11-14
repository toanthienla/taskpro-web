import { Box } from '@mui/material';

function BoardBar() {
  return (
    <Box sx={{
      height: (theme) => theme.taskPro.boardBarHeight,
      width: '100%',
      backgroundColor: 'primary.main'
    }}></Box>
  );
}

export default BoardBar;
