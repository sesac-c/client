import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import closeSvg from '../../../assets/svg/close.svg';

const Modal = ({
    modalType = 'generalmodal',
    showCloseButton = false,
    closeTo,
    title,
    children,
    footer
}) => {
    const navigate = useNavigate();
    const closePath = {
        login: '/accounts/login'
    }

    function handleCloseModal() {
        navigate(closePath[closeTo]);
    }

    return createPortal(
        <div className="modal-overlay">
            <div className={modalType}>
                <div className='modal-header'>
                    <h2>{title}</h2>
                    {showCloseButton && (
                        <button onClick={handleCloseModal} className='close-button'>
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