import { useEffect, useState, useRef } from 'react';
import { useModal } from '../../../../common/hooks/useModal';
import ModifyPostModal from '../modify/ModifyPostModal';

const PostDropdownMenu = () => {
  const { openModal, closeModal, isOpen } = useModal(() => <ModifyPostModal onClose={closeModal} />);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='postdatil__dropdown page' ref={menuRef}>
      <button onClick={toggleMenu}>더보기</button>
      {showMenu && (
        <ul className='options-menu'>
          <li>
            <button onClick={openModal}>수정하기</button>
          </li>
          <li>
            <button onClick={() => console.log('삭제하기')}>삭제하기</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default PostDropdownMenu;
