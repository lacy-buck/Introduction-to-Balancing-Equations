import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MODULE_2_EQUATIONS } from '../../data/equations';
import { calculateBalanceStatus } from '../../utils/chemistry';
import { EquationBench } from '../EquationBench';
import { 
  Table, 
  CheckCircle2, 
  Calculator,
  BookOpen
} from 'lucide-react';

interface Module2TableTutorialProps {
  onCompleteEquation?: (eqId: string) => void;
  completedEquations: string[];
}

export const Module2TableTutorial: React.FC<Module2TableTutorialProps> = ({
  onCompleteEquation,
  completedEquations,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const equation = MODULE_2_EQUATIONS[currentIdx];

  // Coefficients state
  const [reactantCoeffs, setReactantCoeffs] = useState<number[]>(() => 
    equation.reactants.map(() => 0)
  );
  const [productCoeffs, setProductCoeffs] = useState<number[]>(() => 
    equation.products.map(() => 0)
  );
  const [showHints, setShowHints] = useState(false);
  const [showMethodTutorial, setShowMethodTutorial] = useState(true);

  // Reset state when switching equation (keep viewport at lesson)
  useEffect(() => {
    setReactantCoeffs(equation.reactants.map(() => 0));
    setProductCoeffs(equation.products.map(() => 0));
    setShowHints(false);
  }, [currentIdx, equation]);

  const balanceStatus = calculateBalanceStatus(equation, reactantCoeffs, productCoeffs);

  // Called ONLY when the student explicitly clicks "Check Answer" and it is correct!
  const handleSuccess = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
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
    if (currentIdx < MODULE_2_EQUATIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  const handleSelectLesson = (idx: number) => {
    setCurrentIdx(idx);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Table className="w-4 h-4" />
            <span>Module 2 · The Classroom Standard</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Atom Inventory Table: Master the Tally Method
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In chemistry class and exams, you won't have molecular particle pictures! Professional chemists and students rely on the <strong>Atom Inventory Table</strong> directly under the equation. Learn how each coefficient multiplies the subscripts to balance every row.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowMethodTutorial(!showMethodTutorial)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showMethodTutorial ? 'Hide Step-by-Step Guide' : 'Show How to Read This Table'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tutorial Guide Banner */}
      {showMethodTutorial && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
              <span>The Multiplication Formula</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Every count equals:
              <br />
              <strong className="text-indigo-700 font-mono text-[13px] block my-1">
                Count = Coefficient × Subscript
              </strong>
              If there is no subscript, it is an implied 1 (e.g. in <code className="bg-white px-1 border rounded">MgO</code>, Mg has 1 and O has 1).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Look Directly Below Each Side</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              The table right under the equation keeps track of reactants on the left and products on the right. Watch the counts update as you adjust coefficients!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Submit to Verify</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              When all rows show equal atom counts on the Reactants (left) and Products (right), click <strong>Check Answer</strong> to submit your solution!
            </p>
          </div>
        </div>
      )}

      {/* Lesson Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Lessons:
        </span>
        {MODULE_2_EQUATIONS.map((eq, i) => {
          const isDone = completedEquations.includes(eq.id);
          const isCurrent = i === currentIdx;

          return (
            <button
              key={eq.id}
              type="button"
              onClick={() => handleSelectLesson(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-emerald-600 text-white shadow-xs'
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
              <span>{eq.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Unified Equation Bench: Atom Inventory Table is DIRECTLY Inside the Same Box! */}
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
        hasNext={currentIdx < MODULE_2_EQUATIONS.length - 1}
        showTable={true}
        instructions="Look at the Atom Inventory Table directly under the equation. Adjust the coefficients in front of each formula until the Reactants and Products counts in the table are equal. Then click 'Check Answer' below to submit!"
      />
    </div>
  );
};
