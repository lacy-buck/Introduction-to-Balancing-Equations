import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MODULE_1_EQUATIONS } from '../../data/equations';
import { calculateBalanceStatus } from '../../utils/chemistry';
import { EquationBench } from '../EquationBench';
import { 
  BookOpen, 
  CheckCircle2,
  Atom
} from 'lucide-react';

interface Module1ParticlesProps {
  onCompleteEquation?: (eqId: string) => void;
  completedEquations: string[];
}

export const Module1Particles: React.FC<Module1ParticlesProps> = ({
  onCompleteEquation,
  completedEquations,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const equation = MODULE_1_EQUATIONS[currentIdx];

  // Coefficients state
  const [reactantCoeffs, setReactantCoeffs] = useState<number[]>(() => 
    equation.reactants.map(() => 0)
  );
  const [productCoeffs, setProductCoeffs] = useState<number[]>(() => 
    equation.products.map(() => 0)
  );
  const [showHints, setShowHints] = useState(false);
  const [showConceptGuide, setShowConceptGuide] = useState(true);

  // Re-initialize coefficients when switching equations (keep viewport at lesson)
  useEffect(() => {
    setReactantCoeffs(equation.reactants.map(() => 0));
    setProductCoeffs(equation.products.map(() => 0));
    setShowHints(false);
  }, [currentIdx, equation]);

  // Balance status calculation
  const balanceStatus = calculateBalanceStatus(equation, reactantCoeffs, productCoeffs);

  // Called ONLY when the student explicitly clicks "Check Answer" and it is correct!
  const handleSuccess = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.65 }
    });
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
    if (currentIdx < MODULE_1_EQUATIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Banner */}
      <div className="bg-indigo-900 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Atom className="w-4 h-4 text-cyan-400" />
            <span>Module 1 · Foundations of Balancing</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Visual Particle Sandbox: See the Atoms in Action
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
            In chemistry, matter is never created or destroyed. Setting each stoichiometric coefficient multiplies that whole molecular cluster right above the formula until every atom on the left equals every atom on the right.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowConceptGuide(!showConceptGuide)}
              className="px-3 py-1.5 rounded-lg bg-indigo-800/80 hover:bg-indigo-700 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-indigo-700"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
              <span>{showConceptGuide ? 'Hide Concept Primer' : 'Show Concept Primer (Subscripts vs Coefficients)'}</span>
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Concept Primer Card */}
      {showConceptGuide && (
        <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span>Subscripts Cannot Change</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Subscripts like the <strong>2</strong> in <code className="font-mono bg-white px-1 border rounded">H₂O</code> define chemical bonds and identity. Changing it to <code className="font-mono bg-white px-1 border rounded">H₂O₂</code> turns water into toxic bleach!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Coefficients Multiply Clusters</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              The big coefficient tells how many complete molecules you have. Placing a <code className="font-mono bg-white px-1 border rounded font-bold">2</code> in front of <code className="font-mono bg-white px-1 border rounded">2 H₂O</code> displays 2 separate water molecules (4 Hydrogen, 2 Oxygen).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Submit to Verify</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Count each colored sphere on the reactant side and the product side. Once you believe both sides have equal atom counts, click <strong>Check Answer</strong> below to submit!
            </p>
          </div>
        </div>
      )}

      {/* Lesson Equation Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Lessons:
        </span>
        {MODULE_1_EQUATIONS.map((eq, i) => {
          const isDone = completedEquations.includes(eq.id);
          const isCurrent = i === currentIdx;

          return (
            <button
              key={eq.id}
              type="button"
              onClick={() => setCurrentIdx(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-indigo-600 text-white shadow-xs'
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

      {/* Unified Equation Bench: Particle Sandbox in Same Box + Student Instructions + Submit Button */}
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
        hasNext={currentIdx < MODULE_1_EQUATIONS.length - 1}
        showParticles={true}
        instructions="Click each coefficient box [ ? ] to adjust how many molecules you need. Watch the particle diagrams update inside each card until you think all atoms on both sides match. Then click 'Check Answer' below to submit!"
      />
    </div>
  );
};
