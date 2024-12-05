import { useState, useEffect, useRef } from 'react';
import Column from './Column/Column';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

function Columns({ columns }) {
  // Add new column
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [openAddNewColumnForm, setOpenAddNewColumnForm] = useState(false);
  const toggleOpenAddNewColumnForm = () => setOpenAddNewColumnForm(!openAddNewColumnForm);
  const addNewColumn = () => {
    setNewColumnTitle('');
  };

  // Handle openAddNewColumnForm true when user click outside will false
  const addNewColumnForm = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!addNewColumnForm?.current?.contains(event?.target)) {
        toggleOpenAddNewColumnForm();
      }
    };
    if (openAddNewColumnForm) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAddNewColumnForm]);

  return (
    <>

      {/* List columns */}
      <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
        {columns?.map((column) => <Column key={column._id} column={column} />)}
      </SortableContext>

      {/* Add another column button */}
      {openAddNewColumnForm ?
        <Box
          ref={addNewColumnForm}
          sx={{
            maxWidth: '272px',
            minWidth: '272px',
            ml: 2,
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#1e2341' : '#f0f5ff'),
            borderRadius: '6px',
            height: 'fit-content',
            p: 1
          }}
        >
          <TextField placeholder="Enter column title..." autoFocus size='small' type='text'
            value={newColumnTitle} onChange={(e) => setNewColumnTitle(e.target.value)}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.light'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.dark'
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'info.main'
              }
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Button variant="contained" size='small' color='info'
              onClick={addNewColumn}
              sx={{
                marginRight: 1
              }}>
              Add column
            </Button>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={toggleOpenAddNewColumnForm} />
          </Box>
        </Box>
        :
        <Box
          sx={{
            maxWidth: '272px',
            minWidth: '272px',
            ml: 2,
            bgcolor: '#ffffff3d',
            borderRadius: '6px',
            height: 'fit-content'
          }}
          onClick={toggleOpenAddNewColumnForm}>
          <Button variant="text" startIcon={<AddIcon />}
            sx={{ width: '100%', justifyContent: 'flex-start', p: 2, color: 'white' }}>
            Add another column
          </Button>
        </Box>
      }
    </>
  );
}

export default Columns;