import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Avatar } from '@mui/material';
import { DEFAULT_PROFILE_IMAGE, IMAGE_API_URL } from '@/common/constants';

const ProfileField: React.FC<{
  profileImage: string;
  onRemovedButtonClick: () => void;
  onFileChange: (file: File | null) => void;
  fileState: File | null;
}> = ({ profileImage, onRemovedButtonClick, onFileChange, fileState }) => {
  const requestImageUrl = (image: string) => IMAGE_API_URL(image);

  const [isChange, setIsChange] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(requestImageUrl(profileImage));

  const isDefaultProfileImage = profileImage === DEFAULT_PROFILE_IMAGE;

  useEffect(() => {
    if (fileState) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(fileState);
    } else if (profileImage) {
      setPreviewUrl(requestImageUrl(profileImage));
    } else {
      setPreviewUrl(requestImageUrl(DEFAULT_PROFILE_IMAGE));
    }
  }, [fileState, profileImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      onFileChange(file);
      setIsDelete(false);
      if (!isChange) setIsChange(true);
    }
  };

  const handleRemoveImage = () => {
    if (!isChange) setIsChange(true);
    setPreviewUrl(null);
    onFileChange(null);
    onRemovedButtonClick();
    setIsDelete(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Typography variant='subtitle1' fontWeight={550} color='grey.700'>
          프로필 사진
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant='text'
            component='label'
            sx={{ color: 'green', textDecoration: 'underline', fontWeight: 550 }}
          >
            사진 선택
            <input type='file' hidden accept='image/*' onChange={handleImageChange} />
          </Button>
          <Button
            variant='text'
            sx={{ color: 'green', textDecoration: 'underline', fontWeight: 550 }}
            onClick={handleRemoveImage}
            disabled={(isDefaultProfileImage && !isChange) || isDelete}
          >
            사진 삭제
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            border: '2px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2px',
            boxSizing: 'border-box'
          }}
        >
          <Avatar
            src={previewUrl || requestImageUrl(DEFAULT_PROFILE_IMAGE)}
            alt='Uploaded Image'
            sx={{
              width: '100%',
              height: '100%'
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileField;
