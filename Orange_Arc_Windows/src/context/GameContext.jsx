import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const GameContext = createContext();

const RANK_THRESHOLDS = [
  { max: 5, name: "Rookie" },
  { max: 10, name: "Soldier" },
  { max: 20, name: "Warrior" },
  { max: 35, name: "Commander" },
  { max: 50, name: "Elite Commander" },
  { max: 75, name: "General" },
  { max: 100, name: "Warlord" },
  { max: Infinity, name: "LEGEND" }
];

export const getRank = (level) => {
  for (const threshold of RANK_THRESHOLDS) {
    if (level < threshold.max) return threshold.name;
  }
  return "LEGEND";
};

const DEFAULT_STATE = {
  name: "",
  study: 100,
  strength: 0,
  intelligence: 0,
  discipline: 50,
  xp: 0,
  level: 1,
  streak: 0,
  last_login: "",
  achievements: [],
  meta_points: 0,
  history: [],
  startDate: new Date().toISOString()
};

export const GameProvider = ({ children }) => {
  const [stats, setStats] = useState(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Load state on mount and process decay/streaks
  useEffect(() => {
    const saved = localStorage.getItem('regain_data');
    let data = saved ? JSON.parse(saved) : DEFAULT_STATE;

    if (!data.name) {
      // Don't process decay if no user exists yet
      setIsLoaded(true);
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];

    // Process Decay & Streaks
    if (data.last_login && data.last_login !== todayStr) {
      const lastDate = new Date(data.last_login);
      const currentDate = new Date(todayStr);
      const daysMissed = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

      // Decay
      if (daysMissed > 1) {
        const decayFactor = Math.pow(0.95, daysMissed - 1);
        data.study *= decayFactor;
        data.strength *= decayFactor;
        data.discipline -= 10 * (daysMissed - 1);
      }

      // Streak
      if (daysMissed === 1) {
        data.streak += 1;
      } else {
        data.streak = 1;
      }
    } else if (!data.last_login) {
      data.streak = 1;
    }

    if (data.last_login !== todayStr) {
        data.xp += data.streak * 10; // daily bonus
        data.last_login = todayStr;
    }

    // Ensure history and startDate exist
    if (!data.history) data.history = [];
    if (!data.startDate) data.startDate = new Date().toISOString();

    setStats(data);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever stats change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('regain_data', JSON.stringify(stats));
    }
  }, [stats, isLoaded]);

  const setName = (name) => {
    setStats(prev => ({ ...prev, name, last_login: new Date().toISOString().split('T')[0], startDate: new Date().toISOString() }));
  };

  const resetGame = () => {
    if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      localStorage.removeItem('regain_data');
      setStats(DEFAULT_STATE);
      window.location.reload();
    }
  };

  const logProgress = (dailyData) => {
    setStats(prev => {
      let newState = { ...prev };
      const { b, c, d, f, g, money } = dailyData;
      
      let meta_multiplier = 1 + (newState.meta_points * 0.02);

      newState.total_money_saved += money;
      newState.xp += money * 10;

      // ---- STUDY ----
      if (b > 0) {
          newState.study += b * 50 * meta_multiplier;
          newState.intelligence += b * 5;
          newState.xp += b * 20;
      } else {
          newState.study *= 0.7;
          newState.discipline -= 10;
      }

      if (c > 0) {
          newState.study += c * 5;
          newState.intelligence += c * 2;
          newState.xp += c * 2;
      }

      if (d > 0) {
          newState.study += d * 20;
          newState.discipline += d * 5;
          newState.xp += d * 10;
      } else {
          newState.study *= 0.9;
          newState.discipline -= 5;
      }

      // ---- FITNESS ----
      if (f > 0) {
          newState.strength += f * 50 * meta_multiplier;
          newState.discipline += f * 5;
          newState.xp += f * 20;
      } else {
          newState.strength *= 0.9;
          newState.discipline -= 5;
      }

      if (g > 0) {
          newState.strength += g * 30;
          newState.discipline += g * 3;
          newState.xp += g * 10;
      }

      // ---- ACHIEVEMENTS ----
      const unlock = (title) => {
          if (!newState.achievements.includes(title)) {
              newState.achievements.push(title);
              // Small confetti for achievement
              confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
              return 200;
          }
          return 0;
      };

      newState.xp += b > 0 ? unlock("First Study Session") : 0;
      newState.xp += newState.streak >= 5 ? unlock("5 Day Streak") : 0;
      newState.xp += b >= 10 ? unlock("10 Hour Grind") : 0;
      newState.xp += c >= 100 ? unlock("100 MCQ Slayer") : 0;
      newState.xp += f >= 2 && g >= 3 ? unlock("Fitness Warrior") : 0;
      newState.xp += newState.discipline >= 500 ? unlock("Discipline Master") : 0;
      newState.xp += newState.total_money_saved >= 1000 ? unlock("Savings Starter") : 0;
      newState.xp += newState.total_money_saved >= 10000 ? unlock("Wealth Builder") : 0;

      // ---- LEVEL SYSTEM ----
      let xp_needed = newState.level * 1000;
      let leveledUp = false;
      while (newState.xp >= xp_needed) {
          newState.xp -= xp_needed;
          newState.level += 1;
          newState.discipline += 20;
          newState.meta_points += 1;
          xp_needed = newState.level * 1000;
          leveledUp = true;
      }

      if (leveledUp) {
        setShowLevelUp(true);
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#f97316', '#fb923c', '#ea580c']
        });
        setTimeout(() => setShowLevelUp(false), 3000);
      }

      // ---- HISTORY SNAPSHOT ----
      const snapshot = {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        study: Math.floor(newState.study),
        strength: Math.floor(newState.strength),
        intelligence: Math.floor(newState.intelligence),
        discipline: Math.floor(newState.discipline),
        xp: Math.floor(newState.xp + (newState.level - 1) * 1000), // Total XP accumulated
        money: newState.total_money_saved
      };
      
      newState.history = [...(newState.history || []).slice(-13), snapshot]; // Keep last 14 days

      return newState;
    });
  };

  return (
    <GameContext.Provider value={{ stats, isLoaded, setName, logProgress, showLevelUp, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
