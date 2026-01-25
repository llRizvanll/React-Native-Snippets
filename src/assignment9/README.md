# Assignment 9: Atomic Design Basics (Basic Level)

## Problem Statement
Build a React Native app that demonstrates the fundamental principles of Atomic Design. This assignment introduces the concept of building UI components in a hierarchical, reusable manner from the smallest building blocks (atoms) to complete page layouts (templates).

**Requirements:**
- Create atomic-level components (atoms) - the smallest UI elements
- Combine atoms into molecules - simple component groups
- Build organisms from molecules - complex UI sections
- Create templates that arrange organisms into page layouts
- Display a user profile card using all atomic design levels
- Understand the composition and reusability benefits

## What is Atomic Design?

Atomic Design is a methodology for creating design systems. It breaks down interfaces into five distinct levels:

### 1. Atoms
The smallest, most basic building blocks that cannot be broken down further:
- **Examples**: Button, Input, Typography, Avatar, Icon, Badge
- **Characteristics**: Single responsibility, highly reusable, no business logic
- **Purpose**: Foundation for all other components

### 2. Molecules
Simple combinations of atoms that form a functional unit:
- **Examples**: FormField (Label + Input), UserInfo (Avatar + Typography), StatCard (Icon + Typography)
- **Characteristics**: Groups of atoms working together, still relatively simple
- **Purpose**: Reusable UI patterns

### 3. Organisms
Complex components made from molecules and/or atoms:
- **Examples**: UserCard (UserInfo + Badge + Button), NavigationBar, Form
- **Characteristics**: Distinct sections of an interface, can contain business logic
- **Purpose**: Major UI sections

### 4. Templates
Page-level layouts that arrange organisms:
- **Examples**: UserProfileTemplate, DashboardTemplate
- **Characteristics**: Focus on structure and layout, not content
- **Purpose**: Define page structure

### 5. Pages
Specific instances of templates with real content:
- **Examples**: UserProfilePage (using UserProfileTemplate with actual data)
- **Characteristics**: Final, concrete implementation
- **Purpose**: What users actually see

## Technical Details

### Component Hierarchy Example

```
Page: UserProfilePage
  └── Template: UserProfileTemplate
      └── Organism: UserCard
          ├── Molecule: UserInfo
          │   ├── Atom: Avatar
          │   └── Atom: Typography
          ├── Molecule: StatCard
          │   ├── Atom: Icon
          │   └── Atom: Typography
          └── Atom: Badge
```

### Benefits of Atomic Design

1. **Reusability**: Build once, use everywhere
2. **Consistency**: Shared atoms ensure visual consistency
3. **Maintainability**: Changes to atoms propagate automatically
4. **Scalability**: Easy to add new components following the pattern
5. **Testing**: Test atoms in isolation, then test compositions
6. **Collaboration**: Clear structure for team communication

### Best Practices

1. **Start Small**: Build atoms first, then compose upward
2. **Single Responsibility**: Each component should do one thing well
3. **Props Interface**: Define clear, minimal props for each component
4. **No Business Logic in Atoms**: Keep atoms pure and presentational
5. **Composition over Configuration**: Prefer combining components over props
6. **Documentation**: Document each level's purpose and usage

## Project Structure

```
assignment9/
├── presentation/
│   ├── components/
│   │   ├── atoms/          # Basic building blocks
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Icon.tsx
│   │   │   └── Typography.tsx
│   │   ├── molecules/      # Simple combinations
│   │   │   ├── UserInfo.tsx
│   │   │   └── StatCard.tsx
│   │   ├── organisms/      # Complex sections
│   │   │   └── UserCard.tsx
│   │   └── templates/      # Page layouts
│   │       └── UserProfileTemplate.tsx
│   ├── pages/
│   │   └── UserProfilePage.tsx
│   └── viewModels/
│       └── useUserProfileViewModel.ts
├── shared/
│   └── theme/
│       └── index.ts
└── README.md
```

## Key Learning Points

1. **Component Hierarchy**: Understanding the five levels of atomic design
2. **Composition**: How to build complex UIs from simple components
3. **Reusability**: Creating components that can be used across the app
4. **Maintainability**: How atomic design improves code organization
5. **Design Systems**: Foundation for building scalable design systems
6. **Props Design**: Creating clean, minimal component interfaces

## Example Usage

```tsx
// Atom: Basic building block
<Avatar source={user.avatar} size={64} />

// Molecule: Combination of atoms
<UserInfo 
  avatar={user.avatar}
  name={user.name}
  role={user.role}
/>

// Organism: Complex component
<UserCard 
  user={user}
  stats={user.stats}
  onPress={handlePress}
/>

// Template: Page layout
<UserProfileTemplate 
  user={user}
  stats={user.stats}
/>
```
