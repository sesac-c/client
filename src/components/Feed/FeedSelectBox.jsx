import { FEED_INFO, FEED_SELECT_ITEMS, CAMPUS, ALL, GROUP } from "../../constants/routes.js";
import SelectBox from "../common/UI/SelectBox.jsx"
import PropTypes from 'prop-types';

const FeedSelectBox = ({currentLocation}) => {
    return <SelectBox 
            variant='feed' 
            options={FEED_SELECT_ITEMS} 
            selectedOption={`${FEED_INFO[currentLocation].name}`}
            size="feedSize"
        />
}

FeedSelectBox.propTypes = {
    currentLocation: PropTypes.oneOf([CAMPUS, ALL, GROUP]).isRequired,
};

export default FeedSelectBox;