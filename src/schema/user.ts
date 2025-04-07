import * as yup from 'yup';

export const userDtoSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  passcode: yup.string().required('Password is required')
});


export const userProfileUpdateSchema = yup.object({
  firstName: yup.string().max(100, 'First name cannot exceed 100 characters'),
  lastName: yup.string().max(100, 'Last name cannot exceed 100 characters'),
  username: yup.string().max(100, 'Last name cannot exceed 100 characters'),
  bio: yup.string(),
  picture: yup.string().nullable(),
  isActive: yup.boolean().required('Active status is required')
});
