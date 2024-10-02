import PropTypes from 'prop-types';

import SelectBox from '../../UI/SelectBox.jsx';

import { FEED_INFO, FEED_SELECT_ITEMS, CAMPUS, ALL, GROUP } from '../../../../../common/constants';
import { useNavigate } from 'react-router-dom';

const FeedSelectBox = ({ currentLocation }) => {
  const navigate = useNavigate();
  const onChange = e => navigate(e);
  return (
    <SelectBox
      variant='feed'
      options={FEED_SELECT_ITEMS}
      selectedOption={`${FEED_INFO[currentLocation].name}`}
      onChange={onChange}
      size='feedSize'
    />
  );
};

FeedSelectBox.propTypes = {
  currentLocation: PropTypes.oneOf([CAMPUS, ALL, GROUP]).isRequired
};

export default FeedSelectBox;
