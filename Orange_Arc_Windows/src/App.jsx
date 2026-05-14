import React, { useState } from 'react';
import { GameProvider, useGame, getRank } from './context/GameContext';
import { Dashboard } from './components/Dashboard';
import { Achievements } from './components/Achievements';
import { Sidebar } from './components/Sidebar';
import { DailyUpdateModal } from './components/DailyUpdateModal';
import { motion, AnimatePresence } from 'framer-motion';

const MainApp = () => {
  const { stats, isLoaded, setName } = useGame();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState("");

  if (!isLoaded) return null;

  if (!stats.name) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel" 
          style={{ padding: '3rem', maxWidth: '400px', width: '100%', textAlign: 'center' }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }} className="text-gradient">Welcome to Regain</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Enter your name to begin your journey.</p>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <button 
            className="btn-primary" 
            style={{ width: '100%' }}
            onClick={() => tempName.trim() && setName(tempName.trim())}
          >
            Start Tracking
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userName={stats.name} 
        userRank={getRank(stats.level)} 
      />
      
      <main style={{ flex: 1, padding: '2rem', height: '100vh', overflowY: 'auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' ? (
              <Dashboard onOpenLog={() => setIsModalOpen(true)} />
            ) : (
              <Achievements />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <DailyUpdateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
}

export default App;
