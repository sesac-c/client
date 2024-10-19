import { create } from 'zustand';
import { MAX_HASHTAGS } from '../../common/constants';
import { removeImage, uploadImage } from '@/common/services/api';
import { NoticeFormState, noticeError } from '../types';
import { validateNoticeForm } from '../utils';

interface NoticeStore {
  state: NoticeFormState;
  errors: noticeError;
  touched: Record<keyof NoticeFormState, boolean>;
  isFormValid: boolean;
  thumbnail: string | null;
  isNoticeUpdate: boolean;

  setState: (field: keyof NoticeFormState, value: any) => void;
  setThumbnail: (thumbnail: string | null) => void;
  setIsNoticeUpdate: (isUpdate: boolean) => void;
  addHashtag: (hashtag: string) => void;
  removeHashtag: (index: number) => void;
  handleImageUpload: (file: File) => Promise<void>;
  handleImageRemove: (file: string) => Promise<void>;
  validateForm: () => boolean;
  resetForm: () => void;
  isCompleteButtonEnabled: () => boolean;
  getTitleLength: () => number;
  getContentLength: () => number;
  getHashtagCount: () => number;
  getThumbnail: () => string;
}

const useNoticeStore = create<NoticeStore>((set, get) => ({
  state: {
    title: '',
    content: '',
    image: undefined,
    type: '',
    hashtags: undefined,
    importance: undefined,
    courseId: undefined
  },
  errors: {},
  touched: {
    title: false,
    content: false,
    image: false,
    type: false,
    hashtags: false,
    importance: false,
    courseId: false
  },
  isFormValid: false,
  thumbnail: null,
  isNoticeUpdate: false,

  setState: (field, value) => {
    set(state => {
      const newState = { ...state.state, [field]: value };
      const newTouched = { ...state.touched, [field]: true };
      const validationErrors = validateNoticeForm(newState);
      const isFormValid =
        Object.keys(validationErrors).length === 0 && newState.title.trim() !== '' && newState.content.trim() !== '';

      return {
        state: newState,
        touched: newTouched,
        errors: validationErrors,
        isFormValid
      };
    });
  },

  setThumbnail: thumbnail => set({ thumbnail }),
  setIsNoticeUpdate: isUpdate => set({ isNoticeUpdate: isUpdate }),
  addHashtag: hashtag => {
    const { state } = get();
    const currentHashtags = state.hashtags || [];
    if (currentHashtags.includes(hashtag)) {
      alert('이미 존재하는 해시태그입니다.');
      return;
    }
    if (currentHashtags.length < MAX_HASHTAGS) {
      set(state => ({
        state: { ...state.state, hashtags: [hashtag, ...currentHashtags] }
      }));
    }
  },

  removeHashtag: index => {
    const { state } = get();
    const currentHashtags = state.hashtags || [];
    set(state => ({
      state: { ...state.state, hashtags: currentHashtags.filter((_, i) => i !== index) }
    }));
  },

  handleImageUpload: async file => {
    try {
      const response = await uploadImage(file);
      const { data } = response;
      if (!data || !data.length) return;

      const [image] = data;
      set(state => ({
        state: { ...state.state, image: `${image.uuid}_${image.fileName}` },
        thumbnail: image.link
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  },

  handleImageRemove: async file => {
    try {
      await removeImage(file);
      set(state => ({
        state: { ...state.state, image: undefined },
        thumbnail: null
      }));
    } catch (error) {
      console.error('Image remove failed:', error);
    }
  },

  validateForm: () => {
    const { state } = get();
    const validationErrors = validateNoticeForm(state);
    set({ errors: validationErrors });
    return Object.keys(validationErrors).length === 0;
  },

  resetForm: () => {
    set({
      state: {
        title: '',
        content: '',
        image: undefined,
        type: '',
        hashtags: undefined,
        importance: undefined,
        courseId: undefined
      },
      errors: {},
      touched: {
        title: false,
        content: false,
        image: false,
        type: false,
        hashtags: false,
        importance: false,
        courseId: false
      },
      isFormValid: false,
      thumbnail: null
    });
  },

  isCompleteButtonEnabled: () => {
    const { state } = get();
    const baseCondition = state.title.trim() !== '' && state.content.trim() !== '';
    if (state.type === 'group') {
      return baseCondition && state.courseId !== undefined;
    } else {
      return baseCondition;
    }
  },

  getTitleLength: () => get().state.title.length,
  getContentLength: () => get().state.content.length,
  getHashtagCount: () => (get().state.hashtags || []).length,
  getThumbnail: () => `${process.env.REACT_APP_API_BASE_URL}view/${get().thumbnail}`
}));

export default useNoticeStore;
