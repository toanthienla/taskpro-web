import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightness from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';

function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const theme = event.target.value;
    setMode(theme);
  };

  return (
    <FormControl size="small" sx={{ minWidth: '120px' }}>
      <InputLabel id="label-theme-mode"
        sx={{
          color: 'primary.main',
          '&.Mui-focused': {
            color: 'primary.dark'
          }
        }}>
        Theme
      </InputLabel>
      <Select
        labelId="label-theme-mode"
        id="theme-mode"
        value={mode}
        label="Theme"
        onChange={handleChange}
        sx={{
          color: 'primary.main',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.light'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main'
          },
          '&.Mui-focused': {
            color: 'primary.main'
          },
          '& .MuiSvgIcon-root': {
            color: 'primary.main'
          }
        }}
      >
        <MenuItem value={'light'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LightModeIcon /> Light
          </div>
        </MenuItem>
        <MenuItem value={'dark'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeIcon /> Dark
          </Box>
        </MenuItem>
        <MenuItem value={'system'}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightness /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect;
