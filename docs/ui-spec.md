# UI Spec

## Shared UX Contract

Both frontend apps must render the same user experience:

- Login screen.
- Protected home page with CMS-managed hello content.
- Protected stack page with app-owned Postgres-backed stack choices.
- Shared navigation between home and stack pages.
- Equivalent layout, typography scale, focus behavior, and responsive behavior.

Only the app-specific hello content differs:

- Remix: `Hello Remix World!`
- SvelteKit: `Hello Svelte World!`

## Three.js Hello Text Animation

The hello content includes a decorative Three.js enhancement.

Requirements:

- Static semantic text is always present in the DOM.
- Three.js animation is decorative and does not replace accessible text.
- Animation must not block content rendering.
- Canvas dimensions are stable to avoid layout shift.
- `prefers-reduced-motion: reduce` disables or greatly simplifies motion.
- If WebGL or Three.js initialization fails, the page remains fully usable.
- Playwright verifies the canvas is nonblank when animation is enabled.

## Modern CSS Feature Demos

Use newer CSS features as progressive enhancements.

Browser support expectations:

- Chromium is the required CI browser for visual and canvas checks.
- WebKit and Firefox should receive smoke coverage for fallback behavior when practical.
- Unsupported CSS features must degrade to usable layout and readable content.

### Anchor Positioning

Use CSS Anchor Positioning for a tooltip, popover, or contextual UI attached to a stack table control or cell.

Requirements:

- Include fallback positioning for browsers without support.
- Use `@supports` where needed.
- Do not hide required information behind unsupported behavior.

### Named Container Queries

Use named `@container` queries for the stack table layout and responsive panels.

Requirements:

- Give relevant containers explicit names.
- Prefer component/container responsiveness over viewport-only rules.

### @scope

Use `@scope` for page-level or component-level style containment.

Requirements:

- Keep scoped styles local to the hello section, stack table, or app shell.
- Avoid overly specific selectors that make framework comparison noisy.

### View Transitions

Use View Transitions for navigation or tabular-content state changes.

Requirements:

- Progressive enhancement only.
- Respect reduced-motion preferences.
- Do not depend on transitions for state correctness.

### light-dark()

Use `light-dark()` with `color-scheme: light dark` for theme tokens.

Requirements:

- Define core surface, text, border, accent, and focus colors as tokens.
- Keep color contrast accessible in both schemes.

### shape()

Use `shape()` for a small decorative or clipped UI element.

Requirements:

- Wrap usage in `@supports`.
- Provide a simple fallback such as `border-radius`, `clip-path: polygon(...)`, or no clipping.

## Accessibility

Requirements:

- Keyboard navigation works for login, navigation, stack table controls, and tooltips/popovers.
- Focus states are visible.
- Animated content has static semantic text.
- Motion respects `prefers-reduced-motion`.
- Color contrast passes WCAG AA for primary text and controls.
- The stack table remains readable at mobile and desktop widths.

## Visual Parity

Visual parity means the two apps share:

- Same route structure.
- Same content hierarchy.
- Same table columns and states.
- Same responsive breakpoints or container-query outcomes.
- Same progressive enhancement intent.

Framework-specific implementation details may differ.
