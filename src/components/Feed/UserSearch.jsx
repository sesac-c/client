import PropTypes from 'prop-types';
import { dummyUserData } from '../../assets/mockData/userSearch.js';
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/16/solid";
import UserItem from './UserItem.jsx';

const UserSearch = ({ users = dummyUserData }) => {//TODO: dummyUserData 실제 데이터로
    function handleButtonClick(onClickUrl) {
        // onClickUrl props로 이벤트 핸들링.
    }
    return (
        <div className="user-search">
            <div className="user-search__search-container">
                <div className="user-search__search-bar">
                    <SearchIcon className="user-search__search-icon" />
                    <input type="text" placeholder="캠퍼스 회원 검색" className="user-search__search-input" />
                
                </div>
                <h2 className="user-search__title">회원님을 위한 추천</h2>
            </div>
            <div className="user-search__content">
                {
                    (users === undefined || users.length < 0) ? (
                        <p className='text-center text-description pt-3'>
                            일치하는 회원이 없습니다.
                        </p>
                    ) : (
                        <>

                            <ul className="user-search__user-list">
                                {
                                    users.map((user, index) => (
                                        <UserItem key={index} user={{
                                            nickname: user.nickname,
                                            description: user.course,
                                            profileImageUrl: user.profileImageUrl,
                                            buttonText: '팔로우',
                                            onClick: ()=> handleButtonClick(user.onClickUrl)
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
            course: PropTypes.string.isRequired,
            profileImageUrl: PropTypes.string,
            buttonText: PropTypes.string.isRequired,
            onClickUrl: PropTypes.string.isRequired,
        })
    )
};

export default UserSearch;