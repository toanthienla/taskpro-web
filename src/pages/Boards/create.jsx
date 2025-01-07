import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators';
import FieldErrorAlert from '~/components/Form/FieldErrorAlert';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { postNewBoardApi } from '~/apis';
import { styled } from '@mui/material/styles';

const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300]
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}));

const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
};


function SidebarCreateBoardModal() {
  const navigate = useNavigate();
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => {
    setIsOpen(false);
    reset(); // Reset form fields
  };


  const submitCreateNewBoard = async (data) => {
    const title = data.title.trim();
    const description = data.description.trim();
    const type = data.type;
    const board = await postNewBoardApi({ title, description, type });
    toast.success('Create new board successfully!');
    handleCloseModal();
    navigate(`/boards/${board._id}`);
  };

  return (
    <>
      <SidebarItem onClick={handleOpenModal}>
        <LibraryAddIcon fontSize="small" />
        Create a new board
      </SidebarItem>

      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '600px' },
          bgcolor: 'white',
          boxShadow: 24,
          borderRadius: '8px',
          border: 'none',
          outline: 0,
          padding: '20px 30px',
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : 'white'
        }}>
          <Box sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            cursor: 'pointer'
          }}>
            <CloseIcon onClick={handleCloseModal} />
          </Box>
          <Box id="modal-modal-title" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LibraryAddIcon />
            <Typography variant="h6"> Create a new board</Typography>
          </Box>
          <Box id="modal-modal-description" sx={{ marginBottom: 2, marginTop: 3 }}>
            <form onSubmit={handleSubmit(submitCreateNewBoard)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Title"
                    type="text"
                    variant="outlined"
                    {...register('title', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: { value: 3, message: 'Min length is 3 characters' },
                      maxLength: { value: 50, message: 'Max length is 50 characters' }
                    })}
                    error={!!errors['title']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'title'} />
                </Box>

                <Box>
                  <TextField
                    fullWidth
                    label="Description"
                    type="text"
                    variant="outlined"
                    multiline
                    {...register('description', {
                      required: FIELD_REQUIRED_MESSAGE,
                      minLength: { value: 3, message: 'Min Length is 3 characters' },
                      maxLength: { value: 255, message: 'Max Length is 255 characters' }
                    })}
                    error={!!errors['description']}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'description'} />
                </Box>

                {/* https://stackoverflow.com/a/73336101 */}
                <Controller
                  name="type"
                  defaultValue={BOARD_TYPES.PUBLIC}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      onChange={(event, value) => field.onChange(value)}
                      value={field.value}
                    >
                      <FormControlLabel
                        value={BOARD_TYPES.PUBLIC}
                        control={<Radio size="small" />}
                        label="Public"
                      />
                      <FormControlLabel
                        value={BOARD_TYPES.PRIVATE}
                        control={<Radio size="small" />}
                        label="Private"
                      />
                    </RadioGroup>
                  )}
                />

                <Box sx={{ alignSelf: 'flex-end' }}>
                  <Button
                    className="interceptor-loading"
                    type="submit"
                    variant="contained"
                    color="info"
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default SidebarCreateBoardModal;
