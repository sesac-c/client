const InputText = ({
    variant='primary',
    size='medium',
    className = "", 
    ...props 
}) => {
    const baseClasses = 'w-full flex-1 placeholder:text-gray-placeholder';
    const variantClasses = {
        primary: 'bg-gray-input border-2 border-gray-inputBorder focus:ring-2 focus:ring-primary focus:outline-2 focus:outline-primary',
        secondary: '',
        tertiary: '',
        quaternary: ''
    };
    const sizeClasses = {
        small: 'px-3 py-2 rounded-sm text-sm',
        medium: 'px-5 py-3 rounded-md text-base',
        large: 'px-6 py-4 rounded-lg text-lg'
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size] } ${className}`;

    return (
        <input
            type="text"
            className={ classes }
            {...props}
        />
    )
}

export default InputText;