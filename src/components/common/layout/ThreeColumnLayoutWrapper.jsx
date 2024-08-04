import PropTypes from 'prop-types';

const ThreeColumnLayoutWrapper = ({
    leftSide,
    mainArea,
    rightSide
}) => {
    return (
        <>
            <div className="left-side">
                {leftSide}
            </div>
            <div className="main-area">
                {mainArea}
            </div>
            <div className="right-side">
                {rightSide}
            </div>
        </>
    );
};

ThreeColumnLayoutWrapper.propTypes = {
    leftSide: PropTypes.node,
    mainArea: PropTypes.node.isRequired,
    rightSide: PropTypes.node
};

export default ThreeColumnLayoutWrapper;