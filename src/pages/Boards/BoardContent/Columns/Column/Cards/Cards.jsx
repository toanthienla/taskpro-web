import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Card from './Card/Card';
import TextField from '@mui/material/TextField';
import { Card as MuiCard } from '@mui/material';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function Cards({ cards, openAddNewCardForm, newCardTitle, setNewCardTitle }) {

  const handleOnChangeNewCardTitle = (e) => {
    setNewCardTitle(e.target.value);
  };

  return (
    < Box sx={{
      m: '0 5px', p: '0 5px 5px 5px', // Trick align scroll bar
      display: 'flex', flexDirection: 'column', gap: 2, overflowX: 'hidden', overflowY: 'auto',
      maxHeight: (theme) => `calc(
              ${theme.taskPro.boardContentHeight} -
              ${theme.spacing(5)} -
              ${theme.taskPro.columnHeaderHeight} -
              ${theme.taskPro.columnFooterHeight}
            )`
    }}>
      <SortableContext items={cards?.map((c) => c._id)} strategy={verticalListSortingStrategy}>
        {cards?.map((card) => <Card key={card._id} card={card} />)}
      </SortableContext >

      {/* Add card title textField */}
      {openAddNewCardForm &&
        <MuiCard
          sx={{
            cursor: 'pointer', overflow: 'unset',
            display: 'block',
            border: '1.5px solid transparent',
            borderColor: '#3498db'
          }}>
          <CardContent sx={{ p: 0, '&:last-child': { p: 0 } }}>
            <TextField autoComplete='off' placeholder="Enter a title..." autoFocus size='small' type='text' id='newTitleTextField'
              value={newCardTitle} onChange={handleOnChangeNewCardTitle} data-no-dnd
              sx={{
                width: '100%',
                py: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none'
                  }
                }
              }}
            />
          </CardContent>
        </MuiCard>
      }
    </Box >
  );
}

export default Cards;