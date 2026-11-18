import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgressionStore } from '../../store/progressionStore';
import { sound } from '../../utils/soundEffects';
import { 
  Heart, 
  Zap, 
  Flame, 
  Volume2, 
  VolumeX, 
  GraduationCap, 
  Menu, 
  X,
  Compass
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { stats, currentLevelId } = useProgressionStore();
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const location = useLocation();

  const toggleSound = () => {
    const next = !isMuted;
    sound.setMuted(next);
    setIsMuted(next);
    if (!next) sound.playClick();
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-quest-border/60 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-quest-muted hover:text-white rounded-lg hover:bg-quest-card transition"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            onClick={() => sound.playClick()}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-quest-primary to-quest-secondary flex items-center justify-center shadow-lg shadow-quest-primary/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                Mobile Dev Quest
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-quest-primary/20 text-quest-primary border border-quest-primary/30">
                ENSIA
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Live Stats HUD */}
        <div className="hidden md:flex items-center gap-6 glass-card px-4 py-1.5 rounded-full border border-quest-border/50">
          
          {/* Hearts */}
          <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-sm" title="Hearts remaining">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            <span>{stats.hearts} / {stats.maxHearts}</span>
          </div>

          <div className="w-px h-4 bg-quest-border/60" />

          {/* XP */}
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-sm" title="Total Experience Points">
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{stats.totalXp.toLocaleString()} XP</span>
          </div>

          <div className="w-px h-4 bg-quest-border/60" />

          {/* Streak */}
          <div className="flex items-center gap-1.5 text-orange-400 font-semibold text-sm" title="Daily streak">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>{stats.streakDays}d Streak</span>
          </div>

          <div className="w-px h-4 bg-quest-border/60" />

          {/* Current Level */}
          <div className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Level {currentLevelId} / 8
          </div>
        </div>

        {/* Right: Audio Toggle & Exam Simulator button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg text-quest-muted hover:text-white hover:bg-quest-card transition"
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-quest-primary" />}
          </button>

          <Link
            to="/exam"
            onClick={() => sound.playClick()}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shadow-md ${
              location.pathname === '/exam'
                ? 'bg-quest-accent text-white shadow-quest-accent/30'
                : 'bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white shadow-quest-primary/20 hover:scale-[1.02]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Exam Simulator</span>
          </Link>
        </div>

      </div>
    </header>
  );
};
