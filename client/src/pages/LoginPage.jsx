import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ShaderBackground from '../components/canvas/ShaderBackground';
import ThreeInteractiveScene from '../components/canvas/ThreeInteractiveScene';
import { Zap, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || loading) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await login(formData.email, formData.password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg(res.message || 'Invalid email or password.');
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || 'Failed to sign in. Please verify your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 lg:p-8 bg-surface relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[1400px] flex flex-col lg:flex-row bg-surface-container-lowest rounded-3xl overflow-hidden shadow-glass border border-surface-variant my-auto"
      >
        {/* Left Visual Section */}
        <div className="w-full lg:w-[58%] relative p-8 lg:p-16 flex flex-col justify-between min-h-[380px] lg:min-h-[700px] overflow-hidden text-white">
          <ShaderBackground />
          <ThreeInteractiveScene />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/75 to-secondary/75 mix-blend-multiply z-0 pointer-events-none" />

          <div className="relative z-10">
            <div className="text-2xl font-bold mb-8 text-white tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span>VividSaaS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              Welcome back to your workspace.
            </h1>

            <p className="text-lg text-primary-fixed-dim max-w-md font-normal leading-relaxed">
              Log in to access your custom dashboards, real-time analytics, and collaborative workflow tools.
            </p>
          </div>

          <div className="relative z-10 glass-panel rounded-2xl p-6 mt-8 max-w-lg">
            <p className="text-white text-sm leading-relaxed">
              "VividSaaS transformed how our engineering team builds and deploys products. Lightning fast and beautiful."
            </p>
            <div className="mt-3 font-semibold text-xs text-primary-fixed">
              — Alex Rivera, VP of Engineering
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-[42%] bg-surface-container-lowest p-8 lg:p-14 flex flex-col justify-center relative z-10">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-on-surface mb-1 tracking-tight">Sign In</h2>
            <p className="text-on-surface-variant mb-8 text-sm">Welcome back! Please enter your details.</p>

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-3 rounded-xl bg-error-container text-error border border-error/20 flex items-center gap-2.5 text-sm"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field w-full rounded-xl border-0 py-3 px-4 text-on-surface text-sm placeholder:text-outline focus:outline-none"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-on-surface uppercase tracking-wider" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field w-full rounded-xl border-0 py-3 pl-4 pr-11 text-on-surface text-sm placeholder:text-outline focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={!formData.email || !formData.password || loading}
                className="gradient-btn w-full mt-8 py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-on-surface-variant mt-8">
              Don't have an account?{' '}
              <Link to="/" className="text-primary font-semibold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
