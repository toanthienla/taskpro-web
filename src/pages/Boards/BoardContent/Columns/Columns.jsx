import Column from './Column/Column';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

function Columns({ columns }) {
  return (
    <>

      {/* List columns */}
      {columns?.map((column) => <Column key={column._id} column={column} />)}

      {/* Add another column button */}
      <Box sx={{
        maxWidth: '272px',
        minWidth: '272px',
        ml: 2,
        bgcolor: '#ffffff3d',
        borderRadius: '6px',
        height: 'fit-content'
      }}>
        <Button variant="text" startIcon={<AddIcon />}
          sx={{ width: '100%', justifyContent: 'flex-start', p: 2, color: 'white' }}>
          Add another column
        </Button>
      </Box>

    </>
  );
}

export default Columns;