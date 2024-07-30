const InputText = ({
    variant = 'primary',
    size = 'medium',
    label,
    className = "",
    ...props
}) => {
    const baseClasses = 'w-full flex-1 placeholder:text-gray-placeholder';
    const variantClasses = {
        primary: 'bg-gray-input border border-gray-inputBorder focus:ring-2 focus:ring-primary focus:outline-2 focus:outline-primary',
        secondary: '',
        tertiary: '',
        quaternary: ''
    };
    const sizeClasses = {
        small: 'max-h-10 min-h-[40px] px-3 py-2 rounded-md text-sm',
        medium: 'max-h-13 px-5 py-3 rounded-lg text-base',
        large: 'px-6 py-4 rounded-lg text-xl'
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <div className="w-full">
        {
            label && <label className="block w-full text-left mb-1 text-sm" htmlFor={label}>{label}</label>
        }
            <input
                id={label}
                type="text"
                className={classes}
                {...props}
            />
        </div>
    )
}

export default InputText;