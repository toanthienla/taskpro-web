import { Box } from '@mui/material';
import Card from './Card/Card';

function Cards() {
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
      <Card />
      <Card noData />
      <Card noData />
      <Card noData />
      <Card noData />
      <Card noData />
      <Card noData />
    </Box >
  );
}

export default Cards;