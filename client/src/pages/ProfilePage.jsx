import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { authService } from '../services/api';
import Navbar from '../components/layout/Navbar';
import { User, Mail, Calendar, ShieldCheck, Database, Loader2, Key } from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authService.getProfile();
        if (res.success) {
          setProfile(res.profile);
        } else {
          setError(res.message || 'Could not fetch profile details.');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching profile from backend API.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header Card */}
          <div className="bg-surface-container-lowest p-6 lg:p-8 rounded-3xl border border-surface-variant shadow-sm flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-3xl font-extrabold shadow-md flex-shrink-0">
              {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold mb-2">
                <ShieldCheck className="w-4 h-4" /> Authenticated Member
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                {profile?.fullName || 'User Profile'}
              </h1>
              <p className="text-on-surface-variant text-sm mt-0.5">{profile?.email}</p>
            </div>
          </div>

          {loading ? (
            <div className="bg-surface-container-lowest p-12 rounded-3xl border border-surface-variant text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
              <p className="text-on-surface-variant font-medium">Fetching record from MySQL database...</p>
            </div>
          ) : error ? (
            <div className="bg-error-container text-error p-6 rounded-3xl text-center font-medium">
              {error}
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-6 lg:p-8 rounded-3xl border border-surface-variant shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-on-surface border-b border-surface-variant pb-4">
                Account Details & Identity
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoBox
                  icon={<User className="w-5 h-5 text-primary" />}
                  label="Full Name"
                  value={profile?.fullName}
                />
                <InfoBox
                  icon={<Mail className="w-5 h-5 text-secondary" />}
                  label="Email Address"
                  value={profile?.email}
                />
                <InfoBox
                  icon={<Key className="w-5 h-5 text-tertiary" />}
                  label="Database Primary Key (ID)"
                  value={`#${profile?.id}`}
                />
                <InfoBox
                  icon={<Calendar className="w-5 h-5 text-emerald-600" />}
                  label="Account Creation Date"
                  value={profile?.createdAt ? new Date(profile.createdAt).toLocaleString() : 'N/A'}
                />
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold text-on-surface">Data Persistence Status</p>
                    <p className="text-xs text-on-surface-variant">Stored with bcrypt hash in MySQL DB `vibrant_saas.users`</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-700 text-xs font-bold">
                  Synced
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

const InfoBox = ({ icon, label, value }) => (
  <div className="p-4 rounded-2xl bg-surface-container-low flex items-start gap-3">
    <div className="p-2.5 rounded-xl bg-white shadow-sm flex-shrink-0 mt-0.5">{icon}</div>
    <div>
      <p className="text-xs font-semibold text-outline uppercase tracking-wider">{label}</p>
      <p className="text-base font-bold text-on-surface mt-0.5">{value || 'N/A'}</p>
    </div>
  </div>
);

export default ProfilePage;
