import Box from '@mui/material/Box';
import Columns from './Columns/Columns';
import { mapOrder } from '~/utils/sorts';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { useSensor, useSensors, MouseSensor, TouchSensor, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import Column from './Columns/Column/Column';
import Card from './Columns/Column/Cards/Card/Card';
import { cloneDeep } from 'lodash';

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

  // Life cycle of Dragging
  const [dragItemId, setDragItemId] = useState();
  const [dragItemType, setDragItemType] = useState();
  const [dragItemData, setDragItemData] = useState();
  const handleDragStart = (event) => {
    setDragItemId(event?.active?.id);
    setDragItemType(event?.active?.data?.current?.columnId ? DRAG_TYPE.CARD : DRAG_TYPE.COLUMN);
    setDragItemData(event?.active?.data?.current);
  };
  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    if (dragItemType === DRAG_TYPE.CARD) {
      const overItemData = over?.data?.current;
      const { _id: activeCardId, columnId: activeColumnId } = dragItemData;
      const { _id: overCardId, columnId: overColumnId } = overItemData;

      if (activeColumnId !== overColumnId) {
        setOrderedColumns((prevOrderedColumns) => {
          const newOrderedColumns = cloneDeep(prevOrderedColumns);
          const newActiveColumn = newOrderedColumns?.find((column) => column._id === activeColumnId);
          const newOverColumn = newOrderedColumns?.find((column) => column._id === overColumnId);

          // Remove the card with activeCardId from the relevant column
          if (newActiveColumn) {
            newActiveColumn.cards = newActiveColumn?.cards?.filter((card) => card?._id !== activeCardId);
            newActiveColumn.cardOrderIds = newActiveColumn?.cards?.map((card) => card?._id);
          }

          // Add card to new column by overCardIndex (remove if existed)
          if (newOverColumn) {
            const overCardIndex = newOverColumn?.cards?.findIndex((card) => card?._id === overCardId);
            const isBelowOverItem =
              active.rect.current.translated &&
              active.rect.current.translated.top > over.rect.top + over.rect.height;
            const modifier = isBelowOverItem ? 1 : 0;
            const newIndex = overCardIndex >= 0 ? overCardIndex + modifier : newOverColumn?.cards?.length + 1;

            newOverColumn.cards = newOverColumn?.cards?.filter((card) => card?._id !== activeCardId);
            newOverColumn.cards = newOverColumn?.cards?.toSpliced(newIndex, 0, dragItemData);
            newOverColumn.cardOrderIds = newOverColumn?.cards?.map((card) => card?._id);
          }

          return newOrderedColumns;
        });
      }
    }
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    if (dragItemType === DRAG_TYPE.COLUMN && active.id !== over.id) {
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

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors} >
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
        <DragOverlay dropAnimation={dropAnimation}>
          {dragItemId ? (dragItemType === DRAG_TYPE.COLUMN ? <Column column={dragItemData} /> : <Card card={dragItemData} />) : null}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
