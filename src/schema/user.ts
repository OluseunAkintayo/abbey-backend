import * as yup from 'yup';

export const userDtoSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  passcode: yup.string().required('Password is required')
});
