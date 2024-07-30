import processErrorIcon from '../../assets/svg/proccess-error-Icon.svg'
import Modal from "./UI/Modal.jsx"
import Button from "./UI/Button.jsx"
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/paths.js';

const ProccessErrorModal = ({
    title,
    footer,
    buttonTo,
    handleButtonClick
}) => {
    const navigate = useNavigate();

    // button 요소 결정.
    let onClick;
    if (buttonTo) {
        const buttonPath = {
            back: '../',
            login: LOGIN_PATH,
        }
        onClick = () => { navigate(buttonPath[buttonTo]); }
    } else {
        onClick = handleButtonClick;
    }
    const modalFooter = footer || <Button size="large" onClick={onClick}>확인</Button>;
    return (
        <Modal
            title={title}
            modalType='generalmodal'
            footer={modalFooter}
        >
            <div className='w-full h-32 flex flex-col justify-between items-center'>
                <img src={processErrorIcon} alt='process error' className='w-20 h-20' />
                <p>오류가 발생했습니다. 잠시 뒤 시도해주세요.</p>
            </div>
        </Modal>
    )
}

export default ProccessErrorModal;