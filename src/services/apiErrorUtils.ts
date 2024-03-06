export function processApiError(error: any): {
  message: string;
  status: number;
} {
  const defaultMessage = 'An unexpected error occurred.';
  const defaultStatus = 500;

  const message = error.message || defaultMessage;
  const status = error.status || defaultStatus;

  return { message, status };
}
