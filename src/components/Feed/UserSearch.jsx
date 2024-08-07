import PropTypes from 'prop-types';
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/16/solid";
import UserItem from './UserItem.jsx';

const UserSearch = ({
    users,
    searchInputPlaceholder,
    title,
    noSearchContent,
    buttonText
}) => {
    function handleButtonClick(onClickUrl) {
        // onClickUrl props로 이벤트 핸들링.
    }
    return (
        <div className="user-search">
            <div className="user-search__search-container">
                <div className="user-search__search-bar">
                    <SearchIcon className="user-search__search-icon" />
                    <input type="text" placeholder={searchInputPlaceholder} className="user-search__search-input" />

                </div>
                <h2 className="user-search__title">{title}</h2>
            </div>
            <div className="user-search__content">
                {
                    (users === undefined || users.length < 0) ? (
                        <p className='text-center text-description pt-3'>
                            {noSearchContent}
                        </p>
                    ) : (
                        <>

                            <ul className="user-search__user-list">
                                {
                                    users.map((user, index) => (
                                        <UserItem key={index} user={{
                                            nickname: user.nickname,
                                            description: user.course || user.address || undefined,
                                            profileImageUrl: user.profileImageUrl,
                                            buttonText,
                                            onClick: () => handleButtonClick(user.onClickUrl)
                                        }} />
                                    ))
                                }
                            </ul>
                        </>
                    )
                }
            </div>
        </div>
    );
};

UserSearch.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            nickname: PropTypes.string.isRequired,
            profileImageUrl: PropTypes.string,
            onClickUrl: PropTypes.string
        })
    ),
    searchInputPlaceholder: PropTypes.string,
    title: PropTypes.string,
    noSearchContent: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired
};

export default UserSearch;