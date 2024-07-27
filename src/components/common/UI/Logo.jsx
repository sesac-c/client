import logoImage from '../../../assets/images/sesacc-logo.png'

const Logo = ({
    size = 'large'
}) => {
    const baseClasses = 'flex items-center justify-center';
    const sizeClasses = {
        small: 'w-12 h-12',
        medium: 'w-20 h-20',
        large: 'w-28 h-28'
    };

    const classes = `${baseClasses} ${sizeClasses[size]}`;

    return (
        <div className={classes}>
            <img src={logoImage} alt="logo image"
                className="object-contain select-none w-full h-full"
            />
        </div>
    )
}
export default Logo;