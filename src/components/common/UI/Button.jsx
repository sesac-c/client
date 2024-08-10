import PropTypes from 'prop-types';
import { getButtonClasses } from '../../../utils/style';

const Button = ({ variant = 'primary', size = 'medium', className = '', children, ...props }) => {
  const classes = `${getButtonClasses(variant, size)} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Button;
