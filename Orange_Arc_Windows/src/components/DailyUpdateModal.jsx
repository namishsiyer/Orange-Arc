import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const DailyUpdateModal = ({ isOpen, onClose }) => {
  const { logProgress } = useGame();
  const [formData, setFormData] = useState({
    b: 0, // Hours Studied
    c: 0, // MCQs Solved
    d: 0, // DPP Done
    f: 0, // Hours Workout
    g: 0, // KM Ran
    money: 0 // Money Saved
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: Number(e.target.value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logProgress(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-panel"
          style={{ position: 'relative', width: '100%', maxWidth: '500px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}
        >
          <button 
            onClick={onClose} 
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', color: 'var(--text-muted)' }}
          >
            <X size={24} />
          </button>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Log Today's Progress</h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Hours Studied</label>
              <input type="number" name="b" min="0" placeholder="0" onChange={handleChange} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>MCQs Solved</label>
              <input type="number" name="c" min="0" placeholder="0" onChange={handleChange} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>DPP Done (Count)</label>
              <input type="number" name="d" min="0" placeholder="0" onChange={handleChange} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Hours Workout</label>
              <input type="number" name="f" min="0" placeholder="0" onChange={handleChange} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>KM Ran</label>
              <input type="number" name="g" min="0" step="0.1" placeholder="0" onChange={handleChange} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Money Saved (₹)</label>
              <input type="number" name="money" min="0" placeholder="0" onChange={handleChange} />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
              Save Progress
            </button>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
