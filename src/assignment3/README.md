# Assignment 3: Dynamic Multi-Step User Profile Builder

## Problem Statement
The goal of this assignment is to build a complex, multi-step "User Profile Builder" that explores advanced form handling, state persistence, and dynamic UI logic.

### Requirements:

#### 1. Multi-Step Navigation
Implement a 4-step wizard:
- **Step 1: Personal Details**: First Name, Last Name, Date of Birth.
- **Step 2: Account Security**: Email, Password, Confirm Password (must match).
- **Step 3: Professional Profile**: 
    - Occupation (Dropdown: Developer, Designer, Student, Other).
    - Company Name (Visible ONLY if NOT a Student).
    - Skills (Dynamic array of tags; user can add/remove).
- **Step 4: Review & Submit**: A read-only summary of all data entered.

#### 2. Advanced Validation
- Real-time password strength indicator.
- Cross-field validation (Confirm Password matches Password).
- Step-level validation (User cannot proceed to the next step unless the current step is valid).

#### 3. State Persistence
- Save the form progress locally (e.g., using MMKV or `AsyncStorage`).
- If the app is closed and reopened, the user should be taken back to the last step they were on with their data intact.

#### 4. Architecture
- Adhere to **Clean Architecture** (Core, Data, Presentation).
- Maintain **MVVM** pattern with a robust ViewModel.
- Continue using **Atomic Design** for UI components.

## Technical Goals
- Mastery of nested object state in ViewModels.
- Implementing complex conditional rendering.
- Handling dynamic lists (arrays) within forms.
- Integrating local storage for background persistence.
