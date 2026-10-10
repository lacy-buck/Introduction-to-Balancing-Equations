import React from 'react';
import { 
  ElementVisualData, 
  Compound, 
  ChemicalEquation, 
  BalanceStatus, 
  ElementTally,
  AtomCoord,
  BondCoord
} from '../types/chemistry';

export const ELEMENT_DATA: Record<string, ElementVisualData> = {
  H: { symbol: 'H', name: 'Hydrogen', color: '#F8FAFC', borderColor: '#94A3B8', textColor: '#0F172A', radius: 15 },
  C: { symbol: 'C', name: 'Carbon', color: '#334155', borderColor: '#1E293B', textColor: '#FFFFFF', radius: 21 },
  N: { symbol: 'N', name: 'Nitrogen', color: '#2563EB', borderColor: '#1D4ED8', textColor: '#FFFFFF', radius: 20 },
  O: { symbol: 'O', name: 'Oxygen', color: '#EF4444', borderColor: '#DC2626', textColor: '#FFFFFF', radius: 19 },
  F: { symbol: 'F', name: 'Fluorine', color: '#10B981', borderColor: '#059669', textColor: '#FFFFFF', radius: 17 },
  Cl: { symbol: 'Cl', name: 'Chlorine', color: '#059669', borderColor: '#047857', textColor: '#FFFFFF', radius: 22 },
  Br: { symbol: 'Br', name: 'Bromine', color: '#991B1B', borderColor: '#7F1D1D', textColor: '#FFFFFF', radius: 23 },
  I: { symbol: 'I', name: 'Iodine', color: '#6B21A8', borderColor: '#581C87', textColor: '#FFFFFF', radius: 25 },
  S: { symbol: 'S', name: 'Sulfur', color: '#F59E0B', borderColor: '#D97706', textColor: '#0F172A', radius: 22 },
  P: { symbol: 'P', name: 'Phosphorus', color: '#EA580C', borderColor: '#C2410C', textColor: '#FFFFFF', radius: 21 },
  Na: { symbol: 'Na', name: 'Sodium', color: '#8B5CF6', borderColor: '#7C3AED', textColor: '#FFFFFF', radius: 22 },
  Mg: { symbol: 'Mg', name: 'Magnesium', color: '#0D9488', borderColor: '#0F766E', textColor: '#FFFFFF', radius: 21 },
  Al: { symbol: 'Al', name: 'Aluminum', color: '#94A3B8', borderColor: '#64748B', textColor: '#0F172A', radius: 21 },
  Ca: { symbol: 'Ca', name: 'Calcium', color: '#65A30D', borderColor: '#4D7C0F', textColor: '#FFFFFF', radius: 23 },
  Fe: { symbol: 'Fe', name: 'Iron', color: '#D97706', borderColor: '#B45309', textColor: '#FFFFFF', radius: 22 },
  Cu: { symbol: 'Cu', name: 'Copper', color: '#B45309', borderColor: '#92400E', textColor: '#FFFFFF', radius: 22 },
  Zn: { symbol: 'Zn', name: 'Zinc', color: '#64748B', borderColor: '#475569', textColor: '#FFFFFF', radius: 21 },
  Ag: { symbol: 'Ag', name: 'Silver', color: '#E2E8F0', borderColor: '#94A3B8', textColor: '#0F172A', radius: 22 },
  Ba: { symbol: 'Ba', name: 'Barium', color: '#0F766E', borderColor: '#115E59', textColor: '#FFFFFF', radius: 24 },
  Pb: { symbol: 'Pb', name: 'Lead', color: '#475569', borderColor: '#334155', textColor: '#FFFFFF', radius: 24 },
  Mn: { symbol: 'Mn', name: 'Manganese', color: '#9333EA', borderColor: '#7E22CE', textColor: '#FFFFFF', radius: 22 },
  K: { symbol: 'K', name: 'Potassium', color: '#7C3AED', borderColor: '#6D28D9', textColor: '#FFFFFF', radius: 23 },
  Hg: { symbol: 'Hg', name: 'Mercury', color: '#94A3B8', borderColor: '#475569', textColor: '#0F172A', radius: 23 },
  B: { symbol: 'B', name: 'Boron', color: '#D97706', borderColor: '#B45309', textColor: '#FFFFFF', radius: 18 },
  Si: { symbol: 'Si', name: 'Silicon', color: '#0284C7', borderColor: '#0369A1', textColor: '#FFFFFF', radius: 21 },
};

export function getElementInfo(symbol: string): ElementVisualData {
  return ELEMENT_DATA[symbol] || {
    symbol,
    name: symbol,
    color: '#64748B',
    borderColor: '#475569',
    textColor: '#FFFFFF',
    radius: 20
  };
}

/**
 * Parses chemical formula string (e.g., "Al2(SO4)3", "Ca(OH)2", "H2O")
 * into atom counts { Al: 2, S: 3, O: 12 }
 */
export function parseChemicalFormula(formula: string): Record<string, number> {
  const counts: Record<string, number> = {};

  function parseGroup(str: string, multiplier: number = 1) {
    let i = 0;
    while (i < str.length) {
      if (str[i] === '(') {
        let depth = 1;
        let j = i + 1;
        while (j < str.length && depth > 0) {
          if (str[j] === '(') depth++;
          else if (str[j] === ')') depth--;
          j++;
        }
        const innerContent = str.substring(i + 1, j - 1);
        // Find following subscript number
        let numStr = '';
        while (j < str.length && /[0-9]/.test(str[j])) {
          numStr += str[j];
          j++;
        }
        const groupMultiplier = (numStr ? parseInt(numStr, 10) : 1) * multiplier;
        parseGroup(innerContent, groupMultiplier);
        i = j;
      } else if (/[A-Z]/.test(str[i])) {
        // Element symbol start
        let elem = str[i];
        let j = i + 1;
        if (j < str.length && /[a-z]/.test(str[j])) {
          elem += str[j];
          j++;
        }
        let numStr = '';
        while (j < str.length && /[0-9]/.test(str[j])) {
          numStr += str[j];
          j++;
        }
        const count = (numStr ? parseInt(numStr, 10) : 1) * multiplier;
        counts[elem] = (counts[elem] || 0) + count;
        i = j;
      } else {
        i++;
      }
    }
  }

  parseGroup(formula);
  return counts;
}

/**
 * Generates clustered 2D particle layout for PhET-style visualization
 */
export function generateParticleLayout(formula: string): {
  width: number;
  height: number;
  atoms: AtomCoord[];
  bonds: BondCoord[];
} {
  const atoms: AtomCoord[] = [];
  const bonds: BondCoord[] = [];
  const width = 110;
  const height = 100;
  const cx = width / 2;
  const cy = height / 2;

  // Specific canonical molecular geometries
  switch (formula) {
    case 'H2': {
      const r = 15;
      atoms.push({ element: 'H', x: cx - 14, y: cy, r });
      atoms.push({ element: 'H', x: cx + 14, y: cy, r });
      bonds.push({ x1: cx - 14, y1: cy, x2: cx + 14, y2: cy });
      break;
    }
    case 'Cl2': {
      const r = 20;
      atoms.push({ element: 'Cl', x: cx - 18, y: cy, r });
      atoms.push({ element: 'Cl', x: cx + 18, y: cy, r });
      bonds.push({ x1: cx - 18, y1: cy, x2: cx + 18, y2: cy });
      break;
    }
    case 'O2': {
      const r = 18;
      atoms.push({ element: 'O', x: cx - 16, y: cy, r });
      atoms.push({ element: 'O', x: cx + 16, y: cy, r });
      bonds.push({ x1: cx - 16, y1: cy - 3, x2: cx + 16, y2: cy - 3 });
      bonds.push({ x1: cx - 16, y1: cy + 3, x2: cx + 16, y2: cy + 3 });
      break;
    }
    case 'N2': {
      const r = 19;
      atoms.push({ element: 'N', x: cx - 17, y: cy, r });
      atoms.push({ element: 'N', x: cx + 17, y: cy, r });
      bonds.push({ x1: cx - 17, y1: cy - 4, x2: cx + 17, y2: cy - 4 });
      bonds.push({ x1: cx - 17, y1: cy, x2: cx + 17, y2: cy });
      bonds.push({ x1: cx - 17, y1: cy + 4, x2: cx + 17, y2: cy + 4 });
      break;
    }
    case 'HCl': {
      atoms.push({ element: 'Cl', x: cx + 10, y: cy, r: 21 });
      atoms.push({ element: 'H', x: cx - 20, y: cy, r: 15 });
      bonds.push({ x1: cx - 20, y1: cy, x2: cx + 10, y2: cy });
      break;
    }
    case 'H2O': {
      // Bent molecule: Mickey-mouse style
      const oR = 19;
      const hR = 14;
      atoms.push({ element: 'O', x: cx, y: cy - 6, r: oR });
      atoms.push({ element: 'H', x: cx - 20, y: cy + 16, r: hR });
      atoms.push({ element: 'H', x: cx + 20, y: cy + 16, r: hR });
      bonds.push({ x1: cx, y1: cy - 6, x2: cx - 20, y2: cy + 16 });
      bonds.push({ x1: cx, y1: cy - 6, x2: cx + 20, y2: cy + 16 });
      break;
    }
    case 'NH3': {
      // Trigonal pyramidal
      const nR = 20;
      const hR = 14;
      atoms.push({ element: 'N', x: cx, y: cy - 10, r: nR });
      atoms.push({ element: 'H', x: cx - 24, y: cy + 15, r: hR });
      atoms.push({ element: 'H', x: cx, y: cy + 22, r: hR });
      atoms.push({ element: 'H', x: cx + 24, y: cy + 15, r: hR });
      bonds.push({ x1: cx, y1: cy - 10, x2: cx - 24, y2: cy + 15 });
      bonds.push({ x1: cx, y1: cy - 10, x2: cx, y2: cy + 22 });
      bonds.push({ x1: cx, y1: cy - 10, x2: cx + 24, y2: cy + 15 });
      break;
    }
    case 'CH4': {
      // Tetrahedral projection
      const cR = 21;
      const hR = 14;
      atoms.push({ element: 'C', x: cx, y: cy, r: cR });
      atoms.push({ element: 'H', x: cx, y: cy - 28, r: hR });
      atoms.push({ element: 'H', x: cx - 26, y: cy + 18, r: hR });
      atoms.push({ element: 'H', x: cx + 26, y: cy + 18, r: hR });
      atoms.push({ element: 'H', x: cx + 8, y: cy + 14, r: hR });
      bonds.push({ x1: cx, y1: cy, x2: cx, y2: cy - 28 });
      bonds.push({ x1: cx, y1: cy, x2: cx - 26, y2: cy + 18 });
      bonds.push({ x1: cx, y1: cy, x2: cx + 26, y2: cy + 18 });
      bonds.push({ x1: cx, y1: cy, x2: cx + 8, y2: cy + 14 });
      break;
    }
    case 'CO2': {
      // Linear triatomic
      atoms.push({ element: 'C', x: cx, y: cy, r: 20 });
      atoms.push({ element: 'O', x: cx - 28, y: cy, r: 18 });
      atoms.push({ element: 'O', x: cx + 28, y: cy, r: 18 });
      bonds.push({ x1: cx - 28, y1: cy, x2: cx, y2: cy });
      bonds.push({ x1: cx, y1: cy, x2: cx + 28, y2: cy });
      break;
    }
    case 'CO': {
      atoms.push({ element: 'C', x: cx - 15, y: cy, r: 20 });
      atoms.push({ element: 'O', x: cx + 15, y: cy, r: 18 });
      bonds.push({ x1: cx - 15, y1: cy, x2: cx + 15, y2: cy });
      break;
    }
    case 'NaCl': {
      atoms.push({ element: 'Na', x: cx - 16, y: cy, r: 20 });
      atoms.push({ element: 'Cl', x: cx + 16, y: cy, r: 22 });
      bonds.push({ x1: cx - 16, y1: cy, x2: cx + 16, y2: cy });
      break;
    }
    case 'MgO': {
      atoms.push({ element: 'Mg', x: cx - 16, y: cy, r: 20 });
      atoms.push({ element: 'O', x: cx + 16, y: cy, r: 18 });
      bonds.push({ x1: cx - 16, y1: cy, x2: cx + 16, y2: cy });
      break;
    }
    case 'SO2': {
      // Bent molecule
      atoms.push({ element: 'S', x: cx, y: cy - 8, r: 21 });
      atoms.push({ element: 'O', x: cx - 22, y: cy + 14, r: 18 });
      atoms.push({ element: 'O', x: cx + 22, y: cy + 14, r: 18 });
      bonds.push({ x1: cx, y1: cy - 8, x2: cx - 22, y2: cy + 14 });
      bonds.push({ x1: cx, y1: cy - 8, x2: cx + 22, y2: cy + 14 });
      break;
    }
    case 'SO3': {
      // Trigonal planar
      atoms.push({ element: 'S', x: cx, y: cy, r: 21 });
      atoms.push({ element: 'O', x: cx, y: cy - 24, r: 18 });
      atoms.push({ element: 'O', x: cx - 21, y: cy + 15, r: 18 });
      atoms.push({ element: 'O', x: cx + 21, y: cy + 15, r: 18 });
      bonds.push({ x1: cx, y1: cy, x2: cx, y2: cy - 24 });
      bonds.push({ x1: cx, y1: cy, x2: cx - 21, y2: cy + 15 });
      bonds.push({ x1: cx, y1: cy, x2: cx + 21, y2: cy + 15 });
      break;
    }
    case 'NO2': {
      // Bent molecule
      atoms.push({ element: 'N', x: cx, y: cy - 8, r: 19 });
      atoms.push({ element: 'O', x: cx - 21, y: cy + 14, r: 18 });
      atoms.push({ element: 'O', x: cx + 21, y: cy + 14, r: 18 });
      bonds.push({ x1: cx, y1: cy - 8, x2: cx - 21, y2: cy + 14 });
      bonds.push({ x1: cx, y1: cy - 8, x2: cx + 22, y2: cy + 14 });
      break;
    }
    case 'NO': {
      atoms.push({ element: 'N', x: cx - 15, y: cy, r: 19 });
      atoms.push({ element: 'O', x: cx + 15, y: cy, r: 18 });
      bonds.push({ x1: cx - 15, y1: cy, x2: cx + 15, y2: cy });
      break;
    }
    case 'Na': {
      atoms.push({ element: 'Na', x: cx, y: cy, r: 22 });
      break;
    }
    case 'Mg': {
      atoms.push({ element: 'Mg', x: cx, y: cy, r: 21 });
      break;
    }
    case 'Fe': {
      atoms.push({ element: 'Fe', x: cx, y: cy, r: 22 });
      break;
    }
    case 'Al': {
      atoms.push({ element: 'Al', x: cx, y: cy, r: 21 });
      break;
    }
    case 'Cu': {
      atoms.push({ element: 'Cu', x: cx, y: cy, r: 22 });
      break;
    }
    case 'Zn': {
      atoms.push({ element: 'Zn', x: cx, y: cy, r: 21 });
      break;
    }
    case 'Fe2O3': {
      // 2 Fe and 3 O clustered
      atoms.push({ element: 'Fe', x: cx - 18, y: cy - 14, r: 21 });
      atoms.push({ element: 'Fe', x: cx + 18, y: cy - 14, r: 21 });
      atoms.push({ element: 'O', x: cx, y: cy - 14, r: 18 });
      atoms.push({ element: 'O', x: cx - 18, y: cy + 18, r: 18 });
      atoms.push({ element: 'O', x: cx + 18, y: cy + 18, r: 18 });
      bonds.push({ x1: cx - 18, y1: cy - 14, x2: cx, y2: cy - 14 });
      bonds.push({ x1: cx, y1: cy - 14, x2: cx + 18, y2: cy - 14 });
      bonds.push({ x1: cx - 18, y1: cy - 14, x2: cx - 18, y2: cy + 18 });
      bonds.push({ x1: cx + 18, y1: cy - 14, x2: cx + 18, y2: cy + 18 });
      break;
    }
    default: {
      // Fallback procedural layout for any chemical formula
      const counts = parseChemicalFormula(formula);
      const totalAtomsList: string[] = [];
      Object.entries(counts).forEach(([elem, count]) => {
        for (let i = 0; i < count; i++) {
          totalAtomsList.push(elem);
        }
      });

      if (totalAtomsList.length === 1) {
        const elem = totalAtomsList[0];
        atoms.push({ element: elem, x: cx, y: cy, r: getElementInfo(elem).radius });
      } else if (totalAtomsList.length === 2) {
        const e1 = totalAtomsList[0];
        const e2 = totalAtomsList[1];
        atoms.push({ element: e1, x: cx - 16, y: cy, r: getElementInfo(e1).radius });
        atoms.push({ element: e2, x: cx + 16, y: cy, r: getElementInfo(e2).radius });
        bonds.push({ x1: cx - 16, y1: cy, x2: cx + 16, y2: cy });
      } else {
        // Arrange around central cluster
        const centralElem = totalAtomsList[0];
        atoms.push({ element: centralElem, x: cx, y: cy, r: getElementInfo(centralElem).radius });
        const remaining = totalAtomsList.slice(1);
        const count = remaining.length;
        const orbitRadius = Math.min(32, 22 + count * 2);

        remaining.forEach((elem, idx) => {
          const angle = (idx * (2 * Math.PI)) / count - Math.PI / 2;
          const ax = cx + Math.cos(angle) * orbitRadius;
          const ay = cy + Math.sin(angle) * orbitRadius;
          atoms.push({ element: elem, x: ax, y: ay, r: getElementInfo(elem).radius });
          bonds.push({ x1: cx, y1: cy, x2: ax, y2: ay });
        });
      }
      break;
    }
  }

  return { width, height, atoms, bonds };
}

/**
 * Format chemical formula into formatted React elements with subscript numbers
 */
export function formatChemicalFormula(formula: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let i = 0;

  while (i < formula.length) {
    if (/[0-9]+/.test(formula.substring(i))) {
      const match = formula.substring(i).match(/^[0-9]+/);
      if (match) {
        parts.push(
          React.createElement(
            'sub',
            { key: `sub-${i}`, className: 'text-[0.72em] font-bold text-slate-600 select-none' },
            match[0]
          )
        );
        i += match[0].length;
        continue;
      }
    }

    let char = formula[i];
    parts.push(char);
    i++;
  }

  return React.createElement(React.Fragment, null, ...parts);
}

export const POLYATOMIC_DEFINITIONS: Record<string, { name: string; color: string; atoms: Record<string, number> }> = {
  SO4: { name: 'Sulfate [SO₄]', color: '#8B5CF6', atoms: { S: 1, O: 4 } },
  OH: { name: 'Hydroxide [OH]', color: '#06B6D4', atoms: { O: 1, H: 1 } },
  NO3: { name: 'Nitrate [NO₃]', color: '#3B82F6', atoms: { N: 1, O: 3 } },
  PO4: { name: 'Phosphate [PO₄]', color: '#EA580C', atoms: { P: 1, O: 4 } },
  NH4: { name: 'Ammonium [NH₄]', color: '#10B981', atoms: { N: 1, H: 4 } },
  CO3: { name: 'Carbonate [CO₃]', color: '#EC4899', atoms: { C: 1, O: 3 } },
};

export function countPolyatomicInCompound(formula: string, group: string): number {
  const parenRegex = new RegExp(`\\(${group}\\)(\\d*)`, 'g');
  let count = 0;
  let match;
  while ((match = parenRegex.exec(formula)) !== null) {
    const mult = match[1] ? parseInt(match[1], 10) : 1;
    count += mult;
  }
  if (count === 0 && formula.includes(group)) {
    const standaloneRegex = new RegExp(`${group}(\\d*)`, 'g');
    while ((match = standaloneRegex.exec(formula)) !== null) {
      const mult = match[1] ? parseInt(match[1], 10) : 1;
      count += mult;
    }
  }
  return count;
}

/**
 * Evaluates equation balance status given current user coefficients
 */
export function calculateBalanceStatus(
  equation: ChemicalEquation,
  reactantCoefficients: number[],
  productCoefficients: number[]
): BalanceStatus {
  const polyGroups = equation.polyatomicGroups || [];
  const elementTallies: ElementTally[] = [];
  const unbalancedElements: string[] = [];

  let totalReactantAtoms = 0;
  let totalProductAtoms = 0;

  let isAllCoefficientsFilled = true;

  reactantCoefficients.forEach(c => {
    if (!c || c < 1) isAllCoefficientsFilled = false;
  });
  productCoefficients.forEach(c => {
    if (!c || c < 1) isAllCoefficientsFilled = false;
  });

  // Calculate raw total atoms per element
  const rawElementSet = new Set<string>();
  equation.reactants.forEach(r => Object.keys(r.atoms).forEach(e => rawElementSet.add(e)));
  equation.products.forEach(p => Object.keys(p.atoms).forEach(e => rawElementSet.add(e)));

  rawElementSet.forEach(elem => {
    let rCount = 0;
    let pCount = 0;
    equation.reactants.forEach((r, idx) => {
      rCount += (reactantCoefficients[idx] || 0) * (r.atoms[elem] || 0);
    });
    equation.products.forEach((p, idx) => {
      pCount += (productCoefficients[idx] || 0) * (p.atoms[elem] || 0);
    });
    totalReactantAtoms += rCount;
    totalProductAtoms += pCount;

    if (rCount !== pCount || rCount === 0) {
      unbalancedElements.push(elem);
    }
  });

  // If polyatomic groups are enabled for this equation, build tallies using groups!
  if (polyGroups.length > 0) {
    // Determine which elements are part of the polyatomic groups
    const absorbedElements = new Set<string>();
    polyGroups.forEach(grp => {
      const def = POLYATOMIC_DEFINITIONS[grp];
      if (def) {
        Object.keys(def.atoms).forEach(e => absorbedElements.add(e));
      }
    });

    // 1. Non-polyatomic elements first (e.g. Al, Ca, Fe, Na)
    rawElementSet.forEach(elem => {
      if (!absorbedElements.has(elem)) {
        let rCount = 0;
        let pCount = 0;
        equation.reactants.forEach((r, idx) => {
          rCount += (reactantCoefficients[idx] || 0) * (r.atoms[elem] || 0);
        });
        equation.products.forEach((p, idx) => {
          pCount += (productCoefficients[idx] || 0) * (p.atoms[elem] || 0);
        });

        const isBalanced = rCount === pCount && rCount > 0;
        const info = getElementInfo(elem);
        elementTallies.push({
          element: elem,
          name: info.name,
          color: info.color,
          reactantCount: rCount,
          productCount: pCount,
          isBalanced,
          delta: rCount - pCount,
          isPolyatomicGroup: false,
        });
      }
    });

    // 2. Polyatomic groups as single units
    polyGroups.forEach(grp => {
      let rGroupCount = 0;
      let pGroupCount = 0;

      equation.reactants.forEach((r, idx) => {
        const inComp = countPolyatomicInCompound(r.formula, grp);
        rGroupCount += (reactantCoefficients[idx] || 0) * inComp;
      });

      equation.products.forEach((p, idx) => {
        const inComp = countPolyatomicInCompound(p.formula, grp);
        pGroupCount += (productCoefficients[idx] || 0) * inComp;
      });

      const def = POLYATOMIC_DEFINITIONS[grp] || { name: `[${grp}] Group`, color: '#8B5CF6' };
      const isBalanced = rGroupCount === pGroupCount && rGroupCount > 0;

      elementTallies.push({
        element: `[${grp}]`,
        name: def.name,
        color: def.color,
        reactantCount: rGroupCount,
        productCount: pGroupCount,
        isBalanced,
        delta: rGroupCount - pGroupCount,
        isPolyatomicGroup: true,
      });
    });
  } else {
    // Standard individual element tallies
    rawElementSet.forEach(elem => {
      let rCount = 0;
      let pCount = 0;
      equation.reactants.forEach((r, idx) => {
        rCount += (reactantCoefficients[idx] || 0) * (r.atoms[elem] || 0);
      });
      equation.products.forEach((p, idx) => {
        pCount += (productCoefficients[idx] || 0) * (p.atoms[elem] || 0);
      });

      const isBalanced = rCount === pCount && rCount > 0;
      const info = getElementInfo(elem);
      elementTallies.push({
        element: elem,
        name: info.name,
        color: info.color,
        reactantCount: rCount,
        productCount: pCount,
        isBalanced,
        delta: rCount - pCount,
        isPolyatomicGroup: false,
      });
    });
  }

  const isBalanced = isAllCoefficientsFilled && unbalancedElements.length === 0;

  // Mass scale tilt calculation (-1 = heavy left, +1 = heavy right, 0 = balanced)
  let massScaleTilt = 0;
  const totalBothSides = totalReactantAtoms + totalProductAtoms;
  if (totalBothSides > 0) {
    const diff = totalProductAtoms - totalReactantAtoms;
    massScaleTilt = Math.max(-1, Math.min(1, diff / 8));
  }

  return {
    isBalanced,
    isAllCoefficientsFilled,
    elementTallies,
    unbalancedElements,
    totalReactantAtoms,
    totalProductAtoms,
    massScaleTilt,
  };
}

/**
 * Creates full Compound with calculated atoms and particleLayout
 */
export function createCompound(formula: string, name: string): Compound {
  const atoms = parseChemicalFormula(formula);
  const particleLayout = generateParticleLayout(formula);
  return { formula, name, atoms, particleLayout };
}
