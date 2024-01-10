import { Routes, Route, useLocation } from 'react-router-dom';
import PersonalPage from './pages/Personal';
import BusinessPage from './pages/Business';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path={currentRoute}
          element={
            currentRoute === '/' ? (
              <PersonalPage />
            ) : currentRoute === '/business' ? (
              <BusinessPage />
            ) : (
              ''
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
