import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import { getBoard } from '~/apis';
import { mockData } from '~/apis/mockData';

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = '675084acd3adfa1ffc4eb49a';
    getBoard(boardId).then((board) => {
      setBoard(board);
    });
  }, []);

  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh' }} >
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  );
}

export default Board;
