import Box from '@mui/material/Box';
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
      p: '20px 0',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden'

    }}>

      <Columns columns={orderedColumns}></Columns>

    </Box>
  );
}

export default BoardContent;
