import PropTypes from 'prop-types';

import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/16/solid';
import useSearchPostStore from '@/stores/searchPostStore';
import MascotImage from '@/components/common/layout/MascotImage';

export const SearchLoadingIndicator = () => {
  return (
    <div className='post-search-loading-indicator'>
      <div className='post-search-loading-indicator__image'>
        <MascotImage type='searchLoading' />
      </div>
      <p>검색어를 기다리는 중...</p>
    </div>
  );
};
const PostSearchBar = ({ onInputChange }) => {
  const { keyword, setKeyword } = useSearchPostStore();

  const handleChange = event => {
    onInputChange(event.target.value);
    setKeyword(event.target.value);
  };

  return (
    <div className='post-search-bar'>
      <div className='post-search-bar__container'>
        <div className='post-search-bar__input-wrapper'>
          <input
            type='text'
            className='post-search-bar__input'
            placeholder='어떤 게시물을 찾고 계신가요?'
            value={keyword}
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
