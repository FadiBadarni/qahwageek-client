import { useCallback } from 'react';

interface UseDropzoneHandlerParams {
  setSelectedImage: (file: File | null) => void;
  setImagePreviewUrl: (url: string | null) => void;
}

export const useDropzoneHandler = ({
  setSelectedImage,
  setImagePreviewUrl,
}: UseDropzoneHandlerParams) => {
  return useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    },
    [setSelectedImage, setImagePreviewUrl]
  );
};
