import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const productsDir = path.resolve('public/images/products');
const assetsDir = path.resolve('src/assets/images');

[publicDir, productsDir, assetsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper to create an ultra-clean, realistic industrial product shot SVG
function renderMotorSvg({
  type, // 'flange-3phase' | 'flange-1phase' | 'aluminium' | 'foot-1phase' | 'foot-3phase' | 'flange-coupling' | 'foot-coupling'
  title: rawTitle,
  subtitle: rawSubtitle,
  categoryBadge: rawBadge,
  specs: rawSpecs,
}) {
  const title = escapeXml(rawTitle);
  const subtitle = escapeXml(rawSubtitle);
  const categoryBadge = escapeXml(rawBadge);
  const specs = {
    typeLine: escapeXml(rawSpecs.typeLine),
    power: escapeXml(rawSpecs.power),
    rpm: escapeXml(rawSpecs.rpm),
    voltage: escapeXml(rawSpecs.voltage),
    phase: escapeXml(rawSpecs.phase),
    frame: escapeXml(rawSpecs.frame),
  };
  const isAluminium = type === 'aluminium';
  const isSinglePhase = type === 'flange-1phase' || type === 'foot-1phase' || type === 'foot-coupling';
  const isFlange = type.startsWith('flange');
  const hasCoupling = type.includes('coupling');

  // Colors
  const bodyColor = isAluminium ? '#94A3B8' : '#2C3E50';
  const bodyDark = isAluminium ? '#64748B' : '#1A2530';
  const bodyLight = isAluminium ? '#E2E8F0' : '#475569';
  const finColor = isAluminium ? '#CBD5E1' : '#334155';
  const finShadow = isAluminium ? '#475569' : '#0F172A';
  const flangeColor = isAluminium ? '#E2E8F0' : '#3B4B5C';
  const flangeMachined = isAluminium ? '#F8FAFC' : '#94A3B8';
  const capYellow = '#EAB308';
  const capYellowDark = '#CA8A04';
  const capacitorBody = '#E2E8F0';
  const primaryNavy = '#0B2559';
  const accentOrange = '#EA580C';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
    <defs>
      <!-- Background Studio Lighting Gradient -->
      <radialGradient id="studio-bg" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="55%" stop-color="#F1F5F9" />
        <stop offset="100%" stop-color="#E2E8F0" />
      </radialGradient>

      <!-- Soft Cast Ground Shadow -->
      <radialGradient id="ground-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0F172A" stop-opacity="0.32" />
        <stop offset="50%" stop-color="#334155" stop-opacity="0.12" />
        <stop offset="100%" stop-color="#64748B" stop-opacity="0" />
      </radialGradient>

      <!-- Cylinder metallic lighting for main stator body -->
      <linearGradient id="body-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${bodyLight}" />
        <stop offset="25%" stop-color="${bodyColor}" />
        <stop offset="70%" stop-color="${bodyDark}" />
        <stop offset="100%" stop-color="#0F172A" />
      </linearGradient>

      <!-- Machined Flange Radial Highlight -->
      <linearGradient id="flange-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${flangeMachined}" />
        <stop offset="35%" stop-color="${flangeColor}" />
        <stop offset="80%" stop-color="${bodyDark}" />
        <stop offset="100%" stop-color="#0F172A" />
      </linearGradient>

      <!-- Yellow shaft protective sleeve -->
      <linearGradient id="yellow-cap" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FEF08A" />
        <stop offset="25%" stop-color="${capYellow}" />
        <stop offset="75%" stop-color="${capYellowDark}" />
        <stop offset="100%" stop-color="#854D0E" />
      </linearGradient>

      <!-- Steel shaft gradient -->
      <linearGradient id="steel-shaft" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F8FAFC" />
        <stop offset="30%" stop-color="#CBD5E1" />
        <stop offset="70%" stop-color="#64748B" />
        <stop offset="100%" stop-color="#334155" />
      </linearGradient>

      <!-- Rear Fan Cowl -->
      <linearGradient id="cowl-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="50%" stop-color="#1E293B" />
        <stop offset="100%" stop-color="#090D16" />
      </linearGradient>

      <!-- Nameplate metallic badge -->
      <linearGradient id="badge-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F8FAFC" />
        <stop offset="50%" stop-color="#E2E8F0" />
        <stop offset="100%" stop-color="#94A3B8" />
      </linearGradient>
    </defs>

    <!-- 1. Background Studio Canvas -->
    <rect width="1200" height="900" fill="url(#studio-bg)" />

    <!-- Subtle Tech Grid Lines in Studio Background -->
    <g opacity="0.06" stroke="#0B2559" stroke-width="1">
      <line x1="0" y1="180" x2="1200" y2="180" />
      <line x1="0" y1="360" x2="1200" y2="360" />
      <line x1="0" y1="540" x2="1200" y2="540" />
      <line x1="0" y1="720" x2="1200" y2="720" />
      <line x1="200" y1="0" x2="200" y2="900" />
      <line x1="400" y1="0" x2="400" y2="900" />
      <line x1="600" y1="0" x2="600" y2="900" />
      <line x1="800" y1="0" x2="800" y2="900" />
      <line x1="1000" y1="0" x2="1000" y2="900" />
    </g>

    <!-- Studio Floor Horizon Line -->
    <line x1="60" y1="680" x2="1140" y2="680" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.5" />

    <!-- 2. Realistic Ground Contact Shadows -->
    <ellipse cx="610" cy="710" rx="440" ry="45" fill="url(#ground-shadow)" />
    <ellipse cx="580" cy="700" rx="340" ry="28" fill="#0F172A" opacity="0.22" />

    <!-- 3. MOTOR MAIN ASSEMBLY (Centered & Isometric Angled) -->
    <g transform="translate(140, 90)">

      <!-- REAR COOLING FAN COWL (Black pressed steel with vents) -->
      <g id="rear-fan-cowl">
        <!-- Rounded rear cap -->
        <path d="M 720,330 C 720,270 750,260 770,260 L 780,260 C 800,260 820,280 820,340 L 820,530 C 820,590 800,610 780,610 L 770,610 C 750,610 720,600 720,540 Z" fill="url(#cowl-grad)" />
        <ellipse cx="800" cy="435" rx="16" ry="110" fill="#090D16" opacity="0.6" />
        <!-- Air intake slots -->
        <line x1="755" y1="330" x2="755" y2="540" stroke="#475569" stroke-width="3.5" stroke-dasharray="14 10" />
        <line x1="775" y1="340" x2="775" y2="530" stroke="#475569" stroke-width="3.5" stroke-dasharray="14 10" />
        <line x1="795" y1="360" x2="795" y2="510" stroke="#334155" stroke-width="3.5" stroke-dasharray="14 10" />
      </g>

      <!-- STATOR BODY / COOLING FINS -->
      <g id="stator-housing">
        <!-- Main cylinder -->
        <rect x="360" y="270" width="370" height="330" rx="20" fill="url(#body-grad)" />

        <!-- Longitudinal Cooling Fins -->
        ${Array.from({ length: 14 }).map((_, i) => {
          const y = 295 + i * 21;
          return `
            <!-- Fin ${i + 1} -->
            <rect x="355" y="${y}" width="380" height="8" rx="3" fill="${finColor}" />
            <line x1="355" y1="${y + 8}" x2="735" y2="${y + 8}" stroke="${finShadow}" stroke-width="2.5" />
            <line x1="360" y1="${y + 1}" x2="730" y2="${y + 1}" stroke="#FFFFFF" stroke-width="1" opacity="0.35" />
          `;
        }).join('')}

        <!-- Cast iron center reinforcement ribs -->
        <rect x="520" y="265" width="28" height="340" rx="4" fill="${bodyDark}" opacity="0.85" />
        <rect x="524" y="265" width="8" height="340" fill="#FFFFFF" opacity="0.15" />
      </g>

      <!-- DIELECTRIC TERMINAL BOX (Top of motor) -->
      <g id="terminal-box" transform="translate(480, 160)">
        <!-- Shadow beneath box -->
        <rect x="5" y="105" width="150" height="15" rx="5" fill="#000000" opacity="0.3" />
        <!-- Base collar -->
        <rect x="25" y="90" width="110" height="25" rx="4" fill="${bodyDark}" stroke="#0F172A" stroke-width="2" />
        <!-- Main box body -->
        <rect x="10" y="25" width="140" height="75" rx="8" fill="${bodyLight}" stroke="${bodyDark}" stroke-width="3" />
        <!-- Lid -->
        <polygon points="5,25 155,25 145,10 15,10" fill="${bodyColor}" stroke="${bodyDark}" stroke-width="2" />
        <rect x="20" y="12" width="120" height="12" rx="3" fill="#FFFFFF" opacity="0.25" />
        <!-- Corner assembly screws -->
        <circle cx="22" cy="38" r="4" fill="#94A3B8" stroke="#1E293B" stroke-width="1.5" />
        <circle cx="138" cy="38" r="4" fill="#94A3B8" stroke="#1E293B" stroke-width="1.5" />
        <circle cx="22" cy="85" r="4" fill="#94A3B8" stroke="#1E293B" stroke-width="1.5" />
        <circle cx="138" cy="85" r="4" fill="#94A3B8" stroke="#1E293B" stroke-width="1.5" />
        <!-- Brass Cable Gland Entry on side -->
        <rect x="148" y="50" width="18" height="26" rx="2" fill="#D97706" stroke="#92400E" stroke-width="1.5" />
        <rect x="162" y="55" width="12" height="16" rx="2" fill="#F59E0B" />
        <!-- Earthing Bolt -->
        <circle cx="80" cy="94" r="5" fill="#EAB308" stroke="#854D0E" stroke-width="1.5" />
      </g>

      ${!isSinglePhase ? `
        <!-- HEAVY EYE BOLT (Lifting Lug for 3-Phase Cast Iron) -->
        <g id="eye-bolt" transform="translate(420, 185)">
          <circle cx="25" cy="25" r="24" fill="none" stroke="#94A3B8" stroke-width="10" />
          <circle cx="25" cy="25" r="24" fill="none" stroke="#E2E8F0" stroke-width="3" />
          <rect x="18" y="44" width="14" height="38" rx="2" fill="#64748B" stroke="#1E293B" stroke-width="2" />
        </g>
      ` : `
        <!-- HIGH-TORQUE RUN/START CAPACITOR (For Single Phase Motor) -->
        <g id="single-phase-capacitor" transform="translate(360, 150)">
          <!-- Capacitor mounting bracket -->
          <rect x="15" y="85" width="110" height="24" rx="4" fill="${bodyDark}" />
          <!-- Metallic/Plastic White Capacitor Cylinder -->
          <rect x="25" y="10" width="90" height="80" rx="16" fill="${capacitorBody}" stroke="#94A3B8" stroke-width="3" />
          <line x1="32" y1="12" x2="32" y2="88" stroke="#FFFFFF" stroke-width="6" opacity="0.6" />
          <rect x="40" y="28" width="60" height="42" rx="4" fill="#FFFFFF" opacity="0.9" />
          <!-- Capacitor Spec Label -->
          <text x="70" y="44" font-family="Arial, sans-serif" font-weight="900" font-size="10" fill="#0B2559" text-anchor="middle">SURGE SHORE</text>
          <text x="70" y="56" font-family="Arial, sans-serif" font-weight="700" font-size="9" fill="#EA580C" text-anchor="middle">30µF / 440V AC</text>
          <text x="70" y="66" font-family="Arial, sans-serif" font-weight="600" font-size="7" fill="#64748B" text-anchor="middle">50Hz 1-PHASE</text>
          <!-- Wiring harness leading to terminal box -->
          <path d="M 115,50 C 135,50 135,75 145,85" fill="none" stroke="#EAB308" stroke-width="5" />
          <path d="M 115,58 C 132,58 135,80 145,90" fill="none" stroke="#000000" stroke-width="4.5" />
        </g>
      `}

      <!-- DRIVE END SHIELD (Front Hub) -->
      <g id="front-end-shield">
        <path d="M 270,300 C 270,275 295,270 360,270 L 360,600 C 295,600 270,595 270,570 Z" fill="${flangeColor}" stroke="${bodyDark}" stroke-width="3" />
        <!-- Center bearing hub collar -->
        <circle cx="270" cy="435" r="75" fill="url(#flange-grad)" stroke="${bodyDark}" stroke-width="3" />
        <circle cx="270" cy="435" r="50" fill="${bodyDark}" />
        <circle cx="270" cy="435" r="38" fill="#1E293B" />
      </g>

      ${isFlange ? `
        <!-- =======================================================
             FLANGE MOUNT (B5 / B14 Large Circular Machined Flange)
             ======================================================= -->
        <g id="mounting-flange">
          <!-- Main Outer Flange Ring -->
          <ellipse cx="225" cy="435" rx="38" ry="180" fill="url(#flange-grad)" stroke="${bodyDark}" stroke-width="4" />
          <!-- Inner machined spigot pilot ring -->
          <ellipse cx="222" cy="435" rx="26" ry="125" fill="${flangeMachined}" stroke="#94A3B8" stroke-width="3" />
          <!-- Machine chamfer highlight -->
          <ellipse cx="220" cy="435" rx="20" ry="120" fill="none" stroke="#FFFFFF" stroke-width="2.5" opacity="0.65" />

          <!-- Flange PCD Bolt Clearance Holes (IS 2223 / IEC) -->
          <!-- Top Bolt Hole -->
          <ellipse cx="224" cy="285" rx="12" ry="18" fill="#0F172A" stroke="#CBD5E1" stroke-width="2.5" />
          <!-- Bottom Bolt Hole -->
          <ellipse cx="224" cy="585" rx="12" ry="18" fill="#0F172A" stroke="#CBD5E1" stroke-width="2.5" />
          <!-- Front Bolt Hole -->
          <ellipse cx="205" cy="435" rx="10" ry="15" fill="#0F172A" stroke="#CBD5E1" stroke-width="2.5" />
          <!-- Rear Flange Bolt Hole -->
          <ellipse cx="245" cy="435" rx="10" ry="15" fill="#0F172A" stroke="#CBD5E1" stroke-width="2.5" />
        </g>
      ` : `
        <!-- =======================================================
             FOOT MOUNT (B3 Rigid Integral Cast Iron/Aluminium Feet)
             ======================================================= -->
        <g id="mounting-feet">
          <!-- Front Foot Assembly -->
          <g transform="translate(320, 560)">
            <!-- Main solid cast iron base pad -->
            <path d="M 0,0 L 70,0 L 85,55 L -15,55 Z" fill="${bodyDark}" stroke="#0F172A" stroke-width="3" />
            <rect x="-25" y="45" width="125" height="25" rx="5" fill="${bodyColor}" stroke="#0F172A" stroke-width="3" />
            <!-- Slotted anchor bolt hole (A x B) -->
            <rect x="0" y="52" width="45" height="12" rx="6" fill="#0F172A" stroke="#CBD5E1" stroke-width="2" />
            <!-- Anchor Bolt Washer & Nut -->
            <ellipse cx="22" cy="58" rx="8" ry="4" fill="#94A3B8" />
            <rect x="-20" y="48" width="115" height="4" fill="#FFFFFF" opacity="0.25" />
          </g>

          <!-- Rear Foot Assembly -->
          <g transform="translate(600, 560)">
            <path d="M 0,0 L 70,0 L 85,55 L -15,55 Z" fill="${bodyDark}" stroke="#0F172A" stroke-width="3" />
            <rect x="-25" y="45" width="125" height="25" rx="5" fill="${bodyColor}" stroke="#0F172A" stroke-width="3" />
            <!-- Slotted anchor bolt hole -->
            <rect x="25" y="52" width="45" height="12" rx="6" fill="#0F172A" stroke="#CBD5E1" stroke-width="2" />
            <ellipse cx="48" cy="58" rx="8" ry="4" fill="#94A3B8" />
            <rect x="-20" y="48" width="115" height="4" fill="#FFFFFF" opacity="0.25" />
          </g>
        </g>
      `}

      <!-- HIGH TENSILE PRECISION GROUND EN8E STEEL DRIVE SHAFT -->
      <g id="output-shaft">
        ${!hasCoupling ? `
          <!-- Standard Output Shaft with Yellow Safety Cap (Signature Surge Shore look) -->
          <!-- Exposed Steel Shaft -->
          <rect x="110" y="415" width="115" height="40" rx="3" fill="url(#steel-shaft)" stroke="#334155" stroke-width="2" />
          <line x1="110" y1="422" x2="225" y2="422" stroke="#FFFFFF" stroke-width="3" opacity="0.6" />
          
          <!-- Keyway Slot -->
          <rect x="130" y="418" width="70" height="7" rx="2" fill="#1E293B" />

          <!-- BRIGHT YELLOW PROTECTIVE PLASTIC SLEEVE / CAP (As in user photo) -->
          <rect x="65" y="411" width="95" height="48" rx="8" fill="url(#yellow-cap)" stroke="${capYellowDark}" stroke-width="2.5" />
          <!-- Rounded cap tip -->
          <path d="M 65,411 C 55,411 50,420 50,435 C 50,450 55,459 65,459 Z" fill="${capYellow}" stroke="${capYellowDark}" stroke-width="2.5" />
          <!-- Grip ribs on yellow cap -->
          <line x1="85" y1="412" x2="85" y2="458" stroke="#FEF08A" stroke-width="2.5" />
          <line x1="95" y1="412" x2="95" y2="458" stroke="#FEF08A" stroke-width="2.5" />
          <line x1="105" y1="412" x2="105" y2="458" stroke="#FEF08A" stroke-width="2.5" />
          <line x1="125" y1="412" x2="125" y2="458" stroke="#CA8A04" stroke-width="2" />
          <line x1="135" y1="412" x2="135" y2="458" stroke="#CA8A04" stroke-width="2" />
        ` : `
          <!-- EXTENDED HOLLOW SLEEVE COUPLING (For Pump / Gearbox direct sleeve, as in IMG_5523/5522) -->
          <rect x="30" y="405" width="190" height="60" rx="6" fill="url(#flange-grad)" stroke="#1E293B" stroke-width="3" />
          <line x1="30" y1="415" x2="220" y2="415" stroke="#FFFFFF" stroke-width="4" opacity="0.5" />
          <!-- Coupling Clamp Bolts -->
          <circle cx="85" cy="420" r="6" fill="#CBD5E1" stroke="#0F172A" stroke-width="2" />
          <circle cx="150" cy="420" r="6" fill="#CBD5E1" stroke="#0F172A" stroke-width="2" />
          <!-- Inner bore -->
          <ellipse cx="30" cy="435" rx="8" ry="24" fill="#090D16" />
        `}
      </g>

      <!-- METALLIC RATING NAMEPLATE (SURGE SHORE INDUCTION MOTOR) -->
      <g id="motor-nameplate" transform="translate(420, 370)">
        <!-- Plate background -->
        <rect x="0" y="0" width="175" height="105" rx="6" fill="url(#badge-grad)" stroke="#1E293B" stroke-width="2" />
        <rect x="4" y="4" width="167" height="97" rx="3" fill="#FFFFFF" opacity="0.9" />
        <!-- Corner Rivets -->
        <circle cx="8" cy="8" r="2.5" fill="#475569" />
        <circle cx="167" cy="8" r="2.5" fill="#475569" />
        <circle cx="8" cy="97" r="2.5" fill="#475569" />
        <circle cx="167" cy="97" r="2.5" fill="#475569" />

        <!-- Nameplate Brand Header -->
        <rect x="8" y="9" width="159" height="22" rx="2" fill="${primaryNavy}" />
        <!-- Hexagon mini emblem -->
        <polygon points="18,13 24,16 24,24 18,27 12,24 12,16" fill="${accentOrange}" />
        <text x="28" y="25" font-family="Arial, sans-serif" font-weight="900" font-size="11" fill="#FFFFFF" letter-spacing="0.5">SURGE SHORE</text>
        <text x="142" y="23" font-family="Arial, sans-serif" font-weight="800" font-size="7" fill="#E2E8F0">IS 325</text>

        <!-- Motor Spec Details -->
        <text x="12" y="42" font-family="Arial, monospace" font-weight="900" font-size="9" fill="#0F172A">${specs.typeLine}</text>
        <line x1="10" y1="46" x2="165" y2="46" stroke="#CBD5E1" stroke-width="1" />
        
        <text x="12" y="58" font-family="Arial, monospace" font-weight="700" font-size="8" fill="#334155">KW/HP: <tspan fill="#0B2559" font-weight="900">${specs.power}</tspan></text>
        <text x="95" y="58" font-family="Arial, monospace" font-weight="700" font-size="8" fill="#334155">RPM: <tspan fill="#0B2559" font-weight="900">${specs.rpm}</tspan></text>
        
        <text x="12" y="71" font-family="Arial, monospace" font-weight="700" font-size="8" fill="#334155">VOLTS: <tspan fill="#0B2559" font-weight="900">${specs.voltage}</tspan></text>
        <text x="95" y="71" font-family="Arial, monospace" font-weight="700" font-size="8" fill="#334155">PHASE: <tspan fill="#0B2559" font-weight="900">${specs.phase}</tspan></text>

        <text x="12" y="84" font-family="Arial, monospace" font-weight="700" font-size="8" fill="#334155">FRAME: <tspan fill="#0B2559" font-weight="900">${specs.frame}</tspan></text>
        <text x="95" y="84" font-family="Arial, monospace" font-weight="700" font-size="8" fill="#334155">DUTY: <tspan fill="#0B2559" font-weight="900">S1 / IP55</tspan></text>

        <!-- Footer strip -->
        <rect x="8" y="90" width="159" height="9" fill="#F1F5F9" />
        <text x="87" y="97" font-family="Arial, sans-serif" font-weight="800" font-size="6.5" fill="#475569" text-anchor="middle">SURGE SHORE POWERTECH LLP • AHMEDABAD</text>
      </g>
    </g>

    <!-- 4. Clean Studio Lower Overlay Info Card -->
    <g transform="translate(60, 780)">
      <rect width="1080" height="85" rx="18" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
      
      <!-- Category Badge Pill -->
      <g transform="translate(24, 24)">
        <rect width="210" height="36" rx="10" fill="${primaryNavy}" />
        <text x="105" y="23" font-family="Arial, sans-serif" font-weight="900" font-size="12" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">${categoryBadge}</text>
      </g>

      <!-- Main Title & Subtitle -->
      <g transform="translate(255, 33)">
        <text x="0" y="0" font-family="Arial, sans-serif" font-weight="900" font-size="18" fill="${primaryNavy}">${title}</text>
        <text x="0" y="21" font-family="Arial, sans-serif" font-weight="600" font-size="12" fill="#64748B">${subtitle}</text>
      </g>

      <!-- Right Side Verified Badges -->
      <g transform="translate(860, 24)">
        <rect width="195" height="36" rx="10" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" />
        <circle cx="22" cy="18" r="7" fill="#10B981" />
        <path d="M 18,18 L 21,21 L 27,15" fill="none" stroke="#FFFFFF" stroke-width="2" />
        <text x="36" y="22" font-family="Arial, sans-serif" font-weight="800" font-size="11" fill="#0B2559">100% FACTORY TESTED</text>
      </g>
    </g>
  </svg>`;
}

// Specific definitions matching the user's table:
const MOTOR_PRESETS = [
  {
    filenames: ['IMG_5524.PNG', 'images/products/IMG_5524.PNG'],
    type: 'flange-3phase',
    title: 'FLANGE MOUNTED C.I. BODY (3-PHASE)',
    subtitle: 'Standard B5 / B14 Cast Iron Flange for Direct Gearbox & Pump Coupling',
    categoryBadge: 'FLANGE MOUNT C.I.',
    specs: {
      typeLine: '3-PH INDUCTION MOTOR',
      power: '0.5 - 10.0 HP',
      rpm: '1440 / 4-POLE',
      voltage: '415V ± 10%',
      phase: '3-PHASE',
      frame: '71 to 132M'
    }
  },
  {
    filenames: ['IMG_5525.PNG', 'images/products/IMG_5525.PNG'],
    type: 'flange-1phase',
    title: 'FLANGE MOUNTED C.I. BODY – SINGLE PHASE',
    subtitle: 'High Starting Torque with Mounted Run/Start Capacitor & B5 Spigot Pilot',
    categoryBadge: 'FLANGE C.I. 1-PHASE',
    specs: {
      typeLine: '1-PH INDUCTION MOTOR',
      power: '0.25 - 3.0 HP',
      rpm: '1440 / 4-POLE',
      voltage: '230V ± 10%',
      phase: '1-PHASE',
      frame: '71 to 100L'
    }
  },
  {
    filenames: ['IMG_5521.PNG', 'images/products/IMG_5521.PNG'],
    type: 'aluminium',
    title: 'INDUCTION MOTOR (ALUMINIUM BODY)',
    subtitle: 'High Thermal Dissipation Die-Cast Aluminium Body (40% Lighter Weight)',
    categoryBadge: 'ALUMINIUM BODY',
    specs: {
      typeLine: 'ALUMINIUM MOTOR',
      power: '0.25 - 3.0 HP',
      rpm: '1440 / 2880 RPM',
      voltage: '230V / 415V',
      phase: '1-PH & 3-PH',
      frame: '63 to 100L'
    }
  },
  {
    filenames: ['70ebb626-8db6-4889-b510-03e1bd0cbc43.png', 'images/products/70ebb626-8db6-4889-b510-03e1bd0cbc43.png'],
    type: 'foot-1phase',
    title: 'FOOT MOUNT C.I. BODY – SINGLE PHASE',
    subtitle: 'Heavy Integral Cast Iron Feet (B3) with Capacitor for Belt-Driven Units',
    categoryBadge: 'FOOT MOUNT 1-PHASE',
    specs: {
      typeLine: '1-PH FOOT MOUNT B3',
      power: '0.25 - 3.0 HP',
      rpm: '1440 / 4-POLE',
      voltage: '230V 50Hz',
      phase: '1-PHASE',
      frame: '71 to 100L'
    }
  },
  {
    filenames: ['da7ff75e-e239-4073-9760-ce65ec045733.png', 'images/products/da7ff75e-e239-4073-9760-ce65ec045733.png'],
    type: 'foot-3phase',
    title: 'FOOT MOUNT C.I. BODY – 3 PHASE',
    subtitle: 'Rugged Cast Iron Workhorse with Slotted Base Anchor Holes & Lifting Eye Bolt',
    categoryBadge: 'FOOT MOUNT 3-PHASE',
    specs: {
      typeLine: '3-PH FOOT MOUNT B3',
      power: '0.5 - 10.0 HP',
      rpm: '1440 / 4-POLE',
      voltage: '415V 50Hz',
      phase: '3-PHASE',
      frame: '71 to 132M'
    }
  },
  {
    filenames: ['IMG_5523.PNG', 'images/products/IMG_5523.PNG'],
    type: 'flange-coupling',
    title: 'FLANGE MOTOR WITH EXTENDED SLEEVE COUPLING',
    subtitle: 'Precision Hollow Shaft Coupling Adapter for Direct In-Line Pump Drives',
    categoryBadge: 'SLEEVE COUPLING C.I.',
    specs: {
      typeLine: 'SPECIAL SHAFT MOTOR',
      power: '0.5 - 5.0 HP',
      rpm: '1440 / 2880 RPM',
      voltage: '415V 3-PHASE',
      phase: '3-PHASE',
      frame: '71 to 112M'
    }
  },
  {
    filenames: ['IMG_5522.PNG', 'images/products/IMG_5522.PNG'],
    type: 'foot-coupling',
    title: 'SINGLE PHASE MOTOR WITH EXTENDED COUPLING',
    subtitle: 'Capacitor-Start Single Phase Motor with Hollow Sleeve Coupling',
    categoryBadge: 'SLEEVE COUPLING 1-PH',
    specs: {
      typeLine: '1-PH SPECIAL COUPLING',
      power: '0.5 - 2.0 HP',
      rpm: '1440 RPM',
      voltage: '230V 50Hz',
      phase: '1-PHASE',
      frame: '80 to 90L'
    }
  }
];

async function generateAll() {
  console.log('Generating high-resolution product photos matching user specifications...');

  for (const preset of MOTOR_PRESETS) {
    const svgString = renderMotorSvg(preset);
    const pngBuffer = await sharp(Buffer.from(svgString))
      .resize(1200, 900)
      .png({ quality: 95, compressionLevel: 8 })
      .toBuffer();

    for (const relPath of preset.filenames) {
      const targetPath = path.resolve('public', relPath);
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(targetPath, pngBuffer);
      console.log(`Saved: public/${relPath} (${pngBuffer.length} bytes)`);

      // Also mirror directly in src/assets/images if base name
      const basename = path.basename(relPath);
      fs.writeFileSync(path.resolve(assetsDir, basename), pngBuffer);
    }
  }

  console.log('All product photos successfully generated and placed in public/ and src/assets/images/');
}

generateAll().catch(err => {
  console.error('Error generating product photos:', err);
  process.exit(1);
});
