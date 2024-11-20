import { Box } from '@mui/material';
import Card from './Card/Card';

function Cards({ cards }) {
  return (
    < Box sx={{
      m: '0 5px', p: '0 5px', // Trick align scroll bar
      display: 'flex', flexDirection: 'column', gap: 2, overflowX: 'hidden', overflowY: 'auto',
      maxHeight: (theme) => `calc(
              ${theme.taskPro.boardContentHeight} -
              ${theme.spacing(5)} -
              ${theme.taskPro.columnHeaderHeight} -
              ${theme.taskPro.columnFooterHeight}
            )`
    }}>
      {cards?.map((card) => <Card key={card._id} card={card} />)}
    </Box >
  );
}

export default Cards;