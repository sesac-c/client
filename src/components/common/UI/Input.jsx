import PropTypes from 'prop-types';
import { useInput } from '../../../hooks/useInput';

const Input = ({
  variant = 'primary',
  size = 'medium',
  className = '',
  isTextarea = false,
  label,
  inputMessage,
  inputMessageType,
  onTextChange,
  ...props
}) => {
  const { inputRef, classes, inputMessageClasses, handleInputChange } = useInput(
    variant,
    size,
    className,
    inputMessageType,
    onTextChange
  );

  const InputComponent = isTextarea ? 'textarea' : 'input';

  return (
    <div className='w-full'>
      {label && (
        <label className='text-red mb-1 block w-full text-left text-sm' htmlFor={label}>
          {label}
        </label>
      )}
      <InputComponent
        ref={inputRef}
        id={label}
        className={classes}
        onChange={handleInputChange}
        {...(!isTextarea && { type: 'text' })}
        {...props}
      />
      {inputMessage && <p className={inputMessageClasses}>{inputMessage}</p>}
    </div>
  );
};

Input.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary', 'danger', 'feed', 'noneFocus']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'feedSize']),
  label: PropTypes.string,
  className: PropTypes.string,
  inputMessage: PropTypes.string,
  inputMessageType: PropTypes.oneOf(['danger', 'success']),
  onTextChange: PropTypes.func,
  isTextarea: PropTypes.bool
};

export default Input;
