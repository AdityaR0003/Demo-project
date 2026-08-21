import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShaderBackground from '../components/canvas/ShaderBackground';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-surface relative overflow-hidden text-center">
      <ShaderBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/75 to-secondary/75 mix-blend-multiply z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 glass-panel rounded-3xl p-8 sm:p-12 max-w-lg w-full text-white shadow-glass"
      >
        <div className="text-7xl sm:text-8xl font-black tracking-widest mb-2 text-white drop-shadow-md">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3">Page Not Found</h1>
        <p className="text-primary-fixed-dim text-sm sm:text-base leading-relaxed mb-8">
          The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="gradient-btn px-6 py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Go to Signup</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
