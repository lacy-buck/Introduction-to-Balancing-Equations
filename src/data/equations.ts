import { ChemicalEquation } from '../types/chemistry';
import { createCompound } from '../utils/chemistry';

// Module 1: Visual Particle Sandbox Equations
export const MODULE_1_EQUATIONS: ChemicalEquation[] = [
  {
    id: 'm1-eq1',
    module: 1,
    title: 'Sodium & Chlorine Reaction',
    reactionType: 'synthesis',
    difficulty: 1,
    description: 'Sodium metal (purple sphere) reacts with chlorine gas (green pair) to produce table salt (NaCl). Notice that chlorine comes as a bonded Cl₂ pair.',
    reactants: [
      createCompound('Na', 'Sodium metal'),
      createCompound('Cl2', 'Chlorine gas'),
    ],
    products: [
      createCompound('NaCl', 'Sodium chloride (salt)'),
    ],
    balancedCoefficients: {
      reactants: [2, 1],
      products: [2],
    },
    hints: [
      'Look at chlorine first: Cl₂ comes with 2 green atoms.',
      'To provide 2 Cl on the right, you need 2 NaCl units.',
      'Now balance sodium: 2 NaCl requires 2 Na on the left.'
    ]
  },
  {
    id: 'm1-eq2',
    module: 1,
    title: 'Carbon Monoxide Oxidation',
    reactionType: 'synthesis',
    difficulty: 1,
    description: 'Carbon monoxide (CO) burns with oxygen gas (O₂) to form carbon dioxide (CO₂).',
    reactants: [
      createCompound('CO', 'Carbon monoxide'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('CO2', 'Carbon dioxide'),
    ],
    balancedCoefficients: {
      reactants: [2, 1],
      products: [2],
    },
    hints: [
      'Notice that on the left you have 1 O in CO plus 2 O in O₂ (3 total O).',
      'On the right, CO₂ has 2 O. To get an even number of O on the left, put a 2 in front of CO.',
      'With 2 CO and 1 O₂, you have 2 C and 4 O total. Put a 2 in front of CO₂ to balance!'
    ]
  },
  {
    id: 'm1-eq3',
    module: 1,
    title: 'Sulfur Dioxide to Sulfur Trioxide',
    reactionType: 'synthesis',
    difficulty: 2,
    description: 'Sulfur dioxide (SO₂) reacts with oxygen gas (O₂) to form sulfur trioxide (SO₃) in industrial sulfuric acid synthesis.',
    reactants: [
      createCompound('SO2', 'Sulfur dioxide'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('SO3', 'Sulfur trioxide'),
    ],
    balancedCoefficients: {
      reactants: [2, 1],
      products: [2],
    },
    hints: [
      'On the left: 2 O (from SO₂) + 2 O (from O₂) = 4 O atoms.',
      'On the right: SO₃ has 3 O atoms. Find a common multiple for oxygen.',
      'Try placing 2 in front of SO₃ (6 O atoms). Now balance S and O on the left with 2 SO₂ and 1 O₂!'
    ]
  },
  {
    id: 'm1-eq4',
    module: 1,
    title: 'Nitric Oxide Oxidation',
    reactionType: 'synthesis',
    difficulty: 2,
    description: 'Colorless nitric oxide gas (NO) reacts rapidly with oxygen gas (O₂) to produce reddish-brown nitrogen dioxide (NO₂).',
    reactants: [
      createCompound('NO', 'Nitric oxide'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('NO2', 'Nitrogen dioxide'),
    ],
    balancedCoefficients: {
      reactants: [2, 1],
      products: [2],
    },
    hints: [
      'Count oxygen on the left: 1 in NO + 2 in O₂ = 3 total O atoms.',
      'Put a 2 in front of NO so oxygen is even: 2 NO has 2 N and 2 O, plus 2 O in O₂ = 4 O total.',
      'Now place a 2 in front of NO₂ to get 2 N and 4 O on the right!'
    ]
  },
  {
    id: 'm1-eq5',
    module: 1,
    title: 'Magnesium Combustion',
    reactionType: 'synthesis',
    difficulty: 2,
    description: 'Magnesium metal burns with a brilliant white light in oxygen to form powdery white magnesium oxide (MgO).',
    reactants: [
      createCompound('Mg', 'Magnesium metal'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('MgO', 'Magnesium oxide'),
    ],
    balancedCoefficients: {
      reactants: [2, 1],
      products: [2],
    },
    hints: [
      'Oxygen gas is diatomic (O₂), meaning it has 2 red oxygen atoms.',
      'To use both oxygen atoms, you must produce 2 MgO units.',
      'Now balance magnesium: 2 MgO requires 2 Mg on the left.'
    ]
  },
  {
    id: 'm1-eq6',
    module: 1,
    title: 'Iron Rusting (Oxidation)',
    reactionType: 'synthesis',
    difficulty: 3,
    description: 'Iron metal reacts with oxygen gas over time to form reddish-brown iron(III) oxide (Fe₂O₃). Notice the 3:2 oxygen ratio!',
    reactants: [
      createCompound('Fe', 'Iron metal'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('Fe2O3', 'Iron(III) oxide (Rust)'),
    ],
    balancedCoefficients: {
      reactants: [4, 3],
      products: [2],
    },
    hints: [
      'Oxygen has subscript 2 in O₂ and subscript 3 in Fe₂O₃. The least common multiple of 2 and 3 is 6!',
      'Put 3 in front of O₂ (3 × 2 = 6 O) and 2 in front of Fe₂O₃ (2 × 3 = 6 O).',
      'Now count iron: 2 Fe₂O₃ has 2 × 2 = 4 Fe atoms. Place 4 in front of Fe.'
    ]
  }
];

// Module 2: Table Tutorial Equations (teaching students how to fill out the Atom Inventory table)
export const MODULE_2_EQUATIONS: ChemicalEquation[] = [
  {
    id: 'm2-eq1',
    module: 2,
    title: 'Lesson 1: Filling Out Your First Atom Inventory',
    reactionType: 'synthesis',
    difficulty: 1,
    description: 'Welcome to the Atom Inventory Table! In real chemistry class, we use a table to tally reactant atoms vs. product atoms. Multiply the stoichiometric coefficient by each subscript: Count = Coefficient × Subscript.',
    reactants: [
      createCompound('Mg', 'Magnesium'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('MgO', 'Magnesium oxide'),
    ],
    balancedCoefficients: {
      reactants: [2, 1],
      products: [2],
    },
    hints: [
      'Look at Oxygen first: Reactants have 2 (from 1 × O₂), but Products only have 1 (from 1 × MgO).',
      'Change the coefficient in front of MgO to 2. Now products have 2 Mg and 2 O!',
      'Finally, update the reactant Mg coefficient to 2 to balance magnesium.'
    ]
  },
  {
    id: 'm2-eq2',
    module: 2,
    title: 'Lesson 2: Hydrogen & Bromine Balancing',
    reactionType: 'synthesis',
    difficulty: 1,
    description: 'Practice calculating the counts in the table. When a formula has no subscript, the subscript is an implicit 1.',
    reactants: [
      createCompound('H2', 'Hydrogen gas'),
      createCompound('Br2', 'Bromine gas'),
    ],
    products: [
      createCompound('HBr', 'Hydrogen bromide'),
    ],
    balancedCoefficients: {
      reactants: [1, 1],
      products: [2],
    },
    hints: [
      'Check H: Reactants = 2, Products = 1.',
      'Check Br: Reactants = 2, Products = 1.',
      'Placing a 2 in front of HBr balances both H and Br simultaneously!'
    ]
  },
  {
    id: 'm2-eq3',
    module: 2,
    title: 'Lesson 3: Dealing with Odd and Even Subscripts',
    reactionType: 'synthesis',
    difficulty: 2,
    description: 'Iron rusts when exposed to oxygen. Here, Oxygen has a subscript of 2 on the left (O₂) and 3 on the right (Fe₂O₃). To balance an odd and even number, find their least common multiple (LCM): LCM(2, 3) = 6!',
    reactants: [
      createCompound('Fe', 'Iron'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('Fe2O3', 'Iron(III) oxide (Rust)'),
    ],
    balancedCoefficients: {
      reactants: [4, 3],
      products: [2],
    },
    hints: [
      'Find the common multiple for Oxygen: 2 × 3 = 6.',
      'Put 3 in front of O₂ (3 × 2 = 6 O atoms) and 2 in front of Fe₂O₃ (2 × 3 = 6 O atoms).',
      'Now look at the Fe column in the table: 2 Fe₂O₃ has 2 × 2 = 4 Fe atoms. Put 4 in front of Fe on the left.'
    ]
  },
  {
    id: 'm2-eq4',
    module: 2,
    title: 'Lesson 4: Single Replacement & Subscript Math',
    reactionType: 'single_replacement',
    difficulty: 2,
    description: 'Aluminum metal dissolves in hydrochloric acid. Practice checking the element columns as you adjust each coefficient.',
    reactants: [
      createCompound('Al', 'Aluminum'),
      createCompound('HCl', 'Hydrochloric acid'),
    ],
    products: [
      createCompound('AlCl3', 'Aluminum chloride'),
      createCompound('H2', 'Hydrogen gas'),
    ],
    balancedCoefficients: {
      reactants: [2, 6],
      products: [2, 3],
    },
    hints: [
      'Notice Chlorine has subscript 3 in AlCl₃, and Hydrogen has subscript 2 in H₂.',
      'Since both H and Cl come from HCl on the left, we need a coefficient that is a multiple of both 2 and 3 -> 6 HCl.',
      'With 6 HCl: you get 6 H (so 3 H₂) and 6 Cl (so 2 AlCl₃). Then balance 2 Al.'
    ]
  },
  {
    id: 'm2-eq5',
    module: 2,
    title: 'Lesson 5: Polyatomic Compounds & Summing Atoms',
    reactionType: 'synthesis',
    difficulty: 2,
    description: 'Sodium oxide reacts with water to form sodium hydroxide. Watch out: Oxygen appears in BOTH reactants on the left!',
    reactants: [
      createCompound('Na2O', 'Sodium oxide'),
      createCompound('H2O', 'Water'),
    ],
    products: [
      createCompound('NaOH', 'Sodium hydroxide'),
    ],
    balancedCoefficients: {
      reactants: [1, 1],
      products: [2],
    },
    hints: [
      'Count Reactant Oxygen carefully: 1 O from Na₂O + 1 O from H₂O = 2 total O atoms.',
      'Reactant Sodium: 2 Na from Na₂O.',
      'Reactant Hydrogen: 2 H from H₂O. Putting 2 in front of NaOH gives 2 Na, 2 O, and 2 H!'
    ]
  },
  {
    id: 'm2-eq6',
    module: 2,
    title: 'Lesson 6: Decomposition of Potassium Chlorate',
    reactionType: 'decomposition',
    difficulty: 2,
    description: 'When heated, solid potassium chlorate decomposes into potassium chloride and oxygen gas.',
    reactants: [
      createCompound('KClO3', 'Potassium chlorate'),
    ],
    products: [
      createCompound('KCl', 'Potassium chloride'),
      createCompound('O2', 'Oxygen gas'),
    ],
    balancedCoefficients: {
      reactants: [2],
      products: [2, 3],
    },
    hints: [
      'Notice Oxygen: 3 on left vs. 2 on right. Least common multiple is 6.',
      'Try 2 KClO₃ on left (2 × 3 = 6 O) and 3 O₂ on right (3 × 2 = 6 O).',
      'Now check K and Cl in the table: 2 K and 2 Cl on left -> put 2 in front of KCl.'
    ]
  }
];

// Module 3: Combustion Reactions Practice Mode (Tier 1 -> Tier 4)
export const MODULE_3_EQUATIONS: ChemicalEquation[] = [
  // Tier 1: Novice - Fundamental Hydrocarbon & Elemental Combustion
  {
    id: 'm3-t1-1',
    module: 3,
    title: 'Methane (Natural Gas) Combustion',
    reactionType: 'combustion',
    difficulty: 1,
    description: 'Methane (CH₄) is the primary component of natural gas used in home heating and gas stoves. It burns with oxygen to produce carbon dioxide and water vapor.',
    reactants: [
      createCompound('CH4', 'Methane'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('CO2', 'Carbon dioxide'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [1, 2],
      products: [1, 2],
    },
    hints: [
      'Balance Carbon first: 1 C on the left matches 1 C in CO₂.',
      'Balance Hydrogen second: 4 H in CH₄ requires 2 H₂O on the right (2 × 2 = 4 H).',
      'Now count total Oxygen on the right: 2 (from CO₂) + 2 (from 2 H₂O) = 4 O atoms -> place a 2 in front of O₂!'
    ]
  },
  {
    id: 'm3-t1-2',
    module: 3,
    title: 'Ethane Combustion',
    reactionType: 'combustion',
    difficulty: 1,
    description: 'Ethane gas (C₂H₆) burns cleanly with oxygen. Practice balancing carbon and hydrogen before tallying oxygen!',
    reactants: [
      createCompound('C2H6', 'Ethane'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('CO2', 'Carbon dioxide'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [2, 7],
      products: [4, 6],
    },
    hints: [
      'Try starting with 1 C₂H₆: 2 CO₂ and 3 H₂O.',
      'Count Oxygen on the right: (2 × 2) + 3 = 7 O atoms. Since 7 is odd, double every compound!',
      'Balanced: 2 C₂H₆, 7 O₂, 4 CO₂, and 6 H₂O.'
    ]
  },
  {
    id: 'm3-t1-3',
    module: 3,
    title: 'White Phosphorus Combustion',
    reactionType: 'combustion',
    difficulty: 1,
    description: 'Solid white phosphorus (P₄) reacts with atmospheric oxygen to produce dense white clouds of diphosphorus pentoxide (P₂O₅).',
    reactants: [
      createCompound('P4', 'Phosphorus'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('P2O5', 'Diphosphorus pentoxide'),
    ],
    balancedCoefficients: {
      reactants: [1, 5],
      products: [2],
    },
    hints: [
      'Balance P first: 4 P on the left means you need 2 P₂O₅ on the right (2 × 2 = 4 P).',
      'Now count Oxygen on the right: 2 × 5 = 10 O atoms.',
      'Since oxygen gas comes in pairs (O₂), place 5 in front of O₂ (5 × 2 = 10 O)!'
    ]
  },

  // Tier 2: Intermediate - Alkane & Fuel Gas Combustion
  {
    id: 'm3-t2-1',
    module: 3,
    title: 'Propane Gas Barbecue Combustion',
    reactionType: 'combustion',
    difficulty: 2,
    description: 'Clean burning barbecue propane (C₃H₈) reacts with oxygen gas in an outdoor grill to produce heat, carbon dioxide, and steam.',
    reactants: [
      createCompound('C3H8', 'Propane'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('CO2', 'Carbon dioxide'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [1, 5],
      products: [3, 4],
    },
    hints: [
      'Balance Carbon first: 3 C in C₃H₈ -> 3 CO₂ on the right.',
      'Balance Hydrogen second: 8 H in C₃H₈ -> 4 H₂O on the right (4 × 2 = 8 H).',
      'Count total Oxygen on the right: (3 × 2) from CO₂ + (4 × 1) from H₂O = 6 + 4 = 10 O atoms -> 5 O₂!'
    ]
  },
  {
    id: 'm3-t2-2',
    module: 3,
    title: 'Hydrogen Fuel Combustion',
    reactionType: 'combustion',
    difficulty: 2,
    description: 'Hydrogen gas burns with oxygen in rocket engines and hydrogen fuel cells, yielding only pure water vapor with zero greenhouse carbon emissions.',
    reactants: [
      createCompound('H2', 'Hydrogen gas'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [2, 1],
      products: [2],
    },
    hints: [
      'Oxygen gas is diatomic (O₂), having 2 oxygen atoms.',
      'To balance oxygen, you need 2 H₂O on the right side.',
      '2 H₂O requires 2 × 2 = 4 H atoms -> place a 2 in front of H₂ on the left.'
    ]
  },

  // Tier 3: Advanced - Alcohols, Alkynes & Odd/Even Scaling
  {
    id: 'm3-t3-1',
    module: 3,
    title: 'Butane Lighter Combustion',
    reactionType: 'combustion',
    difficulty: 3,
    description: 'Pocket lighters contain liquid butane (C₄H₁₀). Notice the odd oxygen count that requires doubling all coefficients!',
    reactants: [
      createCompound('C4H10', 'Butane'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('CO2', 'Carbon dioxide'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [2, 13],
      products: [8, 10],
    },
    hints: [
      'Balance 1 C₄H₁₀ first: 4 CO₂ and 5 H₂O.',
      'Total Oxygen on the right = (4 × 2) + 5 = 13 O atoms.',
      'Since 13 is odd, double every compound to keep all coefficients as whole numbers: 2 C₄H₁₀, 13 O₂, 8 CO₂, and 10 H₂O!'
    ]
  },
  {
    id: 'm3-t3-2',
    module: 3,
    title: 'Methanol Racing Fuel Combustion',
    reactionType: 'combustion',
    difficulty: 3,
    description: 'Methanol (CH₄O) is used as high-performance fuel in IndyCar racing. Remember that 1 oxygen atom is already inside the methanol molecule!',
    reactants: [
      createCompound('CH4O', 'Methanol'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('CO2', 'Carbon dioxide'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [2, 3],
      products: [2, 4],
    },
    hints: [
      'Try balancing C and H: 1 CH₄O produces 1 CO₂ and 2 H₂O.',
      'Total Oxygen on the right = 2 + 2 = 4 O atoms.',
      'Subtract the 1 O inside methanol: 4 - 1 = 3 O needed from O₂. Double everything: 2 CH₄O, 3 O₂, 2 CO₂, and 4 H₂O!'
    ]
  },
  {
    id: 'm3-t3-3',
    module: 3,
    title: 'Acetylene Welding Torch Combustion',
    reactionType: 'combustion',
    difficulty: 3,
    description: 'Oxy-acetylene torches burn ethyne/acetylene gas (C₂H₂) at over 3,000°C to cut through steel.',
    reactants: [
      createCompound('C2H2', 'Acetylene'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('CO2', 'Carbon dioxide'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [2, 5],
      products: [4, 2],
    },
    hints: [
      '1 C₂H₂ gives 2 CO₂ and 1 H₂O.',
      'Total Oxygen on the right = (2 × 2) + 1 = 5 O atoms.',
      'Double all compounds to avoid fractional coefficients: 2 C₂H₂, 5 O₂, 4 CO₂, and 2 H₂O!'
    ]
  },

  // Tier 4: Mastery - Complex Biofuels & Biochemical Combustion
  {
    id: 'm3-t4-1',
    module: 3,
    title: 'Ethanol Biofuel Combustion',
    reactionType: 'combustion',
    difficulty: 4,
    description: 'Combustion of ethanol (C₂H₆O). Remember there is 1 oxygen already inside each ethanol molecule!',
    reactants: [
      createCompound('C2H6O', 'Ethanol'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('CO2', 'Carbon dioxide'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [1, 3],
      products: [2, 3],
    },
    hints: [
      'Balance C: 2 C -> 2 CO₂.',
      'Balance H: 6 H -> 3 H₂O.',
      'Total O on right = (2 × 2) + 3 = 7 O. Subtract the 1 O inside ethanol: 7 - 1 = 6 O from O₂ -> 3 O₂.'
    ]
  },
  {
    id: 'm3-t4-2',
    module: 3,
    title: 'Cellular Respiration (Glucose Combustion)',
    reactionType: 'combustion',
    difficulty: 4,
    description: 'In biology and chemistry, your cells burn glucose sugar (C₆H₁₂O₆) with oxygen to power your body. This is biochemical combustion!',
    reactants: [
      createCompound('C6H12O6', 'Glucose sugar'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('CO2', 'Carbon dioxide'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [1, 6],
      products: [6, 6],
    },
    hints: [
      'Balance Carbon: 6 C in glucose -> 6 CO₂.',
      'Balance Hydrogen: 12 H in glucose -> 6 H₂O (6 × 2 = 12 H).',
      'Count Oxygen on the right: (6 × 2) + 6 = 18 O. Glucose already has 6 O. Remaining 18 - 6 = 12 O -> 6 O₂!'
    ]
  },
  {
    id: 'm3-t4-3',
    module: 3,
    title: 'Roasting Iron Pyrite (Fool\'s Gold)',
    reactionType: 'combustion',
    difficulty: 4,
    description: 'Pyrite mineral (FeS₂) roasted in air yields iron(III) oxide and sulfur dioxide gas.',
    reactants: [
      createCompound('FeS2', 'Iron pyrite'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('Fe2O3', 'Iron(III) oxide'),
      createCompound('SO2', 'Sulfur dioxide'),
    ],
    balancedCoefficients: {
      reactants: [4, 11],
      products: [2, 8],
    },
    hints: [
      'Balance Fe with 2 Fe₂O₃ -> need 4 FeS₂.',
      '4 FeS₂ has 4 × 2 = 8 S atoms -> 8 SO₂.',
      'Count O: (2 × 3) in Fe₂O₃ + (8 × 2) in SO₂ = 6 + 16 = 22 O atoms -> 11 O₂!'
    ]
  }
];

// Module 4: Polyatomic Ion Groups Module Equations
export const MODULE_POLYATOMIC_EQUATIONS: ChemicalEquation[] = [
  {
    id: 'm4-poly-1',
    module: 4,
    title: 'Lesson 1: The Sulfate [SO₄] Group Packet',
    reactionType: 'double_replacement',
    difficulty: 2,
    description: 'Look at sodium sulfate (Na₂SO₄) and barium sulfate (BaSO₄). Notice that the sulfate group [SO₄] appears on BOTH sides intact! You do not need to separate Sulfur and Oxygen.',
    reactants: [
      createCompound('BaCl2', 'Barium chloride'),
      createCompound('Na2SO4', 'Sodium sulfate'),
    ],
    products: [
      createCompound('BaSO4', 'Barium sulfate (precipitate)'),
      createCompound('NaCl', 'Sodium chloride'),
    ],
    balancedCoefficients: {
      reactants: [1, 1],
      products: [1, 2],
    },
    polyatomicGroups: ['SO4'],
    hints: [
      'Identify the intact group: [SO₄] is on the left in Na₂SO₄ and on the right in BaSO₄.',
      'Count [SO₄] groups: 1 on the left, 1 on the right. Sulfate is already balanced!',
      'Now look at Sodium and Chlorine: 2 Na and 2 Cl on the left -> place a 2 in front of NaCl!'
    ]
  },
  {
    id: 'm4-poly-2',
    module: 4,
    title: 'Lesson 2: Subscripts Outside Parentheses (SO₄)₃',
    reactionType: 'single_replacement',
    difficulty: 3,
    description: 'Look at aluminum sulfate: Al₂(SO₄)₃. The subscript 3 outside the parentheses means there are THREE complete [SO₄] sulfate packets! Balance the [SO₄] group first.',
    reactants: [
      createCompound('Al', 'Aluminum metal'),
      createCompound('CuSO4', 'Copper(II) sulfate'),
    ],
    products: [
      createCompound('Al2(SO4)3', 'Aluminum sulfate'),
      createCompound('Cu', 'Copper metal'),
    ],
    balancedCoefficients: {
      reactants: [2, 3],
      products: [1, 3],
    },
    polyatomicGroups: ['SO4'],
    hints: [
      'Al₂(SO₄)₃ contains 3 [SO₄] groups. You need 3 CuSO₄ on the left to provide 3 [SO₄] groups.',
      '3 CuSO₄ gives 3 Cu atoms, which produce 3 Cu on the right.',
      'Now balance Aluminum: 1 Al₂(SO₄)₃ contains 2 Al atoms -> place a 2 in front of Al!'
    ]
  },
  {
    id: 'm4-poly-3',
    module: 4,
    title: 'Lesson 3: The Nitrate [NO₃] Group',
    reactionType: 'double_replacement',
    difficulty: 3,
    description: 'Silver nitrate reacts with calcium chloride. Calcium nitrate contains two nitrate packets: Ca(NO₃)₂. Treat [NO₃] as a single cluster!',
    reactants: [
      createCompound('CaCl2', 'Calcium chloride'),
      createCompound('AgNO3', 'Silver nitrate'),
    ],
    products: [
      createCompound('Ca(NO3)2', 'Calcium nitrate'),
      createCompound('AgCl', 'Silver chloride'),
    ],
    balancedCoefficients: {
      reactants: [1, 2],
      products: [1, 2],
    },
    polyatomicGroups: ['NO3'],
    hints: [
      'Ca(NO₃)₂ has 2 [NO₃] groups on the right. Put a 2 in front of AgNO₃ to provide 2 [NO₃] groups.',
      '2 AgNO₃ now gives 2 Ag atoms, which need 2 AgCl on the right.',
      'Check Calcium and Chlorine: 1 Ca and 2 Cl on the left, 1 Ca and 2 Cl on the right. Balanced!'
    ]
  },
  {
    id: 'm4-poly-4',
    module: 4,
    title: 'Lesson 4: The Hydroxide [OH] Group',
    reactionType: 'double_replacement',
    difficulty: 3,
    description: 'Iron(III) chloride reacts with sodium hydroxide. The product Fe(OH)₃ holds 3 intact hydroxide groups: [OH]₃.',
    reactants: [
      createCompound('FeCl3', 'Iron(III) chloride'),
      createCompound('NaOH', 'Sodium hydroxide'),
    ],
    products: [
      createCompound('Fe(OH)3', 'Iron(III) hydroxide'),
      createCompound('NaCl', 'Sodium chloride'),
    ],
    balancedCoefficients: {
      reactants: [1, 3],
      products: [1, 3],
    },
    polyatomicGroups: ['OH'],
    hints: [
      'Fe(OH)₃ has 3 [OH] groups. Put a 3 in front of NaOH to get 3 [OH] groups.',
      '3 NaOH provides 3 Na atoms. Put a 3 in front of NaCl on the right.',
      'Check Chlorine: FeCl₃ on the left has 3 Cl, and 3 NaCl on the right has 3 Cl!'
    ]
  },
  {
    id: 'm4-poly-5',
    module: 4,
    title: 'Lesson 5: Two Polyatomic Groups Swapping [NO₃] & [OH]',
    reactionType: 'double_replacement',
    difficulty: 4,
    description: 'In this double replacement, TWO different polyatomic ions swap partners: Nitrate [NO₃] and Hydroxide [OH]. Keep both as intact group units!',
    reactants: [
      createCompound('Fe(NO3)3', 'Iron(III) nitrate'),
      createCompound('KOH', 'Potassium hydroxide'),
    ],
    products: [
      createCompound('Fe(OH)3', 'Iron(III) hydroxide'),
      createCompound('KNO3', 'Potassium nitrate'),
    ],
    balancedCoefficients: {
      reactants: [1, 3],
      products: [1, 3],
    },
    polyatomicGroups: ['NO3', 'OH'],
    hints: [
      'Count [NO₃]: Fe(NO₃)₃ has 3 nitrates on the left. Put 3 in front of KNO₃ to balance nitrate.',
      'Count [OH]: Fe(OH)₃ has 3 hydroxides on the right. Put 3 in front of KOH to balance hydroxide.',
      'Notice Potassium: 3 KOH on the left equals 3 KNO₃ on the right. All elements and groups are balanced!'
    ]
  },
  {
    id: 'm4-poly-6',
    module: 4,
    title: 'Lesson 6: Ammonium [(NH₄)] and Phosphate [(PO₄)]',
    reactionType: 'double_replacement',
    difficulty: 4,
    description: 'Ammonium phosphate (NH₄)₃PO₄ contains both positive ammonium [(NH₄)] and negative phosphate [(PO₄)] polyatomic ions!',
    reactants: [
      createCompound('(NH4)3PO4', 'Ammonium phosphate'),
      createCompound('CaCl2', 'Calcium chloride'),
    ],
    products: [
      createCompound('Ca3(PO4)2', 'Calcium phosphate'),
      createCompound('NH4Cl', 'Ammonium chloride'),
    ],
    balancedCoefficients: {
      reactants: [2, 3],
      products: [1, 6],
    },
    polyatomicGroups: ['PO4', 'NH4'],
    hints: [
      'Look at Ca₃(PO₄)₂ on the right: it needs 3 Ca and 2 [PO₄] groups.',
      'Put 3 in front of CaCl₂ to provide 3 Ca, and 2 in front of (NH₄)₃PO₄ to provide 2 [PO₄] groups.',
      'Now tally ammonium [(NH₄)]: 2 × 3 = 6 [(NH₄)]. Place a 6 in front of NH₄Cl. 6 Cl also matches the 3 CaCl₂ (3 × 2 = 6 Cl)!'
    ]
  }
];

// Module 5: High School Olympiad / Mastery Challenge Gauntlet
export const MODULE_4_EQUATIONS: ChemicalEquation[] = [
  {
    id: 'm5-ch1',
    module: 5,
    title: 'Octane Gasoline Combustion',
    reactionType: 'combustion',
    difficulty: 5,
    description: 'Standard automotive gasoline combustion (C₈H₁₈). Balances with large even/odd coefficient scaling using whole integers.',
    reactants: [
      createCompound('C8H18', 'Octane'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('CO2', 'Carbon dioxide'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [2, 25],
      products: [16, 18],
    },
    hints: [
      'Try balancing with 1 C₈H₁₈ first: 8 CO₂ and 9 H₂O.',
      'Count Oxygen on the right: (8 × 2) + 9 = 16 + 9 = 25 O atoms.',
      'Since 25 is odd, double every compound to avoid fractions: 2 C₈H₁₈, 25 O₂, 16 CO₂, and 18 H₂O!'
    ]
  },
  {
    id: 'm5-ch2',
    module: 5,
    title: 'Aluminum Sulfate & Calcium Hydroxide',
    reactionType: 'double_replacement',
    difficulty: 5,
    description: 'A double-replacement reaction featuring two separate compound polyatomic groups in parentheses: sulfate (SO₄) and hydroxide (OH).',
    reactants: [
      createCompound('Al2(SO4)3', 'Aluminum sulfate'),
      createCompound('Ca(OH)2', 'Calcium hydroxide'),
    ],
    products: [
      createCompound('Al(OH)3', 'Aluminum hydroxide'),
      createCompound('CaSO4', 'Calcium sulfate'),
    ],
    balancedCoefficients: {
      reactants: [1, 3],
      products: [2, 3],
    },
    hints: [
      'Pro-Tip: Balance polyatomic ions as single intact units! There are 3 (SO₄) groups on the left -> 3 CaSO₄ on the right.',
      '3 CaSO₄ requires 3 Ca(OH)₂ on the left.',
      '3 Ca(OH)₂ provides 3 × 2 = 6 (OH) groups. Look at Al(OH)₃ on the right: 2 Al(OH)₃ provides 6 (OH) and 2 Al!',
      'Check: 1 Al₂(SO₄)₃ has 2 Al. Perfectly balanced!'
    ]
  },
  {
    id: 'm5-ch3',
    module: 5,
    title: 'Potassium Permanganate & Acid Reaction',
    reactionType: 'complex_reaction',
    difficulty: 5,
    description: 'The famous laboratory demonstration of deep purple KMnO₄ reacting with concentrated hydrochloric acid to produce chlorine gas.',
    reactants: [
      createCompound('KMnO4', 'Potassium permanganate'),
      createCompound('HCl', 'Hydrochloric acid'),
    ],
    products: [
      createCompound('KCl', 'Potassium chloride'),
      createCompound('MnCl2', 'Manganese(II) chloride'),
      createCompound('H2O', 'Water'),
      createCompound('Cl2', 'Chlorine gas'),
    ],
    balancedCoefficients: {
      reactants: [2, 16],
      products: [2, 2, 8, 5],
    },
    hints: [
      'Notice Oxygen: KMnO₄ has 4 O, which must become H₂O. If you have 2 KMnO₄ (8 O), you will form 8 H₂O.',
      '8 H₂O requires 16 H atoms -> 16 HCl.',
      'Now distribute 16 Cl atoms: 2 in KCl, 4 in 2 MnCl₂ (2 × 2 = 4), leaving 16 - 2 - 4 = 10 Cl atoms -> 5 Cl₂!'
    ]
  },
  {
    id: 'm5-ch4',
    module: 5,
    title: 'Copper with Dilute Nitric Acid',
    reactionType: 'single_replacement',
    difficulty: 5,
    description: 'Copper metal reacting with dilute nitric acid producing nitric oxide gas (NO) and copper(II) nitrate.',
    reactants: [
      createCompound('Cu', 'Copper metal'),
      createCompound('HNO3', 'Nitric acid'),
    ],
    products: [
      createCompound('Cu(NO3)2', 'Copper(II) nitrate'),
      createCompound('NO', 'Nitric oxide'),
      createCompound('H2O', 'Water'),
    ],
    balancedCoefficients: {
      reactants: [3, 8],
      products: [3, 2, 4],
    },
    hints: [
      'Notice that copper bonds with 2 nitrates in Cu(NO₃)₂, while some nitrogen forms NO gas. Use 3 Cu to match the 2 NO ratio.',
      '3 Cu(NO₃)₂ needs 6 nitrate ions, plus the 2 forming NO = 8 total HNO₃ -> 4 H₂O.',
      'Check: 8 H on the left equals 4 H₂O on the right!'
    ]
  },
  {
    id: 'm5-ch5',
    module: 5,
    title: 'Ammonium Phosphate & Lead Nitrate',
    reactionType: 'double_replacement',
    difficulty: 5,
    description: 'Double displacement with complex nested polyatomic parentheses: (NH₄)₃PO₄ and Pb(NO₃)₄.',
    reactants: [
      createCompound('(NH4)3PO4', 'Ammonium phosphate'),
      createCompound('Pb(NO3)4', 'Lead(IV) nitrate'),
    ],
    products: [
      createCompound('Pb3(PO4)4', 'Lead(IV) phosphate'),
      createCompound('NH4NO3', 'Ammonium nitrate'),
    ],
    balancedCoefficients: {
      reactants: [4, 3],
      products: [1, 12],
    },
    hints: [
      'Look at Pb₃(PO₄)₄ on the right: it contains 3 Pb and 4 PO₄.',
      'To provide 3 Pb, you need 3 Pb(NO₃)₄.',
      'To provide 4 PO₄, you need 4 (NH₄)₃PO₄.',
      'Now count (NH₄) on the left: 4 × 3 = 12 NH₄. Count (NO₃) on the left: 3 × 4 = 12 NO₃. Exactly 12 NH₄NO₃!'
    ]
  },
  {
    id: 'm5-ch6',
    module: 5,
    title: 'Reduction of Magnetic Iron Oxide',
    reactionType: 'single_replacement',
    difficulty: 4,
    description: 'Magnetite ore (Fe₃O₄) converted by hydrogen gas at high temperatures into pure iron metal.',
    reactants: [
      createCompound('Fe3O4', 'Magnetite'),
      createCompound('H2', 'Hydrogen gas'),
    ],
    products: [
      createCompound('Fe', 'Pure iron'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [1, 4],
      products: [3, 4],
    },
    hints: [
      'Balance Iron first: 3 Fe in Fe₃O₄ -> 3 Fe.',
      'Notice Fe₃O₄ has 4 Oxygen atoms, which will create 4 H₂O.',
      '4 H₂O requires 4 H₂ on the left.'
    ]
  },
  {
    id: 'm5-ch7',
    module: 5,
    title: 'Diborane Fuel Combustion',
    reactionType: 'combustion',
    difficulty: 4,
    description: 'Diborane (B₂H₆) burns with an intense green flame when reacting with oxygen.',
    reactants: [
      createCompound('B2H6', 'Diborane'),
      createCompound('O2', 'Oxygen gas'),
    ],
    products: [
      createCompound('B2O3', 'Diboron trioxide'),
      createCompound('H2O', 'Water vapor'),
    ],
    balancedCoefficients: {
      reactants: [1, 3],
      products: [1, 3],
    },
    hints: [
      'B is already balanced (2 B in B₂H₆ -> 1 B₂O₃).',
      '6 H in B₂H₆ creates 3 H₂O.',
      'Total O on right = 3 (from B₂O₃) + 3 (from 3 H₂O) = 6 O atoms -> 3 O₂.'
    ]
  }
];

export const ALL_EQUATIONS = [
  ...MODULE_1_EQUATIONS,
  ...MODULE_2_EQUATIONS,
  ...MODULE_3_EQUATIONS,
  ...MODULE_POLYATOMIC_EQUATIONS,
  ...MODULE_4_EQUATIONS,
];

