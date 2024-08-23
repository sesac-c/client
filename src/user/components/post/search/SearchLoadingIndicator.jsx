import MascotImage from '../../../../common/components/common/layout/MascotImage';

const SearchLoadingIndicator = () => {
  return (
    <div className='post-search-loading-indicator'>
      <div className='post-search-loading-indicator__image'>
        <MascotImage type='searchLoading' />
      </div>
      <p>검색어를 기다리는 중...</p>
    </div>
  );
};

export default SearchLoadingIndicator;
