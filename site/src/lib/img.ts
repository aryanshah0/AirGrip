// Large photos also exist at 800 px (public/img/<name>-800.webp, made with ImageMagick: -resize 800x -quality 80),
// so phones download about half the bytes. Use: <img src={`/img/${f}`} {...srcSet(f)} />
const FULL: Record<string, number> = {
  "airgrip-plant-jamnagar.webp": 1400, "brass-anchors.webp": 1400, "brass-battery-terminal-fasteners.webp": 1200,
  "brass-fittings-range.webp": 1400, "brass-moulding-inserts.webp": 1400, "brass-nuts.webp": 1200,
  "brass-turned-parts.webp": 1400, "cnc-turning-brass-nozzle.webp": 1400,
};

export function srcSet(f: string, sizes = "(max-width: 559px) 100vw, 50vw") {
  const w = FULL[f];
  return w ? { srcSet: `/img/${f.replace(/\.webp$/, "-800.webp")} 800w, /img/${f} ${w}w`, sizes } : {};
}
