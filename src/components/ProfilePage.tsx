import { motion } from 'motion/react';
import { User, Database, Shield, Clock, Download, HardDrive } from 'lucide-react';

interface ProfilePageProps {
  userEmail: string;
  onBack: () => void;
  onLogout: () => void;
}

export default function ProfilePage({ userEmail, onBack, onLogout }: ProfilePageProps) {
  // Mock data for "Database Company" theme
  const stats = [
    { label: 'DATA INTEGRITY', value: '100%', icon: Shield },
    { label: 'STORED OBJECTS', value: '1,284', icon: Database },
    { label: 'ACCESS TIME', value: '14ms', icon: Clock },
    { label: 'ACTIVE APPS', value: '13', icon: HardDrive },
  ];

  const recentDownloads = [
    { name: 'ForNeed v2.4.0', date: '2026.01.25', type: 'DMG' },
    { name: 'Money Monitor v1.2.0', date: '2026.01.20', type: 'EXE' },
    { name: 'Circles Mind Loadmap', date: '2026.01.18', type: 'TRIAL' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-16" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
      <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-12 uppercase transition-opacity hover:opacity-70 flex items-center gap-2"
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.875rem',
            letterSpacing: '0.15em',
            fontWeight: '600',
            color: '#FFFFFF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ← EXIT_PROFILE
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border-2 border-white"
            >
              <div className="flex flex-col items-center text-center mb-8">
                <div 
                  className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center mb-6 overflow-hidden bg-white"
                  style={{ boxShadow: '0 0 0 4px #000000, 0 0 0 6px #FFFFFF' }}
                >
                  <User size={64} color="#000000" strokeWidth={1.5} />
                </div>
                <h2 
                  className="uppercase mb-2"
                  style={{ 
                    fontFamily: 'League Spartan, sans-serif',
                    fontSize: '1.5rem',
                    letterSpacing: '0.1em'
                  }}
                >
                  OFFLINE_USER
                </h2>
                <p 
                  style={{ 
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.875rem',
                    opacity: 0.6
                  }}
                >
                  {userEmail}
                </p>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/20">
                <div className="flex justify-between items-center text-xs opacity-50 uppercase font-mono">
                  <span>MEMBER_SINCE</span>
                  <span>JAN_2026</span>
                </div>
                <div className="flex justify-between items-center text-xs opacity-50 uppercase font-mono">
                  <span>CLEARANCE</span>
                  <span>LEVEL_03</span>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="w-full mt-12 px-6 py-4 border-2 border-white uppercase hover:bg-white hover:text-black transition-colors"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.875rem',
                  letterSpacing: '0.2em',
                  fontWeight: '700'
                }}
              >
                TERMINATE_SESSION
              </button>
            </motion.div>
          </div>

          {/* Right Column: Stats & Activity */}
          <div className="lg:col-span-2 space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 border border-white/30 flex items-start gap-4"
                >
                  <div className="mt-1">
                    <stat.icon size={20} className="opacity-60" />
                  </div>
                  <div>
                    <div 
                      className="text-xs uppercase opacity-40 mb-1"
                      style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                    >
                      {stat.label}
                    </div>
                    <div 
                      className="text-2xl"
                      style={{ fontFamily: 'League Spartan, sans-serif', letterSpacing: '0.05em' }}
                    >
                      {stat.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div>
              <h3 
                className="uppercase mb-8"
                style={{ 
                  fontFamily: 'League Spartan, sans-serif',
                  fontSize: '1.25rem',
                  letterSpacing: '0.15em'
                }}
              >
                DATA_ACCESS_LOG
              </h3>
              <div className="space-y-4">
                {recentDownloads.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="flex items-center justify-between p-4 border-b border-white/10 group hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Download size={16} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <div 
                          className="uppercase text-sm"
                          style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: '600' }}
                        >
                          {item.name}
                        </div>
                        <div 
                          className="text-[10px] opacity-40 uppercase"
                          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                        >
                          {item.date} • TYPE: {item.type}
                        </div>
                      </div>
                    </div>
                    <button className="text-[10px] uppercase border border-white/20 px-3 py-1 hover:border-white transition-colors font-mono">
                      RE_ACCESS
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Database Visualization Mock */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono opacity-40 uppercase">DISK_USAGE_REPORT</span>
                <span className="text-xs font-mono opacity-40">74% CAPACITY</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '74%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-white" 
                />
              </div>
              <div className="mt-6 grid grid-cols-4 gap-2">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="h-1 bg-white/20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
