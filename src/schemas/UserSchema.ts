import * as yup from 'yup';
export const UserSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
});