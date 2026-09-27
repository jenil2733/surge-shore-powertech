import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Output directories
const outDir = path.resolve('public');
const srcAssetsDir = path.resolve('src/assets/images');

// Helper to create high-detail SVG for each motor type
function createMotorSvg({ title, subtitle, phase, mount, type, color, frame, accentColor }) {
  const isAlu = type === 'aluminium';
  const isFlange = mount.includes('Flange');
  const isSingle = phase.includes('Single') || phase.includes('1-Phase');
  
  const bodyColor1 = isAlu ? '#A0AEC0' : '#1A365D';
  const bodyColor2 = isAlu ? '#CBD5E0' : '#2B6CB0';
  const bodyColorDark = isAlu ? '#718096' : '#0F294D';
  const finColor = isAlu ? '#94A3B8' : '#1E4E8C';

  return `
  <svg width="1200" height="900" viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background studio gradient -->
      <radialGradient id="bgGrad" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="60%" stop-color="#F1F5F9" />
        <stop offset="100%" stop-color="#E2E8F0" />
      </radialGradient>
      
      <!-- Motor Body Gradient -->
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${bodyColor2}" />
        <stop offset="30%" stop-color="${bodyColor1}" />
        <stop offset="70%" stop-color="${bodyColorDark}" />
        <stop offset="100%" stop-color="${bodyColor1}" />
      </linearGradient>

      <!-- Shaft metallic gradient -->
      <linearGradient id="shaftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#F8FAFC" />
        <stop offset="35%" stop-color="#94A3B8" />
        <stop offset="70%" stop-color="#475569" />
        <stop offset="100%" stop-color="#E2E8F0" />
      </linearGradient>

      <!-- Flange Ring Gradient -->
      <linearGradient id="flangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bodyColor2}" />
        <stop offset="50%" stop-color="${bodyColor1}" />
        <stop offset="100%" stop-color="${bodyColorDark}" />
      </linearGradient>

      <!-- Drop shadow -->
      <filter id="studioShadow" x="-20%" y="-20%" width="140%" height="150%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="24" />
        <feOffset dx="0" dy="36" />
        <feComponentTransfer><feFuncA type="linear" slope="0.28" /></feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <!-- Grid pattern -->
      <pattern id="techGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CBD5E1" stroke-width="0.75" stroke-opacity="0.4" />
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="1200" height="900" fill="url(#bgGrad)" />
    <rect width="1200" height="900" fill="url(#techGrid)" />

    <!-- Floor Reflection / Ellipse Shadow -->
    <ellipse cx="600" cy="720" rx="380" ry="42" fill="#000000" opacity="0.18" filter="blur(16px)" />
    <ellipse cx="600" cy="720" rx="260" ry="24" fill="#000000" opacity="0.25" filter="blur(8px)" />

    <!-- Top Branding / Tag Strip in photo -->
    <g transform="translate(60, 50)">
      <rect x="0" y="0" width="420" height="64" rx="12" fill="#0B2559" opacity="0.95" />
      <rect x="0" y="0" width="8" height="64" rx="4" fill="#FF6B00" />
      <text x="24" y="26" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#FFFFFF" letter-spacing="1.5">SURGE SHORE POWERTECH</text>
      <text x="24" y="48" font-family="system-ui, sans-serif" font-weight="700" font-size="12" fill="#FF6B00" letter-spacing="1">IS 325 / IS 1231 CERTIFIED OEM</text>
    </g>

    <g transform="translate(860, 50)">
      <rect x="0" y="0" width="280" height="64" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
      <text x="20" y="26" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#0B2559">${phase}</text>
      <text x="20" y="48" font-family="system-ui, sans-serif" font-weight="600" font-size="12" fill="#64748B">${mount}</text>
    </g>

    <!-- Main Motor Rendering -->
    <g filter="url(#studioShadow)">
      
      <!-- Rear Cowl / Fan Cover -->
      <g transform="translate(240, 310)">
        <path d="M 0 30 Q 30 0, 70 0 L 100 0 L 100 320 L 70 320 Q 30 320, 0 290 Z" fill="${bodyColorDark}" stroke="#334155" stroke-width="2" />
        <!-- Cowl air slots -->
        <line x1="25" y1="90" x2="25" y2="230" stroke="#0F172A" stroke-width="6" stroke-linecap="round" />
        <line x1="45" y1="70" x2="45" y2="250" stroke="#0F172A" stroke-width="6" stroke-linecap="round" />
        <line x1="65" y1="50" x2="65" y2="270" stroke="#0F172A" stroke-width="6" stroke-linecap="round" />
        <line x1="85" y1="40" x2="85" y2="280" stroke="#0F172A" stroke-width="6" stroke-linecap="round" />
      </g>

      <!-- Main Stator Body with Cooling Ribs / Fins -->
      <g transform="translate(340, 290)">
        <rect x="0" y="0" width="400" height="340" rx="16" fill="url(#bodyGrad)" stroke="${bodyColorDark}" stroke-width="2" />
        
        <!-- Cooling Fins -->
        ${Array.from({ length: 14 }).map((_, i) => `
          <rect x="${25 + i * 26}" y="-8" width="10" height="356" rx="4" fill="${finColor}" stroke="${bodyColorDark}" stroke-width="1" />
          <line x1="${30 + i * 26}" y1="0" x2="${30 + i * 26}" y2="340" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="2" />
        `).join('')}

        <!-- Surge Shore Rating Nameplate on Motor Body -->
        <g transform="translate(90, 110)">
          <rect x="0" y="0" width="220" height="120" rx="8" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2" />
          <rect x="0" y="0" width="220" height="28" fill="#0B2559" rx="6" />
          <text x="110" y="19" font-family="system-ui, sans-serif" font-weight="900" font-size="12" fill="#FFFFFF" text-anchor="middle">SURGE SHORE POWERTECH</text>
          <text x="12" y="48" font-family="monospace" font-size="10" font-weight="bold" fill="#0F172A">TYPE: ${type.toUpperCase()} INDUCTION</text>
          <text x="12" y="66" font-family="monospace" font-size="10" fill="#334155">VOLTS: ${isSingle ? '230V 1-PH' : '415V 3-PH'} 50Hz</text>
          <text x="12" y="84" font-family="monospace" font-size="10" fill="#334155">FRAME: ${frame} | CLASS F | IP55</text>
          <text x="12" y="102" font-family="monospace" font-size="10" fill="#059669" font-weight="bold">DUTY: S1 CONT. | BALANCED</text>
          <circle cx="10" cy="14" r="2.5" fill="#CBD5E1" />
          <circle cx="210" cy="14" r="2.5" fill="#CBD5E1" />
          <circle cx="10" cy="106" r="2.5" fill="#CBD5E1" />
          <circle cx="210" cy="106" r="2.5" fill="#CBD5E1" />
        </g>
      </g>

      <!-- Terminal Box on Top -->
      <g transform="translate(450, 160)">
        <rect x="0" y="30" width="180" height="100" rx="10" fill="${bodyColorDark}" stroke="#1E293B" stroke-width="2" />
        <rect x="-10" y="16" width="200" height="24" rx="6" fill="${bodyColor2}" stroke="#334155" stroke-width="1.5" />
        <circle cx="20" cy="28" r="4" fill="#94A3B8" />
        <circle cx="180" cy="28" r="4" fill="#94A3B8" />
        <circle cx="90" cy="90" r="14" fill="#0F172A" stroke="#475569" stroke-width="2" />
        <text x="90" y="94" font-family="sans-serif" font-size="9" fill="#94A3B8" text-anchor="middle">M20</text>
        
        ${isSingle ? `
          <!-- Single Phase Dual Capacitor Cylinders -->
          <g transform="translate(180, 20)">
            <!-- Run Capacitor -->
            <rect x="10" y="0" width="38" height="95" rx="6" fill="#E2E8F0" stroke="#64748B" stroke-width="1.5" />
            <rect x="15" y="-6" width="28" height="6" fill="#475569" />
            <text x="29" y="55" font-family="monospace" font-size="8" fill="#1E293B" text-anchor="middle" transform="rotate(-90 29 55)">RUN CAP</text>
            <!-- Start Capacitor -->
            <rect x="52" y="10" width="38" height="85" rx="6" fill="#0284C7" stroke="#0369A1" stroke-width="1.5" />
            <rect x="57" y="4" width="28" height="6" fill="#1E293B" />
            <text x="71" y="58" font-family="monospace" font-size="8" fill="#FFFFFF" text-anchor="middle" transform="rotate(-90 71 58)">START CAP</text>
          </g>
        ` : ''}
      </g>

      <!-- Front Drive End-Shield: FLANGE or FOOT MOUNT -->
      ${isFlange ? `
        <!-- B5 Flange Front Mounting Ring -->
        <g transform="translate(740, 220)">
          <!-- Circular Flange Face -->
          <ellipse cx="60" cy="240" rx="60" ry="240" fill="url(#flangeGrad)" stroke="#1E293B" stroke-width="3" />
          <ellipse cx="60" cy="240" rx="46" ry="190" fill="${bodyColor1}" stroke="#334155" stroke-width="2" />
          <ellipse cx="60" cy="240" rx="32" ry="120" fill="${bodyColorDark}" stroke="#0F172A" stroke-width="2" />
          
          <!-- Flange Bolt Holes (Pitch Circle) -->
          <ellipse cx="60" cy="60" rx="10" ry="14" fill="#0F172A" stroke="#64748B" stroke-width="2" />
          <ellipse cx="60" cy="420" rx="10" ry="14" fill="#0F172A" stroke="#64748B" stroke-width="2" />
          <ellipse cx="60" cy="180" rx="10" ry="14" fill="#0F172A" stroke="#64748B" stroke-width="2" />
          <ellipse cx="60" cy="300" rx="10" ry="14" fill="#0F172A" stroke="#64748B" stroke-width="2" />

          <!-- Concentric Spigot Pilot Ring -->
          <ellipse cx="76" cy="240" rx="20" ry="80" fill="url(#shaftGrad)" stroke="#475569" stroke-width="1.5" />

          <!-- Output Drive Shaft Protrusion -->
          <path d="M 76 210 L 220 210 Q 230 240, 220 270 L 76 270 Z" fill="url(#shaftGrad)" stroke="#334155" stroke-width="2" />
          <ellipse cx="220" cy="240" rx="12" ry="30" fill="#E2E8F0" stroke="#475569" stroke-width="2" />
          <!-- Keyway on Shaft -->
          <rect x="110" y="215" width="70" height="8" rx="2" fill="#1E293B" stroke="#0F172A" stroke-width="1" />
        </g>
      ` : `
        <!-- B3 Foot Mount Front Shield & Base Feet -->
        <g transform="translate(740, 270)">
          <!-- Drive End Round Shield -->
          <path d="M 0 20 Q 40 0, 70 0 L 80 0 L 80 360 L 70 360 Q 40 360, 0 340 Z" fill="${bodyColorDark}" stroke="#334155" stroke-width="2" />
          <ellipse cx="80" cy="180" rx="16" ry="60" fill="${bodyColor1}" stroke="#1E293B" stroke-width="2" />

          <!-- Output Drive Shaft Protrusion -->
          <path d="M 80 155 L 220 155 Q 230 180, 220 205 L 80 205 Z" fill="url(#shaftGrad)" stroke="#334155" stroke-width="2" />
          <ellipse cx="220" cy="180" rx="10" ry="25" fill="#E2E8F0" stroke="#475569" stroke-width="2" />
          <!-- Keyway on Shaft -->
          <rect x="110" y="160" width="70" height="7" rx="2" fill="#1E293B" stroke="#0F172A" stroke-width="1" />
        </g>

        <!-- Rigid Integral Foot Mounting Base (B3) -->
        <g transform="translate(360, 610)">
          <!-- Left/Rear Foot -->
          <path d="M 0 0 L 30 0 L 40 60 L -10 60 Z" fill="${bodyColorDark}" stroke="#1E293B" stroke-width="2" />
          <rect x="-25" y="55" width="80" height="24" rx="4" fill="${bodyColor1}" stroke="#0F172A" stroke-width="2" />
          <ellipse cx="15" cy="67" rx="16" ry="6" fill="#0F172A" stroke="#64748B" stroke-width="1.5" />

          <!-- Right/Front Foot -->
          <path d="M 330 0 L 360 0 L 380 60 L 320 60 Z" fill="${bodyColorDark}" stroke="#1E293B" stroke-width="2" />
          <rect x="305" y="55" width="85" height="24" rx="4" fill="${bodyColor1}" stroke="#0F172A" stroke-width="2" />
          <ellipse cx="347" cy="67" rx="16" ry="6" fill="#0F172A" stroke="#64748B" stroke-width="1.5" />
        </g>
      `}

      <!-- Bottom Badges / Specifications Card -->
      <g transform="translate(60, 800)">
        <rect x="0" y="0" width="1080" height="60" rx="12" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" />
        <circle cx="30" cy="30" r="10" fill="#FF6B00" />
        <path d="M 26 30 L 29 33 L 35 27" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        
        <text x="54" y="36" font-family="system-ui, sans-serif" font-weight="900" font-size="16" fill="#0B2559">${title}</text>
        <text x="560" y="35" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#64748B">EN8E Shaft • CRNO Laminations • Class 'F' 100% Copper</text>
        <rect x="940" y="12" width="120" height="36" rx="8" fill="#0B2559" />
        <text x="1000" y="35" font-family="system-ui, sans-serif" font-weight="800" font-size="12" fill="#FFFFFF" text-anchor="middle">SURGE SHORE</text>
      </g>

    </g>
  </svg>
  `;
}

const motorConfigs = [
  {
    fileName: 'IMG_5524.PNG',
    title: 'FLANGE MOUNTED C.I. BODY (3-PHASE / B5)',
    subtitle: 'Direct Gearbox Coupling • Rigid Cast Iron Housing',
    phase: '3-Phase / 415V',
    mount: 'B5 Flange Mounted',
    type: 'cast-iron',
    color: '#1A365D',
    frame: '80 - 132M',
    accentColor: '#FF6B00'
  },
  {
    fileName: 'IMG_5525.PNG',
    title: 'FLANGE MOUNTED C.I. BODY – SINGLE PHASE',
    subtitle: 'High Starting Torque Dual Capacitor • B5/B14 Flange',
    phase: '1-Phase / 230V',
    mount: 'B5 Flange Single Phase',
    type: 'cast-iron',
    color: '#1A365D',
    frame: '71 - 100L',
    accentColor: '#0284C7'
  },
  {
    fileName: 'IMG_5521.PNG',
    title: 'ALUMINIUM BODY INDUCTION MOTOR',
    subtitle: 'Die-Cast Aluminum Frame • High Heat Dissipation',
    phase: '1-Phase & 3-Phase',
    mount: 'Multi-Mount Aluminium',
    type: 'aluminium',
    color: '#94A3B8',
    frame: '63 - 100L',
    accentColor: '#059669'
  },
  {
    fileName: '70ebb626-8db6-4889-b510-03e1bd0cbc43.png',
    title: 'FOOT MOUNT C.I. BODY – SINGLE PHASE',
    subtitle: 'Heavy Rigid Base Feet (B3) • Twin Capacitor Box',
    phase: '1-Phase / 230V',
    mount: 'B3 Foot Mount (1-PH)',
    type: 'cast-iron',
    color: '#1A365D',
    frame: '71 - 112M',
    accentColor: '#D97706'
  },
  {
    fileName: 'da7ff75e-e239-4073-9760-ce65ec045733.png',
    title: 'FOOT MOUNT C.I. BODY – 3 PHASE',
    subtitle: 'Heavy Duty Rigid Base Feet (B3) • Continuous S1 Duty',
    phase: '3-Phase / 415V',
    mount: 'B3 Foot Mount (3-PH)',
    type: 'cast-iron',
    color: '#1A365D',
    frame: '71 - 132M',
    accentColor: '#DC2626'
  }
];

async function generateAll() {
  console.log('Generating exact 5 motor photo assets matching user requirements...');
  for (const item of motorConfigs) {
    const svgStr = createMotorSvg(item);
    const destPngUpper = path.join(outDir, item.fileName);
    const destPngLower = path.join(outDir, item.fileName.toLowerCase());
    const destSrcPng = path.join(srcAssetsDir, item.fileName);

    const buffer = Buffer.from(svgStr);
    await sharp(buffer)
      .png({ compressionLevel: 8 })
      .toFile(destPngUpper);

    // Save lower-case alias too
    if (destPngUpper !== destPngLower) {
      fs.copyFileSync(destPngUpper, destPngLower);
    }
    fs.copyFileSync(destPngUpper, destSrcPng);

    console.log(`Created: ${item.fileName} (${item.title})`);
  }
  console.log('All 5 photo assets successfully created in public/ and src/assets/images/!');
}

generateAll().catch(err => {
  console.error('Error generating photos:', err);
  process.exit(1);
});
