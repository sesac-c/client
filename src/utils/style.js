

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

// ============================ InputText Component ============================
export const getInputTextClasses = (variant, size, className) => {
    const baseClasses = 'w-full flex-1 placeholder:text-gray-placeholder disabled:bg-positive-disable disabled:border disabled:border-gray-inputBorder disabled:focus:ring-0 focus:outline-0 disabled:cursor-not-allowed';
    const variantClasses = {
        primary: 'bg-gray-input border border-gray-inputBorder focus:ring-2 focus:ring-primary focus:outline-2 focus:outline-primary',
        secondary: '',
        tertiary: '',
        quaternary: '',
        danger: 'bg-red-danger/30 border border-red-danger focus:ring-2 focus:ring-red-danger focus:outline-2 focus:outline-red-danger',
        feed: 'text-white mt-[0.4rem]',
        noneFocus: 'bg-gray-input border border-gray-inputBorder'
    };
    const sizeClasses = {
        small: 'max-h-10 min-h-[40px] px-3 py-2 rounded-md text-sm',
        medium: 'max-h-13 px-5 py-3 rounded-lg text-base',
        large: 'px-6 py-4 rounded-lg text-xl',
        feedSize: 'px-3 text-md font-semibold',
    };

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
};

export const getInputTextMessageClasses = (type) => {
    const baseClasses = 'text-xs mt-1 pl-1 font-semibold';
    const typeClasses = {
        danger: 'text-red-danger',
        success: 'text-primary',
    };

    return `${baseClasses} ${typeClasses[type] || ''}`;
};

// ============================ Divison Component ============================
export const getDivisionClasses = (variant, type) => {
    const baseClasses = 'm-1';
    const variantClasses = {
        primary: 'bg-primary',
        secondary: 'bg-gray-300',
    };
    const typeClasses = {
        vertical: 'w-[0.05vw] min-h-3.5',
        horizontal: 'min-w-full h-[1px]',
    };
    return `${baseClasses} ${variantClasses[variant]} ${typeClasses[type]}`;
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

// ============================ SelectBox Component ============================
export const getSelectBoxClasses = (variant, size, className) => {
    return getInputTextClasses(variant, size, className);
};

export const getSelectBoxDownIconClasses = (variant) => {
    const baseClasses = 'h-5 w-5';
    const textClasses = variant === 'feed' ? 'text-white' : 'text-gray-inputBorder'
    return `${baseClasses} ${textClasses}`
}


// ============================ TextButton Component ============================
export const getTextButtonClasses = (variant, className) => {
    const baseClasses = `${className} underline`;
    const variantClasses = {
        primary: 'text-primary',
        secondary: '',
        tertiary: '',
        quaternary: '',
    };
    return `${baseClasses} ${variantClasses[variant]}`;
};