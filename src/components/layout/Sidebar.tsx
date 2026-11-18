import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useProgressionStore } from '../../store/progressionStore';
import { sound } from '../../utils/soundEffects';
import { 
  LayoutDashboard, 
  Map, 
  Code2, 
  AlertTriangle, 
  GraduationCap, 
  BarChart3, 
  RotateCcw,
  Sparkles,
  GitFork
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { resetProgress, stats } = useProgressionStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/levels', label: 'Level Map', icon: Map },
    { to: '/arena', label: 'Coding Arena', icon: Code2 },
    { to: '/tree', label: 'Widget Tree Studio', icon: GitFork },
    { to: '/traps', label: 'Professor\'s Traps', icon: AlertTriangle },
    { to: '/exam', label: '90-Min Exam Hall', icon: GraduationCap },
    { to: '/stats', label: 'Performance Stats', icon: BarChart3 },
  ];

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    sound.playError();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      <aside className={`fixed top-[57px] bottom-0 left-0 z-30 w-64 glass-panel border-r border-quest-border/60 p-4 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Navigation Links */}
        <div className="space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-quest-muted">
            Core Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => {
                  sound.playClick();
                  if (onClose) onClose();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/25 font-semibold'
                      : 'text-quest-muted hover:text-white hover:bg-quest-card'
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer / Reset Action */}
        <div className="pt-4 border-t border-quest-border/50 space-y-3">
          
          <div className="glass-card p-3 rounded-xl border border-quest-border/40">
            <div className="flex items-center justify-between text-xs text-quest-muted mb-1">
              <span>Exam Readiness</span>
              <span className="font-semibold text-quest-primary">
                {Math.round((stats.completedLevelIds.length / 8) * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-quest-surface rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-quest-primary to-quest-secondary rounded-full transition-all duration-500"
                style={{ width: `${(stats.completedLevelIds.length / 8) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-quest-muted mt-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{stats.completedLevelIds.length} of 8 Bosses Cleared</span>
            </div>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-quest-muted hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>

      </aside>

      {/* Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel-glow max-w-sm w-full p-6 rounded-2xl border border-rose-500/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Reset All Progress?</h3>
            <p className="text-xs text-quest-muted">
              This will lock all levels back to Level 1, reset XP, clear exam records, and reset hearts. This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold bg-quest-card hover:bg-quest-border text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition shadow-lg shadow-rose-600/30"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
