import { useDaumPostcodePopup } from 'react-daum-postcode';
import RegisterInput from './UI/RegisterInput';
import { Button } from '@mui/joy';
import { getCoords, handleAddress } from '../../../common/utils';

const DaumPost: React.FC<{
  value: string;
  setFuc: (result: string) => void;
}> = ({ value, setFuc }) => {
  const open = useDaumPostcodePopup(); //클릭 시 수행될 팝업 생성 함수

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
  //클릭 시 발생할 이벤트
  const handleClick = () => {
    open({ onComplete: handleComplete });
    // 이후 좌표 저장할 것.
  };
  return (
    <RegisterInput
      required
      name='address'
      placeholder='주소'
      endDecorator={
        <Button size='sm' color='success' onClick={handleClick}>
          주소 찾기
        </Button>
      }
      size='md'
      fullWidth
      variant='plain'
      value={value}
    />
  );
};

export default DaumPost;
