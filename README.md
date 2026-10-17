# Esther's Kindergarten Adventure — Dreamworld v28

## What's new
- New, clearer menu icons and stronger black/white contrast for readability.
- A top-right Admin entry point, protected by a server-checked code when global admin is connected.
- Global announcement and restart controls via the included Cloudflare Worker + KV backend.
- Responsive layout remains usable on different phone sizes.

## Important: enable global admin
GitHub Pages is static and cannot securely keep an admin code private or broadcast to other phones by itself. The included Worker is the shared service; it keeps the code in a Cloudflare secret rather than in the public website.

1. In Cloudflare, create a Worker and deploy `admin-worker.js`.
2. Create a Workers KV namespace named `DREAMWORLD_STATE` and bind it to the Worker with that exact binding name.
3. In Worker Settings → Variables and Secrets, add a **secret** named `ADMIN_CODE` and set it to the administrator code you chose. Do not put the code in this file or in GitHub.
4. Copy the deployed Worker HTTPS URL.
5. In `index.html`, find `const GLOBAL_ADMIN_API = '';` and put the Worker URL between the quotes, e.g. `const GLOBAL_ADMIN_API = 'https://your-worker.your-subdomain.workers.dev';`.
6. Commit both `index.html` and `admin-worker.js` to the repository. All visitors must load the same updated site and API URL.

The Admin menu can send messages and issue a restart signal to connected browsers. Browsers check for new announcements about every 12 seconds; a restart reloads the page on their next poll. A phone must have the website open and an internet connection to receive messages. A code alone cannot prove a request came from one specific phone, so keep the code private and use a server-side identity/device allowlist if strict device-only access is required.

## Publish on GitHub Pages
1. Replace the root `index.html` with the included file.
2. Add `admin-worker.js` to the repository (or deploy it directly in Cloudflare).
3. Commit and wait for GitHub Pages to publish.
4. Refresh/reopen the site on phones to load the latest version.

Game progress, tokens, and outfit choices are still stored locally on each device. The global admin service is separate from individual game progress.
