import FeedWrapper from "../../components/Feed/FeedWrapper.jsx";
import ColumnLayoutWrapper from "../../components/common/layout/ColumnLayoutWrapper.jsx";
import Posts from "../../components/Feed/Posts.jsx";
import UserSearch from "../../components/Feed/UserSearch.jsx";

const CampusPostListPage = () => {
    return (
        <FeedWrapper boardContent={<>boardContent</>}>
            <ColumnLayoutWrapper
                mainArea={<Posts />}
                rightSide={<UserSearch/>}
            />
        </FeedWrapper>
    )
}
export default CampusPostListPage;