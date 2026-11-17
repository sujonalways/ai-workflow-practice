# AI-Assisted Development Workflow

## 1. Experiment Overview

This experiment compared two AI-assisted development approaches by building an Account Settings Form in a React application.

- **Round 1:** Used a single vague prompt: "Create a modern account settings form for my React application."
- **Round 2:** Used a structured prompt containing project exploration, feature requirements, technical constraints, accessibility requirements, implementation planning, automated testing, and production build verification.

Both approaches were compared using their committed Git branches: `round-1-vague` and `round-2-structured`.

## 2. Correctness and Functionality

Round 1 produced a visually broader settings dashboard with profile fields, preferences, and notification controls. However, its Save button only displayed a success message without reading or persisting the edited values. Its Cancel button also failed to revert changes because it only reset the saved-state indicator.

Round 2 implemented the requested form fields, password visibility controls, validation feedback, and simulated submission behavior. It correctly avoided claiming backend persistence.

**Learning:** A visually complete interface does not necessarily mean its functionality is correct.

## 3. Validation and Accessibility

Round 1 relied mainly on browser-native email validation. It lacked required-field checks, custom validation messages, and password confirmation.

Round 2 introduced `src/accountValidation.js` to validate required names, email formats, password length, and password confirmation. It also improved accessibility through explicit labels, `aria-invalid`, `aria-describedby`, accessible password controls, and live success feedback.

## 4. Edge Cases and Remaining Issues

Round 2 handles invalid submissions, password mismatches, and password clearing after successful submission. However, its email regex still accepts some invalid addresses, such as `name@example..com`. Repeated submissions while saving are also not guarded in the submission handler.

These findings show that AI-generated code still requires independent human review.

## 5. Testing and Verification

Round 1 contains no automated tests. Round 2 introduces Vitest and React Testing Library with nine tests covering validation, form interactions, password visibility, and submission feedback.

During the earlier Round 2 working-tree verification, all nine tests, lint checks, and production build passed. Both committed branches were pushed successfully, and the final comparison confirmed that local and remote branch references matched.

## 6. Time and Review Effort

- Round 1: 5 minutes.
- Round 2: 15 minutes.

Round 2 took three times as long, but provided stronger validation, accessibility, and test coverage. The additional review effort made its implementation easier to verify.

## 7. Conclusion

Structured AI prompting produces more reliable and testable results than vague prompting, but it does not eliminate implementation mistakes. My preferred workflow is to explore, plan, implement, test, review, and verify every feature before accepting it.

For future projects, I will use specific requirements, accessibility checks, automated tests, and human code review as essential parts of AI-assisted development.