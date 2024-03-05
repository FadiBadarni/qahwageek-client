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
