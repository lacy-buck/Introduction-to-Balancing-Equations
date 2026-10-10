import React, { useState, useEffect } from 'react';
import { ActiveModule } from './types/chemistry';
import { Module1Particles } from './components/modules/Module1Particles';
import { Module2TableTutorial } from './components/modules/Module2TableTutorial';
import { Module3Practice } from './components/modules/Module3Practice';
import { Module4Polyatomic } from './components/modules/Module4Polyatomic';
import { Module4Challenge } from './components/modules/Module4Challenge';
import { ExampleLessonModal } from './components/ExampleLessonModal';
import { 
  Atom, 
  Table, 
  Dumbbell, 
  Boxes,
  Flame, 
  Trophy,
  RotateCcw, 
  Volume2, 
  VolumeX, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('module1_particles');
  const [isExampleOpen, setIsExampleOpen] = useState(false);
  const [completedEquations, setCompletedEquations] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chembalance_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Persist completed equations
  useEffect(() => {
    try {
      localStorage.setItem('chembalance_completed', JSON.stringify(completedEquations));
    } catch {
      // Ignore localStorage errors
    }
  }, [completedEquations]);

  // Clean pleasant Web Audio API chime on balanced equation
  const playSuccessChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      // Tone 1: C5 (523.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Tone 2: G5 (783.99 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, now + 0.12);
      gain2.gain.setValueAtTime(0.15, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.55);
    } catch {
      // Audio autoplay may be prevented on initial interaction
    }
  };

  const handleCompleteEquation = (eqId: string) => {
    playSuccessChime();
    if (!completedEquations.includes(eqId)) {
      setCompletedEquations(prev => [...prev, eqId]);
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all completed equation progress?')) {
      setCompletedEquations([]);
      localStorage.removeItem('chembalance_completed');
    }
  };

  const handleSwitchModule = (mod: ActiveModule) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveModule(mod);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Zone 1: Single Text Element Wordmark */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Atom className="w-5 h-5 animate-spin-slow" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              ChemBalance Studio
            </span>
          </div>

          {/* Zone 2: 5 Clean Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              type="button"
              onClick={() => handleSwitchModule('module1_particles')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeModule === 'module1_particles'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Atom className="w-3.5 h-3.5 text-indigo-600" />
              <span>1. Particle Diagrams</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchModule('module2_table')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeModule === 'module2_table'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-emerald-600" />
              <span>2. Atom Inventory</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchModule('module3_practice')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeModule === 'module3_practice'
                  ? 'bg-white text-amber-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>3. Combustion</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchModule('module4_polyatomic')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeModule === 'module4_polyatomic'
                  ? 'bg-white text-purple-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Boxes className="w-3.5 h-3.5 text-purple-600" />
              <span>4. Polyatomic Ions</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchModule('module5_challenge')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeModule === 'module5_challenge'
                  ? 'bg-white text-rose-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-rose-600" />
              <span>5. Olympiad Challenge</span>
            </button>
          </nav>

          {/* Zone 3: Actions (Example Lesson Guide, Sound & Progress) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsExampleOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Example Lesson</span>
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              aria-label={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title={soundEnabled ? 'Sound FX Enabled' : 'Sound FX Muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold text-slate-700 border border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{completedEquations.length} Solved</span>
            </div>

            <button
              type="button"
              onClick={handleResetProgress}
              aria-label="Reset Progress"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Reset All Saved Progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-200 gap-1">
          <button
            type="button"
            onClick={() => handleSwitchModule('module1_particles')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeModule === 'module1_particles' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-white border'
            }`}
          >
            1. Diagrams
          </button>
          <button
            type="button"
            onClick={() => handleSwitchModule('module2_table')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeModule === 'module2_table' ? 'bg-emerald-600 text-white' : 'text-slate-600 bg-white border'
            }`}
          >
            2. Atom Table
          </button>
          <button
            type="button"
            onClick={() => handleSwitchModule('module3_practice')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeModule === 'module3_practice' ? 'bg-amber-600 text-white' : 'text-slate-600 bg-white border'
            }`}
          >
            3. Combustion
          </button>
          <button
            type="button"
            onClick={() => handleSwitchModule('module4_polyatomic')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeModule === 'module4_polyatomic' ? 'bg-purple-600 text-white' : 'text-slate-600 bg-white border'
            }`}
          >
            4. Polyatomic
          </button>
          <button
            type="button"
            onClick={() => handleSwitchModule('module5_challenge')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeModule === 'module5_challenge' ? 'bg-rose-600 text-white' : 'text-slate-600 bg-white border'
            }`}
          >
            5. Challenge
          </button>
        </div>
      </header>

      {/* Main Learning Stage Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeModule === 'module1_particles' && (
          <Module1Particles
            onCompleteEquation={handleCompleteEquation}
            completedEquations={completedEquations}
          />
        )}

        {activeModule === 'module2_table' && (
          <Module2TableTutorial
            onCompleteEquation={handleCompleteEquation}
            completedEquations={completedEquations}
          />
        )}

        {activeModule === 'module3_practice' && (
          <Module3Practice
            onCompleteEquation={handleCompleteEquation}
            completedEquations={completedEquations}
          />
        )}

        {activeModule === 'module4_polyatomic' && (
          <Module4Polyatomic
            onCompleteEquation={handleCompleteEquation}
            completedEquations={completedEquations}
          />
        )}

        {activeModule === 'module5_challenge' && (
          <Module4Challenge
            onCompleteEquation={handleCompleteEquation}
            completedEquations={completedEquations}
          />
        )}
      </main>

      {/* Example Walkthrough Modal */}
      <ExampleLessonModal
        isOpen={isExampleOpen}
        onClose={() => setIsExampleOpen(false)}
        onStartPracticing={() => {
          setIsExampleOpen(false);
          handleSwitchModule('module1_particles');
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">ChemBalance Studio</span>
            <span>·</span>
            <span>High School Chemistry Interactive Learning</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Law of Conservation of Mass: Matter is neither created nor destroyed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
