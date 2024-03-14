import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { resetPassword } from 'store/user/userActions';
import { displayError, displayToast } from 'utils/alertUtils';

export const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      displayError({
        icon: 'error',
        title: 'خطأ',
        text: 'الرمز غير صالح أو مفقود.',
      });
      return;
    }
    dispatch(resetPassword({ token, newPassword }))
      .unwrap()
      .then(() => {
        displayToast('تمت إعادة تعيين كلمة المرور بنجاح.', true, currentTheme);
        navigate('/login');
      })
      .catch((error) => {
        displayError({
          icon: 'error',
          title: 'خطأ في إعادة تعيين كلمة المرور',
          text: 'حدث خطأ أثناء محاولة إعادة تعيين كلمة المرور. الرجاء المحاولة مرة أخرى.',
        });
      });
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-light-text dark:text-dark-text">
          إعادة تعيين كلمة المرور
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="new-password" className="sr-only">
                كلمة المرور الجديدة
              </label>
              <input
                id="new-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="كلمة المرور الجديدة"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              إعادة تعيين
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
