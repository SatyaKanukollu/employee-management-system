import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-4">
          <img 
            src="https://www.oakgov.com/PublishingImages/logo.png" 
            alt="Oakland County Logo" 
            className="h-16"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">OAKLAND EVAL SYSTEM</h1>
            <p className="text-sm text-green-700 italic">All ways, MOVING FORWARD</p>
          </div>
        </div>
        
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;