import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card as MuiCard } from '@mui/material';
import { ReactComponent as TaskProIcon } from '~/assets/TaskProIcon.svg';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Zoom from '@mui/material/Zoom';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators';
import FieldErrorAlert from '~/components/Form/FieldErrorAlert';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const submitLogIn = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitLogIn)}>
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
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1em' }}>
            {/* <Alert severity="success" sx={{ '.MuiAlert-message': { overflow: 'hidden' }, marginTop: '0.8rem' }}>
              Your email&nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>toanla.dev@gmail.com</Typography>
              &nbsp;has been verified.<br />Now you can login to enjoy our services! Have a good day!
            </Alert> */}
            {/* <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' }, marginTop: '0.8rem' }}>
              An email has been sent to&nbsp;
              <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>toanla.dev@gmail.com</Typography>
              <br />Please check and verify your account before logging in!
            </Alert> */}
          </Box>
          <Typography variant="subtitle1" align="center" sx={{ fontWeight: 500, marginTop: '1.5rem' }}>Log in to continue </Typography>
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
                label="Password"
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
          </Box>
          <CardActions sx={{ padding: '0 1em 1em 1em' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </CardActions>
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }} >
            <Typography>Ready to take control of your tasks?</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'info.dark', '&:hover': { textDecoration: 'underline' } }}>Create account</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  );
}

export default LoginForm;
