# ChemBalance: High School Chemical Equation Balancing Studio

An interactive high school chemistry learning and practice platform that scaffolds equation balancing from visual molecular particle models to atom inventory tables, adaptive difficulty practice, and complex challenge problems.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following design decisions were confirmed during Phase 1:
> - **Particle Diagram Style**: PhET-style clustered colored atom spheres (CPK coloring: Carbon = Black/Slate, Hydrogen = White/Light Grey with outline, Oxygen = Red, Nitrogen = Blue, Chlorine = Green, Sulfur = Yellow, Metals = Purple/Silver).
> - **Coefficient Input System**: Clickable tactile number pads anchored to each stoichiometric coefficient box, along with quick increment/decrement controls.
> - **Learning Assistance & Hints**: Live step-by-step balance checks with element mismatch highlighting, showing exact reactant vs. product counts and guidance on which element to balance next.

---

### 1. Overview & Core Concept

- **What It Does**: ChemBalance guides high school chemistry students through a proven pedagogical progression for mastering chemical equation balancing:
  1. **Module 1: Visual Particle Sandbox (Tutorial)**: Students see tangible 2D molecular clusters (PhET-style spheres with bonds) multiplying in real-time as coefficients change, reinforcing the Law of Conservation of Mass.
  2. **Module 2: Atom Inventory Table (Tutorial)**: Diagrams fade out; students learn the standard classroom method of building and filling out an element-by-element Reactant/Product count table.
  3. **Module 3: Adaptive Practice**: Flexible practice arena where students choose whether to activate or hide the atom count table. The system dynamically scales difficulty (from basic binary combinations to combustion and polyatomic ions) based on mastery streaks.
  4. **Module 4: Chemistry Olympiad Challenge**: High-difficulty balancing gauntlet featuring complex polyatomic ions, hydrocarbon combustions, hydrated salts, and larger stoichiometric coefficients with full element mismatch diagnostics.
- **Target Audience**: High school chemistry students (Introductory, Honors, and AP Chemistry) and educators needing a clean, interactive classroom tool.
- **Key Value**: Bridges the conceptual gap between microscopic atomic reality (atoms cannot be created or destroyed, subscripts cannot be changed) and symbolic algebraic balancing with structured scaffolding.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Module Navigation & Stage Selection**:
   - Clean top navigation bar allows immediate jumping between the four learning modules (`1. Particle Diagrams`, `2. Atom Inventory`, `3. Adaptive Practice`, `4. Master Challenge`), tracking progress and mastery per module.
2. **Balancing Interaction (Unified across modules)**:
   - Students tap any coefficient box in front of a formula (e.g., `[ ? ] H₂ + [ ? ] O₂ → [ ? ] H₂O`).
   - A neat popover number pad ($1$–$12$, plus clear/step buttons) appears directly attached to the box for effortless touch and desktop interaction.
   - Live visual feedback instantly indicates whether the equation is balanced ($==$ conservation satisfied) or which elements are mismatched.
3. **Module 1 Tutorial Progression**:
   - Interactive guided tour with progressive lessons ($H_2 + Cl_2 \rightarrow HCl$, $H_2 + O_2 \rightarrow H_2O$, $CH_4 + O_2 \rightarrow CO_2 + H_2O$, $N_2 + H_2 \rightarrow NH_3$).
   - Interactive visual scale showing Reactant Atoms vs Product Atoms balancing out on a physical beam scale.
4. **Module 2 Table Tutorial Progression**:
   - Teaches students how to calculate: $\text{Coefficient} \times \text{Subscript} = \text{Atom Count}$.
   - Students can fill in the atom counts themselves or toggle guided calculation feedback.
5. **Module 3 Adaptive Practice**:
   - Live difficulty tier meter (Tier 1: Simple Synthesis $\rightarrow$ Tier 2: Single Replacement $\rightarrow$ Tier 3: Double Replacement $\rightarrow$ Tier 4: Combustion).
   - "Toggle Atom Table" switch allowing independent problem solving.
   - Dynamic equation library with 40+ curated high school curriculum equations.
6. **Module 4 Challenge Mode**:
   - Complex equations involving parentheses, multiple polyatomics, and high stoichiometric ratios (e.g., $C_8H_{18} + O_2 \rightarrow CO_2 + H_2O$, $Al_2(SO_4)_3 + Ca(OH)_2 \rightarrow Al(OH)_3 + CaSO_4$, $KMnO_4 + HCl \rightarrow KCl + MnCl_2 + H_2O + Cl_2$).
   - Detailed step-by-step element mismatch inspector with diagnostic hints.

#### Visual Identity & Theme
- **Aesthetic Direction**: Clean, modern scientific laboratory aesthetic inspired by PhET simulations and professional chemistry software. Crisp, distraction-free typography and tactile interaction physics.
- **Color Palette**:
  - *Dominant Canvas (60%)*: Slate off-white `#F8FAFC` and clean `#FFFFFF` reaction benches with subtle slate borders `#E2E8F0`.
  - *Structural Panels (30%)*: Neutral slate `#0F172A` headings, `#334155` body, `#F1F5F9` table headers and inactive coefficient blocks.
  - *CPK Molecular Colors*:
    - Hydrogen ($H$): `#FFFFFF` with `#94A3B8` border
    - Carbon ($C$): `#334155` (Slate/Charcoal)
    - Oxygen ($O$): `#EF4444` (Vibrant Red)
    - Nitrogen ($N$): `#3B82F6` (Cobalt Blue)
    - Chlorine ($Cl$): `#10B981` (Emerald Green)
    - Sulfur ($S$): `#F59E0B` (Amber Yellow)
    - Metals (Iron, Aluminum, Calcium, Sodium, Copper): Metallic shades (`#8B5CF6`, `#64748B`, `#D97706`).
  - *Semantic Accents (10%)*:
    - Balanced: Emerald `#10B981` with balanced checkmark and celebration effects.
    - Unbalanced / Discrepancy: Amber `#F59E0B` or Crimson `#EF4444` indicator tags with exact difference counts.
- **Typography & Formatting**:
  - Headings: `Plus Jakarta Sans` / `Outfit`
  - Chemical Formulas: Sub-scripted typography (`H₂O`, `Ca(OH)₂`) with monospace tabular numerals for atom tallies.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Direct Number Pad Popover vs. Text Input**
  - *Chosen Approach*: Dedicated chemical coefficient number pad ($1$ to $9$, plus stepper buttons $\pm 1$) anchored to each coefficient box.
  - *Why*: Eliminates keyboard pop-up jumping on Chromebooks and tablets, enforces valid positive integers ($\ge 1$), and prevents syntax errors.
  - *Alternatives Considered*: Native text inputs often cause frustrating layout reflows and accidental non-numeric inputs.

- **Decision 2: PhET-Style Clustered Particle Rendering**
  - *Chosen Approach*: SVG-based dynamic molecular particle renderer that arranges atoms into true geometric representations (e.g. $H_2O$ as bent shape, $CO_2$ linear, $CH_4$ tetrahedral projection) grouped into discrete molecule boxes.
  - *Why*: Students must see that a coefficient of $2$ means *two complete molecules*, not isolated floating atoms. This visually explains why subscripts cannot change during balancing.

- **Decision 3: Pedagogical Table Verification in Module 2**
  - *Chosen Approach*: The atom inventory table includes both "Guided Mode" (auto-calculates counts to teach reading subscripts) and "Practice Fill" mode (students test their own mental math before checking).
  - *Why*: Ensures students understand the multiplication rule ($\text{coefficient} \times \text{subscript}$) before relying on automated tools in later modules.

---

### 4. Technical Architecture & Data Strategy

#### System & Component Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App Header                                │
│  ChemBalance Wordmark   │  Module Tabs (1-4)  │  Score & Streak Gauge  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
┌───────────────────────────────────┐       ┌───────────────────────────────────┐
│     Chemical Equation Bench       │       │    Interactive Feedback Deck      │
│  Reactants  ──►  Products         │       │  - Live Balanced State Banner     │
│  [?] A + [?] B  ──►  [?] C + [?] D│       │  - Element Mismatch Highlighter   │
│  - Clickable Number Pad Popovers  │       │  - Next Element Hint Suggestions  │
└─────────────────┬─────────────────┘       └─────────────────┬─────────────────┘
                  │                                           │
  ┌───────────────┴───────────────────────────────────────────┴───────────────┐
  │                                                                           │
  ▼ (Module 1)                    ▼ (Module 2 & 3)             ▼ (Module 4)   │
┌───────────────────────────────┐ ┌──────────────────────────┐ ┌─────────────┐│
│   PhET Particle Canvas        │ │  Atom Inventory Table    │ │ Olympiad    ││
│  - Reactant Molecule Clusters │ │  - Reactant Count Col    │ │ Gauntlet    ││
│  - Product Molecule Clusters  │ │  - Element Symbol Row    │ │ - High Coeff││
│  - Mass Balance Beam Physics  │ │  - Product Count Col     │ │ - Polyatomic││
└───────────────────────────────┘ └──────────────────────────┘ └─────────────┘│
```

#### Data Entities & Chemical Engine
- **`ChemicalCompound`**:
  - `formula`: string (e.g. `"Al2(SO4)3"`)
  - `displayName`: formatted JSX with subscripts
  - `atoms`: `{ [element: string]: number }` (e.g. `{ Al: 2, S: 3, O: 12 }`)
  - `particleLayout`: pre-computed 2D atomic cluster nodes with CPK colors and bonds.
- **`ChemicalEquation`**:
  - `id`, `name`, `type` (`synthesis`, `decomposition`, `single_replacement`, `double_replacement`, `combustion`, `complex_polyatomic`)
  - `reactants`: array of compounds with default/solution coefficients
  - `products`: array of compounds with default/solution coefficients
  - `difficulty`: 1 to 5
  - `explanation`: step-by-step educational breakdown for hints.
- **`ProgressState`**:
  - Stored in `localStorage` for seamless resumption.
  - Completed equations, mastery streak, stars earned per module.

---

### Verification & Testing Plan

1. **Compilation & Syntax**: Run `compile_applet` and verify no TypeScript or React 19 errors.
2. **Interactive Testing**:
   - Verify all coefficient steppers and number pads update values and trigger re-computation of atom balance.
   - Verify particle clusters accurately update in Module 1 for all formulas.
   - Verify atom count table in Module 2 accurately tabulates $\text{coefficient} \times \text{subscript}$.
   - Verify table toggle and difficulty leveling in Module 3.
   - Verify complex equations in Module 4 balance correctly and provide element mismatch highlights.
