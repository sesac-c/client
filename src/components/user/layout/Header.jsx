import PropTypes from 'prop-types';

import Logo from '@/components/common/layout/Logo';
import UserMenu from './menu/UserMenu';
import FeedMenu from './menu/FeedMenu';

import { FEED_ARR } from '@/routes/paths';

const Header = ({ currentLocation }) => {
  return (
    <header className='header-container'>
      <div className='header-inner'>
        <div className='feed-menu-area'>
          <div className='logo'>
            <span>
              <Logo size='full' />
            </span>
          </div>
          <div className='feed-menu'>
            <FeedMenu currentLocation={currentLocation} />
          </div>
        </div>
        <div className='user-menu-area' tabIndex={-1}>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentLocation: PropTypes.oneOf(FEED_ARR).isRequired
};

export default Header;
