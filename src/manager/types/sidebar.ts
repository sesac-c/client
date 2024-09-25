type loginUser = {
  role?: string;
  nickname: string;
};

// 메뉴 아이템 기본 타입
export interface BaseMenuItem {
  title: string;
  path: string;
}

// 아이콘이 있는 메뉴 아이템
export interface MenuItemWithIcon extends BaseMenuItem {
  icon?: React.ReactNode;
}

// 자식 메뉴가 있는 메뉴 아이템
export interface MenuItemWithChildren extends MenuItemWithIcon {
  children?: MenuItemWithChildren[];
}

// 네비게이션 아이콘 키 타입
export type NavIconKey = keyof typeof navIcons;

// 하단 버튼 그룹 메뉴 아이템
export type BottomButtonGroupMenuItem = BaseMenuItem & {
  icon: NavIconKey;
};

// 클릭 핸들러 타입
export type MenuItemClickHandler = (title: string, path: string) => void;

// 공통 props
interface CommonProps {
  isActive: boolean;
  onItemClick: MenuItemClickHandler;
}

// 컴포넌트별 props
export interface LoginUserProps {
  loginUser: User | null;
}

export interface MenuItemProps extends CommonProps {
  item: MenuItemWithChildren;
}

export interface NestedMenuItemProps extends MenuItemProps {
  defaultExpanded: boolean;
}

export interface TogglerProps {
  defaultExpanded: boolean;
  renderToggle: (params: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode;
  children: React.ReactNode;
}

export interface MainMenuListProps {
  activeItem: string | null;
  expandedItems: Set<string>;
  handleMenuItemClick: MenuItemClickHandler;
  toggleExpanded: (title: string) => void;
}

export interface BottomButtonGroupMenuProps {
  activeItem: string | null;
  handleMenuItemClick: MenuItemClickHandler;
  handleLogout: () => void;
  loginUser: User;
}

export interface SideMenuProps extends MainMenuListProps, BottomButtonGroupMenuProps {
  listItemButtonClasses: {
    root: string;
  };
}
