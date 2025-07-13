import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Authentication from './pages/Authentication';
import Login from './components/core/Authentication/Login';
import Signup from './components/core/Authentication/Signup';

function App() {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col items-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Authentication />}>
          <Route path="/authentication/login" element={<Login />} />
          <Route path="/authentication/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
