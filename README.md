# Paul Maxwell-Walters Consulting Website

A lightweight, responsive single-page business website for **Paul Maxwell-Walters**, a QA and IT consultant helping startups and growing technology teams improve software quality, delivery confidence, and engineering momentum.

The site is intentionally implemented as a dependency-free static website using HTML5, CSS, vanilla JavaScript, and local SVG assets. It can be deployed directly to GitHub Pages or any static hosting provider.

## Purpose

The website is designed to:

- Explain Paul Maxwell-Walters' QA and IT consulting services.
- Position quality engineering and delivery operations as business advantages.
- Present previous experience, results, and case-study-style outcomes.
- Provide an accessible way for prospective clients to request a call.
- Give the site a polished, modern consulting/startup visual identity.
- Remain fast, portable, and easy to maintain without a build system.

## Main sections

The single-page site includes:

- Responsive header and navigation.
- Hero section with consulting positioning and calls to action.
- Social-proof bar listing selected previous employers and media-style references.
- Two core service pillars:
  - Quality engineering.
  - IT delivery and operations.
- Previous History section with metrics and case-study cards.
- Insights preview section.
- Founder/about section featuring `Paul-Maxwell-Walters.png`.
- Book A Call form.
- Footer navigation and contact details.

## Technology

The project uses:

- **HTML5** for semantic page structure and metadata.
- **CSS3** for layout, responsive behavior, visual design, focus states, and reduced-motion support.
- **Vanilla JavaScript** for progressive enhancement.
- **SVG** for the logo, favicon, and logo concepts.
- **GitHub Pages-compatible static hosting** with no server-side runtime.

There is currently no framework, package manager, bundler, or external CSS/JavaScript dependency.

## Project structure

```text
.
├── index.html
├── favicon.svg
├── README.md
└── assets
    ├── css
    │   └── styles.css
    ├── images
    │   ├── Paul-Maxwell-Walters.png
    │   ├── avatar-placeholder.svg
    │   ├── logo.svg
    │   └── logo-concepts
    │       ├── 01-banner-above-profile.svg
    │       ├── 02-built-on-quality.svg
    │       ├── 03-signal-over-noise.svg
    │       ├── 04-quality-points-north.svg
    │       ├── 05-headway-through-quality.svg
    │       ├── pmw-dark.svg
    │       └── pmw-light.svg
    └── js
        └── main.js
```

## Local development

Because this is a static site, no build step is required.

From the project root, start a local web server:

```bash
python3 -m http.server 8765
```

Open the site at:

```text
http://127.0.0.1:8765/
```

A local server is recommended instead of opening `index.html` directly because it more closely matches a deployed website and avoids browser restrictions around local file URLs.

## JavaScript behavior

`assets/js/main.js` provides progressive enhancements for:

- Mobile navigation open/close behavior.
- Escape-key and outside-click menu closing.
- Sticky-header elevation after scrolling.
- Active navigation link highlighting with `IntersectionObserver`.
- Scroll reveal animations.
- Reduced-motion fallback behavior.
- Animated results counters.
- Book A Call form validation.
- Dynamic footer year.

Core content remains available if JavaScript is disabled or if browser observer APIs are unavailable.

## Book A Call form

The current form includes client-side validation and displays a local success message. It is not automatically connected to an email service.

The form currently uses a static-demo flow in `assets/js/main.js`, where the submit handler calls `preventDefault()` and does not send data to an external service. To receive real enquiries, connect the form to a service such as:

- Formspree.
- Getform.
- Basin.
- Netlify Forms, if hosted on Netlify.
- A custom serverless endpoint.

A typical external form configuration needs an `action` URL and a `method`, for example:

```html
<form
  class="call-form"
  id="call-form"
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST">
```

The JavaScript must then either allow a normal browser submission or use `fetch()` to send a `FormData` request. Do not leave the demo `preventDefault()` behavior in place if the form is expected to send messages.

Before launch, verify:

- The endpoint is correct.
- The form manager has verified the receiving email address.
- The deployed domain is allowed by the form service.
- Messages are not being filtered into spam.
- The browser Network panel shows a successful `POST` request.
- The form manager's dashboard receives a test submission.

## Deploying to GitHub Pages

This repository is named as a GitHub Pages user site, so the root-level `index.html` is the entry point.

### GitHub Pages settings

1. Push the project to the GitHub repository.
2. Open the repository on GitHub.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the default branch, usually `main`.
6. Select the `/ (root)` folder.
7. Save the settings.
8. Wait for the Pages deployment to complete.

The site should then be available at the repository's GitHub Pages URL, typically:

```text
https://<github-username>.github.io/
```

No Jekyll configuration or build workflow is required for this project.

### Deployment checklist

Before publishing, verify:

- `index.html` is at the repository root.
- All asset paths use the correct relative paths.
- The profile photo loads on the deployed site.
- The favicon loads.
- Navigation anchors reach the intended sections.
- The form endpoint is configured if real submissions are required.
- The site works on mobile and desktop widths.
- The deployed URL uses HTTPS.

## Alternative static hosting

The same files can be deployed to any service that serves static files, including:

- Vercel.
- Netlify.
- Cloudflare Pages.
- AWS S3 with static website hosting.
- Any conventional web server.

Upload the repository contents without changing the root-level structure.

## Testing

### Basic static smoke test

```bash
python3 -m http.server 8765
```

Then verify the main page and assets:

```bash
curl -I http://127.0.0.1:8765/index.html
curl -I http://127.0.0.1:8765/assets/css/styles.css
curl -I http://127.0.0.1:8765/assets/js/main.js
curl -I http://127.0.0.1:8765/favicon.svg
```

### JavaScript syntax check

```bash
node --check assets/js/main.js
```

### Recommended browser checks

Test the following in Chromium or Google Chrome at desktop and mobile widths:

- Header navigation and mobile menu.
- Hero and CTA links.
- Every in-page anchor.
- Responsive service and case-study layouts.
- Book A Call validation with empty fields.
- Invalid email validation.
- Valid form submission behavior.
- XSS payloads in form fields.
- Console errors and failed network requests.
- Keyboard focus and Escape-key behavior.
- Reduced-motion behavior.

For repeatable CI/CD browser tests, use the Playwright test runner and store screenshots, traces, and reports as CI artifacts. The Claude browser tools are useful for interactive inspection and debugging; the deterministic Playwright runner is the better enforcement mechanism for CI.

## Accessibility notes

The implementation includes:

- `lang="en"` document metadata.
- A skip-to-content link.
- Semantic header, navigation, main, section, and footer landmarks.
- A single page-level H1 and structured section headings.
- Accessible mobile navigation state with `aria-expanded` and `aria-controls`.
- Explicit labels for form fields.
- Inline validation messaging and an `aria-live` status region.
- Visible keyboard focus styles.
- Decorative graphics marked as hidden from assistive technology where appropriate.
- Reduced-motion support through `prefers-reduced-motion`.

## Branding assets

The `assets/images/logo-concepts/` directory contains logo exploration files, including the PMW light and dark logo variants. The PMW logos use a Goldman-style font declaration with a sans-serif fallback. For consistent rendering, load or install the Goldman font in the consuming design application, or convert the final selected wordmark to outlines before professional print production.

The root `favicon.svg` is a compact PMW favicon with white initials on a solid blue background.

## Content customization

The following content should be reviewed before launch:

- Employer and media references.
- Results and case-study metrics.
- Placeholder contact email and phone details.
- Insights dates and article availability.
- Form manager endpoint.
- Final brand name and selected logo.
- SEO title and description.
- Social sharing metadata.

Replace placeholder or illustrative claims with verified information before publishing commercially.

## License and ownership

No open-source license has been added. Add the appropriate license or copyright statement before distributing the project publicly.
