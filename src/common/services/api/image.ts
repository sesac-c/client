import { RemoveResponse, UploadResponse } from '@/common/types';
import axios, { AxiosResponse } from 'axios';

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('files', file);

    const response: UploadResponse = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response;
  } catch (error) {
    console.error('이미지 업로드 실패: ', error);
    throw error;
  }
};

export const removeImage = async (fileName: string): Promise<RemoveResponse> => {
  try {
    const response: AxiosResponse<RemoveResponse> = await axios.delete(`/remove/${fileName}`);
    return response.data;
  } catch (error) {
    console.error('이미지 제거 실패: ', error);
    throw error;
  }
};
