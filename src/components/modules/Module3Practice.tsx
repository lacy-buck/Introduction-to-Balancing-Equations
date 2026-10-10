import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MODULE_3_EQUATIONS } from '../../data/equations';
import { calculateBalanceStatus } from '../../utils/chemistry';
import { EquationBench } from '../EquationBench';
import { 
  Dumbbell, 
  Flame, 
  ToggleLeft, 
  ToggleRight, 
  Trophy,
  RotateCcw
} from 'lucide-react';

interface Module3PracticeProps {
  onCompleteEquation?: (eqId: string) => void;
  completedEquations: string[];
}

export const Module3Practice: React.FC<Module3PracticeProps> = ({
  onCompleteEquation,
  completedEquations,
}) => {
  // Practice state
  const [showTable, setShowTable] = useState(true);
  const [tier, setTier] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Filter equations available in current tier
  const tierEquations = MODULE_3_EQUATIONS.filter(eq => eq.difficulty === tier);
  const [currentIdxInTier, setCurrentIdxInTier] = useState(0);

  const equation = tierEquations[currentIdxInTier] || MODULE_3_EQUATIONS[0];

  // Coefficients state
  const [reactantCoeffs, setReactantCoeffs] = useState<number[]>(() => 
    equation.reactants.map(() => 0)
  );
  const [productCoeffs, setProductCoeffs] = useState<number[]>(() => 
    equation.products.map(() => 0)
  );
  const [showHints, setShowHints] = useState(false);

  // Student manual input state for scratchpad atom table
  const [studentReactantInputs, setStudentReactantInputs] = useState<Record<string, string>>({});
  const [studentProductInputs, setStudentProductInputs] = useState<Record<string, string>>({});

  // Reset coefficients and clear table inputs when equation changes (keep viewport at lesson)
  useEffect(() => {
    setReactantCoeffs(equation.reactants.map(() => 0));
    setProductCoeffs(equation.products.map(() => 0));
    setStudentReactantInputs({});
    setStudentProductInputs({});
    setShowHints(false);
  }, [equation]);

  const balanceStatus = calculateBalanceStatus(equation, reactantCoeffs, productCoeffs);

  // Trigger celebration ONLY on explicit student submission!
  const handleSuccess = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.65 }
    });

    const newStreak = streak + 1;
    setStreak(newStreak);
    const pointsEarned = tier * 100 + newStreak * 25;
    setScore(prev => prev + pointsEarned);

    if (onCompleteEquation) {
      onCompleteEquation(equation.id);
    }

    // Adaptive difficulty promotion
    if (newStreak >= 2 && tier < 4) {
      setTimeout(() => {
        setTier(prev => Math.min(4, prev + 1));
        setCurrentIdxInTier(0);
      }, 1200);
    }
  };

  const handleReactantChange = (idx: number, val: number) => {
    const updated = [...reactantCoeffs];
    updated[idx] = val;
    setReactantCoeffs(updated);
  };

  const handleProductChange = (idx: number, val: number) => {
    const updated = [...productCoeffs];
    updated[idx] = val;
    setProductCoeffs(updated);
  };

  const handleReset = () => {
    setReactantCoeffs(equation.reactants.map(() => 0));
    setProductCoeffs(equation.products.map(() => 0));
    setStudentReactantInputs({});
    setStudentProductInputs({});
  };

  const handleStudentInputChange = (element: string, side: 'reactant' | 'product', value: string) => {
    if (side === 'reactant') {
      setStudentReactantInputs(prev => ({ ...prev, [element]: value }));
    } else {
      setStudentProductInputs(prev => ({ ...prev, [element]: value }));
    }
  };

  const handleClearTableInputs = () => {
    setStudentReactantInputs({});
    setStudentProductInputs({});
  };

  const handleNext = () => {
    if (currentIdxInTier < tierEquations.length - 1) {
      setCurrentIdxInTier(currentIdxInTier + 1);
    } else {
      if (tier < 4) {
        setTier(tier + 1);
        setCurrentIdxInTier(0);
      } else {
        setCurrentIdxInTier(0);
      }
    }
  };

  const tierNames = [
    '',
    'Tier 1: Foundations (Methane & Simple Combustion)',
    'Tier 2: Intermediate (Propane & Alkane Combustion)',
    'Tier 3: Advanced (Alcohols & Alkynes)',
    'Tier 4: Mastery (Biofuels & Multi-Product Reactions)'
  ];

  return (
    <div className="space-y-6">
      {/* Practice Header with Adaptive Stats */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Module 3 · Combustion Reactions</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Combustion: Master Hydrocarbon Balancing
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Practice balancing fuel combustion reactions (hydrocarbons & alcohols). The difficulty scales as you build a streak. The Atom Table below is available as your worksheet scratchpad—fill it out to track your counts, or balance mentally!
            </p>
          </div>

          {/* Gamified HUD: Tier, Streak, Points */}
          <div className="flex items-center gap-3 bg-slate-800/90 border border-slate-700/80 px-4 py-3 rounded-xl shrink-0">
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                Current Level
              </span>
              <span className="text-base font-bold text-cyan-400 font-mono">
                Tier {tier}/4
              </span>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block flex items-center justify-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> Streak
              </span>
              <span className="text-base font-bold text-amber-400 font-mono">
                {streak} 🔥
              </span>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-center px-2">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block flex items-center justify-center gap-1">
                <Trophy className="w-3 h-3 text-yellow-400" /> XP
              </span>
              <span className="text-base font-bold text-yellow-400 font-mono">
                {score}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Table Toggle & Tier Manual Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Table Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowTable(!showTable)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all shadow-2xs"
          >
            {showTable ? (
              <>
                <ToggleRight className="w-5 h-5 text-indigo-600" />
                <span>Atom Table: <strong className="text-indigo-600">AVAILABLE (Student Worksheet)</strong></span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-5 h-5 text-slate-400" />
                <span>Atom Table: <strong className="text-slate-500">HIDDEN (Mental Math)</strong></span>
              </>
            )}
          </button>

          {showTable && (
            <button
              type="button"
              onClick={handleClearTableInputs}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Clear worksheet numbers"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Worksheet</span>
            </button>
          )}

          <span className="text-[11px] text-slate-500 hidden sm:inline">
            {showTable ? 'Table is blank for you to calculate your atom counts if you want to use it.' : 'Mental math mode! Balancing purely by formula.'}
          </span>
        </div>

        {/* Tier Selector Chips */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-semibold text-[11px] mr-1">Difficulty:</span>
          {[1, 2, 3, 4].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTier(t);
                setCurrentIdxInTier(0);
              }}
              className={`px-2.5 py-1 rounded-md font-semibold text-xs transition-colors ${
                tier === t
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tier {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tier Heading Card */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-700">
            {tierNames[tier]}
          </span>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Equation {currentIdxInTier + 1} of {tierEquations.length}
        </span>
      </div>

      {/* Main Chemical Equation Bench (Table is student-fillable and NOT pre-filled!) */}
      <EquationBench
        equation={equation}
        reactantCoefficients={reactantCoeffs}
        productCoefficients={productCoeffs}
        onReactantCoeffChange={handleReactantChange}
        onProductCoeffChange={handleProductChange}
        onReset={handleReset}
        onNext={handleNext}
        onSuccess={handleSuccess}
        balanceStatus={balanceStatus}
        showHints={showHints}
        onToggleHints={() => setShowHints(!showHints)}
        hasNext={true}
        showTable={showTable}
        studentFillableTable={true}
        studentReactantInputs={studentReactantInputs}
        studentProductInputs={studentProductInputs}
        onStudentInputChange={handleStudentInputChange}
        showTableFeedback={false}
        instructions="Balance the equation by setting coefficients. The Atom Table below is available as your scratchpad worksheet—fill it out to track your atom counts if you wish! When ready, click 'Check Answer' below to submit."
      />
    </div>
  );
};
