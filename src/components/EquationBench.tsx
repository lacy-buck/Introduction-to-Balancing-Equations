import React, { useState, useEffect } from 'react';
import { ChemicalEquation, BalanceStatus } from '../types/chemistry';
import { CoefficientInput } from './CoefficientInput';
import { MoleculeClusterView } from './MoleculeClusterView';
import { AtomInventoryTable } from './AtomInventoryTable';
import { formatChemicalFormula } from '../utils/chemistry';
import { 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Lightbulb, 
  RotateCcw, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ClipboardList
} from 'lucide-react';

interface EquationBenchProps {
  equation: ChemicalEquation;
  reactantCoefficients: number[];
  productCoefficients: number[];
  onReactantCoeffChange: (index: number, val: number) => void;
  onProductCoeffChange: (index: number, val: number) => void;
  onReset: () => void;
  onNext?: () => void;
  onSuccess?: () => void;
  balanceStatus: BalanceStatus;
  showHints?: boolean;
  onToggleHints?: () => void;
  hasNext?: boolean;
  showParticles?: boolean;
  showTable?: boolean;
  studentFillableTable?: boolean;
  studentReactantInputs?: Record<string, string>;
  studentProductInputs?: Record<string, string>;
  onStudentInputChange?: (element: string, side: 'reactant' | 'product', value: string) => void;
  instructions?: string;
  isCompactOneLine?: boolean;
  customTable?: React.ReactNode;
  showTableFeedback?: boolean;
}

type SubmissionStatus = 'idle' | 'correct' | 'incorrect' | 'incomplete';

export const EquationBench: React.FC<EquationBenchProps> = ({
  equation,
  reactantCoefficients,
  productCoefficients,
  onReactantCoeffChange,
  onProductCoeffChange,
  onReset,
  onNext,
  onSuccess,
  balanceStatus,
  showHints = false,
  onToggleHints,
  hasNext = true,
  showParticles = false,
  showTable = false,
  studentFillableTable = false,
  studentReactantInputs,
  studentProductInputs,
  onStudentInputChange,
  instructions,
  isCompactOneLine = false,
  customTable,
  showTableFeedback = true,
}) => {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);

  // Reset submission status and hint index when equation changes
  useEffect(() => {
    setSubmissionStatus('idle');
    setCurrentHintIndex(0);
  }, [equation.id]);

  const handleReactantChange = (idx: number, val: number) => {
    if (submissionStatus !== 'idle') {
      setSubmissionStatus('idle');
    }
    onReactantCoeffChange(idx, val);
  };

  const handleProductChange = (idx: number, val: number) => {
    if (submissionStatus !== 'idle') {
      setSubmissionStatus('idle');
    }
    onProductCoeffChange(idx, val);
  };

  const handleResetClick = () => {
    setSubmissionStatus('idle');
    onReset();
  };

  const handleCheckAnswer = () => {
    const allFilled = 
      reactantCoefficients.every(c => c >= 1) && 
      productCoefficients.every(c => c >= 1);

    if (!allFilled) {
      setSubmissionStatus('incomplete');
      return;
    }

    if (balanceStatus.isBalanced) {
      setSubmissionStatus('correct');
      if (onSuccess) {
        onSuccess();
      }
    } else {
      setSubmissionStatus('incorrect');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Equation Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {equation.title}
            </h3>
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
              {equation.reactionType.replace('_', ' ')}
            </span>
          </div>
          {equation.description && (
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              {equation.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onToggleHints && equation.hints && equation.hints.length > 0 && (
            <button
              type="button"
              onClick={onToggleHints}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                showHints 
                  ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{showHints ? 'Hide Hints' : 'Need a Hint?'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleResetClick}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors"
            title="Reset all coefficients to 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Prominent Student Instructions Inside the Box */}
      <div className="bg-indigo-50/70 border border-indigo-100/90 rounded-xl px-4 py-3 flex items-start gap-3 text-xs text-indigo-950">
        <div className="p-1 rounded-md bg-indigo-600 text-white shrink-0 mt-0.5 shadow-2xs">
          <ClipboardList className="w-3.5 h-3.5" />
        </div>
        <div className="space-y-0.5">
          <span className="font-bold text-indigo-900 block text-xs">
            Student Instructions:
          </span>
          <p className="text-indigo-800/90 leading-relaxed">
            {instructions || "Click each coefficient box [ ? ] to adjust the number of molecules until the equation is balanced. When you are finished, click 'Check Answer' below to submit."}
          </p>
        </div>
      </div>

      {/* Main Chemical Equation Bench (Single-line in Challenge, Unified with Particles in Module 1) */}
      <div className={`bg-slate-50/70 border border-slate-200/80 rounded-xl select-none ${
        isCompactOneLine
          ? 'p-2 sm:p-2.5 overflow-x-auto flex items-center justify-start md:justify-center gap-1.5 whitespace-nowrap min-h-[58px] w-full'
          : 'p-4 sm:p-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4'
      }`}>
        {/* Reactants */}
        <div className={`flex items-center justify-center ${isCompactOneLine ? 'flex-nowrap gap-1' : 'flex-wrap gap-2 sm:gap-3'}`}>
          {equation.reactants.map((reactant, idx) => {
            const coeff = reactantCoefficients[idx] || 0;

            if (showParticles) {
              return (
                <React.Fragment key={`r-elem-${idx}`}>
                  <div className="flex flex-col items-center p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs min-w-[125px] sm:min-w-[145px]">
                    <div className="w-full h-28 sm:h-32 bg-slate-50/90 rounded-lg border border-slate-100 flex items-center justify-center p-1 mb-2.5 overflow-hidden">
                      <MoleculeClusterView compound={reactant} coefficient={coeff} />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <CoefficientInput
                        value={coeff}
                        onChange={(val) => handleReactantChange(idx, val)}
                        compoundFormula={reactant.formula}
                        isProduct={false}
                      />
                      <div className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-mono">
                        {formatChemicalFormula(reactant.formula)}
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 mt-1 truncate max-w-[120px]">
                      {reactant.name}
                    </div>
                  </div>

                  {idx < equation.reactants.length - 1 && (
                    <span className="text-slate-400 font-bold text-xl px-1">
                      +
                    </span>
                  )}
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={`r-elem-${idx}`}>
                <div className={`flex items-center bg-white rounded-lg border border-slate-200 shadow-2xs ${
                  isCompactOneLine ? 'px-1.5 py-0.5 gap-0.5' : 'px-2.5 py-1.5 gap-1'
                }`}>
                  <CoefficientInput
                    value={coeff}
                    onChange={(val) => handleReactantChange(idx, val)}
                    compoundFormula={reactant.formula}
                    isProduct={false}
                    compact={isCompactOneLine}
                  />
                  <div className={`font-bold text-slate-900 tracking-tight font-mono ml-0.5 ${
                    isCompactOneLine ? 'text-xs sm:text-sm' : 'text-lg sm:text-xl'
                  }`}>
                    {formatChemicalFormula(reactant.formula)}
                  </div>
                </div>

                {idx < equation.reactants.length - 1 && (
                  <span className={`text-slate-400 font-bold ${isCompactOneLine ? 'text-xs sm:text-sm px-0.5' : 'text-xl px-1'}`}>
                    +
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Reaction Arrow */}
        <div className={`flex items-center justify-center ${isCompactOneLine ? 'px-0.5' : 'px-2'}`}>
          <div className={`rounded-full border transition-all ${
            isCompactOneLine ? 'p-1' : 'p-2'
          } ${
            submissionStatus === 'correct' 
              ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' 
              : 'bg-slate-200 text-slate-600 border-slate-300'
          }`}>
            <ArrowRight className={isCompactOneLine ? 'w-3.5 h-3.5' : 'w-5 h-5'} />
          </div>
        </div>

        {/* Products */}
        <div className={`flex items-center justify-center ${isCompactOneLine ? 'flex-nowrap gap-1' : 'flex-wrap gap-2 sm:gap-3'}`}>
          {equation.products.map((product, idx) => {
            const coeff = productCoefficients[idx] || 0;

            if (showParticles) {
              return (
                <React.Fragment key={`p-elem-${idx}`}>
                  <div className="flex flex-col items-center p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs min-w-[125px] sm:min-w-[145px]">
                    <div className="w-full h-28 sm:h-32 bg-slate-50/90 rounded-lg border border-slate-100 flex items-center justify-center p-1 mb-2.5 overflow-hidden">
                      <MoleculeClusterView compound={product} coefficient={coeff} />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <CoefficientInput
                        value={coeff}
                        onChange={(val) => handleProductChange(idx, val)}
                        compoundFormula={product.formula}
                        isProduct={true}
                      />
                      <div className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-mono">
                        {formatChemicalFormula(product.formula)}
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 mt-1 truncate max-w-[120px]">
                      {product.name}
                    </div>
                  </div>

                  {idx < equation.products.length - 1 && (
                    <span className="text-slate-400 font-bold text-xl px-1">
                      +
                    </span>
                  )}
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={`p-elem-${idx}`}>
                <div className={`flex items-center bg-white rounded-lg border border-slate-200 shadow-2xs ${
                  isCompactOneLine ? 'px-1.5 py-0.5 gap-0.5' : 'px-2.5 py-1.5 gap-1'
                }`}>
                  <CoefficientInput
                    value={coeff}
                    onChange={(val) => handleProductChange(idx, val)}
                    compoundFormula={product.formula}
                    isProduct={true}
                    compact={isCompactOneLine}
                  />
                  <div className={`font-bold text-slate-900 tracking-tight font-mono ml-0.5 ${
                    isCompactOneLine ? 'text-xs sm:text-sm' : 'text-lg sm:text-xl'
                  }`}>
                    {formatChemicalFormula(product.formula)}
                  </div>
                </div>

                {idx < equation.products.length - 1 && (
                  <span className={`text-slate-400 font-bold ${isCompactOneLine ? 'text-xs sm:text-sm px-0.5' : 'text-xl px-1'}`}>
                    +
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Atom Inventory Table DIRECTLY Under Equation Bench (Shrunk & Compact) */}
      {showTable && (
        <div className="pt-1">
          {customTable ? (
            customTable
          ) : (
            <AtomInventoryTable
              elementTallies={balanceStatus.elementTallies}
              reactants={equation.reactants}
              products={equation.products}
              reactantCoefficients={reactantCoefficients}
              productCoefficients={productCoefficients}
              showBreakdown={!studentFillableTable}
              studentFillable={studentFillableTable}
              studentReactantInputs={studentReactantInputs}
              studentProductInputs={studentProductInputs}
              onStudentInputChange={onStudentInputChange}
              showFeedback={showTableFeedback}
            />
          )}
        </div>
      )}

      {/* Submission Action Bar: Students MUST explicitly click "Check Answer" */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCheckAnswer}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all hover:scale-[1.01]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check Answer</span>
          </button>

          {submissionStatus === 'incorrect' && (
            <div className="text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl flex items-center gap-2 animate-in fade-in duration-150">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Not balanced yet. Adjust the coefficients and check again!</span>
            </div>
          )}

          {submissionStatus === 'incomplete' && (
            <div className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl flex items-center gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Please set a number (at least 1) for every compound before checking.</span>
            </div>
          )}
        </div>

        {hasNext && onNext && submissionStatus === 'correct' && (
          <button
            type="button"
            onClick={() => {
              setSubmissionStatus('idle');
              onNext();
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all hover:translate-x-0.5"
          >
            <span>Next Problem</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Correct Submission Banner: Detailed Total Atom Numbers breakdown */}
      {submissionStatus === 'correct' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-3 text-emerald-900 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <span>Correct! The equation is balanced!</span>
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xs text-emerald-700">
                  Conservation of mass satisfied: {balanceStatus.totalReactantAtoms} total reactant atoms = {balanceStatus.totalProductAtoms} total product atoms.
                </div>
              </div>
            </div>

            {hasNext && onNext && (
              <button
                type="button"
                onClick={() => {
                  setSubmissionStatus('idle');
                  onNext();
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:translate-x-0.5"
              >
                <span>Next Problem</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Conserved atom counts breakdown */}
          <div className="pt-2.5 border-t border-emerald-200/80">
            <div className="text-xs font-bold text-emerald-950 mb-1.5 flex items-center gap-1">
              <span>Total Atom Numbers Conserved:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {balanceStatus.elementTallies.map((tally) => (
                <div
                  key={tally.element}
                  className="px-3 py-1.5 rounded-lg bg-white border border-emerald-200 shadow-2xs flex items-center gap-2 text-xs"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-600"
                    style={{ backgroundColor: tally.color }}
                  ></span>
                  <span className="font-semibold text-slate-800">
                    {tally.name} ({tally.element}):
                  </span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {tally.reactantCount} on both sides
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sequential One-Hint-at-a-Time Pager */}
      {showHints && equation.hints && equation.hints.length > 0 && (
        <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 space-y-3 text-xs text-amber-950 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-amber-200/70 pb-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>
                Hint {currentHintIndex + 1} of {equation.hints.length}
              </span>
            </div>

            {/* Hint Pager Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentHintIndex(prev => Math.max(0, prev - 1))}
                disabled={currentHintIndex === 0}
                className="px-2 py-1 rounded bg-white hover:bg-amber-100 disabled:opacity-40 disabled:cursor-not-allowed border border-amber-200 font-semibold text-[11px] text-amber-900 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentHintIndex(prev => Math.min(equation.hints!.length - 1, prev + 1))}
                disabled={currentHintIndex >= equation.hints.length - 1}
                className="px-2 py-1 rounded bg-white hover:bg-amber-100 disabled:opacity-40 disabled:cursor-not-allowed border border-amber-200 font-semibold text-[11px] text-amber-900 flex items-center gap-1"
              >
                <span>Next Hint</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-3 bg-white/90 rounded-lg border border-amber-200/80 font-medium text-amber-950 text-[13px] leading-relaxed">
            {equation.hints[currentHintIndex]}
          </div>
        </div>
      )}
    </div>
  );
};
