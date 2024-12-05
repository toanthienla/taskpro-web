import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Card from './Card/Card';
import TextField from '@mui/material/TextField';
import { Card as MuiCard } from '@mui/material';

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function Cards({ cards, openAddNewCardForm, isAddCardClick }) {
  // Add new card
  const [newCardTitle, setNewCardTitle] = useState('');
  useEffect(() => {
    if (isAddCardClick) {
      setNewCardTitle('');
    }
  }, [isAddCardClick]);

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
            border: '1px solid transparent'
          }}>
          <CardContent sx={{ p: 0, '&:last-child': { p: 0 } }}>
            <TextField placeholder="Enter a title..." autoFocus size='small' type='text' id='newTitleTextField'
              value={newCardTitle} onChange={(e) => setNewCardTitle(e.target.value)}
              sx={{
                width: '100%',
                paddingBottom: 1.2,
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