import { Box } from '@mui/material';
import Columns from './Columns/Columns';

function BoardContent() {

  return (
    <Box sx={{
      height: (theme) => theme.taskPro.boardContentHeight,
      width: '100%',
      backgroundColor: 'primary.main',
      background: 'linear-gradient(to right, #7828fa, #00f0a0)',
      p: '10px 0'
    }}>

      {/* Use for align scroll bar columns padding */}
      <Box sx={{
        display: 'flex', overflowX: 'auto', overflowY: 'hidden', height: '100%', p: '10px',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        <Columns></Columns>
      </Box>

    </Box>
  );
}

export default BoardContent;
