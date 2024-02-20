import { useAppDispatch } from 'hooks/useAppDispatch';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { RootState } from 'store/store';
import { login } from 'store/user/userActions';
import logo from 'assets/logo.svg';
import { displayError } from 'utils/alertUtils';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.data);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginResult = await dispatch(login({ username, password }));

    if (loginResult.type === 'user/login/rejected') {
      let message = '';
      switch (loginResult.payload) {
        case 'Invalid username or password':
          message = 'اسم المستخدم أو كلمة المرور غير صحيحة';
          break;
        default:
          message = 'حدث خطأ أثناء محاولة تسجيل الدخول';
      }

      displayError({
        title: 'خطأ في تسجيل الدخول',
        text: message,
        icon: 'error',
        confirmButtonText: 'حسنًا',
      });
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src={logo} alt="Qahwa Geek" />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-100">
          تسجيل الدخول إلى حسابك
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-neutral-100 text-right"
            >
              اسم المستخدم
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md border-0 bg-dark-700 py-1.5 text-neutral-100 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-accent-400 hover:text-accent-500"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-neutral-100"
              >
                كلمة المرور
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 bg-dark-700 py-1.5 text-neutral-100 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6"
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
      </div>
    </div>
  );
};
