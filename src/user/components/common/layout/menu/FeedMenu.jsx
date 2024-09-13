import { memo, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { useModal } from '../../../../../common/hooks/useModal.js';

import PropTypes from 'prop-types';

import FeedSelectBox from './FeedSelectBox.jsx';
import WritePostModal from '../../../post/write/WritePostModal';

import { FEED_INFO, FEED_ARR } from '../../../../../common/constants';

const FeedMenu = ({ currentLocation }) => {
  const menuList = useMemo(() => FEED_INFO[currentLocation].menuList, [currentLocation]);

  const { openModal, closeModal, isOpen } = useModal(() => <WritePostModal onClose={closeModal} />);

  const renderMenuItem = useCallback(
    ({ title, path }) => {
      if (path) {
        return (
          <li key={title} className='feed-menu-container'>
            <NavLink className={({ isActive }) => `feed-menu-link${isActive ? ' active' : ''}`} to={path}>
              {title}
            </NavLink>
          </li>
        );
      }
      return (
        <li key={title} className='feed-menu-container'>
          <a className='feed-menu-link' onClick={openModal}>
            {title}
          </a>
        </li>
      );
    },
    [openModal]
  );

  return (
    <div className='feed-menu'>
      <nav>
        <ul>
          <li className='feed-select-container'>
            <FeedSelectBox currentLocation={currentLocation} />
          </li>
          {menuList.map(renderMenuItem)}
        </ul>
      </nav>
    </div>
  );
};

FeedMenu.propTypes = {
  currentLocation: PropTypes.oneOf(FEED_ARR).isRequired
};

export default memo(FeedMenu);
