# Device mockups (Remotion + HyperFrames)

Rendered output lives in `public/assets/mockups/` (10 s, 1280x720, silent loops).
Video files are NOT copied in here — drop the clips named below next to the sources before rendering.

## Remotion — `remotion/` (compositions `Reels`, `Studio`)
    cd tools/mockups/remotion && npm install
    # copy clips into ./public/ (real files, not symlinks — Remotion won't serve symlinks):
    #   uncoordinated-the-gym-routine-that-works.mp4, cwk-ep2-b.mp4, sojourners-denise.mp4,
    #   promisefund-event.mp4, nrg-ep7-b.mp4   (from public/assets/video/)
    npx remotion render src/index.ts Reels out/reels.mp4 --muted --crf=26
    npx remotion render src/index.ts Studio out/studio.mp4 --muted --crf=26
In a sandbox that blocks remotion.media, pass `--browser-executable=<path to chrome-headless-shell>`.

## HyperFrames — `hyperframes/monitor/`
    npm i -g hyperframes gsap   # needs ffmpeg on PATH; `npx hyperframes doctor` checks
    # copy public/assets/video/ite-gala-interview1.mp4 to ./clip.mp4 and gsap.min.js next to index.html
    npx hyperframes render -o out.mp4
    ffmpeg -i out.mp4 -vf scale=1280:-2 -c:v libx264 -crf 26 -an -movflags +faststart monitor.mp4
GSAP is loaded from a local file, not the CDN: the CDN failed to load inside the render browser.
