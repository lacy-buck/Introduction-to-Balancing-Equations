import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  Atom, 
  Table, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { MoleculeClusterView } from './MoleculeClusterView';
import { createCompound } from '../utils/chemistry';
import { CoefficientInput } from './CoefficientInput';

interface ExampleLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartPracticing: () => void;
}

export const ExampleLessonModal: React.FC<ExampleLessonModalProps> = ({
  isOpen,
  onClose,
  onStartPracticing,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Mini interactive sandbox inside example lesson
  const coCompound = createCompound('CO', 'Carbon monoxide');
  const o2Compound = createCompound('O2', 'Oxygen gas');
  const co2Compound = createCompound('CO2', 'Carbon dioxide');

  const [demoCoeffCO, setDemoCoeffCO] = useState<number>(1);
  const [demoCoeffO2, setDemoCoeffO2] = useState<number>(1);
  const [demoCoeffCO2, setDemoCoeffCO2] = useState<number>(1);

  // Counts for demo
  const rC = demoCoeffCO * 1;
  const rO = demoCoeffCO * 1 + demoCoeffO2 * 2;
  const pC = demoCoeffCO2 * 1;
  const pO = demoCoeffCO2 * 2;
  const isDemoBalanced = rC === pC && rO === pO && demoCoeffCO > 0 && demoCoeffO2 > 0 && demoCoeffCO2 > 0;

  if (!isOpen) return null;

  const steps = [
    {
      title: '1. What Does It Mean to Balance an Equation?',
      content: (
        <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <p>
            In chemistry, the <strong>Law of Conservation of Mass</strong> states that matter cannot be created or destroyed in a chemical reaction. Every single atom that enters the reaction on the <strong>Reactants (left side)</strong> must exist in the <strong>Products (right side)</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs">
            <div className="p-3 bg-white border border-rose-200 rounded-lg">
              <span className="font-bold text-rose-700 block mb-1 text-sm font-sans">❌ NEVER Change Subscripts!</span>
              Subscripts define chemical bonds and identity. Changing <code className="font-bold text-slate-900 bg-slate-100 px-1 rounded">CO₂</code> to <code className="font-bold text-rose-700 bg-rose-50 px-1 rounded">CO₃</code> invents a completely different, unstable molecule!
            </div>
            <div className="p-3 bg-white border border-emerald-200 rounded-lg">
              <span className="font-bold text-emerald-700 block mb-1 text-sm font-sans">✅ ONLY Change Coefficients!</span>
              The stoichiometric coefficient is the big number placed <em>in front</em> of the formula. Placing a <code className="font-bold text-emerald-700 bg-emerald-50 px-1 rounded">2</code> in front of <code className="font-bold text-slate-900 bg-slate-100 px-1 rounded">2 CO₂</code> means you have 2 complete molecules!
            </div>
          </div>
        </div>
      )
    },
    {
      title: '2. Strategy A: Using Particle Diagrams',
      content: (
        <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <p>
            In <strong>Module 1</strong>, every formula is paired with a visual particle diagram of colored atom spheres (CPK color standard):
          </p>

          <div className="flex flex-wrap items-center justify-around gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1 shadow-2xs">
                <MoleculeClusterView compound={createCompound('CO', 'CO')} coefficient={1} />
              </div>
              <span className="font-bold mt-1.5 text-xs text-slate-800">1 CO Molecule</span>
              <span className="text-[11px] text-slate-500 font-mono">1 C (Slate) + 1 O (Red)</span>
            </div>

            <div className="text-xl font-bold text-slate-400">+</div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1 shadow-2xs">
                <MoleculeClusterView compound={createCompound('O2', 'O2')} coefficient={1} />
              </div>
              <span className="font-bold mt-1.5 text-xs text-slate-800">1 O₂ Molecule</span>
              <span className="text-[11px] text-slate-500 font-mono">2 O (Red pair)</span>
            </div>

            <div className="text-xl font-bold text-indigo-500">→</div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1 shadow-2xs">
                <MoleculeClusterView compound={createCompound('CO2', 'CO2')} coefficient={1} />
              </div>
              <span className="font-bold mt-1.5 text-xs text-slate-800">1 CO₂ Molecule</span>
              <span className="text-[11px] text-slate-500 font-mono">1 C + 2 O</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            <strong>Notice the problem above:</strong> Left side has 1 C and 3 O atoms. Right side has 1 C and 2 O atoms. Oxygen is NOT balanced! To balance it, we need <strong>2 CO + 1 O₂ → 2 CO₂</strong>.
          </div>
        </div>
      )
    },
    {
      title: '3. Strategy B: Using the Atom Inventory Table',
      content: (
        <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <p>
            In real chemistry class, we use the <strong>Atom Inventory Table</strong> directly under the equation:
          </p>

          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-center font-mono text-xs text-indigo-950 font-bold">
            Count Formula: <span className="text-indigo-700">Atom Count = Coefficient × Subscript</span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 text-xs">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2 px-3">Reactants (Left)</th>
                  <th className="py-2 px-3">Element</th>
                  <th className="py-2 px-3">Products (Right)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-white">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">2 × 1 = 2</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">Carbon (C)</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">2 × 1 = 2 ✅</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">(2 × 1) + (1 × 2) = 4</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">Oxygen (O)</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-800">2 × 2 = 4 ✅</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-600">
            When every row shows equal counts on the Reactants and Products, the equation is balanced!
          </p>
        </div>
      )
    },
    {
      title: '4. Interactive Try-It Sandbox',
      content: (
        <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <p>
            Try balancing this example right now! Use the number pads to change coefficients until both Carbon and Oxygen are equal:
          </p>

          {/* Interactive Bench */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* CO */}
              <div className="flex flex-col items-center p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs min-w-[100px]">
                <div className="w-20 h-20 flex items-center justify-center mb-1">
                  <MoleculeClusterView compound={coCompound} coefficient={demoCoeffCO} />
                </div>
                <div className="flex items-center gap-1.5">
                  <CoefficientInput
                    value={demoCoeffCO}
                    onChange={(val) => setDemoCoeffCO(val)}
                    compoundFormula="CO"
                  />
                  <span className="font-bold text-base font-mono">CO</span>
                </div>
              </div>

              <span className="text-xl font-bold text-slate-400">+</span>

              {/* O2 */}
              <div className="flex flex-col items-center p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs min-w-[100px]">
                <div className="w-20 h-20 flex items-center justify-center mb-1">
                  <MoleculeClusterView compound={o2Compound} coefficient={demoCoeffO2} />
                </div>
                <div className="flex items-center gap-1.5">
                  <CoefficientInput
                    value={demoCoeffO2}
                    onChange={(val) => setDemoCoeffO2(val)}
                    compoundFormula="O2"
                  />
                  <span className="font-bold text-base font-mono">O₂</span>
                </div>
              </div>

              <div className="text-xl font-bold text-indigo-500">→</div>

              {/* CO2 */}
              <div className="flex flex-col items-center p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs min-w-[100px]">
                <div className="w-20 h-20 flex items-center justify-center mb-1">
                  <MoleculeClusterView compound={co2Compound} coefficient={demoCoeffCO2} />
                </div>
                <div className="flex items-center gap-1.5">
                  <CoefficientInput
                    value={demoCoeffCO2}
                    onChange={(val) => setDemoCoeffCO2(val)}
                    compoundFormula="CO2"
                    isProduct={true}
                  />
                  <span className="font-bold text-base font-mono">CO₂</span>
                </div>
              </div>
            </div>

            {/* Live table underneath */}
            <div className="bg-white rounded-lg border border-slate-200 p-2.5 text-xs font-mono">
              <div className="grid grid-cols-3 text-center font-bold text-slate-500 pb-1 border-b">
                <span>Reactants</span>
                <span>Element</span>
                <span>Products</span>
              </div>
              <div className="grid grid-cols-3 text-center py-1.5">
                <span className={rC === pC ? 'text-emerald-700 font-bold' : 'text-amber-700'}>{rC} C</span>
                <span className="font-bold text-slate-800">Carbon (C)</span>
                <span className={rC === pC ? 'text-emerald-700 font-bold' : 'text-amber-700'}>{pC} C {rC === pC ? '✅' : '≠'}</span>
              </div>
              <div className="grid grid-cols-3 text-center py-1.5 border-t border-slate-100">
                <span className={rO === pO ? 'text-emerald-700 font-bold' : 'text-amber-700'}>{rO} O</span>
                <span className="font-bold text-slate-800">Oxygen (O)</span>
                <span className={rO === pO ? 'text-emerald-700 font-bold' : 'text-amber-700'}>{pO} O {rO === pO ? '✅' : '≠'}</span>
              </div>
            </div>

            {isDemoBalanced ? (
              <div className="p-3 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Great job! 2 CO + 1 O₂ → 2 CO₂ is perfectly balanced! (2 Carbon, 4 Oxygen)</span>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 text-center">
                Tip: Try setting <strong className="text-indigo-600">2 CO</strong>, <strong className="text-indigo-600">1 O₂</strong>, and <strong className="text-indigo-600">2 CO₂</strong>.
              </div>
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-indigo-900 text-white px-6 py-4 flex items-center justify-between border-b border-indigo-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span className="font-extrabold text-base sm:text-lg">
              Example Lesson: How to Balance Equations
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Progress Step Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-semibold text-slate-500">
            <span>Section {activeStep + 1} of {steps.length}</span>
            <div className="flex gap-1.5">
              {steps.map((_, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => setActiveStep(sIdx)}
                  className={`w-7 h-2 rounded-full transition-all ${
                    sIdx === activeStep ? 'bg-indigo-600 w-9' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900">
            {steps[activeStep].title}
          </h3>

          <div>
            {steps[activeStep].content}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {activeStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Next Section</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartPracticing();
              }}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all hover:scale-105"
            >
              <span>Start Balancing Problems!</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
