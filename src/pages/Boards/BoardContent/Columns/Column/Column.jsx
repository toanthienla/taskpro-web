import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useRef, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCardIcon from '@mui/icons-material/AddCard';
import ArchiveIcon from '@mui/icons-material/Archive';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Cards from './Cards/Cards';
import CloseIcon from '@mui/icons-material/Close';
import { mapOrder } from '~/utils/sorts';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Column({ column, postNewCard }) {
  // Menu list on header
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Add new card
  const [openAddNewCardForm, setOpenAddNewCardForm] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const toggleOpenAddNewCardForm = () => setOpenAddNewCardForm(!openAddNewCardForm);
  const handleAddCardClick = async () => {
    if (newCardTitle) {
      setNewCardTitle('');
      await postNewCard({
        title: newCardTitle,
        columnId: column._id
      });
    }
    toggleOpenAddNewCardForm();
  };

  // Handle openAddNewColumnForm true when user click outside will false
  const addNewCardForm = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close when not click inside footer or textField
      if (!addNewCardForm?.current?.contains(event?.target) &&
        event?.target?.id !== 'newTitleTextField'
      ) {
        toggleOpenAddNewCardForm();
      }
    };
    if (openAddNewCardForm) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openAddNewCardForm]);


  // DndKit
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  });
  const dndKitStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    // touchAction: 'none',
    opacity: isDragging ? 0.5 : undefined
  };

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
  return (
    <div ref={setNodeRef} style={dndKitStyle} {...attributes}>
      < Box
        {...listeners}
        sx={{
          maxWidth: '300px',
          minWidth: '300px',
          ml: 2,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1e2341' : '#f0f5ff'),
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.taskPro.boardContentHeight} - ${theme.spacing(5)})`
        }}>
        {/* Column Header  */}
        < Box sx={{
          height: (theme) => theme.taskPro.columnHeaderHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2
        }}>
          <Typography sx={{
            fontSize: '1rem !important',
            fontWeight: '600',
            cursor: 'pointer'
          }}>{column?.title}</Typography>
          <Tooltip title="More options">
            <ExpandMoreIcon
              id="basic-column-dropdown"
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                cursor: 'pointer',
                color: 'text.primary'
              }} />
          </Tooltip>
          <Menu
            id="basic-menu-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-column-dropdown'
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <ContentCut fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentCopy fontSize="small" />
              </ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ContentPaste fontSize="small" />
              </ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <AddCardIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <ArchiveIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DeleteOutlineIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove column</ListItemText>
            </MenuItem>
          </Menu>
        </Box >

        {/* Column List Card  */}
        <Cards cards={orderedCards} openAddNewCardForm={openAddNewCardForm}
          newCardTitle={newCardTitle} setNewCardTitle={setNewCardTitle} />

        {/* Column Footer */}
        <Box
          ref={addNewCardForm}
          sx={{
            height: (theme) => theme.taskPro.columnFooterHeight,
            p: 2
          }}
        >
          {openAddNewCardForm ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                size="small"
                color="info"
                data-no-dnd
                onClick={handleAddCardClick}
                sx={{ marginRight: 1, transition: 'none' }}
              >
                Add card
              </Button>
              <CloseIcon
                sx={{ cursor: 'pointer', transition: 'none' }}
                data-no-dnd
                onClick={toggleOpenAddNewCardForm}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button
                variant="text"
                sx={{ fontWeight: '600', transition: 'none' }}
                startIcon={<AddCardIcon />}
                onClick={toggleOpenAddNewCardForm}
              >
                Add new card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box >
    </div>
  );
}

export default Column;