import PropTypes from 'prop-types';

import { getDivisionClasses } from '../../../utils/style';

const Division = ({ variant = 'primary', type = 'vertical', className = '' }) => {
  const classes = getDivisionClasses(variant, type, className);
  return <div className={classes}></div>;
};

Division.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'custom']),
  type: PropTypes.oneOf(['vertical', 'horizontal', 'horizontal_custom']),
  className: PropTypes.string
};

export default Division;
