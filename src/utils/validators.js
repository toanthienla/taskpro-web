export const FIELD_REQUIRED_MESSAGE = 'This field is required.';
export const EMAIL_RULE = /^\S+@\S+\.\S+$/;
export const EMAIL_RULE_MESSAGE = 'Please enter a valid email address.';
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/;
export const PASSWORD_RULE_MESSAGE = 'Password must be at least 8 characters and include at least one letter and one number.';
export const PASSWORD_CONFIRMATION_MESSAGE = 'Passwords do not match.';

// Validate file
export const LIMIT_COMMON_FILE_SIZE = 10485760; // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.size || !file.type) {
    return 'File cannot be blank.';
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return 'Maximum file size exceeded. (10MB)';
  }
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
    return 'File type is invalid. Only accept jpg, jpeg and png';
  }
  return null;
};
