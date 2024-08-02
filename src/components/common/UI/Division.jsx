import PropTypes from 'prop-types';
import { getDivisionClasses } from '../../../utils/style';

const Division = ({ variant, type }) => {
    const classes = getDivisionClasses(variant, type);
    return <div className={classes}></div>;
};

Division.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary"]),
    type: PropTypes.oneOf(["vertical", "horizontal"]),
};

Division.defaultProps = {
    variant: 'primary',
    type: 'vertical',
}

export default Division;