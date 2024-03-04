import { useAppDispatch } from 'hooks/useAppDispatch';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { login } from 'store/user/userActions';
import logo from 'assets/logo.svg';
import { displayError } from 'utils/alertUtils';
import { MdLock, MdLockOpen, MdPerson, MdPersonAdd } from 'react-icons/md';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const currentTheme = useSelector((state: RootState) => state.theme.theme);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginResult = await dispatch(login({ username, password }));

    if (loginResult.type === 'user/login/rejected') {
      displayError({
        title: 'خطأ في تسجيل الدخول',
        text: loginResult.payload,
        icon: 'error',
        confirmButtonText: 'حسنًا',
      });
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className={`mx-auto h-20 w-auto ${
            currentTheme === 'dark' ? 'svg-light-theme' : 'svg-dark-theme'
          }`}
          src={logo}
          alt="Qahwa Geek"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-light-text dark:text-dark-text">
          تسجيل الدخول إلى حسابك
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-light-text dark:text-dark-text text-right"
            >
              اسم المستخدم
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdPerson
                  className="h-5 w-5 text-neutral-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full pl-10 rounded-md border-0 py-1.5 shadow-sm sm:text-sm sm:leading-6 bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text ring-1 ring-inset dark:ring-neutral-700 ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-light-text dark:text-dark-text"
              >
                كلمة المرور
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-light-primary dark:text-dark-primary"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </div>
            <div className="relative mt-2">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-200"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <MdLockOpen className="h-5 w-5 text-neutral-400 transition-transform duration-200" />
                ) : (
                  <MdLock className="h-5 w-5 text-neutral-400 transition-transform duration-200" />
                )}
              </div>
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 rounded-md border-0 py-1.5 shadow-sm sm:text-sm sm:leading-6 bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text ring-1 ring-inset dark:ring-neutral-700 ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-brand-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            بعدك مش عامِل حساب؟
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center mt-2 text-brand-600 hover:text-brand-500 dark:hover:text-brand-400"
          >
            <MdPersonAdd className="ml-2" /> تعال سَجِل
          </Link>
        </div>
      </div>
    </div>
  );
};
