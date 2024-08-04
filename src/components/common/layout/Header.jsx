import Logo from "./Logo.jsx";
import UserMenu from './UserMenu.jsx';
import FeedMenu from '../../Feed/FeedMenu.jsx'
import PropTypes from 'prop-types';
import { CAMPUS, ALL, GROUP } from "../../../constants/routes.js";

const Header = ({
    currentLocation
}) => {
    return (
        <header className="header-container">
            <div className="header-inner">
                <div className="feed-menu-area">
                    <div className="logo">
                        <span >
                            <Logo size='full' />
                        </span>
                    </div>
                    <div className="feed-menu">
                        <FeedMenu currentLocation={currentLocation} />
                    </div>
                </div>
                <div className="user-menu-area" tabIndex={-1}>
                    <UserMenu />
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    currentLocation: PropTypes.oneOf([CAMPUS, ALL, GROUP]).isRequired,
};

export default Header; 