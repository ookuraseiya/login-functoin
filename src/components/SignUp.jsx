import { app } from '../firebase/firebase';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const history = useNavigate();
  const [error, setError] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app.createUserWithEmailAndPassword(email.value, password.value);
      history.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <button>登録</button>
        </div>
        <div>
          ユーザ登録済の場合は<Link to={'/login'}>こちら</Link>から
        </div>
      </form>
    </div>
  );
};
