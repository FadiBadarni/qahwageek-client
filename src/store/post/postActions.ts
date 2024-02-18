import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import PostService from 'services/postService';
import { convertBase64ToBlob } from 'utils/fileUpload';

export const uploadImageToS3 = createAsyncThunk(
  'post/uploadImageToS3',
  async (
    { base64Image, filename }: { base64Image: string; filename: string },
    { rejectWithValue }
  ) => {
    try {
      console.log('base64Image', filename);
      const blob = convertBase64ToBlob(base64Image);
      console.log('blob', blob);
      // Request a presigned URL from the server
      const presignedUrl = await PostService.getPresignedUrl(
        filename,
        blob.type
      );
      console.log(blob.type);
      console.log('presignedUrl', presignedUrl);
      // Upload the blob to S3
      await axios.put(presignedUrl, blob, {
        headers: {
          'Content-Type': blob.type,
        },
      });

      const imageUrl = presignedUrl.split('?')[0];
      return imageUrl;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Unable to upload image to S3'
      );
    }
  }
);
