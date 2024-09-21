// Shared types
interface Breadcrumb {
  homeIcon: JSX.Element;
  breadcrumbTrail: string[];
}

// ContentHeader related types
interface PageInfo {
  page: string;
  register?: JSX.Element;
}

export interface ContentHeaderProps {
  breadcrumb: Breadcrumb;
  pageInfo: PageInfo;
}

// RegisterModal related types
export interface RegisterFormItem {
  label: string;
  name: string;
}
export interface RegisterFormProps {
  buttonText?: string;
  handleClick: (event?: React.FormEvent<HTMLFormElement>) => void;
  form: JSX.Element;
}

export interface DialogProps {
  title: string;
  content?: string;
}

export interface RegisterModalProps {
  registerButtonText: string;
  submit: RegisterFormProps;
  dialog: DialogProps;
}

export interface RegisterInstanceModalProps {
  handleClick: (event?: React.FormEvent<HTMLFormElement>) => void;
}
