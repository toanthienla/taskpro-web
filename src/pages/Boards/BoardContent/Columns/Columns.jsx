import { useState, useEffect, useRef } from 'react';
import Column from './Column/Column';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { toast, Bounce } from 'react-toastify';
import { useTheme } from '@mui/material/styles';

function Columns({ columns, postNewColumn, postNewCard }) {
  const theme = useTheme();

  // Add new column
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [openAddNewColumnForm, setOpenAddNewColumnForm] = useState(false);
  const toggleOpenAddNewColumnForm = () => setOpenAddNewColumnForm(!openAddNewColumnForm);
  const addNewColumn = async () => {
    if (newColumnTitle) {
      setNewColumnTitle('');
      setOpenAddNewColumnForm(false);

      // AxiosAPI
      await postNewColumn({
        title: newColumnTitle
      });
    } else {
      toast.error('Please enter a column title.', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: theme.palette.mode,
        transition: Bounce
      });
    }
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
        {columns?.map((column) => <Column key={column._id} column={column} postNewCard={postNewCard} />)}
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
          <TextField placeholder="Enter column title..." autoFocus size='small' type='text' variant="outlined"
            value={newColumnTitle} onChange={(e) => setNewColumnTitle(e.target.value)}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3498db'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3498db !important'
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3498db !important'
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