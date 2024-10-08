import PropTypes from 'prop-types';

import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/16/solid';
import useSearchPostStore from '@/user/store/searchPostStore';
import { useEffect } from 'react';

const PostSearchBar = ({ onInputChange }) => {
  const { keyword, setKeyword } = useSearchPostStore();

  const handleChange = async event => {
    await setKeyword(event.target.value);
  };

  useEffect(() => {
    onInputChange(keyword);
  }, [keyword]);

  return (
    <div className='post-search-bar'>
      <div className='post-search-bar__container'>
        <div className='post-search-bar__input-wrapper'>
          <input
            type='text'
            className='post-search-bar__input'
            placeholder='어떤 게시물을 찾고 계신가요?'
            onChange={handleChange}
          />
          <SearchIcon className='post-search-bar__icon' />
        </div>
      </div>
    </div>
  );
};

PostSearchBar.propTypes = {
  onInputChange: PropTypes.func.isRequired
};

export default PostSearchBar;
