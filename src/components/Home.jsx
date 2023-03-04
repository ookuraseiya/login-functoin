import { app } from '../firebase/firebase';
//useHistoryは使えなくなったっぽい。代わりにuseNavigate
import { useNavigate } from 'react-router-dom';
// import { Login } from './Login';

// import { useAuthContext } from '../context/AuthContext';

export const Home = () => {
  const history = useNavigate();
  const handleLogout = () => {
    app.signOut();
    history.push('/login');
  };

  return (
    <div>
      <h1>ホームページ</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};
