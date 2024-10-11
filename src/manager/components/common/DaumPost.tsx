import React, { forwardRef, useImperativeHandle } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import RegisterInput from './UI/register/RegisterInput';
import { handleAddress } from '../../../common/utils';

export interface DaumPostRef {
  open: () => void;
}

interface DaumPostProps {
  value: string;
  setFuc: (result: string) => void;
}

const DaumPost = forwardRef<DaumPostRef, DaumPostProps>(({ value, setFuc }, ref) => {
  const openPostcodePopup = useDaumPostcodePopup();

  const handleComplete = (data: {
    address: string;
    sido: string;
    sigungu: string;
    addressType: 'R' | 'J' | 'r' | 'j';
    bname: string;
    buildingName: string;
  }) => {
    handleAddress(data, setFuc);
  };

  const handleClick = () => {
    openPostcodePopup({ onComplete: handleComplete });
    // 이후 좌표 저장할 것.
  };

  useImperativeHandle(ref, () => ({
    open: handleClick
  }));

  return (
    <RegisterInput
      required
      name='address'
      placeholder='주소'
      // endDecorator={
      //   <Button size='sm' color='success' onClick={handleClick}>
      //     주소 찾기
      //   </Button>
      // }
      onClick={handleClick}
      size='md'
      fullWidth
      variant='plain'
      value={value}
      readOnly
    />
  );
});

export default DaumPost;
