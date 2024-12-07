import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { getBoardApi, postNewColumnApi, postNewCardApi, putBoardColumnOrderIdsAPI } from '~/apis';
import { cloneDeep, isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/utils/formatters';

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = '67545caa2a9008012e783f88';
    getBoardApi(boardId).then((board) => {

      // Add placeholder card if column have empty cards array
      const emptyColumn = board.columns.find(column => isEmpty(column?.cards));
      if (emptyColumn) {
        const placeholderCard = generatePlaceholderCard(emptyColumn);
        emptyColumn.cardOrderIds.push(placeholderCard._id);
        emptyColumn.cards.push(placeholderCard);
      }

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
  const moveColumn = async (dndKitOrderedColumns) => {
    await putBoardColumnOrderIdsAPI(board._id, dndKitOrderedColumns);
  };

  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh' }} >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board}
        postNewColumn={postNewColumn} postNewCard={postNewCard} moveColumn={moveColumn} />
    </Container>
  );
}

export default Board;
