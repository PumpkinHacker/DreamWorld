Dream World — Version 35

This release uses Version 34 as its base and gives the interface a cohesive visual refresh: updated color system, buttons, cards, menus, shop tabs, modals, focus states, mobile spacing, and reduced-motion support. It also makes screen navigation safely ignore invalid screen IDs instead of throwing an error.

Preserved: the original Star Shop, Space Dimension and separate Space Shop, level progression, animal/puppy customization, gear and shoes, music/sound, Word Drop, achievements, parent dashboard, and existing inline mod/parent flows. No admin-related source code was intentionally removed.

Deploy: replace only the site's index.html with this index.html. Keep any existing admin-worker.js / worker configuration in the repository unchanged; this package does not contain or replace a worker file.

Validation: inline JavaScript syntax checks and static reference checks were run after editing. This is not a claim of a complete live-browser playthrough; test the deployed game on mobile and desktop before sharing it.
