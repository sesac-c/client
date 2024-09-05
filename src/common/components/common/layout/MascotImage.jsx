import PropTypes from 'prop-types';

const mascotImages = {
  login: 'login-mascot.gif',
  error: 'error-mascot.gif',
  searchLoading: 'search-loading-mascot.png'
};

const MascotImage = ({ type }) => {
  return (
    <div className='relative h-full w-full'>
      <img src={`/assets/images/${mascotImages[type]}`} alt='mascot image' className='absolute inset-0 h-full w-full object-contain' />
    </div>
  );
};

MascotImage.propTypes = {
  type: PropTypes.oneOf(['login', 'error', 'searchLoading']).isRequired
};

export default MascotImage;
