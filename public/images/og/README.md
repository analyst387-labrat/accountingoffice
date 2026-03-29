# Open Graph / Social Share Images

Place social media preview images here. These are shown when you share a link on LinkedIn, WhatsApp, etc.

## Required files
| File | Locale | Dimensions |
|------|--------|------------|
| `og-en.png` | English | 1200×630px |
| `og-de.png` | German | 1200×630px |
| `og-bs.png` | Bosnian | 1200×630px |

## Design guidelines
- Background: Deep Navy `#001F3F`
- Logo: white version, top-left
- Headline: white Playfair Display, large
- Subtext: gold `#B8975A`, smaller
- Include: "bbh.ba" domain bottom-right

## Wiring into metadata (already configured in `[locale]/layout.tsx`)
The `openGraph.images` field in your layout metadata should point here:
```ts
openGraph: {
  images: [{ url: `/images/og/og-${locale}.png`, width: 1200, height: 630 }],
}
```
