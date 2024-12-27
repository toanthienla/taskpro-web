import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { selectCurrentActiveCard } from '~/redux/activeCard/activeCardSlice';

// Use this component to toggle focus between Typography and TextField
function ToggleFocusInput({ value, onChangedValue, inputFontSize = '16px' }) {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const activeCard = useSelector(selectCurrentActiveCard);

  const triggerBlur = () => {
    setIsFocused(false);

    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value);
    } else {
      setInputValue(inputValue.trim());
      onChangedValue(inputValue);
    }

  };

  return (
    <TextField
      id="toggle-focus-input-controlled"
      fullWidth
      variant='outlined'
      size="small"
      value={inputValue}
      onChange={(event) => { setInputValue(event.target.value); }}
      onFocus={() => setIsFocused(true)}
      onBlur={triggerBlur}
      data-no-dnd

      // Css TextField as Typography
      sx={{
        '& label': {},
        '& input': {
          fontSize: inputFontSize, fontWeight: '600',
          cursor: isFocused ? 'text' : 'pointer'
        },
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root:hover': {
          borderColor: 'transparent',
          '& fieldset': { borderColor: 'transparent' }
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          backgroundColor: 'background.paper',
          '& fieldset': { borderColor: '#3498db' }
        },
        '& .MuiOutlinedInput-input': {
          px: '10px',
          py: '6px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }
      }}
    />
  );
}

export default ToggleFocusInput;
