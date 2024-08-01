import { createPortal } from 'react-dom';
import { useNavigateHandler } from '../../../hooks/useNavigateHandler';
import closeSvg from '../../../assets/svg/close.svg';
import { LOGIN_PATH } from '../../../constants/paths';

const closePath = {
    login: LOGIN_PATH
}

const Modal = ({
    modalType = 'generalmodal',
    showCloseButton = false,
    closeTo,
    title,
    children,
    footer
}) => {

    return createPortal(
        <div className="modal-overlay">
            <div className={modalType}>
                <div className='modal-header'>
                    <h2>{title}</h2>
                    {showCloseButton && (
                        <button onClick={useNavigateHandler(closePath[closeTo])} className='close-button'>
                            <img src={closeSvg} alt="close" />
                        </button>
                    )
                    }
                </div>
                <div className='modal-content'>
                    {children}
                </div>
                <div className='modal-footer'>
                    {footer}
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
}

export default Modal;