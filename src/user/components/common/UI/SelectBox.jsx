import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { CheckIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useSelectBox } from '../../../hooks/useSelectBox';

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
          {options.map(option => (
            <li
              key={option}
              className={`select-box-option ${option === selected ? 'select-box-option-selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
              {option === selected && <CheckIcon className='select-box-check-icon' />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SelectBox.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary', 'danger', 'feed']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'feedSize']),
  label: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  selectedOption: PropTypes.string,
  onChange: PropTypes.func
};

export default SelectBox;
