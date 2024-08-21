// ============================ Button Component ============================
export const getButtonClasses = (variant, size) => {
    const baseClasses = 'w-full rounded-xl font-semibold tracking-[0.1rem] disabled:bg-gray-disable disabled:cursor-not-allowed';
    const variantClasses = {
        primary: 'bg-primary text-white hover:bg-primary-hover',
        secondary: 'bg-secondary text-primary hover:bg-secondary-hover',
        tertiary: 'bg-transparent border border-gray-inputBorder text-primary hover:bg-gray-input',
        quaternary: 'bg-transparent text-primary hover:bg-gray-input'
    };
    const sizeClasses = {
        small: 'px-3 py-2 text-caption',
        medium: 'px-5 py-3 text-description',
        large: 'px-6 py-4 text-basic'
    };

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
};

// ============================ Divison Component ============================
export const getDivisionClasses = (variant, type, className) => {
    const baseClasses = 'm-1';
    const variantClasses = {
        primary: 'bg-primary',
        secondary: 'bg-gray-300',
        custom: '',
    };
    const typeClasses = {
        vertical: 'w-[0.05vw] min-h-3.5',
        horizontal: 'min-w-full h-[1px]',
        horizontal_custom: 'min-w-full ',
    };
    return `${baseClasses} ${variantClasses[variant]} ${typeClasses[type]} ${className}`;
};

// ============================ Logo Component ============================
export const getLogoClasses = (size) => {
    const baseClasses = 'flex items-center justify-center';
    const sizeClasses = {
        small: 'w-12 h-12',
        medium: 'w-20 h-20',
        large: 'w-28 h-28',
        full: 'w-full h-full'
    };
    return `${baseClasses} ${sizeClasses[size]}`;
};

export const getLogoImageClasses = (to) => {
    const baseClasses = "object-contain select-none w-full h-full";
    const cursorClasses = to ? 'cursor-pointer' : '';
    return `${baseClasses} ${cursorClasses}`;
};