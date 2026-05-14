import React from 'react';
import { LayoutDashboard, Trophy, Settings, LogOut, Flame, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export const Sidebar = ({ activeTab, setActiveTab, userName, userRank }) => {
  const { resetGame } = useGame();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
  ];

  return (
    <div className="glass-panel" style={{ 
      width: '260px', 
      height: 'calc(100vh - 2rem)', 
      margin: '1rem', 
      display: 'flex', 
      flexDirection: 'column',
      padding: '1.5rem',
      position: 'sticky',
      top: '1rem'
    }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '0.1em' }}>REGAIN</h1>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>DESKTOP COMMAND</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.75rem',
              background: activeTab === item.id ? 'rgba(249, 115, 22, 0.1)' : 'transparent',
              color: activeTab === item.id ? 'var(--accent-primary)' : 'var(--text-muted)',
              border: activeTab === item.id ? '1px solid rgba(249, 115, 22, 0.3)' : '1px solid transparent',
              boxShadow: activeTab === item.id ? '0 0 15px rgba(249, 115, 22, 0.1)' : 'none',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.2s ease'
            }}
          >
            <item.icon size={20} />
            <span style={{ fontWeight: '600' }}>{item.label}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#111',
            fontWeight: 'bold'
          }}>
            {userName[0]?.toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{userName}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{userRank}</p>
          </div>
        </div>

        <button
          onClick={resetGame}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            fontSize: '0.875rem',
            fontWeight: '600',
            width: '100%',
            transition: 'all 0.2s ease'
          }}
        >
          <RotateCcw size={16} />
          Reset Progress
        </button>
      </div>
    </div>
  );
};
