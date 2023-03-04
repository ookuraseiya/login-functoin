//リダイレクト関数が非推奨になっているから、リダイレクト関数の代わりにナビゲート関数を使用
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
export const PrivatePage = ({ children }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/login" />;
};
