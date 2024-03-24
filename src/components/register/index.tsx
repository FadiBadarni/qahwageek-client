import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { register } from 'store/user/userActions';
import { displayError } from 'utils/alertUtils';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import RegistrationGuidelines from './RegistrationGuidelines';
import { registrationValidationSchema } from 'utils/validationSchemas';

export const RegistrationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.data);

  const handleRegister = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    const actionResult = await dispatch(register(values));

    if (register.fulfilled.match(actionResult)) {
      navigate('/login');
    } else {
      const errorMessage =
        typeof actionResult.payload === 'string'
          ? actionResult.payload
          : 'يا دوبك حصل خطأ وما قدرنا نكمل التسجيل. جرب مرة تانية يا ريت';

      displayError({
        icon: 'error',
        title: 'يا عيني...',
        text: errorMessage,
      });
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-full flex-col lg:flex-row justify-center px-6 py-12 lg:px-8 ">
      <div className="order-2 lg:w-1/3 mt-10 lg:mt-0 lg:ml-10">
        <RegistrationGuidelines />
      </div>
      <div className="order-1 w-full lg:w-2/3 xl:w-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-light-text dark:text-dark-text">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-400 flex justify-center items-center gap-2">
            أو
            <Link
              to="/login"
              className="font-medium text-brand-500 dark:hover:text-brand-400 flex items-center gap-1"
            >
              تسجيل الدخول
            </Link>
            إذا كان لديك حساب بالفعل
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
            }}
            validationSchema={registrationValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await handleRegister(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4" autoComplete="off">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
                  >
                    اسم المستخدم
                  </label>
                  <div className="relative">
                    <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      placeholder="اسم المستخدم"
                      className="block w-full pl-10 rounded-md border-0 py-1.5 shadow-sm sm:text-sm sm:leading-6 bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text ring-1 ring-inset dark:ring-neutral-700 ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-brand-500"
                      autoComplete="off"
                    />
                  </div>

                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
                  >
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="البريد الإلكتروني"
                      className="block w-full pl-10 rounded-md border-0 py-1.5 shadow-sm sm:text-sm sm:leading-6 bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text ring-1 ring-inset dark:ring-neutral-700 ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-brand-500"
                      autoComplete="off"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
                  >
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <MdLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />

                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="كلمة المرور"
                      className="block w-full pl-10 rounded-md border-0 py-1.5 shadow-sm sm:text-sm sm:leading-6 bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text ring-1 ring-inset dark:ring-neutral-700 ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-brand-500"
                      autoComplete="off"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-500 hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
                  >
                    إنشاء الحساب
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
