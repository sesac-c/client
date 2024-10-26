import React from 'react';
import { useNavigateHandler } from '../../../hooks/useNavigateHandler';
import { getLogoClasses, getLogoImageClasses } from '../../../utils/style';
import { LogoProps } from '../../../types';

const LOGO_IMAGE_PATH = './assets/images/sesacc-logo.png';

const Logo: React.FC<LogoProps> = ({ size = 'large', to = '' }) => {
  const classes = getLogoClasses(size);
  const imageClasses = getLogoImageClasses(to);
  const navigate = useNavigateHandler(to);

  const handleClick = to ? navigate : undefined;

  return (
    <div className={classes}>
      <img src={LOGO_IMAGE_PATH} alt='logo image' className={imageClasses} onClick={handleClick} />
    </div>
  );
};

export default Logo;
