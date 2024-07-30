import { useNavigate } from "react-router-dom";
import InputText from '../../components/common/UI/InputText.jsx';
import SelectBox from '../../components/common/UI/SelectBox.jsx';
import Button from '../../components/common/UI/Button.jsx';
import { LOGIN_PATH, SIGNUP_PATH } from "../../constants/paths.js";

const BirthdateInput = () => {
    const inputBaseClasses = 'p-2 border border-gray-inputBorder bg-gray-input rounded-md';
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-basic mb-1">
                생년월일 / 주민번호 앞 1자리
            </label>
            <div className="flex items-center">
                <input
                    type="text"
                    className={`flex-grow ${inputBaseClasses}`}
                    placeholder="YYMMDD"
                />
                <span className="mx-2 text-3xl">-</span>
                <input
                    type="text"
                    className={`w-12 ${inputBaseClasses}`}
                    maxLength="1"
                />
                <div className="ml-2 flex">
                    {[...Array(6)].map((_, index) => (
                        <span key={index} className="w-2.5 h-2.5 bg-gray-400 rounded-full mx-0.5"></span>
                    ))}
                </div>
            </div>
        </div>
    );
}

const SignupFirstStepField = () => {
    const inputSize = 'small';

    return (
        <div className="modal-form">
            <div className="flex flex-col gap-2">
                <InputText type="text" name="name" label='이름' size={inputSize} />
                <BirthdateInput />
            </div>
            <div className="flex flex-col gap-2">
                <InputText type="email" name="email" label='이메일' size={inputSize} />
                <InputText type="password" name="password" label='비밀번호' size={inputSize} />
                <InputText type="password" name="confirmPassword" label='비밀번호 확인' size={inputSize} />
            </div>
        </div>
    );
}

const SignupSecondStepField = () => {
    return (
        <div className="modal-form">
            <SelectBox size="small" label="캠퍼스 선택" />
            <SelectBox size="small" label="과정 선택" />
        </div>
    );
}

const SignupCompleteContent = () => {
    return <div className="modal-text">
        <p>수강생/수료생 정보 확인 후 승인 절차를 거치게 됩니다.</p>
        <p>　</p>
        <p>승인 후 회원 서비스를 이용하실 수 있습니다.</p>
        <p>승인이 완료되면  이메일로 안내해드리겠습니다.</p>
    </div>
}

const SignupFirstStepButton = () => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`${SIGNUP_PATH}?step=second`)
    }
    return <Button size="large" onClick={handleClick}>다음</Button>
}

const SignupSecondStepButton = () => {
    const navigate = useNavigate();
    function handlePrevButtonClick() {
        navigate(`${SIGNUP_PATH}?step=first`);
    }
    function handleComplete() {
        navigate(`${SIGNUP_PATH}?step=complete`);
    }
    return <div className="flex flex-row justify-center items-center gap-2">
        <Button size="large" variant="tertiary" onClick={handlePrevButtonClick}>이전</Button>
        <Button size="large" onClick={handleComplete}>가입</Button>
    </div>
}

const SignupCompleteButton = () => {
    const navigate = useNavigate();
    function handleClick() {
        navigate(LOGIN_PATH)
    }
    return <Button size="large" onClick={handleClick}>확인</Button>
}

export {
    SignupFirstStepField, SignupSecondStepField, SignupCompleteContent,
    SignupFirstStepButton, SignupSecondStepButton, SignupCompleteButton
};