# Project Development Rules

These rules must be followed when developing or modifying this React project.

## Rule 1: Form Validation

- Keep account form validation logic in `src/accountValidation.js`.
- Do not duplicate validation logic inside React components.
- Validate required name, email format, minimum password length, and password confirmation.
- Never allow invalid form submissions.
- Add or update automated tests whenever validation rules change.

## Rule 2: Accessibility

- Every form input must have an associated accessible label.
- Use `aria-invalid` for invalid fields.
- Connect validation messages using `aria-describedby`.
- Password visibility controls must have accessible names and correct pressed states.
- Ensure keyboard navigation and visible focus states work correctly.

## Rule 3: Automated Testing

- Write tests for new form functionality and user interactions.
- Use the existing Vitest and React Testing Library setup.
- Test successful submissions, invalid inputs, password visibility, and error handling.
- Run the automated test suite after modifying application logic.
- Never claim tests passed without actually running them.

## Rule 4: Submission Behavior

- Prevent invalid submissions.
- Prevent repeated submissions while a submission is already in progress.
- Display honest success messages.
- Never claim that account information is permanently saved when no backend persistence exists.
- Clear sensitive password fields after successful simulated submission.

## Rule 5: Code Quality and Project Safety

- Use React functional components and JavaScript.
- Follow the existing project structure and styling conventions.
- Keep changes focused on the requested feature.
- Avoid unnecessary dependencies and unrelated file modifications.
- Run lint and production build checks before completing development tasks.
- Review generated code for correctness, accessibility, and edge cases before accepting it.