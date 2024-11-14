import { Box } from '@mui/material';

function BoardContent() {
  return (
    <Box sx={{
      height: (theme) => `calc(100vh - ${theme.taskPro.appBarHeight} - ${theme.taskPro.boardBarHeight})`,
      width: '100%',
      backgroundColor: 'primary.light'
    }}></Box>
  );
}

export default BoardContent;
