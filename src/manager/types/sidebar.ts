type loginUser = {
  role?: string;
  nickname: string;
};

export interface LoginUserProps {
  loginUser: loginUser | null;
}
