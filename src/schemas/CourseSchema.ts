import * as yup from 'yup';

export const CourseSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    instructor: yup.string().required(),
    duration: yup.string().required()
});