import { ReactElement, ReactNode } from 'react';
import { ARCHIVE_TYPE, GENERAL_MODAL, PAGE_MODAL, USER_TYPE, WRITE_MODAL } from '../constants';
import { ResetPasswordField, ResetPasswordState } from './findPassword';
import { FollowResponse, ProfileFormResponse, UserPostResponse } from './response';

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
export interface ProcessErrorModalProps extends BaseModalProps {
  content?: string;
}
export interface ConfirmModalProps extends BaseModalProps {
  children: ReactNode;
  confirmButtonText?: string;
  onClick: () => void;
}

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

type FormSubmitHandler = () => void;
type ButtonDisabledChecker = () => boolean;

export interface ResetPasswordFieldsProps {
  state: ResetPasswordState;
  onChange: (field: ResetPasswordField, value: string) => void;
}

export interface ResetPasswordFormProps extends ResetPasswordFieldsProps {
  onSubmit: FormSubmitHandler;
  isButtonDisabled: ButtonDisabledChecker;
}

export interface ResetPasswordLayoutProps {
  title: string;
  children: ReactNode;
  onSubmit: FormSubmitHandler;
  isButtonDisabled: boolean;
}

export interface GridItem {
  id: number;
  content: string;
}

export interface ProfileData {
  name: string;
  followers: number;
  following: number;
}

export interface ProfileLayoutHeaderProps {
  to: string;
  title: string;
  isProfileMine: boolean;
}
export interface ProfileLayoutProps {
  header: ProfileLayoutHeaderProps;
  children: React.ReactNode;
}
export type ArchiveType = (typeof ARCHIVE_TYPE)[keyof typeof ARCHIVE_TYPE];

export interface PostGridProps {
  posts: UserPostResponse[];
  archiveType: ArchiveType;
  profileId?: number;
  onIsModalClose: (isModalClose: boolean) => void;
}

export type OnCountUpdateFunction = (change: number) => void;

export interface FollowUserListProps {
  users: FollowResponse[];
  onFollowToggle: (userId: number) => void;
  onDelete?: (userId: number) => void;
  onClose: () => void;
  isProfileMine: boolean;
  isFollowing: boolean;
  isLoading: boolean;
}

export interface FollowListModalProps {
  open: boolean;
  handleClose: () => void;
  userId: number;
  isFollower: boolean;
  title: string;
  isProfileMine: boolean;
  onCountUpdate: OnCountUpdateFunction;
}

export interface RelationListButtonProps {
  title: string;
  num: number;
  onOpen: () => void;
}

export interface FollowListButtonProps {
  userId: number;
  num: number;
  onCountUpdate: OnCountUpdateFunction;
}

export interface FollowingListButtonProps extends FollowListButtonProps {
  isProfileMine: boolean;
}

export interface SettingsContentLayoutProps {
  title: string;
  form: ReactElement;
  buttonText?: string;
  onSubmit: FormSubmitHandler;
  isButtonDisabled: boolean;
}
export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export interface UpdateProfileFormProps extends ProfileFormResponse {
  userType: UserType;
}

export type SideMenuItems = { name: string; to: string }[];

export interface SideMenuItemProps {
  title: string;
  items: SideMenuItems;
}

export type SideMenuPage = 'group' | 'settings';

export interface SideMenuProps {
  page: SideMenuPage;
  menu: SideMenuItemProps[];
}
