import React, { useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Label } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const SelectBox = ({
    variant = 'primary',
    size = 'medium',
    label,
    className = "",
    options = ['option1', 'option2', 'option3', 'option4', 'option5'],
    onChange,
    ...props
}) => {
    const [selected, setSelected] = useState(options[0]);

    const baseClasses = 'w-full flex-1 cursor-default';
    const variantClasses = {
        primary: 'bg-gray-input border border-gray-inputBorder focus:ring-2 focus:ring-primary focus:outline-2 focus:outline-primary',
        secondary: '',
        tertiary: '',
        quaternary: ''
    };
    const sizeClasses = {
        small: 'max-h-10 px-3 py-2 rounded-md text-sm',
        medium: 'max-h-13 px-5 py-3 rounded-lg text-base',
        large: 'px-6 py-4 rounded-lg text-lg'
    };

    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    const optionsClasses = 'absolute z-10 mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm';

    const handleChange = (value) => {
        setSelected(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div className="w-full">
            {label && <div className="w-full text-left mb-1 text-sm">{label}</div>}
            <Listbox value={selected} onChange={handleChange} {...props}>
                <div className="relative mt-1">
                    <ListboxButton className={buttonClasses}>
                        <span className="block truncate text-left">{selected}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-inputBorder" aria-hidden="true" />
                        </span>
                    </ListboxButton>
                    <ListboxOptions className={optionsClasses}>
                        {options.map((option) => (
                            <ListboxOption
                                key={option}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-secondary text-gray-basic' : ''
                                    }`
                                }
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            {option}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
        </div>
    );
};

export default SelectBox;