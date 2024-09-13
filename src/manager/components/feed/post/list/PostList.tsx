import ContentHeader from '../../../common/layout/ContentHeader';
import { navIcons } from '../../../../assets/icon';

const page = '게시글 관리';
const breadcrumb = {
  homeIcon: navIcons.feed,
  breadcrumbTrail: ['피드 관리', page]
};
const PostList = () => {
  return <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page }} />;
};

export default PostList;
