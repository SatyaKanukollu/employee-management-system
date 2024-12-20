import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, ClipboardList, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const links = [
    { icon: <Home />, text: 'Dashboard', path: '/' },
    { icon: <Users />, text: 'Employees', path: '/employees' },
    { icon: <ClipboardList />, text: 'Evaluations', path: '/evaluations' },
    { icon: <Settings />, text: 'Settings', path: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6">
      <div className="flex items-center gap-3 mb-8">
        <ClipboardList className="w-8 h-8 text-blue-400" />
        <h1 className="text-xl font-bold">OAKLAND EVAL SYSTEM</h1>
      </div>
      
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              location.pathname === link.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            {React.cloneElement(link.icon, { className: 'w-5 h-5' })}
            <span>{link.text}</span>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-6 left-6">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;