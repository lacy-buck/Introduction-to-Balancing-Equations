import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MODULE_POLYATOMIC_EQUATIONS } from '../../data/equations';
import { calculateBalanceStatus } from '../../utils/chemistry';
import { EquationBench } from '../EquationBench';
import { 
  Boxes, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from 'lucide-react';

interface Module4PolyatomicProps {
  onCompleteEquation?: (eqId: string) => void;
  completedEquations: string[];
}

export const Module4Polyatomic: React.FC<Module4PolyatomicProps> = ({
  onCompleteEquation,
  completedEquations,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const equation = MODULE_POLYATOMIC_EQUATIONS[currentIdx];

  const [reactantCoeffs, setReactantCoeffs] = useState<number[]>(() => 
    equation.reactants.map(() => 0)
  );
  const [productCoeffs, setProductCoeffs] = useState<number[]>(() => 
    equation.products.map(() => 0)
  );
  const [showHints, setShowHints] = useState(false);
  const [showGroupExplanation, setShowGroupExplanation] = useState(true);
  const [groupByPacket, setGroupByPacket] = useState(true);

  // Reset coefficients on equation change (keep viewport at lesson)
  useEffect(() => {
    setReactantCoeffs(equation.reactants.map(() => 0));
    setProductCoeffs(equation.products.map(() => 0));
    setShowHints(false);
  }, [currentIdx, equation]);

  // When groupByPacket is true, pass the polyatomic groups. When false, pass an empty array to show individual atoms!
  const effectiveEquation = groupByPacket 
    ? equation 
    : { ...equation, polyatomicGroups: [] };

  const balanceStatus = calculateBalanceStatus(effectiveEquation, reactantCoeffs, productCoeffs);

  const handleSuccess = () => {
    confetti({
      particleCount: 65,
      spread: 75,
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
    if (currentIdx < MODULE_POLYATOMIC_EQUATIONS.length - 1) {
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
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Boxes className="w-4 h-4 text-purple-400" />
            <span>Module 4 · The Polyatomic Ion Secret</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Balancing with Polyatomic Ion Groups
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In chemistry, polyatomic ions like <strong>Sulfate [SO₄]</strong>, <strong>Nitrate [NO₃]</strong>, and <strong>Hydroxide [OH]</strong> often stay completely intact on both sides of a reaction. When this happens, <strong>do NOT split them into separate Sulfur, Nitrogen, or Oxygen atoms!</strong> Treat each ion as a single packet.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowGroupExplanation(!showGroupExplanation)}
              className="px-3 py-1.5 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-purple-700/80"
            >
              <Layers className="w-3.5 h-3.5 text-purple-300" />
              <span>{showGroupExplanation ? 'Hide Group Visualizer' : 'Show What Looking in Groups Means'}</span>
              {showGroupExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Visual Explanation: What Does It Mean to Look in Groups? */}
      {showGroupExplanation && (
        <div className="bg-white rounded-2xl border border-purple-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>How High School Chemists Balance Polyatomic Ions Faster</span>
          </div>

          {/* Side by side comparison: The Hard Way vs. The Smart Group Way */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* The Hard Way */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">❌</span>
                <span>The Hard Way: Counting Individual Atoms</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                In <code className="bg-white px-1.5 py-0.5 border rounded font-mono font-bold text-slate-800">Al₂(SO₄)₃</code>, if you break it down:
              </p>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-[11px] space-y-1 text-slate-700">
                <div>• Aluminum (Al): 2 atoms</div>
                <div>• Sulfur (S): 1 × 3 = 3 atoms</div>
                <div>• Oxygen (O): 4 × 3 = <span className="text-rose-600 font-bold">12 individual atoms!</span></div>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Balancing 12 individual Oxygens across multiple compounds causes arithmetic errors and takes forever.
              </p>
            </div>

            {/* The Smart Group Way */}
            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-purple-900">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">✅</span>
                <span>The Smart Way: Look at the Intact [SO₄] Packet!</span>
              </div>
              <p className="text-purple-900 leading-relaxed">
                Treat <code className="bg-white px-1.5 py-0.5 border border-purple-300 rounded font-mono font-bold text-purple-800">[SO₄]</code> as ONE group unit:
              </p>
              <div className="p-2.5 bg-white rounded-lg border border-purple-200 font-mono text-[11px] space-y-1 text-purple-900">
                <div>• Aluminum (Al): 2 atoms</div>
                <div className="flex items-center gap-1.5 font-bold text-purple-700">
                  <span>• Sulfate Packet:</span>
                  <span className="px-2 py-0.5 bg-purple-100 border border-purple-300 rounded-md">
                    3 × [SO₄] packets
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-purple-700 font-medium">
                To balance 3 [SO₄] packets on the right, you just place a <strong>3</strong> in front of CuSO₄. Instant and foolproof!
              </p>
            </div>
          </div>

          {/* Common Polyatomic Ions Cheat-Sheet Capsules */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Common Polyatomic Ions You Must Recognize in Groups:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="px-3 py-1.5 rounded-lg bg-purple-50 border border-purple-200 flex items-center gap-2">
                <span className="font-mono font-bold text-purple-900">[SO₄]²⁻</span>
                <span className="text-purple-700 text-[11px]">Sulfate (1 S + 4 O)</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-2">
                <span className="font-mono font-bold text-blue-900">[NO₃]⁻</span>
                <span className="text-blue-700 text-[11px]">Nitrate (1 N + 3 O)</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center gap-2">
                <span className="font-mono font-bold text-cyan-900">[OH]⁻</span>
                <span className="text-cyan-700 text-[11px]">Hydroxide (1 O + 1 H)</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 flex items-center gap-2">
                <span className="font-mono font-bold text-orange-900">[PO₄]³⁻</span>
                <span className="text-orange-700 text-[11px]">Phosphate (1 P + 4 O)</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                <span className="font-mono font-bold text-emerald-900">[NH₄]⁺</span>
                <span className="text-emerald-700 text-[11px]">Ammonium (1 N + 4 H)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Lessons:
        </span>
        {MODULE_POLYATOMIC_EQUATIONS.map((eq, i) => {
          const isDone = completedEquations.includes(eq.id);
          const isCurrent = i === currentIdx;

          return (
            <button
              key={eq.id}
              type="button"
              onClick={() => handleSelectLesson(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-purple-600 text-white shadow-xs'
                  : isDone
                  ? 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
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

      {/* Pedagogical Toggle: Compare Group View vs Individual Atoms View in the Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-700">Table View Mode:</span>
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
            <button
              type="button"
              onClick={() => setGroupByPacket(true)}
              className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                groupByPacket 
                  ? 'bg-purple-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Group Packets [SO₄] (Recommended)</span>
            </button>
            <button
              type="button"
              onClick={() => setGroupByPacket(false)}
              className={`px-3 py-1 rounded-md font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                !groupByPacket 
                  ? 'bg-slate-700 text-white shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Split Every Individual Atom (Harder)</span>
            </button>
          </div>
        </div>

        <span className="text-[11px] text-slate-500">
          {groupByPacket 
            ? 'The table tallies the polyatomic ion as a single row!' 
            : 'Notice how many more rows and large atom counts you have to track!'}
        </span>
      </div>

      {/* Main Chemical Equation Bench with Atom Table */}
      <EquationBench
        equation={effectiveEquation}
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
        hasNext={currentIdx < MODULE_POLYATOMIC_EQUATIONS.length - 1}
        showTable={true}
        showTableFeedback={false}
        instructions="Look at the Atom Table directly below: notice how the polyatomic ion packet is tallied as a single unit! Adjust coefficients until you believe it is balanced, then click 'Check Answer' below."
      />
    </div>
  );
};
