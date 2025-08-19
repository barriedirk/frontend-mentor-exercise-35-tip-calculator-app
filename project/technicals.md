### Folder Structure

```txt
src/
├── app/
│   ├── core/                  # Singleton services, interceptors, guards
│   │   ├── services/
│   │   └── guards/
│   ├── shared/                # Reusable UI components & pipes
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── models/
│   ├── features/              # Feature-based modular structure
│   │   └── tip-calculator/    # Your main feature module
│   │       ├── components/    # Dumb / UI components
│   │       ├── containers/    # Smart components (optional)
│   │       ├── services/      # Feature-specific logic
│   │       ├── models/        # Feature-specific interfaces
│   │       ├── store/         # State management (if needed)
│   │       ├── tip-calculator.component.ts
│   │       └── tip-calculator.module.ts
│   ├── app-routing.module.ts
│   └── app.component.ts
├── assets/
│   └── images/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
├── sass/                     # Tailwind and custom styles
│   └── styles.scss
├── main.ts
└── index.html
```

From Frontend Mentor documentation:

```txt
Types of testing

We can write several types of tests, each with a specific role. In this learning path, we’ll predominantly focus on three types of testing:

    Unit tests: These test a single piece or unit of code.
    Integration tests: These test how our units of code behave when they interact with other units of code.
    End-to-end tests: These test entire user journeys from start to finish.
```

Packages for:

#### Unit & Integration Tests (already covered):

- karma, jasmine-core, karma-jasmine, etc.
- Unit test files will go next to your components: component-name.component.spec.ts

### End-to-End (E2E) Testing

There are two packages:

Cypress and Playwright

## Install Cypress

```bash
# Install cypress
npm install cypress --save-dev
# Add E2E Project
ng generate application e2e --routing=false --style=scss
```

### projects/e2e

```txt
projects/
└── e2e/
    ├── cypress/
    │   ├── integration/
    │   ├── fixtures/
    │   ├── support/
    │   └── e2e.ts
    └── cypress.config.ts
```

### add scripts like:

```json
"e2e": "cypress open",
"e2e:run": "cypress run"
```

## Install Playwright

```bash
npm i -D @playwright/test
npx playwright install
```

Packages for Linting & Formatting

```bash
npm install --save-dev eslint @angular-eslint/builder @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser

# generate an ESLint config:
ng add @angular-eslint/schematics
```

Testing Organization

Each module/component/service should have its own test file:

```txt
tip-calculator.component.ts
tip-calculator.component.spec.ts
```

### Useful Scripts to Add

```json
"test:unit": "ng test",
"test:e2e": "cypress run",
"test:e2e:open": "cypress open",
"lint": "eslint . --ext .ts,.html"
```

### State Management

```bash
ng add @ngrx/store
```

For modern Angular apps — especially smaller projects like a Tip Calculator — I recommend using Cypress
for end-to-end (E2E) testing.

Here’s a quick breakdown:

✅ Why Cypress?
Feature Cypress
✅ Easy to set up Yes
✅ Great Developer Experience Yes (interactive test runner)
✅ Good Angular support Yes
✅ Great for UI-driven tests Yes
✅ Active community Yes
❌ Headless CI? Yes (via cypress run)
❌ Cross-browser? Yes, with some limitations (Chrome, Edge, Firefox)

Playwright is great too, but it’s a bit more complex and better suited for large-scale, cross-browser automated CI pipelines.
