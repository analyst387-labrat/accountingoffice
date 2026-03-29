# Team Photos

Place team member photos here.

## Naming convention
`firstname-lastname.jpg`
Example: `amra-husic.jpg`, `edin-kovac.jpg`

## Recommended specs
- Format: JPG or WebP
- Dimensions: **800×800px** (square crop, face centered)
- Max file size: 200 KB (use squoosh.app or imageoptim to compress)
- Style: Professional, neutral background preferred

## Usage in code

```tsx
import Image from 'next/image';

<Image
  src="/images/team/amra-husic.jpg"
  alt="Amra Husić – Senior Accountant"
  width={400}
  height={400}
  className="object-cover"
/>
```
