import React from 'react';
import { Compound } from '../types/chemistry';
import { getElementInfo, formatChemicalFormula } from '../utils/chemistry';

interface MoleculeClusterViewProps {
  compound: Compound;
  coefficient: number;
}

export const MoleculeClusterView: React.FC<MoleculeClusterViewProps> = ({
  compound,
  coefficient,
}) => {
  const coeff = Math.max(0, coefficient || 0);

  const renderSingleMolecule = (molIndex: number) => {
    const layout = compound.particleLayout || {
      width: 100,
      height: 90,
      atoms: [{ element: 'H', x: 50, y: 45, r: 16 }],
      bonds: []
    };

    return (
      <div 
        key={`mol-${molIndex}`}
        className="relative p-1 bg-white border border-slate-200/90 rounded-lg shadow-2xs transition-all duration-150 hover:scale-105 flex flex-col items-center justify-center min-w-[70px] h-[72px]"
        title={`${compound.name} (${compound.formula})`}
      >
        <svg 
          viewBox={`0 0 ${layout.width} ${layout.height}`} 
          className="w-full h-[58px] overflow-visible"
        >
          <defs>
            {Object.keys(compound.atoms).map(elem => {
              const info = getElementInfo(elem);
              return (
                <radialGradient 
                  key={`grad-${elem}`} 
                  id={`sphere-grad-${elem}`} 
                  cx="35%" 
                  cy="35%" 
                  r="65%"
                >
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="35%" stopColor={info.color} />
                  <stop offset="100%" stopColor={info.borderColor} />
                </radialGradient>
              );
            })}
            <filter id="atom-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodOpacity="0.16" />
            </filter>
          </defs>

          {/* Render bonds */}
          {layout.bonds.map((bond, bIdx) => (
            <line
              key={`bond-${bIdx}`}
              x1={bond.x1}
              y1={bond.y1}
              x2={bond.x2}
              y2={bond.y2}
              stroke="#64748B"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
          ))}

          {/* Render atom spheres with PhET styling */}
          {layout.atoms.map((atom, aIdx) => {
            const info = getElementInfo(atom.element);
            return (
              <g key={`atom-${aIdx}`} filter="url(#atom-shadow)">
                <circle
                  cx={atom.x}
                  cy={atom.y}
                  r={atom.r}
                  fill={`url(#sphere-grad-${atom.element})`}
                  stroke={info.borderColor}
                  strokeWidth="1.2"
                />
                {/* Highlight gleam */}
                <circle
                  cx={atom.x - atom.r * 0.3}
                  cy={atom.y - atom.r * 0.3}
                  r={atom.r * 0.28}
                  fill="#FFFFFF"
                  opacity="0.65"
                />
                {/* Element Symbol Label inside atom */}
                <text
                  x={atom.x}
                  y={atom.y + atom.r * 0.32}
                  textAnchor="middle"
                  fontSize={Math.max(8.5, atom.r * 0.85)}
                  fontWeight="bold"
                  fill={info.textColor}
                  className="select-none pointer-events-none drop-shadow-xs"
                >
                  {atom.element}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  if (coeff === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-200 rounded-lg p-2 min-h-[90px]">
        <span className="text-xs font-semibold text-slate-400">0 molecules</span>
        <span className="text-[10px] text-slate-400">Set coefficient &gt; 0</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-wrap items-center justify-center gap-1.5 p-1 min-h-[90px] max-h-40 overflow-y-auto">
      {Array.from({ length: coeff }).map((_, i) => renderSingleMolecule(i))}
    </div>
  );
};
