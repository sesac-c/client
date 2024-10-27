import { useNavigate } from "react-router-dom";

export const useNavigateHandler = (path) => {
  const navigate = useNavigate();
  return () => navigate(path);
};