import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Zoom from '@mui/material/Zoom';
import { ReactComponent as TaskProIcon } from '~/assets/TaskProIcon.svg';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_CONFIRMATION_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators';
import FieldErrorAlert from '~/components/Form/FieldErrorAlert';
import { postNewUserApi } from '~/apis';
import { toast } from 'react-toastify';

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const navigate = useNavigate();
  const submitRegister = async ({ email, password }) => {
    await toast.promise(
      postNewUserApi(email, password),
      {
        pending: 'Loading your information...'
      }
    );
    navigate(`/login?registeredEmail=${email}`);
  };

  return (
    <form onSubmit={handleSubmit(submitRegister)}>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{
          width: {
            xs: 300,
            sm: 400,
            md: 500,
            lg: 600
          },
          marginTop: '6em'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, marginTop: '1.5em' }}>
            <SvgIcon component={TaskProIcon} inheritViewBox sx={{ fontSize: '2rem' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.6rem' }}>TaskPro  </Typography>
          </Box>
          <Typography variant="subtitle1" align="center" sx={{ fontWeight: 500, marginTop: '1.5rem' }}>Sign up to continue </Typography>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Email"
                type="text"
                variant="outlined"
                error={errors['email'] ? true : false}
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'email'} />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Create Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      sx={{ fontSize: '0.5rem' }}
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ fontSize: '1.3rem' }} />
                      ) : (
                        <Visibility sx={{ fontSize: '1.3rem' }} />
                      )}
                    </IconButton>
                  )
                }}
                error={errors['password'] ? true : false}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password'} />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ fontSize: '1.3rem' }} />
                      ) : (
                        <Visibility sx={{ fontSize: '1.3rem' }} />
                      )}
                    </IconButton>
                  )
                }}
                error={errors['passwordConfirm'] ? true : false}
                {...register('passwordConfirm', {
                  required: FIELD_REQUIRED_MESSAGE,
                  validate: (value) => {
                    if (value === watch('password')) return true;
                    return PASSWORD_CONFIRMATION_MESSAGE;
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'passwordConfirm'} />
            </Box>
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              className='interceptor-loading'
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Sign up
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }} >
            <Typography>Already have a TaskPro account?</Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'info.dark', '&:hover': { textDecoration: 'underline' } }}>Log in here</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  );
}

export default RegisterForm;
