import { getInputTextClasses, getInputTextMessageClasses } from '../../../utils/style';
import PropTypes from 'prop-types';

const InputText = ({
    variant,
    size,
    label,
    className,
    inputMessage,
    inputMessageType,
    ...props
}) => {
    const classes = getInputTextClasses(variant, size, className);
    const inputMessageClasses = getInputTextMessageClasses(inputMessageType);

    return (
        <div className="w-full">
            {label && (
                <label className="block w-full text-left mb-1 text-sm text-red" htmlFor={label}>
                    {label}
                </label>
            )}
            <input
                id={label}
                type="text"
                className={classes}
                {...props}
            />
            {inputMessage && <p className={inputMessageClasses}>{inputMessage}</p>}
        </div>
    );
};

InputText.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary', 'danger']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    label: PropTypes.string,
    className: PropTypes.string,
    inputMessage: PropTypes.string,
    inputMessageType: PropTypes.oneOf(['danger', 'success']),
};

InputText.defaultProps = {
    variant: 'primary',
    size: 'medium',
    className: '',
}

export default InputText;