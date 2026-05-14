import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Trophy, Lock } from 'lucide-react';

const ALL_ACHIEVEMENTS = [
  { title: "First Study Session", desc: "Logged your first hours of study." },
  { title: "5 Day Streak", desc: "Maintained a 5-day daily logging streak." },
  { title: "10 Hour Grind", desc: "Studied for 10 or more hours in a single day." },
  { title: "100 MCQ Slayer", desc: "Solved 100+ MCQs in a single day." },
  { title: "Fitness Warrior", desc: "Worked out for 2+ hours and ran 3+ KM in a day." },
  { title: "Discipline Master", desc: "Reached 500 Discipline points." },
  { title: "Savings Starter", desc: "Saved ₹1000 total." },
  { title: "Wealth Builder", desc: "Saved ₹10000 total." }
];

export const Achievements = () => {
  const { stats } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-panel"
      style={{ padding: '2rem' }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Trophy className="text-gradient" size={32} />
        Achievements Library
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {ALL_ACHIEVEMENTS.map((ach, i) => {
          const unlocked = stats.achievements.includes(ach.title);

          return (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                background: unlocked ? 'var(--bg-card)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${unlocked ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                boxShadow: unlocked ? '0 0 15px 0 rgba(249, 115, 22, 0.2)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                opacity: unlocked ? 1 : 0.6
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: unlocked ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
                  {ach.title}
                </h3>
                {unlocked ? <Trophy size={20} color="var(--accent-primary)" /> : <Lock size={20} color="var(--text-muted)" />}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{ach.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
