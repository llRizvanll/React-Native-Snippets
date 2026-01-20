# Assignment 1: React Native Contact Form

## Problem Statement
The goal of this assignment is to build a "Contact Us" form in React Native with the following requirements:
- **Fields**: Name (Required), Email (Required, valid format), Message (Optional, max 200 chars).
- **Architecture**: Implement using **Clean Architecture** principles and **MVVM** pattern.
- **UI Architecture**: Use **Atomic Design** to structure components into Atoms, Molecules, and Organisms.
- **State Management**: Use React Hooks (ViewModel pattern) to handle form logic, validation, and submission states.
- **Feedback**: Provide real-time or submission-based error feedback and a success state upon completion.

## Solution Approach

### 1. Clean Architecture Layers
- **Core (Domain)**: Isolated business logic. The `SubmitContactUseCase` handles the rules for valid inputs independently of any framework.
- **Data (Infrastructure)**: Handles the implementation of data submission (mocked in `ContactRepository`).
- **Presentation**: UI layer using MVVM to bridge business logic and the interface.

### 2. MVVM Pattern
The logic for the form is encapsulated in the `useContactViewModel` custom hook. This keeps the components "thin" and focused only on rendering, making the logic highly testable and reusable.

### 3. Atomic Design
- **Atoms**: Base elements like `Input`, `Button`, and `Typography`.
- **Molecules**: `FormField` (Label + Input + Error messaging).
- **Organisms**: `ContactForm` (The full form layout and logic integration).
- **Pages**: `ContactUsPage` (The screen container).

### 4. Technical Stack
- **TypeScript**: Ensuring type safety across all layers.
- **Vanilla CSS (StyleSheet)**: Premium UI styling with a custom theme.
- **Safe Area Context**: Handling device-specific notches and status bars.

## How to Run
The main entry point for this assignment is integrated into `App.tsx`. To explore the code, navigate to `src/assignment1/`.
