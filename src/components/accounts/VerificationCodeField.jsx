import HeaderedInputText from '../common/UI/HeaderedInputText.jsx';

const VerificationCodeField = () => {
  const remainTime = () => (
    <div className='flex flex-row items-center gap-3 font-semibold text-red-danger'>
      <span className='inline-block text-[0.8rem]'>입력까지 남은 시간</span>
      <span className='extra-info red'>0:00</span>
    </div>
  );
  return (
    <HeaderedInputText title='인증코드 입력' placeholder='인증코드' name='' type='text' ExtraInfoElement={remainTime} />
  );
};
export default VerificationCodeField;
