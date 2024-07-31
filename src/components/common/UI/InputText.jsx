const InputText = ({
    variant = 'primary',
    size = 'medium',
    label,
    className = "",
    inputMessage,
    inputMessageType,
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
    const disabledClasses = 'bg-gray-disable'
    const inputMessageBasicClasses = 'text-xs mt-1 pl-1 font-semibold';
    const inputMessageTypeClasses = {
        danger: 'text-red-danger',
        success: 'text-primary',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${props.disabled && disabledClasses}`;
    const inputMessageClasses = `${inputMessageBasicClasses} ${inputMessageTypeClasses[inputMessageType]}`;

    return (
        <div className="w-full">
        {
            label && <label className="block w-full text-left mb-1 text-sm text-red" htmlFor={label}>{label}</label>
        }
            <input
                id={label}
                type="text"
                className={classes}
                {...props}
            />
            {
                inputMessage && <p className={inputMessageClasses}>{inputMessage}</p>
            }
        </div>
    )
}

export default InputText;