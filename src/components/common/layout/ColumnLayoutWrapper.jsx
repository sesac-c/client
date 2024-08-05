import PropTypes from 'prop-types';

const ColumnLayoutWrapper = ({
    leftSide,
    mainArea,
    rightSide
}) => {
    return (
        <>
            {
                leftSide && <div className="left-side">{leftSide}</div>
            }
            <div className="main-area">{mainArea}</div>
            {
                rightSide && <div className="right-side">{rightSide}</div>
            }
        </>
    );
};

ColumnLayoutWrapper.propTypes = {
    leftSide: PropTypes.node,
    mainArea: PropTypes.node.isRequired,
    rightSide: PropTypes.node
};

export default ColumnLayoutWrapper;