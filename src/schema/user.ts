import * as yup from 'yup';

export const userDtoSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  passcode: yup.string().required('Password is required')
});


export const userProfileUpdateSchema = yup.object({
  // email: yup.string()
  //   .email('Must be a valid email address')
  //   .required('Email is required'),

  firstName: yup.string()
    .required('First name is required')
    .max(100, 'First name cannot exceed 100 characters'),

  lastName: yup.string()
    .required('Last name is required')
    .max(100, 'Last name cannot exceed 100 characters'),

  picture: yup.string()
    .nullable()
    .url('Picture must be a valid URL'),

  isActive: yup.boolean()
    .required('Active status is required')
});
