import HeaderedInputSection from "../common/HeaderedInputSection.jsx";

const VerificationCodeField = () => {
    const remainTime = () => (
        <div className="flex flex-row gap-3 items-center text-red-danger font-semibold">
            <span className="inline-block text-[0.8rem]">입력까지 남은 시간</span>
            <span className="extra-info red">0:00</span>
        </div>
    )
    return (
        <HeaderedInputSection title='인증코드 입력' placeHolder='인증코드' name='' type='text' ExtraInfoElement={remainTime} />
    )
}
export default VerificationCodeField;