import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';

// Clean, precise vector SVG replicating SURGE SHORE POWERTECH LLP sub logo (hexagon emblem)
const createEmblemSvg = (theme = 'light') => {
  const isDark = theme === 'dark';
  const navyColor = isDark ? '#FFFFFF' : '#0F265C';
  const orangeColor = '#EA580C';
  const innerBg = isDark ? 'transparent' : '#FFFFFF';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 560" width="500" height="560">
    <!-- Outer Hexagon Contour -->
    <polygon points="250,15 470,140 470,390 250,515 30,390 30,140" fill="${navyColor}" />
    
    <!-- White Gap Layer -->
    <polygon points="250,45 440,153 440,377 250,485 60,377 60,153" fill="${innerBg}" />

    <!-- Top Navy Monogram (S Top Loop) -->
    <!-- Main Top Polygon -->
    <polygon points="250,75 410,165 410,265 325,217 325,170 250,127 175,170 175,230 250,273 90,363 90,165" fill="${navyColor}" />

    <!-- Bottom Orange Monogram (S Bottom Loop) -->
    <!-- Main Bottom Polygon -->
    <polygon points="250,455 90,365 90,265 175,313 175,360 250,403 325,360 325,300 250,257 410,167 410,365" fill="${orangeColor}" />

    <!-- Sharp Cutlines Matching Poster Geometry -->
    <!-- Top inner horizontal cut -->
    <polygon points="250,175 340,225 320,237 230,187" fill="${innerBg}" />
    <!-- Center vertical dividing slit -->
    <polygon points="244,240 256,240 256,290 244,290" fill="${innerBg}" />
    <!-- Bottom inner horizontal cut -->
    <polygon points="160,303 250,353 270,341 180,291" fill="${innerBg}" />
    
    <!-- Center diagonal slashes -->
    <polygon points="85,320 250,225 255,235 90,330" fill="${innerBg}" />
    <polygon points="245,295 410,200 415,210 250,305" fill="${innerBg}" />
  </svg>`;
};

const renderToPng = (svgStr, outputPath, width) => {
  const resvg = new Resvg(svgStr, {
    fitTo: width ? { mode: 'width', value: width } : undefined,
    background: 'rgba(0, 0, 0, 0)',
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  fs.writeFileSync(outputPath, pngBuffer);
  console.log(`Saved PNG: ${outputPath} (${pngBuffer.length} bytes)`);
};

// Generate files
renderToPng(createEmblemSvg('light'), 'public/surge-shore-emblem.png', 800);
renderToPng(createEmblemSvg('dark'), 'public/surge-shore-emblem-dark.png', 800);
renderToPng(createEmblemSvg('light'), 'src/assets/images/surge-shore-emblem.png', 800);
renderToPng(createEmblemSvg('light'), 'public/favicon.png', 192);
renderToPng(createEmblemSvg('light'), 'public/icon.png', 512);

console.log('All Sub-logo emblem PNGs generated!');
