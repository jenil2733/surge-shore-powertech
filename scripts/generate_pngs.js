import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';

// Clean, precise vector SVG replicating SURGE SHORE POWERTECH LLP poster
const createSvg = (isDark = false) => {
  const primaryColor = isDark ? '#FFFFFF' : '#1B365D';
  const orangeColor = '#EA580C';
  const subColor = isDark ? '#E2E8F0' : '#1B365D';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1350 320" width="1350" height="320">
    <g transform="translate(20, 15)">
      <!-- OUTER HEXAGON -->
      <polygon points="140,0 270,75 270,225 140,300 10,225 10,75" fill="${primaryColor}" />
      
      <!-- INNER WHITE GAP -->
      <polygon points="140,18 254,84 254,216 140,282 26,216 26,84" fill="#FFFFFF" />

      <!-- TOP S GEOMETRY (NAVY / PRIMARY) -->
      <polygon points="140,34 238,90 238,150 188,122 188,94 140,66 92,94 92,130 140,158 42,214 42,90" fill="${primaryColor}" />
      
      <!-- BOTTOM S GEOMETRY (ORANGE) -->
      <polygon points="140,266 42,210 42,150 92,178 92,206 140,234 188,206 188,170 140,142 238,86 238,210" fill="${orangeColor}" />
      
      <!-- WHITE ISOMETRIC ACCENTS & CUTS -->
      <!-- Center dividing slash -->
      <polygon points="40,180 140,122 144,130 44,188" fill="#FFFFFF" />
      <polygon points="136,170 236,112 240,120 140,178" fill="#FFFFFF" />
      <!-- Upper & lower facet highlights -->
      <polygon points="140,96 195,128 185,134 130,102" fill="#FFFFFF" />
      <polygon points="85,166 140,198 150,192 95,160" fill="#FFFFFF" />
      <polygon points="140,66 188,94 178,100 130,72" fill="#FFFFFF" opacity="0.3" />
      <polygon points="92,206 140,234 150,228 102,200" fill="#FFFFFF" opacity="0.3" />
    </g>

    <!-- RIGHT WORDMARK -->
    <g transform="translate(340, 20)">
      <!-- Top overline bar -->
      <rect x="0" y="32" width="430" height="15" fill="${primaryColor}" rx="1" />
      
      <!-- SURGE SHORE Typography -->
      <text x="0" y="165" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="130" letter-spacing="-1" fill="${primaryColor}">SURGE SHORE</text>
      
      <!-- TM -->
      <text x="915" y="44" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="28" fill="${primaryColor}">TM</text>
      
      <!-- Underline bar under SHORE -->
      <rect x="475" y="186" width="435" height="15" fill="${primaryColor}" rx="1" />
      
      <!-- POWERTECH LLP Subtitle -->
      <text x="625" y="240" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="34" letter-spacing="4" fill="${subColor}">POWERTECH LLP</text>
    </g>
  </svg>`;
};

// Hexagon emblem icon only
const createEmblemSvg = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 320" width="300" height="320">
    <g transform="translate(10, 10)">
      <polygon points="140,0 270,75 270,225 140,300 10,225 10,75" fill="#1B365D" />
      <polygon points="140,18 254,84 254,216 140,282 26,216 26,84" fill="#FFFFFF" />
      <polygon points="140,34 238,90 238,150 188,122 188,94 140,66 92,94 92,130 140,158 42,214 42,90" fill="#1B365D" />
      <polygon points="140,266 42,210 42,150 92,178 92,206 140,234 188,206 188,170 140,142 238,86 238,210" fill="#EA580C" />
      <polygon points="40,180 140,122 144,130 44,188" fill="#FFFFFF" />
      <polygon points="136,170 236,112 240,120 140,178" fill="#FFFFFF" />
      <polygon points="140,96 195,128 185,134 130,102" fill="#FFFFFF" />
      <polygon points="85,166 140,198 150,192 95,160" fill="#FFFFFF" />
      <polygon points="140,66 188,94 178,100 130,72" fill="#FFFFFF" opacity="0.3" />
      <polygon points="92,206 140,234 150,228 102,200" fill="#FFFFFF" opacity="0.3" />
    </g>
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
renderToPng(createSvg(false), 'public/surge-shore-logo.png', 1600);
renderToPng(createSvg(false), 'public/logo.png', 1600);
renderToPng(createSvg(false), 'public/surge-shore-full.png', 1600);
renderToPng(createSvg(true), 'public/surge-shore-logo-white.png', 1600);
renderToPng(createEmblemSvg(), 'public/surge-shore-emblem.png', 512);
renderToPng(createEmblemSvg(), 'public/favicon.png', 128);
renderToPng(createEmblemSvg(), 'public/icon.png', 512);

console.log('All PNG logos generated successfully!');
