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

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
