import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { mockData } from '~/apis/mockData';
import { getBoard } from '~/apis';

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = '6750480a39e54658e7b7555c';
    getBoard(boardId).then((board) => {
      setBoard(board);
    });
  }, []);

  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh' }} >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  );
}

export default Board;
