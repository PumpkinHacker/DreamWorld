# Dream World — Version 30

Version 30 is based on the existing Version 29 game file and focuses on the requested fixes:

- Space Dimension levels stay locked until all nine Dimension 1 levels are completed.
- The Space Dimension entry starts the first Space level after it is unlocked.
- Cosmic Space Shop is reachable from the main menu, Star Shop, and Play/level screen without being inside a Space level.
- Shop item previews are restored and display a temporary try-on before equipping.
- Clean, simple animal variations are available, with a few extra animals in Dimension 1.
- Star Shop and Wardrobe have separate categories for animals, shoes, items/accessories, and skins.
- Existing progress saving and the in-page mod/parent menus are preserved.

## Upload

1. Download `dream-world-version-30.zip` and unzip it.
2. Upload the included `index.html` to the **root** of your existing GitHub Pages repository, replacing the current `index.html`.
3. Keep your existing `admin-worker.js`, Cloudflare Worker, and repository settings unchanged. This ZIP does not replace or contain those separate admin files.
4. Commit the change, wait for GitHub Pages to deploy, then refresh the game.

The JavaScript syntax check passed. A full interactive browser test could not be completed in this environment, so please try the main menu, shop previews, wardrobe categories, and level unlock flow after deploying.
