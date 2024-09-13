import { GENERAL_MODAL, PAGE_MODAL, WRITE_MODAL } from '../constants';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type ButtonSize = 'small' | 'medium' | 'large';

export type DivisionVariant = 'primary' | 'secondary' | 'custom';
export type DivisionType = 'vertical' | 'horizontal' | 'horizontal_custom';

export type ModalType = typeof GENERAL_MODAL | typeof PAGE_MODAL | typeof WRITE_MODAL;

export type LogoSize = 'small' | 'medium' | 'large' | 'full';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}
export interface DivisionProps {
  variant?: DivisionVariant;
  type?: DivisionType;
  className?: string;
}

export interface ExtraInfo {
  [key: string]: any;
}
export interface LabeledWrapperProps {
  title: string;
  ExtraInfoElement?: React.ElementType;
  children: React.ReactNode;
  extraInfo?: ExtraInfo;
}

export interface BaseModalProps {
  modalType?: ModalType;
  title?: string;
  footer?: React.ReactNode;
  onClose?: () => void;
  hasCloseButton?: boolean;
  onBeforeClose?: () => Promise<boolean>;
  open?: boolean;
}

export interface ModalProps extends BaseModalProps {
  children: React.ReactNode;
}
export interface ProcessErrorModalProps extends BaseModalProps {}

export interface ProcessSuccessModalProps extends BaseModalProps {
  children: React.ReactNode;
}

export interface StepperProps {
  steps: string[];
  activeStep: number;
  activeColor?: string;
  completedColor?: string;
}

export interface ProfileImageProps {
  image?: string;
  hasShadow?: boolean;
}

export interface LogoProps {
  size?: LogoSize;
  to?: string;
}

export const MASCOT_IMAGES = {
  login: 'login-mascot.gif',
  error: 'error-mascot.gif',
  searchLoading: 'search-loading-mascot.png'
} as const;

export type MascotType = keyof typeof MASCOT_IMAGES;

export interface MascotImageProps {
  type: MascotType;
}
