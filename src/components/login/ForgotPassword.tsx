import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { sendPasswordResetEmail } from 'store/user/userActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { displayError, displayToast } from 'utils/alertUtils';

export const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const currentTheme = useSelector((state: RootState) => state.theme.theme);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      displayError({
        icon: 'error',
        title: 'خطأ',
        text: 'الرجاء إدخال البريد الإلكتروني.',
      });
      return;
    }

    dispatch(sendPasswordResetEmail(email))
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });

        displayToast(
          'تم إرسال تعليمات إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.',
          true,
          currentTheme
        );
      })
      .catch((error) => {
        displayError({
          icon: 'error',
          title: 'خطأ في إرسال البريد الإلكتروني',
          text: 'لم نتمكن من إرسال تعليمات إعادة تعيين كلمة المرور. يرجى التحقق من صحة البريد الإلكتروني والمحاولة مرة أخرى.',
        });
      });
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-light-background dark:bg-dark-background">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-700 dark:text-neutral-200">
            نسيت السِرّ؟ ما تِحمِل هَمّ!
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
            إملأ الخانة بالإيميل وإحنا بنبعثلك رابط لتغيرو
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                البريد الإلكتروني
              </label>
              <div className="relative flex items-center">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-light-input dark:bg-dark-input appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-neutral-300 placeholder-neutral-400 text-neutral-900 rounded-t-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm"
                  placeholder="الإيميل "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdEmail
                  className="absolute left-3 h-5 w-5 text-light-text dark:text-dark-text"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-500 hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              يَلا بِينا
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            to="/login"
            className="font-medium text-brand-500 hover:text-brand-400"
          >
            رجعت عندك الذاكرة؟ تسجيل دخول
          </Link>
        </div>
      </div>
    </div>
  );
};
