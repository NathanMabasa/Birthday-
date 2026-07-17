# Happy Birthday Kayley — React (Vite) app

Run locally:

```bash
npm install
npm run dev
```

Then open the displayed `http://localhost:5173` in your browser.

- Notes:
- Put the image you uploaded as `first.jpg` in a `public` folder at the project root (`public/first.jpg`). Vite will serve files from `public/` at the app root, so the app will load `/first.jpg` as the initial modal image.
- If you prefer a different filename or location, update `src/App.jsx` accordingly.

Quick commands to add the image (macOS / Linux):

```bash
mkdir -p public
# move or copy your image into public/ and rename to first.jpg
mv /path/to/your/image.jpg public/first.jpg
```
- The rickroll uses the embed: `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0` and should autoplay after the `Yes` click (browser autoplay rules may vary).
