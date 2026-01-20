# Assignment 3: Dynamic Multi-Step User Profile Builder

## Problem Statement
The goal of this assignment is to build a complex, multi-step "User Profile Builder" that explores advanced form handling, state persistence, and dynamic UI logic.

---

## Technical Explanation & Architecture

### 1. MVVM + Reactive State
The heart of this assignment is the **`useProfileViewModel`**. It manages a single, source-of-truth state object (`Profile`) which is complex (nested strings and arrays).
- **Step Logic**: A simple `currentStep` index determines which organism to render.
- **Dynamic Skill Tags**: Unlike simple inputs, the skills field is a dynamic array. The ViewModel provides `addSkill` and `removeSkill` methods to manipulate this array without mutating the original state directly.

### 2. Clean Architecture (Separation of Concerns)
- **Core (Domain)**: Contains the `Profile` entity and business logic (e.g., `SubmitProfileUseCase`). The use cases don't know about UI—they only care about "is the data valid for submission?".
- **Data (Infrastructure)**: Implements the `ProfileRepository`. This is where we handle **Draft Persistence**. The repository uses a simple storage key to save/load JSON strings between sessions.
- **Presentation (UI)**: Uses **Atomic Design**.
    - **Atoms**: `Tag`, `ProgressBar`, `Typography`.
    - **Molecules**: `SkillInput` (composed of tags and inputs).
    - **Organisms**: `StepPersonal`, `StepAccount`, etc.

### 3. Draft Persistence Pattern
Implementing persistence "quickly" involves a side-effect in the ViewModel:
```typescript
useEffect(() => {
  if (!isLoadingDraft) {
    saveDraftUseCase.execute(form); // Auto-save on every change
  }
}, [form]);
```
This ensures that if the user closes the app on Step 2, their data is ready when they return.

---

## How to Implement Something This Quickly

The "Secret Sauce" to rapid, high-quality implementation is a **Layered Scaffolding Strategy**:

### 1. The "Contract First" Approach (10 mins)
- **Core Entities**: Define your interfaces first. What does the data look like?
- **Repository Interface**: Define the methods you need (save, load, submit).
This creates a blueprint that your tools can follow with auto-completion.

### 2. The Logic Skeleton (15 mins)
- **ViewModel Implementation**: Build the logic BEFORE the UI. Use a simple state and hook it up to your UseCases.
- *Pro Tip*: You can test your ViewModel logic with console logs before even drawing a single view component.

### 3. Atomic UI Assembly (20 mins)
- **Reuse Atoms**: Since we have a base `Input` and `Button` from previous assignments, we simply tweak them for the new theme.
- **Compose Organisms**: Build each step as a standalone organism. This makes the code readable and allows for easy swapping or re-ordering of steps.

### 4. Integration (5 mins)
- Assemble the organisms into a `WizardPage`.
- Use a `switch(currentStep)` statement for navigation.

**Key Mindset**: Don't build the whole page at once. Build the **Layers** from the bottom up (Core → Data → Logic → View).
