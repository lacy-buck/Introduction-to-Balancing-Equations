import React, { useState } from 'react';
import { RotateCcw, Plus, Trash2, Equal } from 'lucide-react';

export interface ScratchpadRow {
  id: string;
  reactant: string;
  atom: string;
  product: string;
}

const DEFAULT_ROWS: ScratchpadRow[] = [
  { id: 'row-1', reactant: '', atom: '', product: '' },
  { id: 'row-2', reactant: '', atom: '', product: '' },
  { id: 'row-3', reactant: '', atom: '', product: '' },
  { id: 'row-4', reactant: '', atom: '', product: '' },
  { id: 'row-5', reactant: '', atom: '', product: '' },
];

interface BlankScratchpadTableProps {
  onClear?: () => void;
  equationId?: string;
}

export const BlankScratchpadTable: React.FC<BlankScratchpadTableProps> = ({ equationId }) => {
  const [rows, setRows] = useState<ScratchpadRow[]>(DEFAULT_ROWS);

  // Automatically clear all rows when switching to a new equation in Challenge mode
  React.useEffect(() => {
    setRows(DEFAULT_ROWS.map(r => ({ ...r, reactant: '', atom: '', product: '' })));
  }, [equationId]);

  const handleChange = (id: string, field: 'reactant' | 'atom' | 'product', value: string) => {
    setRows(prev =>
      prev.map(row => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleClear = () => {
    setRows(DEFAULT_ROWS.map(r => ({ ...r, reactant: '', atom: '', product: '' })));
  };

  const handleAddRow = () => {
    if (rows.length < 8) {
      setRows(prev => [
        ...prev,
        { id: `row-${Date.now()}`, reactant: '', atom: '', product: '' }
      ]);
    }
  };

  const handleRemoveRow = (id: string) => {
    if (rows.length > 3) {
      setRows(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="max-w-[340px] sm:max-w-[380px] mx-auto w-full bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Table Header: 3 Columns (Reactants / Atoms / Products) */}
      <div className="grid grid-cols-[76px_1fr_76px] sm:grid-cols-[88px_1fr_88px] items-center bg-slate-100/95 border-b border-slate-200 text-[11px] font-bold text-slate-700 py-1.5 px-2.5 select-none text-center">
        <div className="flex items-center justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          <span>Reactants</span>
        </div>
        <div className="text-center font-bold text-slate-800">
          <span>Atoms</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span>Products</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </div>
      </div>

      {/* 4 to 5 Blank Rows with 3 editable cells */}
      <div className="divide-y divide-slate-100 p-1 space-y-1">
        {rows.map((row, idx) => {
          return (
            <div
              key={row.id}
              className="grid grid-cols-[76px_1fr_76px] sm:grid-cols-[88px_1fr_88px] items-center py-1 px-1.5 rounded-lg transition-colors hover:bg-slate-50"
            >
              {/* Column 1: Reactant Count Input */}
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  maxLength={4}
                  value={row.reactant}
                  onChange={(e) => handleChange(row.id, 'reactant', e.target.value)}
                  placeholder="Count"
                  className="w-14 sm:w-16 h-7 text-center font-mono font-bold text-xs rounded border border-slate-300 bg-white text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
                />
              </div>

              {/* Column 2: Atoms (Element Symbol / Name) Input */}
              <div className="flex items-center justify-center gap-1 px-1">
                <input
                  type="text"
                  maxLength={6}
                  value={row.atom}
                  onChange={(e) => handleChange(row.id, 'atom', e.target.value)}
                  placeholder={`Atom ${idx + 1}`}
                  className="w-16 sm:w-20 h-7 text-center font-bold text-xs rounded border border-slate-300 bg-white text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
                />
              </div>

              {/* Column 3: Products Count Input */}
              <div className="flex items-center justify-center gap-1">
                <input
                  type="text"
                  maxLength={4}
                  value={row.product}
                  onChange={(e) => handleChange(row.id, 'product', e.target.value)}
                  placeholder="Count"
                  className="w-14 sm:w-16 h-7 text-center font-mono font-bold text-xs rounded border border-slate-300 bg-white text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
                />
                {rows.length > 4 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(row.id)}
                    className="p-0.5 text-slate-300 hover:text-rose-500 transition-colors"
                    title="Remove row"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer controls: Add Row + Clear Scratchpad */}
      <div className="py-1.5 px-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <button
          type="button"
          onClick={handleAddRow}
          disabled={rows.length >= 8}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold disabled:opacity-40"
        >
          <Plus className="w-3 h-3" />
          <span>Add Row</span>
        </button>

        <span className="text-[10px] text-slate-400">Blank Scratchpad</span>

        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-800 font-semibold"
          title="Clear all entries"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
};
