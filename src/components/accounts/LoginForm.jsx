import InputText from "../common/UI/InputText.jsx";
import TextButton from "../common/UI/TextButton.jsx";
import Division from "../common/UI/Division.jsx";
import Logo from "../common/layout/Logo.jsx";
import Button from "../common/UI/Button.jsx";
import { SIGNUP_PATH, FIND_PASSWORD_PATH } from "../../constants/paths.js";

const LoginForm = () => {
    const formSize = 'w-5/6 h-full';
    const formDetailSize = 'w-full h-[65%]';

    return (
        <form method="post" className={`${formSize} py-10 flex flex-col justify-center items-center`}>
            <div className="flex-grow-2 flex-shrink-0 flex-basis-0 w-full flex flex-col items-center min-h-0">
                <Logo />
            </div>
            <div className={`${formDetailSize} flex flex-col gap-4 justify-center`}>
                <div className="flex flex-col justify-start gap-3 w-full min-h-0">
                    <InputText placeHolder="아이디" />
                    <InputText placeHolder="비밀번호" />
                </div>
                <div className="h-fit flex flex-row gap-2 justify-end items-center py-2">
                    <TextButton to={SIGNUP_PATH} content="회원가입" />
                    <Division />
                    <TextButton to={FIND_PASSWORD_PATH} content="비밀번호 찾기" />
                </div>
                <div>
                    <Button size='large'>로그인</Button>
                </div>
            </div>
        </form>
    )
}
export default LoginForm;