import React, { useState } from 'react';
import { useGame, getRank } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Shield, Brain, Dumbbell, Target, Zap, DollarSign, Flame, TrendingUp, Calendar } from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area
} from 'recharts';
import { StatDetailModal } from './StatDetailModal';

const StatCard = ({ icon: Icon, title, value, colorClass, onClick }) => (
  <motion.div 
    whileHover={{ scale: 1.02, cursor: 'pointer' }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="glass-panel" 
    style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
  >
    <div style={{ 
      padding: '0.75rem', 
      borderRadius: '0.75rem', 
      background: 'rgba(249, 115, 22, 0.1)',
      border: '1px solid rgba(249, 115, 22, 0.1)'
    }}>
      <Icon className={colorClass} size={24} />
    </div>
    <div>
      <h3 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>
      <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{Math.floor(value)}</p>
    </div>
  </motion.div>
);

export const Dashboard = ({ onOpenLog }) => {
  const { stats, showLevelUp } = useGame();
  const [selectedStat, setSelectedStat] = useState(null);
  
  const xpNeeded = stats.level * 1000;
  const xpProgress = Math.min((stats.xp / xpNeeded) * 100, 100);

  // Calculate Days Active
  const start = new Date(stats.startDate || new Date());
  const now = new Date();
  const daysActive = Math.max(1, Math.ceil((now - start) / (1000 * 60 * 60 * 24)));

  // Prepare data for Radar Chart
  const radarData = [
    { subject: 'Study', A: stats.study, fullMark: 1000 },
    { subject: 'Strength', A: stats.strength, fullMark: 1000 },
    { subject: 'Intelligence', A: stats.intelligence, fullMark: 1000 },
    { subject: 'Discipline', A: stats.discipline, fullMark: 1000 },
  ];

  const handleStatClick = (key, name, value, color) => {
    setSelectedStat({ key, name, value, color });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, <span style={{ color: 'var(--accent-primary)' }}>{stats.name}</span></p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="glass-panel p-3">
             <div style={{ 
               width: '32px', 
               height: '32px', 
               borderRadius: '50%', 
               background: 'rgba(249, 115, 22, 0.1)', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center' 
             }}>
               <Calendar size={16} color="var(--accent-primary)" />
             </div>
             <div>
               <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Days Active</div>
               <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{daysActive}</div>
             </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary" 
            onClick={onOpenLog}
          >
            Update Daily Progress
          </motion.button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Main Stats Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* XP Progress Hero */}
          <motion.div className="glass-panel" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800' }}>LEVEL {stats.level}</div>
                <div style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'rgba(249, 115, 22, 0.2)', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {getRank(stats.level)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Next Level in</div>
                <div style={{ fontWeight: 'bold' }}>{Math.floor(xpNeeded - stats.xp)} XP</div>
              </div>
            </div>

            <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1 }}
                style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', boxShadow: '0 0 10px rgba(249, 115, 22, 0.5)' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Progress: {Math.floor(xpProgress)}%</span>
              <span>{Math.floor(stats.xp)} / {xpNeeded} Total XP</span>
            </div>
          </motion.div>

          {/* History Chart */}
          <div className="glass-panel" style={{ padding: '1.5rem', height: '300px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="var(--accent-primary)" />
              XP Progression
            </h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={stats.history}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
                  itemStyle={{ color: 'var(--accent-primary)' }}
                />
                <Area type="monotone" dataKey="xp" stroke="var(--accent-primary)" fillOpacity={1} fill="url(#colorXp)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Stats Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Radar Chart / Attribute Balance */}
          <div className="glass-panel" style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '0.5rem' }}>ATTRIBUTE BALANCE</h3>
            <div style={{ flex: 1, minHeight: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" stroke="var(--text-muted)" fontSize={10} />
                  <Radar
                    name="Stats"
                    dataKey="A"
                    stroke="var(--accent-primary)"
                    fill="var(--accent-primary)"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            <StatCard icon={Flame} title="Current Streak" value={stats.streak} colorClass="text-accent-primary" />
            <StatCard icon={DollarSign} title="Total Savings" value={stats.total_money_saved} colorClass="text-accent-success" />
            <StatCard icon={Shield} title="Meta Points" value={stats.meta_points} colorClass="text-accent-warning" />
          </div>
        </div>
      </div>

      {/* Detail Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <StatCard 
          icon={Brain} title="Study Points" value={stats.study} colorClass="text-accent-secondary" 
          onClick={() => handleStatClick('Study', 'Study Points', stats.study, '#fb923c')}
        />
        <StatCard 
          icon={Dumbbell} title="Strength" value={stats.strength} colorClass="text-accent-danger" 
          onClick={() => handleStatClick('Strength', 'Strength', stats.strength, '#ef4444')}
        />
        <StatCard 
          icon={Zap} title="Intelligence" value={stats.intelligence} colorClass="text-accent-warning" 
          onClick={() => handleStatClick('Intelligence', 'Intelligence', stats.intelligence, '#fbbf24')}
        />
        <StatCard 
          icon={Target} title="Discipline" value={stats.discipline} colorClass="text-accent-success" 
          onClick={() => handleStatClick('Discipline', 'Discipline', stats.discipline, '#10b981')}
        />
      </div>

      <StatDetailModal 
        isOpen={!!selectedStat}
        onClose={() => setSelectedStat(null)}
        statKey={selectedStat?.key || ''}
        statName={selectedStat?.name || ''}
        statValue={selectedStat?.value || 0}
        history={stats.history}
        color={selectedStat?.color || '#f97316'}
      />

      {showLevelUp && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{ position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-success)', color: '#111', padding: '1rem 2rem', borderRadius: '2rem', fontWeight: '900', boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)', zIndex: 100 }}
        >
          🔥 LEVEL UP! 🔥
        </motion.div>
      )}
    </div>
  );
};
