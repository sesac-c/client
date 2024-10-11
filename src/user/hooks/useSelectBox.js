import { useState } from 'react';

export const useSelectBox = (options, selectedOption, onChange) => {
  const [selected, setSelected] = useState(selectedOption || options[0]);

  const handleChange = ({ value, label }) => {
    setSelected(label);
    if (onChange) {
      onChange(value);
    }
  };

  return {
    selected,
    handleChange
  };
};