import Alert from '@mui/material/Alert';

function FieldErrorAlert({ errors, fieldName }) {
  if (!errors || !errors[fieldName]) return null;
  return (
    <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
      {errors[fieldName]?.message}
    </Alert>
  );
}

export default FieldErrorAlert;
