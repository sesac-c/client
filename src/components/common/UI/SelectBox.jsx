import { useState } from 'react';
import PropTypes from 'prop-types';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { getSelectBoxClasses, getInputTextMessageClasses } from '../../../utils/style';

const SelectBox = ({
    variant,
    size,
    label,
    className,
    inputMessage,
    inputMessageType,
    options = ['option1', 'option2', 'option3', 'option4', 'option5'], //TODO: delete default
    onChange,
    ...props
}) => {
    const [selected, setSelected] = useState(options[0]);
    const buttonClasses = getSelectBoxClasses(variant, size, className);
    const optionsClasses = 'absolute z-10 mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm';
    const inputMessageClasses = getInputTextMessageClasses(inputMessageType);

    const handleChange = (value) => {
        setSelected(value);
        if (onChange) onChange(value);
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
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-secondary text-gray-basic' : ''}`
                                }
                                value={option}
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            {option}
                                        </span>
                                        {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
            {inputMessage && <p className={inputMessageClasses}>{inputMessage}</p>}
        </div>
    );
};

SelectBox.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary', 'danger']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    label: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
};

SelectBox.defaultProps = {
    variant: 'primary',
    size: 'medium',
    className: "",
}

export default SelectBox;