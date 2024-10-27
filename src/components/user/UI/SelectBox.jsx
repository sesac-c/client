import { useState, useEffect, useRef } from 'react';

import { CheckIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useSelectBox } from '@/hooks';

const SelectBox = ({ variant = 'primary', size = 'medium', options, selectedOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { selected, handleChange } = useSelectBox(options, selectedOption, onChange);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = option => {
    handleChange(option);
    setIsOpen(false);
  };

  return (
    <div className='select-box'>
      <button type='button' className={`select-box-button ${size} ${variant}`} onClick={handleToggle}>
        {selected}
        {isOpen ? <ChevronUpIcon className='select-box-icon' /> : <ChevronDownIcon className='select-box-icon' />}
      </button>
      {isOpen && (
        <ul className='select-box-options'>
          {options.map(({ value, label }) => (
            <li
              key={value}
              className={`select-box-option ${value === selected ? 'select-box-option-selected' : ''}`}
              onClick={() => handleSelect({ value, label })}
            >
              {label}
              {value === selected && <CheckIcon className='select-box-check-icon' />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
