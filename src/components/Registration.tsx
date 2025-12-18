import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { User, Code, Users, CheckCircle, Loader, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import GradientText from './ui/GradientText';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  college: string;
  year: string;
  track: string;
  teamSize: string;
  teamName: string;
  teamMember1: string;
  teamMember2: string;
  teamMember3: string;
  experience: string;
  github: string;
  linkedin: string;
  whyAttend: string;
  dietaryRestrictions: string;
  tshirtSize: string;
  agreeTerms: boolean;
}

export default function Registration() {
  const { unlockAchievement } = useTheme();
  const { register: authRegister } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const watchPassword = watch('password');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');
    
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Prepare team members
    const teamMembers = [data.teamMember1, data.teamMember2, data.teamMember3].filter(Boolean);

    // Register with AuthContext
    const result = await authRegister({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      college: data.college,
      track: data.track,
      teamName: data.teamName,
      teamMembers,
    });
    
    if (result.success) {
      setIsSubmitted(true);
      unlockAchievement('Early Bird');
      
      // Store additional registration details
      const registrationDetails = {
        ...data,
        teamMembers,
        registeredAt: new Date().toISOString(),
      };
      
      // Get existing registrations
      const existingRegistrations = JSON.parse(localStorage.getItem('vortex_registrations') || '[]');
      existingRegistrations.push(registrationDetails);
      localStorage.setItem('vortex_registrations', JSON.stringify(existingRegistrations));
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const tracks = [
    'The Gate (AI/ML)',
    'Hawkins Lab (Web3)',
    'The Void (Cybersecurity)',
    'Eleven\'s Mind (BCI)',
    'The Upside Down (AR/VR)',
    'Walkie-Talkie (IoT)',
  ];

  if (isSubmitted) {
    return (
      <section id="register" className="py-24 relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-dark rounded-2xl p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <CheckCircle size={48} className="text-green-500" />
            </motion.div>
            
            <h2 className="stranger-title text-3xl mb-4">YOU'RE IN!</h2>
            <p className="text-gray-400 mb-6">
              Welcome to VORTEX 2025. Check your email for confirmation and next steps.
            </p>

            {/* Post Registration Preview */}
            <div className="glass rounded-xl p-6 text-left mb-6">
              <h3 className="text-lg font-bold text-white mb-4">What's Next?</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-xs text-red-400">1</span>
                  Check your email for confirmation
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-xs text-red-400">2</span>
                  Join our Discord community
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-xs text-red-400">3</span>
                  Form or join a team
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-xs text-red-400">4</span>
                  Prepare for the hackathon!
                </li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                className="px-6 py-3 bg-red-600 text-white rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Discord
              </motion.button>
              <motion.button
                className="px-6 py-3 glass text-gray-300 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Calendar
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-red-500 font-retro text-sm tracking-widest">
            JOIN US
          </span>
          <h2 className="text-4xl md:text-5xl mt-4 mb-6 font-bold">
            <GradientText
              colors={['#FF0000', '#FF4444', '#FF0000', '#CC0000', '#FF0000']}
              animationSpeed={3}
              className="stranger-title"
            >
              REGISTER NOW
            </GradientText>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Limited spots available. Secure your place in the Upside Down before it's too late.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step >= s
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800 text-gray-500'
                  }`}
                  animate={{ scale: step === s ? 1.1 : 1 }}
                >
                  {s}
                </motion.div>
                {s < 3 && (
                  <div className={`w-16 h-0.5 ${
                    step > s ? 'bg-red-500' : 'bg-gray-800'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="glass-dark rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <User size={20} className="text-red-500" />
                  Personal Information
                </h3>

                {/* Error Display */}
                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="retro-input w-full rounded-lg"
                      placeholder="Mike Wheeler"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email'
                        }
                      })}
                      className="retro-input w-full rounded-lg"
                      placeholder="mike@hawkins.edu"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Password *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { 
                          required: 'Password is required',
                          minLength: { value: 6, message: 'Password must be at least 6 characters' }
                        })}
                        className="retro-input w-full rounded-lg pr-10"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Confirm Password *</label>
                    <input
                      type="password"
                      {...register('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: value => value === watchPassword || 'Passwords do not match'
                      })}
                      className="retro-input w-full rounded-lg"
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className="retro-input w-full rounded-lg"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">College/University *</label>
                    <input
                      type="text"
                      {...register('college', { required: 'College is required' })}
                      className="retro-input w-full rounded-lg"
                      placeholder="Hawkins National Laboratory"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Year of Study *</label>
                    <select
                      {...register('year', { required: 'Year is required' })}
                      className="retro-input w-full rounded-lg"
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="grad">Graduate</option>
                      <option value="working">Working Professional</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">T-Shirt Size *</label>
                    <select
                      {...register('tshirtSize', { required: 'T-Shirt size is required' })}
                      className="retro-input w-full rounded-lg"
                    >
                      <option value="">Select Size</option>
                      <option value="xs">XS</option>
                      <option value="s">S</option>
                      <option value="m">M</option>
                      <option value="l">L</option>
                      <option value="xl">XL</option>
                      <option value="xxl">XXL</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Hackathon Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Code size={20} className="text-red-500" />
                  Hackathon Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Preferred Track *</label>
                    <select
                      {...register('track', { required: 'Track is required' })}
                      className="retro-input w-full rounded-lg"
                    >
                      <option value="">Select Track</option>
                      {tracks.map(track => (
                        <option key={track} value={track}>{track}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Team Size *</label>
                    <select
                      {...register('teamSize', { required: 'Team size is required' })}
                      className="retro-input w-full rounded-lg"
                    >
                      <option value="">Select Team Size</option>
                      <option value="1">Solo (Looking for team)</option>
                      <option value="2">2 Members</option>
                      <option value="3">3 Members</option>
                      <option value="4">4 Members</option>
                    </select>
                  </div>

                  {/* Team Name */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">
                      <Users size={16} className="inline mr-2 text-red-500" />
                      Team Name
                    </label>
                    <input
                      type="text"
                      {...register('teamName')}
                      className="retro-input w-full rounded-lg"
                      placeholder="The Party, Hawkins AV Club..."
                    />
                  </div>

                  {/* Team Members */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Team Member 2 (Email)</label>
                    <input
                      type="email"
                      {...register('teamMember1')}
                      className="retro-input w-full rounded-lg"
                      placeholder="dustin@hawkins.edu"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Team Member 3 (Email)</label>
                    <input
                      type="email"
                      {...register('teamMember2')}
                      className="retro-input w-full rounded-lg"
                      placeholder="lucas@hawkins.edu"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Team Member 4 (Email)</label>
                    <input
                      type="email"
                      {...register('teamMember3')}
                      className="retro-input w-full rounded-lg"
                      placeholder="will@hawkins.edu"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Experience Level *</label>
                    <select
                      {...register('experience', { required: 'Experience is required' })}
                      className="retro-input w-full rounded-lg"
                    >
                      <option value="">Select Experience</option>
                      <option value="beginner">Beginner (First hackathon)</option>
                      <option value="intermediate">Intermediate (1-3 hackathons)</option>
                      <option value="advanced">Advanced (4+ hackathons)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">GitHub Profile</label>
                    <input
                      type="url"
                      {...register('github')}
                      className="retro-input w-full rounded-lg"
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">LinkedIn Profile</label>
                    <input
                      type="url"
                      {...register('linkedin')}
                      className="retro-input w-full rounded-lg"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Additional Info */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Users size={20} className="text-red-500" />
                  Almost There!
                </h3>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Why do you want to attend VORTEX? *
                  </label>
                  <textarea
                    {...register('whyAttend', { required: 'This field is required' })}
                    className="retro-input w-full rounded-lg h-32 resize-none"
                    placeholder="Tell us what excites you about VORTEX and what you hope to build..."
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    Dietary Restrictions / Allergies
                  </label>
                  <input
                    type="text"
                    {...register('dietaryRestrictions')}
                    className="retro-input w-full rounded-lg"
                    placeholder="Vegetarian, Vegan, Gluten-free, etc."
                  />
                </div>

                <div className="flex items-start gap-3 mt-6">
                  <input
                    type="checkbox"
                    {...register('agreeTerms', { required: 'You must agree to the terms' })}
                    className="mt-1"
                    id="terms"
                  />
                  <label htmlFor="terms" className="text-gray-400 text-sm">
                    I agree to the{' '}
                    <a href="#" className="text-red-400 hover:underline">Terms & Conditions</a>
                    {' '}and{' '}
                    <a href="#" className="text-red-400 hover:underline">Code of Conduct</a>.
                    I understand that VORTEX is a 36-hour event and commit to participating fully.
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-red-400 text-xs">{errors.agreeTerms.message}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
            <motion.button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-6 py-3 glass text-gray-400 rounded-lg ${
                step === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={step === 1}
              whileHover={step > 1 ? { scale: 1.05 } : {}}
              whileTap={step > 1 ? { scale: 0.95 } : {}}
            >
              Previous
            </motion.button>

            {step < 3 ? (
              <motion.button
                type="button"
                onClick={() => setStep(Math.min(3, step + 1))}
                className="px-6 py-3 bg-red-600 text-white rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next Step
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="px-8 py-3 bg-red-600 text-white rounded-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </motion.button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
