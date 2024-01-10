import { Routes, Route, useLocation } from 'react-router-dom';
import PersonalPage from './pages/Personal';
import BusinessPage from './pages/Business';

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <>
      <Routes>
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
