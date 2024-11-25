import Box from '@mui/material/Box';
import Columns from './Columns/Columns';
import { mapOrder } from '~/utils/sorts';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import Column from './Columns/Column/Column';
import Card from './Columns/Column/Cards/Card/Card';

const DRAG_TYPE = {
  CARD: 'card',
  COLUMN: 'column'
};

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([]);
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'));
  }, [board]);

  // Column click dragEnd catch and mobile issues
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 30
    }
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const [dragItemId, setDragItemId] = useState();
  const [dragItemType, setDragItemType] = useState();
  const [dragItemData, setDragItemData] = useState();
  const handleDragStart = (event) => {
    setDragItemId(event?.active?.id);
    setDragItemType(event?.active?.data?.current?.columnId ? DRAG_TYPE.CARD : DRAG_TYPE.COLUMN);
    setDragItemData(event?.active?.data?.current);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const fromIndex = orderedColumns.findIndex((c) => c._id === active.id);
      const toIndex = orderedColumns.findIndex((c) => c._id === over.id);
      const dndKitOrderedColumns = arrayMove(orderedColumns, fromIndex, toIndex);
      setOrderedColumns(dndKitOrderedColumns);
      // Array use for update in dbms
      // console.log(dndKitOrderedColumns.map((column) => column._id));
    }

    setDragItemId(null);
    setDragItemType(null);
    setDragItemData(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        height: (theme) => theme.taskPro.boardContentHeight,
        width: '100%',
        backgroundColor: 'primary.main',
        background: 'linear-gradient(to right, #7828fa, #00f0a0)',
        p: '20px 0',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}>
        <Columns columns={orderedColumns}></Columns>
        <DragOverlay>
          {dragItemId ? (dragItemType === DRAG_TYPE.COLUMN ? <Column column={dragItemData} /> : <Card card={dragItemData} />) : null}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
