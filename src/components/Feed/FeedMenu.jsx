import { NavLink } from "react-router-dom";
import { FEED_INFO, CAMPUS, ALL, GROUP } from "../../constants/routes.js"
import FeedSelectBox from "./FeedSelectBox.jsx";
import PropTypes from 'prop-types';

const FeedMenu = ({ currentLocation }) => {
    const menuList = FEED_INFO[currentLocation].menuList;

    return (
        <div className="feed-menu">
            <nav>
                <ul>
                    <li className="feed-select-container">
                        <FeedSelectBox currentLocation={currentLocation} />
                    </li>
                    {menuList.map(({ title, path }) => (
                        <li key={title} className="feed-menu-container">
                            <NavLink
                                end
                                className={({ isActive }) =>
                                    isActive ? 'feed-menu-link active' : 'feed-menu-link'
                                }
                                to={path}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}


FeedMenu.propTypes = {
    currentLocation: PropTypes.oneOf([CAMPUS, ALL, GROUP]).isRequired,
};

export default FeedMenu;