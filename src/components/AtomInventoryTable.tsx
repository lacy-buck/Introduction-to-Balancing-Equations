import React from 'react';
import { ElementTally, Compound } from '../types/chemistry';
import { Check, Equal, X } from 'lucide-react';

interface AtomInventoryTableProps {
  elementTallies: ElementTally[];
  reactants: Compound[];
  products: Compound[];
  reactantCoefficients: number[];
  productCoefficients: number[];
  showBreakdown?: boolean;
  studentFillable?: boolean;
  studentReactantInputs?: Record<string, string>;
  studentProductInputs?: Record<string, string>;
  onStudentInputChange?: (element: string, side: 'reactant' | 'product', value: string) => void;
  showFeedback?: boolean;
}

export const AtomInventoryTable: React.FC<AtomInventoryTableProps> = ({
  elementTallies,
  reactants,
  products,
  reactantCoefficients,
  productCoefficients,
  showBreakdown = true,
  studentFillable = false,
  studentReactantInputs = {},
  studentProductInputs = {},
  onStudentInputChange,
  showFeedback = true,
}) => {
  // Helper to generate formula breakdown text: e.g. "2 × 1"
  const getCalculationBreakdown = (element: string, isProduct: boolean) => {
    const list = isProduct ? products : reactants;
    const coeffs = isProduct ? productCoefficients : reactantCoefficients;
    const terms: string[] = [];

    list.forEach((comp, idx) => {
      // Check if it's a polyatomic group tally
      let atomCount = comp.atoms[element] || 0;
      if (comp.polyatomicCounts && comp.polyatomicCounts[element]) {
        atomCount = comp.polyatomicCounts[element];
      }

      if (atomCount > 0) {
        const c = coeffs[idx] || 0;
        if (atomCount === 1) {
          terms.push(`${c} × 1`);
        } else {
          terms.push(`${c} × ${atomCount}`);
        }
      }
    });

    return terms.join(' + ') || '0';
  };

  return (
    <div className="max-w-[340px] sm:max-w-[380px] mx-auto w-full bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Header: Pulled closer together */}
      <div className="grid grid-cols-[72px_1fr_72px] sm:grid-cols-[84px_1fr_84px] items-center bg-slate-100/90 border-b border-slate-200 text-[11px] font-bold text-slate-700 py-1.5 px-2.5 select-none text-center">
        <div className="flex items-center justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          <span>Reactants</span>
        </div>
        <div className="text-center font-bold text-slate-800">
          <span>Element / Group</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span>Products</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </div>
      </div>

      {/* Rows: Shrunk & pulled tight */}
      <div className="divide-y divide-slate-100 text-xs">
        {elementTallies.map((tally) => {
          const isBalanced = tally.isBalanced;

          // Student fill-in values for practice
          const rVal = studentReactantInputs[tally.element];
          const pVal = studentProductInputs[tally.element];
          const rCorrect = rVal !== undefined && rVal !== '' && parseInt(rVal, 10) === tally.reactantCount;
          const pCorrect = pVal !== undefined && pVal !== '' && parseInt(pVal, 10) === tally.productCount;

          return (
            <div
              key={tally.element}
              className={`grid grid-cols-[72px_1fr_72px] sm:grid-cols-[84px_1fr_84px] items-center py-1.5 px-2 transition-colors ${
                !showFeedback 
                  ? 'bg-white' 
                  : isBalanced 
                  ? 'bg-emerald-50/20' 
                  : 'bg-amber-50/20'
              }`}
            >
              {/* Reactant Side Count */}
              <div className="flex flex-col items-center justify-center">
                {studentFillable && onStudentInputChange ? (
                  <div className="flex items-center justify-center">
                    <input
                      type="number"
                      min="0"
                      max="99"
                      value={rVal ?? ''}
                      placeholder="?"
                      onChange={(e) => onStudentInputChange(tally.element, 'reactant', e.target.value)}
                      className={`w-8 h-7 text-center font-mono font-bold text-xs rounded border focus:outline-none focus:ring-1 ${
                        !showFeedback
                          ? 'border-slate-300 bg-white text-slate-800 placeholder:text-slate-300 focus:border-slate-400 focus:ring-slate-300'
                          : rVal === undefined || rVal === ''
                          ? 'border-slate-300 bg-white text-slate-800'
                          : rCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : 'border-rose-400 bg-rose-50 text-rose-800'
                      }`}
                    />
                    {showFeedback && rVal !== undefined && rVal !== '' && (
                      <span className="ml-1">
                        {rCorrect ? (
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        ) : (
                          <X className="w-3 h-3 text-rose-500 shrink-0" />
                        )}
                      </span>
                    )}
                  </div>
                ) : (
                  <>
                    <span className={`text-xs sm:text-sm font-mono font-bold tabular-nums px-1.5 py-0.5 rounded border ${
                      !showFeedback
                        ? 'bg-slate-50 text-slate-800 border-slate-200'
                        : isBalanced
                        ? 'bg-white text-slate-800 border-slate-200'
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}>
                      {tally.reactantCount}
                    </span>
                    {showBreakdown && (
                      <span className="text-[9px] text-slate-400 font-mono mt-0.5 leading-none">
                        {getCalculationBreakdown(tally.element, false)}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Element / Group Identity (Center) */}
              <div className="flex flex-col items-center justify-center text-center px-1">
                <div className="flex items-center justify-center gap-1 max-w-full">
                  <span
                    className={`border flex items-center justify-center font-mono font-bold text-[9px] shadow-2xs shrink-0 ${
                      tally.isPolyatomicGroup ? 'px-1.5 py-0.2 rounded-md' : 'w-4.5 h-4.5 rounded-full'
                    }`}
                    style={{
                      backgroundColor: tally.color,
                      color: tally.element === 'H' || tally.element === 'Ag' ? '#0F172A' : '#FFFFFF',
                      borderColor: '#475569'
                    }}
                  >
                    {tally.element}
                  </span>
                  <span className="font-semibold text-slate-800 text-[10px] sm:text-[11px] truncate max-w-[70px] sm:max-w-[85px]">
                    {tally.name}
                  </span>
                </div>
                {showFeedback && (
                  <div className="mt-0.5">
                    {isBalanced ? (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-100/80 px-1 py-0.1 rounded-full">
                        <Equal className="w-2.5 h-2.5" />
                        <span>Equal</span>
                      </span>
                    ) : (
                      <span className="text-[9px] font-medium text-amber-800 bg-amber-100/80 px-1 py-0.1 rounded-full">
                        ≠
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Product Side Count */}
              <div className="flex flex-col items-center justify-center">
                {studentFillable && onStudentInputChange ? (
                  <div className="flex items-center justify-center">
                    <input
                      type="number"
                      min="0"
                      max="99"
                      value={pVal ?? ''}
                      placeholder="?"
                      onChange={(e) => onStudentInputChange(tally.element, 'product', e.target.value)}
                      className={`w-8 h-7 text-center font-mono font-bold text-xs rounded border focus:outline-none focus:ring-1 ${
                        !showFeedback
                          ? 'border-slate-300 bg-white text-slate-800 placeholder:text-slate-300 focus:border-slate-400 focus:ring-slate-300'
                          : pVal === undefined || pVal === ''
                          ? 'border-slate-300 bg-white text-slate-800'
                          : pCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : 'border-rose-400 bg-rose-50 text-rose-800'
                      }`}
                    />
                    {showFeedback && pVal !== undefined && pVal !== '' && (
                      <span className="ml-1">
                        {pCorrect ? (
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        ) : (
                          <X className="w-3 h-3 text-rose-500 shrink-0" />
                        )}
                      </span>
                    )}
                  </div>
                ) : (
                  <>
                    <span className={`text-xs sm:text-sm font-mono font-bold tabular-nums px-1.5 py-0.5 rounded border ${
                      !showFeedback
                        ? 'bg-slate-50 text-slate-800 border-slate-200'
                        : isBalanced
                        ? 'bg-white text-slate-800 border-slate-200'
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}>
                      {tally.productCount}
                    </span>
                    {showBreakdown && (
                      <span className="text-[9px] text-slate-400 font-mono mt-0.5 leading-none">
                        {getCalculationBreakdown(tally.element, true)}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Compact footer */}
      <div className="py-1 px-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 text-center">
        {studentFillable 
          ? "Student scratchpad worksheet (fill in your atom counts)" 
          : showFeedback 
          ? "Rule: Reactants = Products"
          : "Atom inventory table"}
      </div>
    </div>
  );
};
