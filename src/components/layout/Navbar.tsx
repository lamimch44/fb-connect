import React from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOnboarding } from '../../context/OnboardingContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { currentStep } = useOnboarding();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Don't show navbar on login screen
  if (currentStep === 'login') return null;
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">FB</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">BusinessConnect</span>
            </div>
          </div>
          
          {isAuthenticated && (
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <div className="flex items-center">
                {user?.profilePicture && (
                  <img 
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.profilePicture}
                    alt={user.name}
                  />
                )}
                <span className="ml-2 text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
              
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            </div>
          )}
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && isAuthenticated && (
        <div className="sm:hidden bg-white border-t border-gray-200 animate-fadeIn">
          <div className="pt-2 pb-3 space-y-1">
            <div className="flex items-center px-4 py-2">
              {user?.profilePicture && (
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={user.profilePicture}
                  alt={user.name}
                />
              )}
              <span className="ml-2 text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
            
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;