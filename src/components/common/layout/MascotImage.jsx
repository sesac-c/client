import PropTypes from 'prop-types';
import loginMascotImage from '../../../assets/images/login-mascot.gif';
import ErrorMascotImage from '../../../assets/images/error-mascot.gif';
import SearchLoadingMascotImage from '../../../assets/images/search-loading-mascot.png';

const mascotImages = {
  login: loginMascotImage,
  error: ErrorMascotImage,
  searchLoading: SearchLoadingMascotImage
};

const MascotImage = ({ type }) => {
  return (
    <div className='relative h-full w-full'>
      <img src={mascotImages[type]} alt='mascot image' className='absolute inset-0 h-full w-full object-contain' />
    </div>
  );
};

MascotImage.propTypes = {
  type: PropTypes.oneOf(['login', 'error', 'searchLoading']).isRequired
};

export default MascotImage;
