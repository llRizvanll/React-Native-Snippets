# Assignment 2: Interactive Event Registration

## Problem Statement
Build an "Event Registration" form that is slightly more complex than the Assignment 1 Contact Form. This assignment focuses on intermediate UI patterns, input masking, and handling asynchronous submission states.

### Requirements:

#### 1. Form Fields
- **Full Name**: Required field.
- **Phone Number**: Required field with **Input Masking**. Should format automatically as `(XXX) XXX-XXXX`.
- **Password**: Required field with a **Visibility Toggle** (Show/Hide).
- **Event Type**: A dropdown or picker (Webinar, Workshop, Conference).
- **Receive Updates**: A switch or toggle for email notifications.
- **Dietary Requirements**: This field should appear **ONLY IF** "Conference" is selected as the Event Type.

#### 2. Intermediate Logic
- **Masking logic**: Implement logic to format the phone number as the user types.
- **Conditional Visibility**: Handle the logical "OR" / "IF" conditions for showing/hiding fields.
- **Loading State**: When "Register" is clicked, show a loading spinner/state for 2 seconds (simulated API) before showing a success message.

#### 3. Architecture
- Follow the same **Clean Architecture** and **MVVM** pattern used in Assignment 1.
- Use **Atomic Design** to create new atoms like `Switch`, `IconButton`, and `Picker`.

## Technical Goals
- Handling UI state changes (visibility toggles).
- Implementing input formatting/masking logic.
- Managing asynchronous UI feedback (Loading/Success/Error).
