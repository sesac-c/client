import ContentHeader from '../../../common/layout/ContentHeader';
import { navIcons } from '../../../../assets/icon';

const page = '러닝메이트 활동 보고서 관리';
const breadcrumb = {
  homeIcon: navIcons.runningmate,
  breadcrumbTrail: ['러닝메이트 관리', page]
};
const ActivityReportList = () => {
  return <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page }} />;
};

export default ActivityReportList;
