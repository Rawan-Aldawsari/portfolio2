---
name: frontend-ui-review
description: Review and improve frontend user interfaces by checking HTML structure, CSS, responsive design, accessibility, usability, typography, spacing, and visual consistency. Use this skill when the user asks to review, audit, analyze, or improve a frontend UI.
---

# Frontend UI Review

## Purpose

This skill provides a practical and reusable process for reviewing frontend interfaces and identifying improvements that make the interface more professional, accessible, responsive, and easy to use.

The review should focus on clear, actionable recommendations based on the existing project.

## Workflow

When reviewing a frontend project, follow these steps:

1. Inspect the project structure and identify the main frontend files.
2. Review the HTML structure and semantic organization.
3. Review the CSS layout, spacing, typography, colors, and visual hierarchy.
4. Check responsive behavior for mobile, tablet, and desktop screens.
5. Review accessibility and usability.
6. Check navigation, buttons, links, forms, and interactive elements.
7. Check visual consistency between sections and components.
8. Identify the most important issues and explain their impact.
9. Provide practical recommendations for improvement.
10. If the user requests code changes, make only the changes required for the requested improvements.
11. Verify the result after making changes.

## Review Criteria

### HTML

Check:

- Semantic HTML elements.
- Clear and logical page structure.
- Correct heading hierarchy.
- Meaningful button and link elements.
- Proper form structure and labels.
- Avoiding unnecessary duplicated markup.
- Clear separation between content and presentation.

### CSS

Check:

- Layout structure.
- Flexbox and Grid usage.
- Consistent spacing.
- Typography and font hierarchy.
- Color consistency.
- Contrast between text and background.
- Button and card styling.
- Reusable styles.
- Avoiding unnecessary duplicated CSS.
- Clean responsive breakpoints.

### Responsive Design

Check the interface at:

- Mobile screens.
- Tablet screens.
- Desktop screens.

Look for:

- Horizontal scrolling.
- Elements overflowing the viewport.
- Text becoming difficult to read.
- Buttons becoming too small.
- Navigation problems.
- Images that do not scale correctly.
- Sections that lose their layout on smaller screens.

### Accessibility

Check:

- Alt text for meaningful images.
- Labels for form fields.
- Keyboard accessibility.
- Visible focus states.
- Sufficient color contrast.
- Semantic HTML.
- Clear button and link names.
- Avoiding information that depends only on color.

### Usability

Check:

- Clear navigation.
- Easy-to-understand page structure.
- Clear calls to action.
- Readable content.
- Consistent interaction patterns.
- Useful feedback for user actions.
- Clear error and empty states when applicable.

### Typography

Check:

- Font readability.
- Heading hierarchy.
- Font sizes.
- Line height.
- Text spacing.
- Consistency between sections.
- Readability on small screens.

### Spacing and Layout

Check:

- Consistent margins and padding.
- Alignment between elements.
- Visual balance.
- Section spacing.
- Card and component spacing.
- Avoiding crowded or excessively empty areas.

### Visual Consistency

Check:

- Consistent colors.
- Consistent buttons.
- Consistent cards.
- Consistent border radius.
- Consistent shadows.
- Consistent typography.
- Consistent spacing.
- Alignment between sections.

## Output Format

When reviewing a frontend project, provide the result using this structure:

### 1. Overall Summary

Give a short summary of the current UI quality and the main areas that need attention.

### 2. Strengths

List the strongest aspects of the interface.

### 3. Issues

Use this format:

| Priority | Area | Issue | Recommendation |
|----------|------|-------|----------------|
| High | Responsive Design | Describe the issue | Give a practical solution |
| Medium | Accessibility | Describe the issue | Give a practical solution |
| Low | Visual Design | Describe the issue | Give a practical solution |

### 4. Recommended Improvements

Provide the most important improvements in priority order.

### 5. Verification

If changes were made, verify:

- The page still loads correctly.
- Navigation works.
- Responsive behavior is preserved.
- Interactive elements work.
- No obvious layout problems were introduced.
- Existing functionality remains intact.

## Important Rules

- Do not invent project requirements.
- Do not invent user information.
- Do not modify files unless the user requests changes.
- Preserve existing functionality unless the requested improvement requires a change.
- Prefer simple and maintainable frontend solutions.
- Keep the existing visual identity when improving an interface unless the user requests a redesign.
- Explain important changes clearly.
- Prioritize usability, accessibility, responsiveness, and maintainability.

## Example

User request:

"Review my portfolio homepage using the frontend-ui-review skill. Do not modify the files."

Expected behavior:

1. Inspect the relevant frontend files.
2. Review HTML, CSS, responsiveness, accessibility, usability, typography, spacing, and visual consistency.
3. Identify strengths and issues.
4. Provide a prioritized review.
5. Suggest practical improvements.
6. Do not modify project files.

Another example:

"Use the frontend-ui-review skill to improve the mobile responsiveness of my portfolio."

Expected behavior:

1. Inspect the existing responsive CSS.
2. Identify mobile layout problems.
3. Apply only the necessary changes.
4. Verify the page at mobile, tablet, and desktop widths.
5. Summarize the changes made.