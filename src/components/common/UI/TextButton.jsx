import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { getTextButtonClasses } from '../../../utils/style';

const TextButton = ({
    variant,
    content,
    className,
    ...props
}) => {
    const classes = getTextButtonClasses(variant, className);

    return (
        <Link className={classes} {...props}>
            {content}
        </Link>
    );
};

TextButton.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'quaternary']),
    content: PropTypes.node.isRequired,
    className: PropTypes.string,
};

TextButton.defaultProps = {
    variant: 'primary',
    className: "",
}

export default TextButton;