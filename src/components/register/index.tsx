import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export const RegistrationPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.data);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace 'register' with your registration action
    // const registerResult = await dispatch(
    //   register({ username, email, password })
    // );

    // Handle registration response (e.g., navigate, display message)
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
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
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
            >
              اسم المستخدم
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
            >
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
            >
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-500 hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              إنشاء الحساب
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
