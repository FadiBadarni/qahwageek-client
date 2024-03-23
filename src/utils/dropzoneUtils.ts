import { useCallback } from 'react';

interface UseDropzoneHandlerParams {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setImagePreviewUrl: (url: string | null) => void;
}

export const useDropzoneHandler = ({
  setFieldValue,
  setImagePreviewUrl,
}: UseDropzoneHandlerParams) => {
  return useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFieldValue('selectedImage', file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    },
    [setFieldValue, setImagePreviewUrl]
  );
};
