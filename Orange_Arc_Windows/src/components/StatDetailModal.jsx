import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Info } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export const StatDetailModal = ({ isOpen, onClose, statKey, statName, statValue, history, color }) => {
  if (!isOpen) return null;

  // Filter history to only include the specific stat
  const chartData = history.map(h => ({
    date: h.date,
    value: h[statKey.toLowerCase()]
  }));

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-panel"
          style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: '600px', 
            padding: '2.5rem',
            border: `1px solid ${color}`
          }}
        >
          <button 
            onClick={onClose} 
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', color: 'var(--text-muted)' }}
          >
            <X size={24} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ 
              padding: '1rem', 
              borderRadius: '1rem', 
              background: `${color}1a`,
              border: `1px solid ${color}33`
            }}>
              <TrendingUp size={32} style={{ color: color }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{statName}</h2>
              <p style={{ color: color, fontWeight: 'bold', fontSize: '1.25rem' }}>{Math.floor(statValue)} <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Points</span></p>
            </div>
          </div>

          <div style={{ height: '300px', width: '100%', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>Progression History</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorStat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
                  itemStyle={{ color: color }}
                />
                <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill="url(#colorStat)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
              <Info size={18} color="var(--text-muted)" style={{ marginTop: '0.2rem' }} />
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Your {statName} level represents your dedicated effort in this category. Keep logging progress daily to avoid stat decay and unlock powerful meta-multipliers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
