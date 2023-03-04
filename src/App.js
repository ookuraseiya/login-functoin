import { Home } from './components/Home';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivatePage } from './components/redirect/PrivatePage';
import { PublicPage } from './components/redirect/PublicPage';

export default function App() {
  return (
    <AuthProvider>
      <div style={{ margin: '2em' }}>
        <BrowserRouter>
          <Routes>
            {/* ワンちゃんrouteをmapで回してみたいかも */}
            <Route
              path="/"
              element={
                <PrivatePage>
                  <Home />
                </PrivatePage>
              }
            />
            <Route
              path="/login"
              element={
                <PublicPage>
                  <Login />
                </PublicPage>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicPage>
                  <SignUp />
                </PublicPage>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

//<Route ~~ component={~~} />のcomponent={~~}の部分はelement={<~~ />}に書き換え
