import ContentHeader from '../../../common/layout/ContentHeader';
import { navIcon } from '../../../../assets/icon';

const page = '게시글 관리';
const breadcrumb = {
  homeIcon: navIcon.feed,
  breadcrumbTrail: ['피드 관리', page]
};
const PostList = () => {
  return <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page }} />;
};

export default PostList;
