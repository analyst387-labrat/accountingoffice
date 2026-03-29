# Logo Assets

Place your logo files here. Recommended files:

| File | Usage | Format | Size |
|------|-------|--------|------|
| `logo.svg` | Primary logo (color) | SVG | — |
| `logo-white.svg` | White/inverted logo (for dark backgrounds, nav) | SVG | — |
| `logo-mark.svg` | Icon/symbol only (no wordmark) | SVG | — |
| `logo.png` | Fallback raster | PNG | 400×120px min |
| `logo-white.png` | White raster fallback | PNG | 400×120px min |
| `favicon.ico` | Browser tab icon (place in /public root) | ICO | 32×32px |
| `apple-touch-icon.png` | iOS home screen icon (place in /public root) | PNG | 180×180px |

## Usage in code

```tsx
import Image from 'next/image';

// Dark background (nav, hero, footer)
<Image src="/images/logo/logo-white.svg" alt="BBH Logo" width={120} height={36} />

// Light background (services, contact sections)
<Image src="/images/logo/logo.svg" alt="BBH Logo" width={120} height={36} />
```
