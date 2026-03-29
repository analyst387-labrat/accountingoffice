# Partner & Client Logos

Place partner/client logos here for a trust/partner section.

## Naming convention
`partner-companyname.svg`
Example: `partner-deloitte.svg`, `partner-pwc.svg`

## Recommended specs
- Format: **SVG preferred** (scales without blur)
- If raster only: PNG with transparent background, 200×80px minimum
- Keep all logos monochrome (single color) for visual consistency on the website

## Usage in code

```tsx
// Render a row of greyscale partner logos
<img src="/images/partners/partner-companyname.svg" alt="Partner Name" className="h-8 opacity-40 hover:opacity-80 transition-opacity" />
```
