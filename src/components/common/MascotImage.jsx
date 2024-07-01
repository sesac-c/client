import PropTypes from 'prop-types';
import loginMascotImage from '../../assets/images/login-mascot.gif'
import ErrorMascotImage from "../../assets/images/error-mascot.gif";

const mascotImages = {
    login: loginMascotImage,
    error: ErrorMascotImage,
};

const MascotImage = ({
    type
}) => {
    return (
        <div className="relative w-full h-full">
            <img src={mascotImages[type]} alt='mascot image'
                className='absolute inset-0 w-full h-full object-contain'
            />
        </div>
    )
}

MascotImage.propTypes = {
    type: PropTypes.oneOf(['login', 'error']).isRequired,
};

export default MascotImage;