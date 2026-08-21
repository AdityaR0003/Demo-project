import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import { 
  Users, 
  Activity, 
  Zap, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle, 
  Clock, 
  TrendingUp 
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-surface-container-lowest p-6 lg:p-8 rounded-3xl border border-surface-variant shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
              <SparkleIcon /> Active Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              Welcome back, {user?.fullName || 'Innovator'}! 👋
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">
              Here is what is happening across your VividSaaS infrastructure today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 rounded-xl border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors text-sm font-semibold">
              Documentation
            </button>
            <button className="gradient-btn px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              New Deployment
            </button>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <MetricCard
            title="Total Users"
            value="14,280"
            change="+12.5%"
            icon={<Users className="w-5 h-5 text-primary" />}
            color="bg-primary/10"
          />
          <MetricCard
            title="API Calls / sec"
            value="2,450"
            change="+8.1%"
            icon={<Activity className="w-5 h-5 text-secondary" />}
            color="bg-secondary/10"
          />
          <MetricCard
            title="Uptime"
            value="99.99%"
            change="Stable"
            icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
            color="bg-emerald-500/10"
          />
          <MetricCard
            title="Avg Response Time"
            value="42 ms"
            change="-4.2%"
            icon={<TrendingUp className="w-5 h-5 text-tertiary" />}
            color="bg-tertiary/10"
          />
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions & Status */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-variant shadow-sm">
              <h3 className="text-lg font-bold text-on-surface mb-4">Quick Infrastructure Overview</h3>
              <div className="space-y-4">
                <StatusRow name="Authentication Cluster (JWT + MySQL)" status="Healthy" time="0.4ms lat" />
                <StatusRow name="WebGL & Shader Renderer Engine" status="Active" time="60 FPS" />
                <StatusRow name="API Gateway (/api/auth & /api/users)" status="Operational" time="100%" />
                <StatusRow name="Relational Database Sync" status="Connected" time="MySQL 8.0" />
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-variant shadow-sm">
              <h3 className="text-lg font-bold text-on-surface mb-3">Your Account Overview</h3>
              <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-outline font-semibold uppercase tracking-wider">Registered Email</p>
                  <p className="text-base font-bold text-on-surface">{user?.email}</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Authenticated Session
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-variant shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-4">Recent Account Activity</h3>
              <div className="space-y-4">
                <ActivityItem
                  title="Successful Registration"
                  time="Just now"
                  desc="Account created & JWT issued"
                />
                <ActivityItem
                  title="MySQL Database Connected"
                  time="2 mins ago"
                  desc="Verified connection pool ping"
                />
                <ActivityItem
                  title="Session Initialized"
                  time="5 mins ago"
                  desc="AuthContext loaded user state"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-variant">
              <button className="w-full text-center text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1">
                <span>View Security Audit Log</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const MetricCard = ({ title, value, change, icon, color }) => (
  <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-variant shadow-sm flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">{title}</p>
      <p className="text-2xl font-extrabold text-on-surface">{value}</p>
      <span className="text-xs font-bold text-emerald-600 mt-1 inline-block">{change}</span>
    </div>
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center`}>
      {icon}
    </div>
  </div>
);

const StatusRow = ({ name, status, time }) => (
  <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low">
    <div className="flex items-center gap-2.5">
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-sm font-semibold text-on-surface">{name}</span>
    </div>
    <div className="flex items-center gap-3 text-xs">
      <span className="text-on-surface-variant font-medium">{time}</span>
      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 font-bold">{status}</span>
    </div>
  </div>
);

const ActivityItem = ({ title, time, desc }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
      <Clock className="w-4 h-4" />
    </div>
    <div>
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-bold text-on-surface">{title}</h4>
        <span className="text-[11px] text-outline">{time}</span>
      </div>
      <p className="text-xs text-on-surface-variant">{desc}</p>
    </div>
  </div>
);

const SparkleIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
  </svg>
);

export default DashboardPage;
