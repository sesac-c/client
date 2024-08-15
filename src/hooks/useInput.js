import { useCallback, useRef, useMemo, useState } from 'react';
import { getInputTextClasses, getInputTextMessageClasses, getSelectBoxClasses, getSelectBoxDownIconClasses } from '../utils/style'

export const useInput = (variant, size, className, inputMessageType, onTextChange) => {
    const inputRef = useRef();
    const classes = useMemo(() => getInputTextClasses(variant, size, className), [variant, size, className]);
    const inputMessageClasses = useMemo(() => getInputTextMessageClasses(inputMessageType), [inputMessageType]);

    const handleInputChange = useCallback(e => {
        const newValue = e.target.value;
        const newLength = newValue.length;

        onTextChange?.(newLength);
    }, [onTextChange]);

    return {
        inputRef,
        classes,
        inputMessageClasses,
        handleInputChange
    };
};
export const useSelectBox = (options, selectedOption, onChange, variant, size, className, inputMessageType) => {
    const [selected, setSelected] = useState(selectedOption || options[0]);

    const buttonClasses = getSelectBoxClasses(variant, size, className);
    const selectBoxDownIconClasses = getSelectBoxDownIconClasses(variant);
    const optionsClasses =
        'absolute z-10 mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm';
    const inputMessageClasses = getInputTextMessageClasses(inputMessageType);

    const handleChange = value => {
        setSelected(value);
        if (onChange) onChange(value);
    };

    return {
        selected,
        buttonClasses,
        selectBoxDownIconClasses,
        optionsClasses,
        inputMessageClasses,
        handleChange
    };
};