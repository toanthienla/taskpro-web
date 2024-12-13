import Box from '@mui/material/Box';
import Columns from './Columns/Columns';
import { useCallback, useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import {
  DndContext, DragOverlay,
  useSensor, useSensors, defaultDropAnimationSideEffects,
  closestCorners, pointerWithin, getFirstCollision
} from '@dnd-kit/core';
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors';
import Column from './Columns/Column/Column';
import Card from './Columns/Column/Cards/Card/Card';
import { cloneDeep, isEmpty } from 'lodash';
import { generatePlaceholderCard } from '~/utils/formatters';

const DRAG_TYPE = {
  CARD: 'card',
  COLUMN: 'column'
};

function BoardContent({ board, setBoard, postNewColumn, postNewCard, moveColumn, moveCardSameColumn, moveCardDifferentColumn, removeColumn }) {
  // Clone orderedColumns to deal with setBoard problem when call API (setBoard hep save the newest board when dragging and create new column/card)
  const [orderedColumns, setOrderedColumns] = useState([]);
  useEffect(() => {
    setOrderedColumns(board?.columns);
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
  const [dragItemId, setDragItemId] = useState(null);
  const [dragItemType, setDragItemType] = useState(null);
  const [dragItemData, setDragItemData] = useState(null);

  // Use for call API when dragging card to new column
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [overColumnId, setOverColumnId] = useState(null);

  const handleDragStart = (event) => {
    setDragItemId(event?.active?.id);
    setDragItemType(event?.active?.data?.current?.columnId ? DRAG_TYPE.CARD : DRAG_TYPE.COLUMN);
    setDragItemData(event?.active?.data?.current);
    setActiveColumnId(event?.active?.data?.current?.columnId);
  };

  const handleDragOver = (event) => {
    if (dragItemType === DRAG_TYPE.COLUMN) return;

    const { active, over } = event;
    if (!over || !active) return;

    const overItemData = over?.data?.current;
    const activeItemData = active?.data?.current;
    const { _id: activeCardId, columnId: activeColumnId } = activeItemData;
    const { _id: overCardId, columnId: overColumnId } = overItemData;

    if (!activeColumnId || !overColumnId) return;

    // Handle dragging card to new column
    if (activeColumnId !== overColumnId) {

      setOverColumnId(overColumnId);

      setOrderedColumns((prevOrderedColumns) => {
        const newOrderedColumns = cloneDeep(prevOrderedColumns);
        const newActiveColumn = newOrderedColumns?.find(column => column._id === activeColumnId);
        const newOverColumn = newOrderedColumns?.find(column => column._id === overColumnId);

        // Remove the card with activeCardId from the relevant column
        if (newActiveColumn) {
          newActiveColumn.cards = newActiveColumn?.cards?.filter(card => card?._id !== activeCardId);
          if (isEmpty(newActiveColumn?.cards)) {
            newActiveColumn.cards = [generatePlaceholderCard(newActiveColumn)];
          }
          // Update cardOrderIds
          newActiveColumn.cardOrderIds = newActiveColumn?.cards?.map(card => card?._id);
        }

        // Add card to new column by overCardIndex (remove if existed)
        if (newOverColumn) {
          const overCardIndex = newOverColumn?.cards?.findIndex(card => card?._id === overCardId);
          const isBelowOverItem =
            active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height;
          const modifier = isBelowOverItem ? 1 : 0;
          const newIndex = overCardIndex >= 0 ? overCardIndex + modifier : newOverColumn?.cards?.length + 1;

          newOverColumn.cards = newOverColumn?.cards?.filter(card => card?._id !== activeCardId);
          newOverColumn.cards = newOverColumn?.cards?.toSpliced(newIndex, 0, dragItemData);
          newOverColumn.cards[newIndex].columnId = overColumnId; // Update column id of active card

          // Remove FE_PlaceholderCard if existed (Drag card to empty column)
          newOverColumn.cards = newOverColumn?.cards?.filter(card => !card?.FE_PlaceholderCard);

          // Update cardOrderIds
          newOverColumn.cardOrderIds = newOverColumn?.cards?.map(card => card?._id);
        }

        return newOrderedColumns;
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    let isUpdatedCardOrderIds = false;

    // Handle drag card in the same column
    if (dragItemType === DRAG_TYPE.CARD && active.id !== over.id) {
      const columnId = active?.data?.current?.columnId;
      const activeItemId = active?.data?.current?._id;
      const overItemId = over?.data?.current?._id;

      const fromIndex = orderedColumns?.find(column => column?._id === columnId)?.cards?.findIndex(card => card?._id === activeItemId);
      const toIndex = orderedColumns?.find(column => column?._id === columnId)?.cards?.findIndex(card => card?._id === overItemId);

      const dndKitOrderedColumns = orderedColumns?.map(column => {
        if (column?._id !== columnId) return column;
        return {
          ...column,
          cardOrderIds: arrayMove(column.cardOrderIds, fromIndex, toIndex),
          cards: arrayMove(column.cards, fromIndex, toIndex)
        };
      });
      setOrderedColumns(dndKitOrderedColumns);
      setBoard(prevBoard => ({
        ...prevBoard,
        columns: dndKitOrderedColumns
      }));

      // API: Update cardOrderIds in columnId
      dndKitOrderedColumns.forEach(column => {
        if (column?._id !== columnId) return column;
        moveCardSameColumn(columnId, column.cardOrderIds);
      });
      isUpdatedCardOrderIds = true;
    }

    // API: handle drag card to different column
    if (dragItemType === DRAG_TYPE.CARD && activeColumnId && overColumnId && activeColumnId !== overColumnId) {
      if (isUpdatedCardOrderIds)
        moveCardDifferentColumn(activeColumnId, overColumnId, dragItemId, null);
      else {
        moveCardDifferentColumn(activeColumnId, overColumnId, dragItemId,
          orderedColumns.find(column => column._id === overColumnId).cardOrderIds
        );
      }

      setBoard(prevBoard => ({
        ...prevBoard,
        columns: orderedColumns
      }));
    }

    // Handle dragging column
    if (dragItemType === DRAG_TYPE.COLUMN && active.id !== over.id) {
      const fromIndex = orderedColumns.findIndex(c => c._id === active.id);
      const toIndex = orderedColumns.findIndex(c => c._id === over.id);
      const dndKitOrderedColumns = arrayMove(orderedColumns, fromIndex, toIndex);
      setOrderedColumns(dndKitOrderedColumns);
      setBoard(prevBoard => ({
        ...prevBoard,
        columns: dndKitOrderedColumns
      }));

      // API: Update columnOrderIds in Board
      moveColumn(dndKitOrderedColumns.map(column => column._id));
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

  const collisionDetectionStrategy = useCallback((args) => {
    if (dragItemType === DRAG_TYPE.COLUMN) {
      return closestCorners(args);
    }

    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length === 0) return;

    // Get overId to check if overId is column
    let overId = getFirstCollision(pointerCollisions, 'id');
    if (overId) {
      const checkColumn = orderedColumns?.find(column => column._id === overId);
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => container.id !== overId
            && checkColumn?.cardOrderIds?.includes(container.id))
        })[0]?.id;
      }
      return [{ id: overId }];
    }

  }, [dragItemType, orderedColumns]);

  return (
    <DndContext
      onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}
      sensors={sensors} collisionDetection={collisionDetectionStrategy}>
      <Box sx={{
        height: (theme) => theme.taskPro.boardContentHeight,
        width: '100%',
        backgroundColor: 'primary.main',
        background: 'linear-gradient(to right, #7828fa, #00f0a0)',
        p: '20px 0',
        display: 'flex',
        overflowX: 'auto'
      }}>
        <Columns columns={orderedColumns} postNewColumn={postNewColumn} postNewCard={postNewCard} removeColumn={removeColumn}></Columns>
        {/* DragOverlay help fix dragging out flickering animation */}
        <DragOverlay dropAnimation={dropAnimation}>
          {dragItemId ? (dragItemType === DRAG_TYPE.COLUMN ? <Column column={dragItemData} /> : <Card card={dragItemData} />) : null}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
