import ContentHeader from '../../../common/layout/ContentHeader';
import { navIcon } from '../../../../assets/icon';

const page = '러닝메이트 활동 보고서 관리';
const breadcrumb = {
  homeIcon: navIcon.runningmate,
  breadcrumbTrail: ['러닝메이트 관리', page]
};
const ActivityReportList = () => {
  return <ContentHeader breadcrumb={breadcrumb} pageInfo={{ page }} />;
};

export default ActivityReportList;
