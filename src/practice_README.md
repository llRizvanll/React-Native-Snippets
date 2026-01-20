# React Native Interview Practice Guide

This repository is structured to demonstrate professional-grade React Native development using **Clean Architecture**, **MVVM**, and **Atomic Design** principles.

## Architecture

### 1. Core Layer (Domain)
- **Entities**: Plain TypeScript objects representing business data.
- **Use Cases**: Business logic decoupled from UI and Data layers.
- **Interfaces**: Repository abstractions.

### 2. Data Layer (Infrastructure)
- **Repositories**: Implementations of Core interfaces handling data fetching (API, Local, etc.).

### 3. Presentation Layer (UI/Logic)
- **Atomic Design**:
  - **Atoms**: Basic UI units (Buttons, Inputs).
  - **Molecules**: Combinations of atoms.
  - **Organisms**: Complex UI sections.
  - **Pages**: Feature screens.
- **MVVM**:
  - **ViewModel**: Logic handled via Custom Hooks to keep components lean.

### 4. Shared Layer
- Utilities, Theme constants, and Generic types.

---

## Getting Started
Each interview question is located in `src/presentation/pages`. To view a solution:
1. Navigate to the page.
2. Check the `viewModels` for logic.
3. Review `core` and `data` for business rules and infrastructure.
