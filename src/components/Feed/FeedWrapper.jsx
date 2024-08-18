import PropTypes from 'prop-types';

const FeedWrapper = ({ boardContent, children }) => {
  return (
    <>
      {boardContent && (
        <div className='board-container'>
          <div className='board-inner'>{boardContent}</div>
        </div>
      )}
      <div className='main-container'>{children}</div>
    </>
  );
};

FeedWrapper.propTypes = {
  boardContent: PropTypes.node,
  children: PropTypes.node.isRequired
};

export default FeedWrapper;
