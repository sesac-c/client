import { restaurantError, RestaurantFormState } from './form';

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

export interface RegisterFormFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (field: keyof RestaurantFormState, value: string) => void;
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

export interface RestaurantRegisterFormProps extends RegisterButtonProps {
  state: RestaurantFormState;
  errors: restaurantError;
  onChange: (field: keyof RestaurantFormState, value: string) => void;
  onSubmit: () => Promise<void>;
}
export interface RestaurantRegisterModalProps extends RestaurantRegisterFormProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}
