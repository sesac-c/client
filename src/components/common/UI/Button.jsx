const Button = ({
    variant = 'primary',
    size = 'medium',
    children,
    ...props
}) => {
    const baseClasses = 'w-full rounded-xl font-semibold tracking-[0.1rem]';
    const variantClasses = {
        primary: 'bg-primary text-white hover:bg-primary-hover',
        secondary: 'bg-secondary text-primary hover:bg-secondary-hover',
        tertiary: 'bg-transparent border border-gray-inputBorder text-primary hover:bg-gray-input',
        quaternary: 'bg-transparent text-primary hover:bg-gray-input'
    };
    const sizeClasses = {
        small: 'px-3 py-2 text-sm',
        medium: 'px-5 py-3 text-base',
        large: 'px-6 py-4 text-lg'
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};
export default Button;