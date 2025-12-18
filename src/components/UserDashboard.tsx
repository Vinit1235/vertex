import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import GradientText from './ui/GradientText';
import { 
  User, 
  Mail, 
  Phone, 
  School, 
  Calendar, 
  Users, 
  Code, 
  Trophy,
  Settings,
  Edit2,
  Save,
  X,
  Check,
  Ticket
} from 'lucide-react';

interface UserDashboardProps {
  onClose: () => void;
}

export default function UserDashboard({ onClose }: UserDashboardProps) {
  const { user, updateUser } = useAuth();
  const { isUpsideDown, achievements, secretsFound } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedPhone, setEditedPhone] = useState(user?.phone || '');

  if (!user) return null;

  const handleSave = () => {
    updateUser({
      name: editedName,
      phone: editedPhone,
    });
    setIsEditing(false);
  };

  const registrationDate = new Date(user.registeredAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
          relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl
          ${isUpsideDown ? 'bg-red-950/95' : 'bg-slate-900/95'}
          border border-red-500/30 shadow-2xl shadow-red-500/20
        `}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-900 to-transparent p-6 pb-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-3xl shadow-lg shadow-red-500/30">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                <GradientText
                  colors={['#FF4444', '#FF0000', '#FF4444', '#CC0000', '#FF4444']}
                  animationSpeed={4}
                >
                  {user.name}
                </GradientText>
              </h2>
              <p className="text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-6">
          {/* Registration Ticket */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-900/50 to-slate-900/50 border border-red-500/30 p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
            
            <div className="flex items-center gap-3 mb-4">
              <Ticket className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-bold text-white">Registration Confirmed</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Event</p>
                <p className="text-white font-medium">VORTEX 2025</p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p className="text-white font-medium">Feb 15-16, 2025</p>
              </div>
              <div>
                <p className="text-gray-500">Track</p>
                <p className="text-red-400 font-medium">{user.track || 'Not selected'}</p>
              </div>
              <div>
                <p className="text-gray-500">Team</p>
                <p className="text-white font-medium">{user.team || 'Solo participant'}</p>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="mt-4 pt-4 border-t border-red-500/20 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Registration ID</p>
                <p className="text-red-400 font-mono">{user.id}</p>
              </div>
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                <div className="w-12 h-12 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjMyIiB5PSI0IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iNCIgeT0iMzIiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9ImJsYWNrIi8+PC9zdmc+')] bg-contain" />
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="rounded-xl bg-slate-800/30 border border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-red-500" />
                Profile Details
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-700/50 border border-gray-600 rounded-lg text-white focus:border-red-500 outline-none"
                  />
                ) : (
                  <p className="text-white mt-1">{user.name}</p>
                )}
              </div>
              
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-700/50 border border-gray-600 rounded-lg text-white focus:border-red-500 outline-none"
                  />
                ) : (
                  <p className="text-white mt-1">{user.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">College</label>
                <p className="text-white mt-1">{user.college || 'Not provided'}</p>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">Registered</label>
                <p className="text-white mt-1">{registrationDate}</p>
              </div>
            </div>
          </div>

          {/* Team Members */}
          {user.teamMembers && user.teamMembers.length > 0 && (
            <div className="rounded-xl bg-slate-800/30 border border-gray-700/50 p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-red-500" />
                Team Members
              </h3>
              <div className="space-y-2">
                {user.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-sm">
                      {index + 2}
                    </div>
                    <span className="text-gray-300">{member}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Stats */}
          <div className="rounded-xl bg-slate-800/30 border border-gray-700/50 p-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Your Progress
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-yellow-400">{achievements.length}</p>
                <p className="text-sm text-gray-400">Achievements</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-purple-400">{secretsFound}</p>
                <p className="text-sm text-gray-400">Secrets Found</p>
              </div>
            </div>

            {achievements.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {achievements.map((achievement, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs text-yellow-400"
                  >
                    🏆 {achievement}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
