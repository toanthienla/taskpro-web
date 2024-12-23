import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MailIcon from '@mui/icons-material/Mail';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators';
import FieldErrorAlert from '~/components/Form/FieldErrorAlert';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, updateUserApi } from '~/redux/user/userSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// https://mui.com/material-ui/react-button/#file-upload
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

function AccountTab() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const initialGeneralForm = {
    displayName: currentUser?.displayName
  };
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialGeneralForm
  });

  const submitChangeGeneralInformation = async (data) => {
    const displayName = data?.displayName.trim();

    if (displayName === currentUser?.displayName) return;

    // Call API
    const res = await toast.promise(
      dispatch(updateUserApi({ displayName })),
      {
        pending: 'Updating...',
        error: 'Update failed!'
      }
    );

    if (!res.error) {
      toast.success('Updated successfully!');
    }
  };

  const uploadAvatar = async (e) => {
    // Get first file from the list and validate it
    const error = singleFileValidator(e.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }

    // Handle file upload with FormData before calling API
    let reqData = new FormData();
    reqData.append('avatar', e.target?.files[0]);

    // Call API
    const res = await toast.promise(
      dispatch(updateUserApi(reqData)),
      {
        pending: 'Uploading avatar...',
        error: 'Upload failed!'
      }
    );
    if (!res.error) {
      toast.success('Uploaded successfully!');
    }

    // Reset file input
    e.target.value = '';
  };

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box>
          <Avatar
            sx={{ width: 84, height: 84, mb: 1 }}
            alt="Account Avatar"
            src={currentUser?.avatar}
          />
          <Tooltip title="Upload new avatar image">
            <Button
              component="label"
              variant="contained"
              size="small"
              startIcon={<CloudUploadIcon />}>
              Upload
              <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
            </Button>
          </Tooltip>
        </Box>
        <Box>
          <Typography variant="h6">{currentUser?.displayName}</Typography>
          <Typography sx={{ color: 'grey' }}>@{currentUser?.username}</Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
        <Box sx={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <TextField
              disabled
              defaultValue={currentUser?.email}
              fullWidth
              label="Your Email"
              type="text"
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <Box>
            <TextField
              disabled
              defaultValue={currentUser?.username}
              fullWidth
              label="Your Username"
              type="text"
              variant="filled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Your Display Name"
              type="text"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIndIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              {...register('displayName', {
                required: FIELD_REQUIRED_MESSAGE
              })}
              error={!!errors['displayName']}
            />
            <FieldErrorAlert errors={errors} fieldName={'displayName'} />
          </Box>

          <Box>
            <Button
              className="interceptor-loading"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth>
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default AccountTab;
