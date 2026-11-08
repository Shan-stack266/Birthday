# A Little Purple World Just for You

A birthday storybook built with React, Vite, TypeScript, Tailwind CSS, Motion for React, Lucide, and custom SVG illustrations.

## Run

```sh
npm install
npm run dev
```

In Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`. Build with `npm run build`; serve the built output with `npm run preview`. Vite prints the local URL.

## Personalize

- Edit `src/data/gift.ts` for the PIN, greeting, letter, sender, four letter photos and captions, jar messages, final wish.
- The recipient is set to Marlisang. `{name}` in text uses `gift.recipient`. Fill in `sharedMemory`, `insideJokes`, the sender, and the four photo paths to make it your own; no personal memory or private photo is invented for you.
- Put photos in `public/photos/`; use paths like `/photos/memory-1.jpg`. Empty or unavailable images show illustrated placeholders.

## Birthday adventure

The PIN is **110807**. Use the keypad or keyboard; Backspace and Enter work. Completing six digits checks the code. Unlock state lasts for the current tab session. The header lock button clears it.

The Bouquet chapter combines swaying SVG flowers with a clickable letter tucked into the wrapping. Opening and closing the stationery uses two folding paper panels. Four photo frames appear beside the letter on desktop and around it on small screens.

The envelope lifts out of the bouquet before the paper opens; photos follow in a staggered sequence. Closing folds it back into the flowers. The lock has a sparkle reveal, chapters have directional transitions and personal handoff buttons, and wish particles drift toward a glowing crescent before the popup. The ending includes an editable closing line and signature.

The clean scrapbook layout uses a quiet lavender background, cream stationery, and dark purple reading text. The full letter stays on one naturally scrolling sheet with no page arrows or clipped reading area. A two-column Polaroid scrapbook sits beside it on desktop. Phones and tablets get larger swipeable frames with full captions, Previous/Next photo controls, and keyboard arrow support. Photos stay still during reading; the bouquet and opening/folding choreography remain animated.

Previous, chapter progress, Next, and (when the letter is open) Fold My Letter share one bottom dock. The lock control stays in the header. Replay is in the dock on the final chapter. Space is reserved so actions remain reachable. The final wish is one cream card inside the nighttime illustration; short landscape screens place the card beside its introduction. All interactions work with touch and keyboard; reduced motion skips the longer choreography.

In Final Wish, write up to 500 characters and press Make a Wish. The text fades into animated dust, then a popup says "all your wish will come true". Empty wishes show a gentle prompt. Wishes stay in browser memory, are never uploaded, and clear after the animation or when leaving the section. The popup supports its close buttons and Escape, and another wish can be written afterward. Reduced-motion preferences simplify the effects.

Explore the birthday scene, animated flower bouquet with a tucked-in letter, replayable folding stationery, four photos, happiness jar with 18 messages and no consecutive repeat, and the nighttime wish scene. Reduced-motion preferences are respected.

Source is organized into `components`, `sections`, `illustrations`, `data`, and `styles`. SVG artwork is code-native; add personal photos and audio under `public`. `dist/` is generated output; do not edit it manually.

## Browser checks

Run `npx playwright test` (`npx.cmd playwright test` in PowerShell). The test configuration uses installed Google Chrome on Windows. It checks the complete adventure at desktop and iPhone-sized viewports, including wrong/correct PINs, keyboard and keypad input, session reload, four letter photos, letter replay, nonrepeating jar messages, absence of the music player, wish validation and wish-to-dust popup, replay, and relocking. Screenshots are written to the ignored `test-results/` folder.

`tests/responsive.spec.ts` also checks 320px and 390px phones, a 768px tablet, 1024px tablet landscape, 844×390 phone landscape, and 1440px desktop: limited document scrolling, the complete unclipped letter, main buttons in the viewport and unobstructed by the dock, no horizontal overflow or photo/letter overlap, and wish popup bounds.

The supplied text mentions an image reference, but no image was attached. The illustrations interpret the written visual direction; an exact image match is unverified.

The PIN is a playful surprise gate implemented in the browser; it does not protect confidential information. Google Fonts have local font fallbacks. Hosting identity is retained in `.openai/hosting.json` and the deployment directory is `dist/`.
