import { useEffect, useState, useRef } from 'react';
import { useModal } from '../../../../common/hooks';
import ModifyPostModal from '../modify/ModifyPostModal';
import { postsCampusDelete } from '../../../services/api/posts';
import { CAMPUS_PATH, CAMPUS_CHILDREN_PATH } from '../../../../common/constants';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 import 합니다.

const PostDropdownMenu = ({ post }) => {
  const navigate = useNavigate();
  const { openModal, closeModal, isOpen } = useModal(() => <ModifyPostModal post={post} onClose={closeModal} />);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const deleteConfirm = async (event, postId) => {
    event.preventDefault();
    event.stopPropagation();
    const result = confirm('정말 게시글을 삭제하시겠습니까?');

    if (result) {
      try {
        await postsCampusDelete(postId);
        navigate(`/${CAMPUS_PATH}/${CAMPUS_CHILDREN_PATH.postList}`);
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
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
            <button onClick={e => deleteConfirm(e, post.id)}>삭제하기</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default PostDropdownMenu;
