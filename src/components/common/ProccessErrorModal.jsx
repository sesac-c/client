import PropTypes from 'prop-types';
import { useNavigateHandler } from '../../hooks/useNavigateHandler'
import processErrorIcon from '../../assets/svg/proccess-error.svg';
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import { LOGIN_PATH } from '../../constants/paths.js';

const buttonPaths = {
    back: '../',
    login: LOGIN_PATH,
};

const ProccessErrorModal = ({
    title,
    footer,
    buttonTo,
    handleButtonClick
}) => {
    const onClick = buttonTo
        ? useNavigateHandler(buttonPaths[buttonTo])
        : handleButtonClick;

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
    );
};

ProccessErrorModal.propTypes = {
    title: PropTypes.string,
    footer: PropTypes.node,
    buttonTo: PropTypes.oneOf(['back', 'login']),
    handleButtonClick: PropTypes.func,
};

export default ProccessErrorModal;