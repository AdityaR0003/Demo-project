import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ShaderBackground from '../components/canvas/ShaderBackground';
import ThreeInteractiveScene from '../components/canvas/ThreeInteractiveScene';
import { Shield, Sliders, Zap, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState({});

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorMsg('');
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Email Regex Validation
  const isEmailValid = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  }, [formData.email]);

  // Password Strength Evaluator (0 to 3)
  const passwordStrength = useMemo(() => {
    const pass = formData.password;
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (pass.length >= 10 && /[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  }, [formData.password]);

  const passwordsMatch = useMemo(() => {
    return formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword;
  }, [formData.password, formData.confirmPassword]);

  const isFormValid = useMemo(() => {
    return (
      formData.fullName.trim().length > 0 &&
      isEmailValid &&
      passwordStrength >= 1 &&
      passwordsMatch &&
      formData.acceptTerms
    );
  }, [formData, isEmailValid, passwordStrength, passwordsMatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await register(formData.fullName, formData.email, formData.password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setErrorMsg(res.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || 'Server error during registration. Please check database connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-6 lg:p-8 bg-surface relative overflow-hidden">
      {/* Container matching 1400px Stitch split layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[1400px] flex flex-col lg:flex-row bg-surface-container-lowest rounded-3xl overflow-hidden shadow-glass border border-surface-variant my-auto"
      >
        {/* Left Visual Section (58%) */}
        <div className="w-full lg:w-[58%] relative p-8 lg:p-16 flex flex-col justify-between min-h-[420px] lg:min-h-[760px] overflow-hidden text-white">
          {/* WebGL Shader Canvas Background */}
          <ShaderBackground />

          {/* 3D Interactive Floating Geometries Overlay */}
          <ThreeInteractiveScene />

          {/* Dark Gradient Tint Overlay for optimal text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/75 to-secondary/75 mix-blend-multiply z-0 pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-2xl font-bold mb-8 text-white tracking-tight flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span>VividSaaS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight"
            >
              Create your account and get started.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg text-primary-fixed-dim max-w-md font-normal leading-relaxed"
            >
              Join thousands of innovators using VividSaaS to accelerate their workflow and build incredible experiences.
            </motion.p>
          </div>

          {/* Feature Glass Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative z-10 glass-panel rounded-2xl p-6 mt-8 space-y-5 max-w-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-container/30 flex items-center justify-center text-primary-fixed">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">Fast & Secure</h3>
                <p className="text-sm text-primary-fixed-dim">Enterprise-grade infrastructure.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary-fixed">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">Personalized Experience</h3>
                <p className="text-sm text-primary-fixed-dim">Tailored to your unique workflow.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/30 flex items-center justify-center text-tertiary-fixed">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">Easy to Get Started</h3>
                <p className="text-sm text-primary-fixed-dim">Up and running in under a minute.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Form Section (42%) */}
        <div className="w-full lg:w-[42%] bg-surface-container-lowest p-8 lg:p-14 flex flex-col justify-center relative z-10">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-on-surface mb-1 tracking-tight">Get Started</h2>
            <p className="text-on-surface-variant mb-6 text-sm">Create your free account today.</p>

            {/* Social Registration */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors text-on-surface text-sm font-semibold"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-outline-variant hover:bg-surface-container-low transition-colors text-on-surface text-sm font-semibold"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-outline-variant/50"></div>
              <span className="flex-shrink-0 mx-3 text-outline text-xs uppercase tracking-wider font-semibold">
                Or continue with email
              </span>
              <div className="flex-grow border-t border-outline-variant/50"></div>
            </div>

            {/* Error Notification Alert */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 p-3 rounded-xl bg-error-container text-error border border-error/20 flex items-center gap-2.5 text-sm"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1 uppercase tracking-wider" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('fullName')}
                  className="input-field w-full rounded-xl border-0 py-2.5 px-4 text-on-surface text-sm placeholder:text-outline focus:outline-none"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1 uppercase tracking-wider" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  className="input-field w-full rounded-xl border-0 py-2.5 px-4 text-on-surface text-sm placeholder:text-outline focus:outline-none"
                  required
                />
                {touched.email && formData.email && !isEmailValid && (
                  <p className="text-error text-xs mt-1">Please enter a valid email address.</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1 uppercase tracking-wider" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    className="input-field w-full rounded-xl border-0 py-2.5 pl-4 pr-11 text-on-surface text-sm placeholder:text-outline focus:outline-none"
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

                {/* Password Strength Meter */}
                <div className="flex gap-1.5 mt-2 h-1.5">
                  <div
                    className={`h-full w-1/3 rounded-full transition-colors duration-300 ${
                      passwordStrength >= 1
                        ? passwordStrength === 1
                          ? 'bg-error'
                          : passwordStrength === 2
                          ? 'bg-amber-400'
                          : 'bg-emerald-500'
                        : 'bg-surface-variant'
                    }`}
                  />
                  <div
                    className={`h-full w-1/3 rounded-full transition-colors duration-300 ${
                      passwordStrength >= 2
                        ? passwordStrength === 2
                          ? 'bg-amber-400'
                          : 'bg-emerald-500'
                        : 'bg-surface-variant'
                    }`}
                  />
                  <div
                    className={`h-full w-1/3 rounded-full transition-colors duration-300 ${
                      passwordStrength >= 3 ? 'bg-emerald-500' : 'bg-surface-variant'
                    }`}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1 uppercase tracking-wider" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    className="input-field w-full rounded-xl border-0 py-2.5 pl-4 pr-11 text-on-surface text-sm placeholder:text-outline focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors p-1"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {touched.confirmPassword && formData.confirmPassword && !passwordsMatch && (
                  <p className="text-error text-xs mt-1">Passwords do not match.</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2.5 pt-1">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
                />
                <label htmlFor="acceptTerms" className="text-xs text-on-surface-variant">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="gradient-btn w-full mt-6 py-3 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-on-surface-variant mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
