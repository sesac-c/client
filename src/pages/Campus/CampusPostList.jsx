import FeedWrapper from "../../components/Feed/FeedWrapper.jsx";
import ColumnLayoutWrapper from "../../components/common/layout/ColumnLayoutWrapper.jsx";
import Posts from "../../components/Feed/Posts.jsx";
import UserSearch from "../../components/Feed/UserSearch.jsx";
import Carousel from "../../components/Feed/Carousel.jsx";
import { dummyNoticesData } from "../../assets/mockData/notice.js";

const CampusPostListPage = () => {
    return (
        <FeedWrapper 
            boardContent={
            <Carousel
                items={dummyNoticesData}
                title='최신 공지'
            />
        }>
            <ColumnLayoutWrapper
                mainArea={<Posts />}
                rightSide={<UserSearch/>}
            />
        </FeedWrapper>
    )
}
export default CampusPostListPage;