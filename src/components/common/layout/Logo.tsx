import React from 'react';
import { getLogoClasses, getLogoImageClasses } from '@/utils/style';
import { LogoProps } from '@/types';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import LogoImage from '@/assets/images/sesacc-logo.png';

const Logo: React.FC<LogoProps> = ({ size = 'large', to = '' }) => {
  const navigate = useNavigate();
  const classes = getLogoClasses(size);
  const imageClasses = getLogoImageClasses(to);

  const handleClick = to
    ? () => {
        navigate(to);
      }
    : undefined;

  return (
    <div className={classes}>
      <img src={LogoImage} alt='logo image' className={imageClasses} onClick={handleClick} />
    </div>
  );
};

export default Logo;
