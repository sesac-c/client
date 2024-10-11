import {
  campusError,
  CampusFormState,
  courseError,
  CourseFormState,
  noticeError,
  NoticeFormState,
  restaurantError,
  RestaurantFormState,
  runningmateError,
  RunningmateFormState
} from './form';

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
export interface RegisterButtonProps {
  isFormValid: boolean;
}
export interface RegisterFormItem {
  label: string;
  name: string;
}
export interface RegisterFormProps {
  buttonText?: string;
  handleClick: () => void;
  form: JSX.Element;
  disabled: boolean;
}

export interface DialogProps {
  title: string;
  content?: string;
}

export interface RegisterInstanceModalProps {
  open: boolean;
  onClose: () => void;
  onFormHook: {
    state: any;
    errors: any;
    isFormValid: boolean;
    handleChange: (field: any, value: string) => void;
    handleRegister: () => void;
    validateForm: () => boolean;
  };
}
export interface RegisterModalProps extends RegisterInstanceModalProps {
  registerButtonText: string;
  submit: RegisterFormProps;
  dialog: DialogProps;
}

export interface RegisterFormFieldProps<T extends string> {
  name: T;
  label: string;
  value: string;
  onChange: (field: T, value: string) => void;
  error?: string;
}

export interface RegisterSelectorPropsOption {
  value: string;
  label: string;
}

export interface RegisterSelectorProps {
  title: string;
  value: string;
  options: RegisterSelectorPropsOption[];
  onChange: (value: string) => void;
  error?: string;
}

interface BasicRegisterFormProps extends RegisterButtonProps {
  onSubmit: () => Promise<void>;
}
interface BasicRegisterModalProps extends BasicRegisterFormProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface RestaurantRegisterFormProps extends BasicRegisterFormProps {
  state: RestaurantFormState;
  errors: restaurantError;
  onChange: (field: keyof RestaurantFormState, value: string) => void;
}
export interface RestaurantRegisterModalProps extends RestaurantRegisterFormProps, BasicRegisterModalProps {}

export interface CampusRegisterFormProps extends BasicRegisterFormProps {
  state: CampusFormState;
  errors: campusError;
  onChange: (field: keyof CampusFormState, value: string) => void;
}
export interface CampusRegisterModalProps extends CampusRegisterFormProps, BasicRegisterModalProps {}

export interface CourseRegisterFormProps extends BasicRegisterFormProps {
  state: CourseFormState;
  errors: courseError;
  onChange: (field: keyof CourseFormState, value: string) => void;
}
export interface CourseRegisterModalProps extends CourseRegisterFormProps, BasicRegisterModalProps {}

export interface NoticeRegisterFormProps extends BasicRegisterFormProps {
  state: NoticeFormState;
  errors: noticeError;
  onChange: (field: keyof NoticeFormState, value: string) => void;
}
export interface NoticeRegisterModalProps extends NoticeRegisterFormProps, BasicRegisterModalProps {}

export interface RunningmateRegisterFormProps extends BasicRegisterFormProps {
  state: RunningmateFormState;
  errors: runningmateError;
  onChange: (field: keyof RunningmateFormState, value: string) => void;
}
export interface RunningmateRegisterModalProps extends RunningmateRegisterFormProps, BasicRegisterModalProps {}
