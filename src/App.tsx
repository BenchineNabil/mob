import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './views/DashboardView';
import { LevelMapView } from './views/LevelMapView';
import { LessonView } from './views/LessonView';
import { QuizView } from './views/QuizView';
import { BossFightView } from './views/BossFightView';
import { GameView } from './views/GameView';
import { CodingArenaView } from './views/CodingArenaView';
import { ExamView } from './views/ExamView';
import { StatisticsView } from './views/StatisticsView';
import { TrapCompendiumView } from './views/TrapCompendiumView';

export const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-quest-bg text-quest-text flex flex-col font-sans">
        
        {/* Sticky Global Top Bar */}
        <Navbar 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen} 
        />

        <div className="flex flex-1">
          {/* Collapsible / Responsive Navigation Drawer */}
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />

          {/* Main Workspace Body */}
          <main className="flex-1 lg:pl-64 p-4 lg:p-8 max-w-7xl mx-auto w-full transition-all">
            <Routes>
              <Route path="/" element={<DashboardView />} />
              <Route path="/levels" element={<LevelMapView />} />
              <Route path="/levels/:id/lesson" element={<LessonView />} />
              <Route path="/levels/:id/quiz" element={<QuizView />} />
              <Route path="/levels/:id/boss" element={<BossFightView />} />
              <Route path="/levels/:id/games" element={<GameView />} />
              <Route path="/arena" element={<CodingArenaView />} />
              <Route path="/exam" element={<ExamView />} />
              <Route path="/stats" element={<StatisticsView />} />
              <Route path="/traps" element={<TrapCompendiumView />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;
