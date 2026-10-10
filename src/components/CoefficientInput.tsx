import React, { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown, Delete, Check } from 'lucide-react';

interface CoefficientInputProps {
  value: number;
  onChange: (newValue: number) => void;
  compoundFormula: string;
  isProduct?: boolean;
  maxCoefficient?: number;
  highlightMismatch?: boolean;
  compact?: boolean;
}

export const CoefficientInput: React.FC<CoefficientInputProps> = ({
  value,
  onChange,
  compoundFormula,
  isProduct = false,
  maxCoefficient = 25,
  highlightMismatch = false,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleIncrement = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (value < maxCoefficient) {
      onChange(value === 0 ? 1 : value + 1);
    }
  };

  const handleDecrement = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (value > 1) {
      onChange(value - 1);
    } else if (value === 1) {
      onChange(0);
    }
  };

  const handleSelectNumber = (num: number) => {
    onChange(num);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleDecrement();
    } else if (/[0-9]/.test(e.key)) {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        onChange(num);
      }
    } else if (e.key === 'Escape' || e.key === 'Enter') {
      setIsOpen(false);
    }
  };

  // Determine standard numbers to display on pad
  const primaryNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const higherNumbers = [10, 12, 13, 16, 18, 25];

  return (
    <div className="relative inline-flex items-center" ref={containerRef}>
      {/* Quick Stepper Minus */}
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= 0}
        aria-label="Decrease coefficient"
        className={`${
          compact ? 'w-5 h-8' : 'w-6 h-10'
        } flex items-center justify-center rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors`}
      >
        <ChevronDown className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>

      {/* Main Clickable Coefficient Box */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`${
          compact ? 'w-8 sm:w-9 h-8 text-xs sm:text-sm' : 'w-11 h-10 text-base'
        } flex items-center justify-center font-mono font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          isOpen
            ? 'border-2 border-indigo-600 bg-indigo-50/50 text-indigo-950 shadow-inner'
            : value > 0
            ? 'border-y border-slate-300 bg-white text-slate-900 hover:border-indigo-400'
            : 'border-y border-dashed border-slate-300 bg-amber-50/40 text-amber-700 hover:bg-amber-50'
        } ${highlightMismatch ? 'ring-2 ring-amber-400 border-amber-400' : ''}`}
        title="Click to open number pad"
      >
        {value > 0 ? (
          <span className="tabular-nums">{value}</span>
        ) : (
          <span className={`text-slate-400 font-normal ${compact ? 'text-xs' : 'text-sm'}`}>?</span>
        )}
      </button>

      {/* Quick Stepper Plus */}
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= maxCoefficient}
        aria-label="Increase coefficient"
        className={`${
          compact ? 'w-5 h-8' : 'w-6 h-10'
        } flex items-center justify-center rounded-r-lg border border-l-0 border-slate-300 bg-slate-50 text-slate-600 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors`}
      >
        <ChevronUp className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>

      {/* Tactile Popover Number Pad Modal */}
      {isOpen && (
        <div 
          className="absolute z-50 top-full mt-2 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl border border-slate-200 p-3 w-56 animate-in fade-in zoom-in-95 duration-150"
          style={{ minWidth: '220px' }}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">
              Coefficient for <strong className="text-indigo-600 font-mono">{compoundFormula}</strong>
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded-sm"
            >
              ✕
            </button>
          </div>

          {/* Quick Clear / 1 buttons */}
          <div className="flex gap-1.5 mb-2">
            <button
              type="button"
              onClick={() => {
                onChange(0);
              }}
              className="flex-1 py-1 px-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1"
            >
              <Delete className="w-3 h-3" />
              <span>Clear</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onChange(1);
              }}
              className={`flex-1 py-1 px-2 rounded-md text-xs font-semibold ${
                value === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              1 (Default)
            </button>
          </div>

          {/* 3x3 Keypad (1 - 9) */}
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {primaryNumbers.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleSelectNumber(num)}
                className={`h-9 rounded-lg font-mono font-bold text-sm transition-colors flex items-center justify-center ${
                  value === num
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Extended higher numbers (useful for combustion & challenge mode) */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[10px] font-semibold text-slate-400 uppercase mb-1">
              Higher Stoichiometry:
            </div>
            <div className="grid grid-cols-6 gap-1">
              {higherNumbers.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleSelectNumber(num)}
                  className={`h-7 rounded-md font-mono text-xs font-bold transition-colors flex items-center justify-center ${
                    value === num
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-50 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Done button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full mt-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-xs transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm ({value || 'none'})</span>
          </button>
        </div>
      )}
    </div>
  );
};
