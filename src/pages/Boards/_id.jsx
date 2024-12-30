import { useEffect } from 'react';
import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { putBoardColumnOrderIdsApi, updateColumnApi, deleteColumnCardOrderIdsApi, updateCardApi } from '~/apis';
import { getBoardApi, updateCurrentActiveBoard, selectCurrentActiveBoard, clearActiveBoard } from '~/redux/activeBoard/activeBoardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import LoadingPage from '~/components/Loading/LoadingPage';
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard';
import { selectCurrentActiveCard, clearCurrentActiveCard } from '~/redux/activeCard/activeCardSlice';

function Board() {
  const board = useSelector(selectCurrentActiveBoard);
  const activeCard = useSelector(selectCurrentActiveCard);
  const dispatch = useDispatch();
  const { boardId } = useParams();

  useEffect(() => {
    dispatch(getBoardApi(boardId));

    return () => {
      // Clear board, card in redux when leave board page
      dispatch(clearActiveBoard());
      dispatch(clearCurrentActiveCard());
    };
  }, [dispatch, boardId]); '';

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

    updateColumnApi({ columnId, cardOrderIds });
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
    updateCardApi(cardId, { columnId: overColumnId });
    if (cardOrderIds) {
      updateColumnApi({ columnId: overColumnId, cardOrderIds });
    }
  };


  if (!board) {
    return <LoadingPage content={'Loading your TaskPro board...'} />;
  }

  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh' }} >

      {activeCard && <ActiveCard />}

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
