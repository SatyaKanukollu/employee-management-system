import React from 'react';
import { Bell, Lock, User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEmployees } from '../contexts/EmployeeContext';

const Settings = () => {
  const { user } = useAuth();
  const { updateEmployee } = useEmployees();

  const handleUpdateProfile = async () => {
    alert('Profile update functionality will be implemented here');
  };

  const handleChangePassword = async () => {
    alert('Password change functionality will be implemented here');
  };

  const handleUpdateNotifications = async () => {
    alert('Notification preferences will be implemented here');
  };

  const handleUpdateSecurity = async () => {
    alert('Security settings will be implemented here');
  };

  const sections = [
    {
      title: 'Profile Settings',
      icon: User,
      settings: [
        { 
          name: 'Update Profile Information',
          description: 'Change your name, email, and other personal details',
          action: handleUpdateProfile
        },
        { 
          name: 'Change Password',
          description: 'Update your password for security',
          action: handleChangePassword
        },
      ]
    },
    {
      title: 'Notification Preferences',
      icon: Bell,
      settings: [
        { 
          name: 'Email Notifications',
          description: 'Configure when you receive email notifications',
          action: handleUpdateNotifications
        },
      ]
    },
    {
      title: 'Security',
      icon: Lock,
      settings: [
        { 
          name: 'Two-Factor Authentication',
          description: 'Add an extra layer of security to your account',
          action: handleUpdateSecurity
        },
      ]
    },
  ];

  // Only show admin sections for admin users
  const adminSections = [
    {
      title: 'Admin Controls',
      icon: Shield,
      settings: [
        { 
          name: 'Role Management',
          description: 'Configure user roles and permissions',
          action: () => alert('Role management will be implemented here')
        },
      ]
    },
  ];

  const displaySections = user?.role === 'admin' 
    ? [...sections, ...adminSections]
    : sections;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displaySections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            <div className="space-y-4">
              {section.settings.map((setting) => (
                <div key={setting.name} className="border-t pt-4">
                  <h4 className="text-sm font-medium">{setting.name}</h4>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                  <button 
                    onClick={setting.action}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 px-4 py-2 border border-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;