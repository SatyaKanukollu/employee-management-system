import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import DemoAccounts from '../components/auth/DemoAccounts';

const Login = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <Building className="mx-auto h-12 w-12 text-green-700" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">OAKLAND EVAL SYSTEM</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}

        <LoginForm onSubmit={handleLogin} />
        <DemoAccounts />
      </div>
    </div>
  );
};

export default Login;