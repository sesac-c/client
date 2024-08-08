import PropTypes from 'prop-types';
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/16/solid';

const PostSearchBar = ({ onInputChange }) => {
    const handleChange = (event) => {
        onInputChange(event.target.value);
    };
    return (
        <div className="post-search-bar">
            <div className="post-search-bar__container">
                <div className="post-search-bar__input-wrapper">
                    <input
                        type="text"
                        className="post-search-bar__input"
                        placeholder="어떤 게시물을 찾고 계신가요?"
                        onChange={handleChange}
                    />
                    <SearchIcon className="post-search-bar__icon" />
                </div>
            </div>
        </div>
    );
};


PostSearchBar.propTypes = {
    onInputChange: PropTypes.func.isRequired,
};

export default PostSearchBar;