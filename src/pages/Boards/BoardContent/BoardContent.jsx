import { Box } from '@mui/material';
import Columns from './Columns/Columns';
import { mapOrder } from '~/utils/sorts';

function BoardContent({ board }) {

  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id');

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
        <Columns columns={orderedColumns}></Columns>
      </Box>

    </Box>
  );
}

export default BoardContent;
