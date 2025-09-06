import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Authentication from './pages/Authentication';
import Login from './components/core/Authentication/Login';
import Signup from './components/core/Authentication/Signup';
import Forgot_password from './components/core/Authentication/Forgot_password';
import ConfirmationPage from './components/core/Authentication/ConfirmationPage';
import ChangePassword from './components/core/Authentication/ChangePassword';
import UpdatePassword from './components/core/Authentication/UpdatePassword';
import VerifyEmail from './components/core/Authentication/VerifyEmail';
import Contest from './pages/Contest';
import { useSelector } from 'react-redux';
import Error from './pages/Error';
import { RootState } from './reducers';
import ProtectedRoute from './middleware/ProtectRoute';
import CompleteProfileForm from './pages/CompleteProfileForm';

function App() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col items-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Authentication />}>
          <Route path="/authentication/login" element={<Login />} />
          <Route path="/authentication/signup" element={<Signup />} />
          <Route
            path="/authentication/update-password/:token"
            element={<UpdatePassword />}
          />
          <Route
            path="/authentication/change-password"
            element={<ChangePassword />}
          />
          <Route
            path="/authentication/verify-email"
            element={<VerifyEmail />}
          />
          <Route
            path="/authentication/forgot-password"
            element={<Forgot_password />}
          />
          <Route
            path="/authentication/confirmation-page"
            element={<ConfirmationPage />}
          />
        </Route>
        <Route
          path="/contest"
          element={
            <ProtectedRoute>
              <Contest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute>
              <CompleteProfileForm />
            </ProtectedRoute>
          }
        />
        <Route path="/complete-profile" element={<CompleteProfileForm />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
