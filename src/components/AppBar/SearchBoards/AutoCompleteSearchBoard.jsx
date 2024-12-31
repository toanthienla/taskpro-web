import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { getBoardsApi } from '~/apis';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDebounceFn } from '~/customHooks/useDebounceFn';

function AutoCompleteSearchBoard() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset boards when the autocomplete is closed
    if (!open) { setBoards(null); }
  }, [open]);

  const handleInputSearchChange = (event) => {
    const searchValue = event.target?.value;
    if (!searchValue) return;

    // Use searchParams to create query string (encode special characters)
    const searchPath = `?${createSearchParams({ 'q[title]': searchValue })}`;
    setLoading(true);

    // Call API
    getBoardsApi(searchPath)
      .then((res) => {
        setBoards(res.boards || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // useDecounceFn return a debounced function wrap the original function
  const debounceSearchBoard = useDebounceFn(handleInputSearchChange);

  // User select board from the list
  const handleSelectedBoard = (event, selectedBoard) => {
    if (selectedBoard) {
      navigate(`/boards/${selectedBoard._id}`);
      setOpen(false);
    }
  };

  return (
    <Autocomplete
      sx={{ width: 220 }}
      id="asynchronous-search-board"
      noOptionsText={!boards ? 'Start typing...' : 'No boards found'}

      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}

      options={boards || []}
      getOptionLabel={(board) => board.title}

      // Link issue: https://stackoverflow.com/a/65347275/8324172
      isOptionEqualToValue={(option, value) => option._id === value._id}

      loading={loading}
      onInputChange={debounceSearchBoard}
      onChange={handleSelectedBoard}

      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a board..."
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          sx={{
            '& label': { color: 'primary.light' },
            '& input': { color: 'primary.main' },
            '& label.Mui-focused': { color: 'primary.main' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'primary.light' },
              '&:hover fieldset': { borderColor: 'primary.main' },
              '&.Mui-focused fieldset': { borderColor: 'primary.light' }
            },
            '.MuiSvgIcon-root': { color: 'primary.main' }
          }}
        />
      )}
    />
  );
}

export default AutoCompleteSearchBoard;
