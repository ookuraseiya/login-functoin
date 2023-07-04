import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export const PublicPage = ({ children }) => {
  const { user } = useAuthContext();
  return !user ? children : <Navigate to="/" />;
};
