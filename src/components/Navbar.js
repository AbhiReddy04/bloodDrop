import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Moon, 
  Sun, 
  Globe, 
  Menu, 
  X, 
  Heart,
  User,
  LogOut
} from 'lucide-react';

function Navbar({ onAuthClick }) {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', key: 'nav.home' },
    { path: '/donors', key: 'nav.donorList' },
    { path: '/become-donor', key: 'nav.becomeDonor' },
    { path: '/stories', key: 'nav.stories' },
    { path: '/awareness', key: 'nav.awareness' },
    { path: '/contact', key: 'nav.contact' }
  ];

  // Do not add a separate Admin nav item to avoid duplication with the profile button.

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="content-section sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-red-600">BloodDrop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-red-600 ${
                  isActive(item.path) 
                    ? 'text-red-600 border-b-2 border-red-600 pb-1' 
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                {item.label ? item.label : t(item.key)}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language toggle removed per request */}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to={user.isAdmin ? '/admin' : '/profile'}>
                      <Button variant="ghost" size="sm" className="hidden sm:flex">
                        <User className="w-4 h-4 mr-2" />
                        {user.isAdmin ? 'Admin' : user.name}
                      </Button>
                    </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="hidden sm:flex text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={onAuthClick}
                className="hidden sm:flex bg-red-600 hover:bg-red-700"
              >
                <User className="w-4 h-4 mr-2" />
                {t('nav.login')}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-red-50 text-red-600 dark:bg-red-900/20'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                >
                  {item.label ? item.label : t(item.key)}
                </Link>
              ))}
              
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </Button>
              </div>

              {user ? (
                <div className="pt-2 border-t">
                  <Link 
                    to={user.isAdmin ? '/admin' : '/profile'} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600"
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    {user.isAdmin ? 'Admin' : user.name}
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('nav.logout')}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    onAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {t('nav.login')}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;