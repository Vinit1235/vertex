import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import GradientText from './ui/GradientText';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  Loader,
  AlertCircle,
  CheckCircle,
  X,
  Zap
} from 'lucide-react';

interface LoginPageProps {
  onClose: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginPage({ onClose, onSwitchToRegister }: LoginPageProps) {
  const { login, isLoading } = useAuth();
  const { isUpsideDown, unlockAchievement } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    
    if (result.success) {
      setSuccess(true);
      unlockAchievement('Welcome Back');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className={`
          relative w-full max-w-md rounded-2xl overflow-hidden
          ${isUpsideDown ? 'bg-red-950/95' : 'bg-slate-900/95'}
          border border-red-500/30 shadow-2xl shadow-red-500/20
        `}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="relative p-8 pb-0">
          {/* Background Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="relative flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-lg shadow-red-500/30">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <div className="text-center relative">
            <h2 className="text-3xl font-bold mb-2">
              <GradientText
                colors={['#FF0000', '#FF4444', '#FF0000', '#CC0000', '#FF0000']}
                animationSpeed={4}
                className="font-retro"
              >
                Welcome Back
              </GradientText>
            </h2>
            <p className="text-gray-400 text-sm">
              Enter the Upside Down once more
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-xl text-white font-bold mb-2">Login Successful!</h3>
                <p className="text-gray-400">Redirecting you back...</p>
              </motion.div>
            ) : (
              <motion.div key="form" className="space-y-6">
                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm text-gray-400 font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`
                        w-full pl-12 pr-4 py-3 rounded-xl
                        ${isUpsideDown ? 'bg-red-900/30' : 'bg-slate-800/50'}
                        border border-red-500/30 focus:border-red-500
                        text-white placeholder-gray-500
                        outline-none transition-all
                        focus:ring-2 focus:ring-red-500/20
                      `}
                      placeholder="hawkins@lab.gov"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm text-gray-400 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`
                        w-full pl-12 pr-12 py-3 rounded-xl
                        ${isUpsideDown ? 'bg-red-900/30' : 'bg-slate-800/50'}
                        border border-red-500/30 focus:border-red-500
                        text-white placeholder-gray-500
                        outline-none transition-all
                        focus:ring-2 focus:ring-red-500/20
                      `}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    w-full py-4 rounded-xl font-bold text-lg
                    bg-gradient-to-r from-red-600 to-red-500
                    hover:from-red-500 hover:to-red-400
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-300
                    flex items-center justify-center gap-3
                    shadow-lg shadow-red-500/30
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Accessing...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Enter the Portal</span>
                    </>
                  )}
                </motion.button>

                {/* Register Link */}
                <div className="text-center pt-4 border-t border-gray-800">
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={onSwitchToRegister}
                      className="text-red-400 hover:text-red-300 font-medium transition-colors inline-flex items-center gap-1"
                    >
                      <UserPlus className="w-4 h-4" />
                      Register Now
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Bottom Decoration */}
        <div className="h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
