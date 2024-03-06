import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

export const displayError = (options: SweetAlertOptions) => {
  Swal.fire({
    ...options,
    customClass: {
      confirmButton: `
        bg-brand-500 text-white hover:bg-brand-400 
        focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 
        dark:bg-brand-400 dark:hover:bg-brand-300 
        px-6 py-2 rounded-lg mx-2 my-1
      `,
      popup: `
        bg-light-background border-neutral-300 
        dark:bg-dark-background dark:border-neutral-700
      `,
      title: 'text-neutral-700 dark:text-neutral-200',
    },
    buttonsStyling: false,
  });
};

export const displayConfirmation = (
  options: SweetAlertOptions
): Promise<SweetAlertResult> => {
  return Swal.fire({
    ...options,
    showCancelButton: true,
    customClass: {
      confirmButton:
        'bg-brand-500 text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 dark:bg-brand-400 dark:hover:bg-brand-300 px-6 py-2 rounded-lg mx-2 my-1',
      cancelButton:
        'bg-neutral-500 text-white hover:bg-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2 dark:bg-neutral-400 dark:hover:bg-neutral-300 px-6 py-2 rounded-lg mx-2 my-1',
      popup:
        'bg-light-background border-neutral-300 dark:bg-dark-background dark:border-neutral-700',
      title: 'text-neutral-700 dark:text-neutral-200',
    },
    buttonsStyling: false,
    reverseButtons: true,
  });
};

export const displayToast = (
  title: string,
  isSuccess: boolean,
  theme: string
) => {
  Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    icon: isSuccess ? 'success' : 'error',
    background: theme === 'dark' ? '#1f2937' : '#f3f4f6',

    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      popup:
        'bg-light-layer dark:bg-dark-layer text-neutral-900 dark:text-neutral-100',
      title: 'text-neutral-900 dark:text-neutral-100',
      closeButton: 'text-neutral-600 dark:text-neutral-400',
      timerProgressBar: isSuccess
        ? 'bg-primary-500 dark:bg-primary-400'
        : 'bg-error-500 dark:bg-error-400',
    },
    buttonsStyling: false,
  }).fire({
    title: title,
  });
};
