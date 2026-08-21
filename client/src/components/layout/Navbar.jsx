import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, LayoutDashboard, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-surface-container-lowest/80 backdrop-blur-md border-b border-surface-variant sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <span>VividSaaS</span>
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-on-surface hover:text-primary hover:bg-surface-container-low transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-on-surface hover:text-primary hover:bg-surface-container-low transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Profile ({user?.fullName?.split(' ')[0]})</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-error hover:bg-error-container/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-primary hover:text-primary-container transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/"
                className="gradient-btn px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm"
              >
                Create Account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
