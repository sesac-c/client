// ============================ component: ContentHeader
interface Breadcrumb {
  homeIcon: JSX.Element;
  breadcrumbTrail: string[];
}

interface PageInfo {
  page: String;
  button?: {
    buttonText?: String;
    buttonIcon?: JSX.Element;
    buttonOnclick?: () => void;
  };
}
export interface ContentHeaderProps {
  breadcrumb: Breadcrumb;
  pageInfo: PageInfo;
}
