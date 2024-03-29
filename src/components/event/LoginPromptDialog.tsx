import React from 'react';
import { Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface LoginPromptDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPromptDialog: React.FC<LoginPromptDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-40 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-middle bg-light-background dark:bg-dark-background rounded-lg text-center shadow-xl transform transition-all">
          <div className="p-6">
            <ExclamationCircleIcon className="mx-auto h-12 w-12 text-blue-500" />
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900 dark:text-white mt-4"
            >
              تنبيه
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                لإنشاء حدث جديد، يتوجب عليك تسجيل الدخول أو إنشاء حساب جديد.
              </p>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => navigate('/login')}
              >
                تسجيل الدخول
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => navigate('/register')}
              >
                إنشاء حساب
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginPromptDialog;
