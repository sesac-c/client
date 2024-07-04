import FeedWrapper from "../../components/Feed/FeedWrapper.jsx";
import ThreeColumnLayoutWrapper from "../../components/common/layout/ThreeColumnLayoutWrapper.jsx";
import Posts from "../../components/Feed/Posts.jsx";

const CampusPostListPage = () => {
    return (
        <FeedWrapper boardContent={<>boardContent</>}>
            <ThreeColumnLayoutWrapper
                leftSide='left-side'
                mainArea={<Posts />}
                rightSide='right-side'
            />
        </FeedWrapper>
    )
}
export default CampusPostListPage;