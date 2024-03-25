import * as Yup from 'yup';

export const registrationValidationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^\w+$/,
      'يجب أن يكون اسم المستخدم فريدًا ولا يحتوي على مسافات أو رموز خاصة مثل @$!%*?&.'
    )
    .required('اسم المستخدم مطلوب'),
  email: Yup.string()
    .email('يجب أن يكون بريدًا إلكترونيًا صالحًا')
    .required('البريد الإلكتروني مطلوب'),
  password: Yup.string()
    .min(6, 'يجب أن تكون كلمة المرور 6 أحرف على الأقل')
    .required('كلمة المرور مطلوبة'),
});

export const postCreationFormValidationSchema = Yup.object({
  title: Yup.string().required('عنوان المقال مطلوب'),
  selectedImage: Yup.mixed().when('imageUrl', {
    is: (imageUrl: string) => !imageUrl || imageUrl === '',
    then: (schema) => schema.required('صورة الغلاف مطلوبة'),
    otherwise: (schema) => schema.notRequired(),
  }),
  imageUrl: Yup.string().url().notRequired(),
  selectedCategoryIds: Yup.array()
    .of(Yup.number())
    .min(1, 'يجب اختيار تصنيف واحد على الأقل')
    .required('تصنيف المقال مطلوب'),
});
