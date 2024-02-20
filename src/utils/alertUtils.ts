import Swal, { SweetAlertOptions } from 'sweetalert2';

export const displayError = (options: SweetAlertOptions) => {
  Swal.fire({
    ...options,
    customClass: {
      confirmButton:
        'bg-brand-500 text-white hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 dark:bg-brand-400 dark:hover:bg-brand-300 px-6 py-2 rounded-lg mx-2 my-1',
      popup:
        'bg-light-100 border-neutral-300 dark:bg-dark-700 dark:border-neutral-500',
      title: 'text-neutral-500 dark:text-neutral-100',
    },
    buttonsStyling: false,
  });
};
