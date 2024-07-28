import { useNavigate } from 'react-router-dom';
import logoImage from '../../../assets/images/sesacc-logo.png'

const Logo = ({
    size = 'large',
    to = ''
}) => {
    const navigate = useNavigate();
    const baseClasses = 'flex items-center justify-center';
    const sizeClasses = {
        small: 'w-12 h-12',
        medium: 'w-20 h-20',
        large: 'w-28 h-28'
    };

    const classes = `${baseClasses} ${sizeClasses[size]}`;

    const imageBaseClasses = "object-contain select-none w-full h-full";
    const cursorClasses = to ? 'cursor-pointer' : '';
    const imageClasses = `${imageBaseClasses} ${cursorClasses}`;

    return (
        <div className={classes}>
            <img src={logoImage} alt="logo image"
                className={imageClasses}
                onClick={to ? () => {
                    navigate(to);
                } : null}
            />
        </div>
    )
}
export default Logo;