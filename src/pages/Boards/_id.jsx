import { useEffect } from 'react';
import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { putBoardColumnOrderIdsApi, putColumnCardOrderIdsApi, deleteColumnCardOrderIdsApi, putCardColumnId } from '~/apis';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getBoardApi, updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

function Board() {
  const board = useSelector(selectCurrentActiveBoard);
  const dispatch = useDispatch();
  const { boardId } = useParams();

  useEffect(() => {
    dispatch(getBoardApi(boardId));
  }, [dispatch]); '';

  // Function call API when move column (Dndkit)
  const moveColumn = (orderedColumns) => {
    const columnOrderIds = orderedColumns.map(column => column._id);
    const newBoard = { ...board };
    newBoard.columnOrderIds = columnOrderIds;
    newBoard.columns = orderedColumns;
    dispatch(updateCurrentActiveBoard(newBoard));

    putBoardColumnOrderIdsApi(board._id, columnOrderIds);
  };

  // Function call API when move card in the same colum (Dndkit)
  const moveCardSameColumn = (columnId, cardOrderIds, orderedColumns) => {
    const newBoard = { ...board };
    newBoard.columns = orderedColumns;
    dispatch(updateCurrentActiveBoard(newBoard));

    putColumnCardOrderIdsApi(columnId, cardOrderIds);
  };

  // Function call API when move card to different column (Dndkit)
  const moveCardDifferentColumn = (activeColumnId, overColumnId, cardId, cardOrderIds, orderedColumns
  ) => {
    if (orderedColumns) {
      const newBoard = { ...board };
      newBoard.columns = orderedColumns;
      dispatch(updateCurrentActiveBoard(newBoard));
    }

    deleteColumnCardOrderIdsApi(activeColumnId, cardId);
    putCardColumnId(overColumnId, cardId);
    if (cardOrderIds) {
      putColumnCardOrderIdsApi(overColumnId, cardOrderIds);
    }
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
      <BoardContent
        board={board}

        moveColumn={moveColumn}
        moveCardSameColumn={moveCardSameColumn}
        moveCardDifferentColumn={moveCardDifferentColumn}
      />
    </Container>
  );
}

export default Board;
