import PropTypes from 'prop-types';
import { getDivisionClasses } from '../../../utils/style';

const Division = ({ variant = "primary", type = "vertical" }) => {
    const classes = getDivisionClasses(variant, type);
    return <div className={classes}></div>;
};

Division.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary"]),
    type: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default Division;