import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MODULE_4_EQUATIONS } from '../../data/equations';
import { calculateBalanceStatus } from '../../utils/chemistry';
import { EquationBench } from '../EquationBench';
import { BlankScratchpadTable } from '../BlankScratchpadTable';
import { 
  Flame, 
  Award, 
  BrainCircuit,
  ToggleLeft,
  ToggleRight,
  CheckCircle2
} from 'lucide-react';

interface Module4ChallengeProps {
  onCompleteEquation?: (eqId: string) => void;
  completedEquations: string[];
}

export const Module4Challenge: React.FC<Module4ChallengeProps> = ({
  onCompleteEquation,
  completedEquations,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const equation = MODULE_4_EQUATIONS[currentIdx];

  const [reactantCoeffs, setReactantCoeffs] = useState<number[]>(() => 
    equation.reactants.map(() => 0)
  );
  const [productCoeffs, setProductCoeffs] = useState<number[]>(() => 
    equation.products.map(() => 0)
  );

  const [showTable, setShowTable] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [showProTips, setShowProTips] = useState(true);
  const [solvedCount, setSolvedCount] = useState(0);

  // Reset coefficients when equation changes (keep viewport at lesson)
  useEffect(() => {
    setReactantCoeffs(equation.reactants.map(() => 0));
    setProductCoeffs(equation.products.map(() => 0));
    setShowHints(false);
  }, [currentIdx, equation]);

  const balanceStatus = calculateBalanceStatus(equation, reactantCoeffs, productCoeffs);

  // Trigger celebration ONLY on explicit student submission!
  const handleSuccess = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 }
    });
    setSolvedCount(prev => prev + 1);
    if (onCompleteEquation) {
      onCompleteEquation(equation.id);
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
  };

  const handleNext = () => {
    if (currentIdx < MODULE_4_EQUATIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  const handleSelectChallenge = (idx: number) => {
    setCurrentIdx(idx);
  };

  return (
    <div className="space-y-6">
      {/* Challenge Header */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Module 5 · Chemistry Olympiad Gauntlet</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Mastery Challenge: High-Difficulty Stoichiometry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Tackle the toughest balancing problems: large hydrocarbon combustion, multi-element reactions, and nested polyatomic ion parentheses. All coefficients must be positive whole integers (no fractions).
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/10 shrink-0">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-300 font-semibold uppercase block">
                Challenge Progress
              </span>
              <span className="text-base font-bold text-white font-mono">
                {MODULE_4_EQUATIONS.filter(eq => completedEquations.includes(eq.id)).length} / {MODULE_4_EQUATIONS.length} Solved
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Challenges:
        </span>
        {MODULE_4_EQUATIONS.map((eq, i) => {
          const isDone = completedEquations.includes(eq.id);
          const isCurrent = i === currentIdx;

          return (
            <button
              key={eq.id}
              type="button"
              onClick={() => handleSelectChallenge(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-rose-600 text-white shadow-xs'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">
                  {i + 1}
                </span>
              )}
              <span>{eq.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Pro-Tips Accordion (No fractions allowed!) */}
      {showProTips && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5 text-amber-900">
              <BrainCircuit className="w-4 h-4 text-amber-600" />
              <span>AP Chemistry & Olympiad Whole-Number Strategies:</span>
            </span>
            <button
              type="button"
              onClick={() => setShowProTips(false)}
              className="text-amber-700 hover:text-amber-900 text-[11px] underline"
            >
              Dismiss
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-2.5 bg-white/80 rounded-lg border border-amber-200/60">
              <strong className="block text-slate-800 mb-0.5">1. Polyatomic Packets</strong>
              If a polyatomic group like <code className="font-mono bg-amber-100 px-1 rounded">SO₄</code> or <code className="font-mono bg-amber-100 px-1 rounded">NO₃</code> appears unchanged on both sides, balance it as one single unit instead of splitting individual atoms!
            </div>
            <div className="p-2.5 bg-white/80 rounded-lg border border-amber-200/60">
              <strong className="block text-slate-800 mb-0.5">2. Odd-to-Even Doubling (No Fractions)</strong>
              If an element appears as an odd number on one side but comes in pairs (like <code className="font-mono bg-amber-100 px-1 rounded">O₂</code>), double the compounds to force all coefficients to be whole numbers without fractions!
            </div>
            <div className="p-2.5 bg-white/80 rounded-lg border border-amber-200/60">
              <strong className="block text-slate-800 mb-0.5">3. Element Isolation</strong>
              Always save pure elemental molecules (like <code className="font-mono bg-amber-100 px-1 rounded">Cl₂</code> or <code className="font-mono bg-amber-100 px-1 rounded">O₂</code>) for the absolute last step so changing their coefficient does not disturb other elements.
            </div>
          </div>
        </div>
      )}

      {/* Control Bar: Blank Table Toggle */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-2xs"
        >
          {showTable ? <ToggleRight className="w-5 h-5 text-indigo-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
          <span>{showTable ? 'Blank Worksheet Table: VISIBLE UNDER EQUATION' : 'Blank Worksheet Table: HIDDEN'}</span>
        </button>
      </div>

      {/* Main Chemical Equation Bench (Single-line equation, Blank 3-Column Worksheet Table DIRECTLY embedded) */}
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
        hasNext={currentIdx < MODULE_4_EQUATIONS.length - 1}
        showTable={showTable}
        customTable={<BlankScratchpadTable key={equation.id} equationId={equation.id} />}
        isCompactOneLine={true}
        instructions="Determine whole-number stoichiometric coefficients to balance this reaction on a single line. A blank 3-column worksheet table is available below for you to fill in completely on your own. When finished, click 'Check Answer' below to submit your solution."
      />
    </div>
  );
};
