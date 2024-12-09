import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { getBoardApi, postNewColumnApi, postNewCardApi, putBoardColumnOrderIdsAPI, putColumnCardOrderIdsAPI } from '~/apis';
import { cloneDeep, isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/utils/formatters';
import { mapOrder } from '~/utils/sorts';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = '675681d53d32c24d9305bd48';
    getBoardApi(boardId).then((board) => {

      // Sort column by columnOrderIds
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id');

      board.columns.forEach(column => {
        // Add placeholder card if column have empty cards array
        if (isEmpty(column?.cards)) {
          const placeholderCard = generatePlaceholderCard(column);
          column.cardOrderIds.push(placeholderCard._id);
          column.cards.push(placeholderCard);
        } else {
          // Sort card by cardOrderIds
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
        }
      });

      setBoard(board);
    });
  }, []);

  // Function call API for create new column
  const postNewColumn = async (column) => {
    const newColumn = await postNewColumnApi({
      ...column,
      boardId: board._id
    });

    // Add placeholder card for new column
    const placeholderCard = generatePlaceholderCard(newColumn);
    newColumn.cardOrderIds.push(placeholderCard._id);
    newColumn.cards.push(placeholderCard);

    // Update column in board (don't need GET API make slower server)
    const newBoard = cloneDeep(board);
    newBoard.columnOrderIds.push(newColumn._id);
    newBoard.columns.push(newColumn);

    setBoard(newBoard);
  };

  // Function call API for create new card
  const postNewCard = async (card) => {
    const newCard = await postNewCardApi({
      ...card,
      boardId: board._id
    });

    // Update card in column (don't need GET API make slower server)
    const newBoard = cloneDeep(board);
    const updatedColumn = newBoard.columns.find(column => column._id === card.columnId);
    updatedColumn.cardOrderIds.push(newCard._id);
    updatedColumn.cards.push(newCard);
    setBoard(newBoard);
  };

  // Function call API when move column (Dndkit)
  const moveColumn = (dndKitOrderedColumns) => {
    putBoardColumnOrderIdsAPI(board._id, dndKitOrderedColumns);
  };

  // Function call API when move card in the same colum (Dndkit)
  const moveCardSameColumn = (columnId, dndKitOrderedCards) => {
    putColumnCardOrderIdsAPI(columnId, dndKitOrderedCards);
  };

  if (!board) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 2 }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh' }} >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board}
        postNewColumn={postNewColumn} postNewCard={postNewCard}
        moveColumn={moveColumn} moveCardSameColumn={moveCardSameColumn} />
    </Container>
  );
}

export default Board;
