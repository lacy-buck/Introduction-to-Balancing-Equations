/**
 * Chemical balancing types and definitions
 */

export type ElementSymbol = 
  | 'H' | 'He' | 'Li' | 'Be' | 'B' | 'C' | 'N' | 'O' | 'F' | 'Ne'
  | 'Na' | 'Mg' | 'Al' | 'Si' | 'P' | 'S' | 'Cl' | 'Ar'
  | 'K' | 'Ca' | 'Sc' | 'Ti' | 'V' | 'Cr' | 'Mn' | 'Fe' | 'Co' | 'Ni'
  | 'Cu' | 'Zn' | 'Ga' | 'Ge' | 'As' | 'Se' | 'Br' | 'Kr'
  | 'Ag' | 'Ba' | 'Pb' | 'Hg' | 'I';

export interface ElementVisualData {
  symbol: string;
  name: string;
  color: string;
  borderColor: string;
  textColor: string;
  radius: number;
}

export interface AtomCoord {
  element: string;
  x: number;
  y: number;
  r: number;
}

export interface BondCoord {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Compound {
  formula: string;
  name: string;
  atoms: Record<string, number>;
  polyatomicCounts?: Record<string, number>; // e.g. { SO4: 3 }
  state?: 's' | 'l' | 'g' | 'aq';
  // Particle visual layout for 2D diagram
  particleLayout?: {
    width: number;
    height: number;
    atoms: AtomCoord[];
    bonds: BondCoord[];
  };
}

export type ReactionType = 
  | 'synthesis' 
  | 'decomposition' 
  | 'single_replacement' 
  | 'double_replacement' 
  | 'combustion' 
  | 'precipitation'
  | 'complex_reaction';

export interface ChemicalEquation {
  id: string;
  title: string;
  reactants: Compound[];
  products: Compound[];
  balancedCoefficients: {
    reactants: number[];
    products: number[];
  };
  difficulty: 1 | 2 | 3 | 4 | 5;
  reactionType: ReactionType;
  description?: string;
  hints?: string[];
  module?: 1 | 2 | 3 | 4 | 5;
  polyatomicGroups?: string[]; // e.g. ['SO4', 'OH']
}

export interface ElementTally {
  element: string;
  name: string;
  color: string;
  reactantCount: number;
  productCount: number;
  isBalanced: boolean;
  delta: number; // reactantCount - productCount
  isPolyatomicGroup?: boolean;
}

export interface BalanceStatus {
  isBalanced: boolean;
  isAllCoefficientsFilled: boolean;
  elementTallies: ElementTally[];
  unbalancedElements: string[];
  totalReactantAtoms: number;
  totalProductAtoms: number;
  massScaleTilt: number; // -1 to +1 for left vs right heavy
  suggestedNextElement?: string;
}

export type ActiveModule = 
  | 'module1_particles' 
  | 'module2_table' 
  | 'module3_practice' 
  | 'module4_polyatomic'
  | 'module5_challenge';
