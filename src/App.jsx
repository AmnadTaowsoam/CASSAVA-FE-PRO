import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import AuthProvider from './context/AuthContext';
import ProtectedRouteSUser from './components/common/ProtectedRouteSUser';
import ProtectedRouteUser from './components/common/ProtectedRouteUser';


const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Support = lazy(() => import('./pages/Support'));
const Logout = lazy(() => import('./pages/Logout'));
const Users = lazy(() => import('./pages/Users'));

// New component to handle redirection
const AuthRedirect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/'); // Make sure the route '/home' is defined in your Routes
    }
  }, [user, navigate]);

  return null; // This component does not render anything
};

function App() {
  return (
      <Router>
        <AuthProvider>
          <Nav />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/sign-in" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRouteUser><Home /></ProtectedRouteUser>} />
              <Route path="/support" element={<Support />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Suspense>
        </AuthProvider>
        
      </Router>
    
  );
}

export default App;