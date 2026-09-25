import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Exact geometric replication of user's uploaded SURGE SHORE LOGO 2.jpg.jpeg
// Outer black boundary box, white field, dark navy hexagon, dual interlocking S (navy top, orange bottom)

const exactEmblemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900" width="800" height="900">
  <defs>
    <!-- Sharp vector rendering -->
  </defs>

  <!-- Outer Hexagon Frame in Deep Navy Blue -->
  <polygon 
    points="400,32 720,217 720,587 400,772 80,587 80,217" 
    fill="none" 
    stroke="#002157" 
    stroke-width="44" 
    stroke-linejoin="miter" 
  />

  <!-- Top Blue Half: 'S' Structure -->
  <g id="top-s" fill="#002157">
    <!-- Main Top S contour -->
    <path d="
      M 400,110
      L 660,260
      L 660,410
      L 520,330
      L 520,370
      L 590,410
      L 410,514
      L 394,514
      L 394,445
      L 452,412
      L 452,295
      L 235,420
      L 140,365
      L 140,260
      Z
    " />

    <!-- Top Left Arm -->
    <path d="
      M 140,260
      L 400,110
      L 400,188
      L 235,283
      L 235,438
      L 140,383
      Z
    " />

    <!-- Top-Right Angled Cutout (White slit) -->
    <polygon 
      points="480,258 580,316 558,329 458,271" 
      fill="#FFFFFF" 
    />

    <!-- Middle-Left Angled Cutout (White slit) -->
    <polygon 
      points="165,348 235,308 235,332 165,372" 
      fill="#FFFFFF" 
    />
  </g>

  <!-- Central Gap -->
  <line x1="395" y1="355" x2="395" y2="495" stroke="#FFFFFF" stroke-width="14" />

  <!-- Bottom Orange Half: 'S' Structure (180° Rotational Symmetry around 400, 402) -->
  <g id="bottom-s" transform="rotate(180 400 402)" fill="#F15A24">
    <!-- Main S contour -->
    <path d="
      M 400,110
      L 660,260
      L 660,410
      L 520,330
      L 520,370
      L 590,410
      L 410,514
      L 394,514
      L 394,445
      L 452,412
      L 452,295
      L 235,420
      L 140,365
      L 140,260
      Z
    " />

    <!-- Arm -->
    <path d="
      M 140,260
      L 400,110
      L 400,188
      L 235,283
      L 235,438
      L 140,383
      Z
    " />

    <!-- Cutout slit -->
    <polygon 
      points="480,258 580,316 558,329 458,271" 
      fill="#FFFFFF" 
    />

    <!-- Cutout slit -->
    <polygon 
      points="165,348 235,308 235,332 165,372" 
      fill="#FFFFFF" 
    />
  </g>
</svg>`;

// The exact image including the outer rectangular border box as in uploaded file
const exactFramedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1020" width="900" height="1020">
  <!-- White Canvas Background -->
  <rect width="900" height="1020" fill="#FFFFFF" />
  
  <!-- Outer Black Framing Border -->
  <rect x="20" y="20" width="860" height="980" fill="none" stroke="#0F172A" stroke-width="12" />

  <!-- Centered Emblem -->
  <g transform="translate(50, 60)">
    <!-- Outer Hexagon Frame in Deep Navy Blue -->
    <polygon 
      points="400,32 720,217 720,587 400,772 80,587 80,217" 
      fill="none" 
      stroke="#002157" 
      stroke-width="44" 
      stroke-linejoin="miter" 
    />

    <!-- Top Blue Half: 'S' Structure -->
    <g fill="#002157">
      <path d="
        M 400,110
        L 660,260
        L 660,410
        L 520,330
        L 520,370
        L 590,410
        L 410,514
        L 394,514
        L 394,445
        L 452,412
        L 452,295
        L 235,420
        L 140,365
        L 140,260
        Z
      " />
      <path d="
        M 140,260
        L 400,110
        L 400,188
        L 235,283
        L 235,438
        L 140,383
        Z
      " />
      <polygon points="480,258 580,316 558,329 458,271" fill="#FFFFFF" />
      <polygon points="165,348 235,308 235,332 165,372" fill="#FFFFFF" />
    </g>

    <line x1="395" y1="355" x2="395" y2="495" stroke="#FFFFFF" stroke-width="14" />

    <!-- Bottom Orange Half: 'S' Structure -->
    <g transform="rotate(180 400 402)" fill="#F15A24">
      <path d="
        M 400,110
        L 660,260
        L 660,410
        L 520,330
        L 520,370
        L 590,410
        L 410,514
        L 394,514
        L 394,445
        L 452,412
        L 452,295
        L 235,420
        L 140,365
        L 140,260
        Z
      " />
      <path d="
        M 140,260
        L 400,110
        L 400,188
        L 235,283
        L 235,438
        L 140,383
        Z
      " />
      <polygon points="480,258 580,316 558,329 458,271" fill="#FFFFFF" />
      <polygon points="165,348 235,308 235,332 165,372" fill="#FFFFFF" />
    </g>
  </g>
</svg>`;

async function build() {
  console.log('Generating exact PNG assets from uploaded reference image...');

  // 1. Transparent PNG Logo
  await sharp(Buffer.from(exactEmblemSvg))
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'surge-shore-logo.png'));
  console.log('Saved public/surge-shore-logo.png');

  // 2. Default logo.png
  await sharp(Buffer.from(exactEmblemSvg))
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'logo.png'));
  console.log('Saved public/logo.png');

  // 3. Exact Card Frame (1:1 with user image)
  await sharp(Buffer.from(exactFramedSvg))
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'surge-shore-card.png'));
  console.log('Saved public/surge-shore-card.png');

  // 4. Favicon
  await sharp(Buffer.from(exactEmblemSvg))
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('Saved public/favicon.png');

  // 5. Icon
  await sharp(Buffer.from(exactEmblemSvg))
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'icon.png'));
  console.log('Saved public/icon.png');
}

build().catch(console.error);
