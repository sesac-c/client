import PropTypes from 'prop-types';

import { useNavigateHandler } from '../../../hooks/useNavigateHandler';

import { getLogoClasses, getLogoImageClasses } from '../../../utils/style';
import logoImage from '../../../assets/images/sesacc-logo.png';

const Logo = ({ size = 'large', to = '' }) => {
  const classes = getLogoClasses(size);
  const imageClasses = getLogoImageClasses(to);

  return (
    <div className={classes}>
      <img src={logoImage} alt='logo image' className={imageClasses} onClick={to ? useNavigateHandler(to) : null} />
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full']),
  to: PropTypes.string
};

export default Logo;
