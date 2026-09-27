const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function generateCatalog() {
  const doc = await PDFDocument.create();
  
  // Embed Fonts
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  // Embed Logo
  const logoBytes = fs.readFileSync(path.join(__dirname, '../public/surge-shore-logo.png'));
  const logoImage = await doc.embedPng(logoBytes);
  const logoDims = logoImage.scale(0.18);

  const emblemBytes = fs.readFileSync(path.join(__dirname, '../public/surge-shore-emblem.png'));
  const emblemImage = await doc.embedPng(emblemBytes);
  const emblemDims = emblemImage.scale(0.22);

  // Primary Colors
  const navy = rgb(0.043, 0.145, 0.349); // #0B2559
  const orange = rgb(1, 0.42, 0); // #FF6B00
  const darkGray = rgb(0.2, 0.25, 0.3);
  const lightGray = rgb(0.94, 0.95, 0.97);
  const white = rgb(1, 1, 1);
  const tableHeaderBg = rgb(0.06, 0.2, 0.45);
  const tableAltBg = rgb(0.96, 0.97, 0.99);
  const borderGray = rgb(0.85, 0.88, 0.92);

  const PAGE_WIDTH = 595.28; // A4 standard pt
  const PAGE_HEIGHT = 841.89;

  function drawHeader(page, title, sub = "An ISO 9001:2015 certified company") {
    // Top banner
    page.drawText('POWERING INDUSTRY', { x: 40, y: PAGE_HEIGHT - 35, size: 10, font: fontBold, color: navy });
    page.drawText('Driving Performance', { x: 40, y: PAGE_HEIGHT - 47, size: 8, font: fontOblique, color: orange });
    page.drawText(sub, { x: PAGE_WIDTH - 220, y: PAGE_HEIGHT - 38, size: 8, font: fontRegular, color: darkGray });

    // Header divider line
    page.drawLine({
      start: { x: 40, y: PAGE_HEIGHT - 55 },
      end: { x: PAGE_WIDTH - 40, y: PAGE_HEIGHT - 55 },
      thickness: 1,
      color: orange,
    });
  }

  function drawFooter(page, pageNum) {
    page.drawLine({
      start: { x: 40, y: 35 },
      end: { x: PAGE_WIDTH - 40, y: 35 },
      thickness: 1.5,
      color: orange,
    });
    page.drawText('www.surgeshorepowertech.com', { x: 40, y: 22, size: 8, font: fontRegular, color: navy });
    page.drawText('Surge Shore Powertech LLP', { x: PAGE_WIDTH / 2 - 50, y: 22, size: 8, font: fontBold, color: darkGray });
    
    // Page badge
    page.drawRectangle({
      x: PAGE_WIDTH - 65,
      y: 15,
      width: 25,
      height: 18,
      color: navy,
      borderRadius: 4
    });
    page.drawText(String(pageNum).padStart(2, '0'), {
      x: PAGE_WIDTH - 60,
      y: 20,
      size: 9,
      font: fontBold,
      color: white,
    });
  }

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    // Dark elegant header block
    page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 220,
      width: PAGE_WIDTH,
      height: 220,
      color: white,
    });

    // Logo on Cover
    page.drawImage(logoImage, {
      x: (PAGE_WIDTH - logoDims.width * 1.5) / 2,
      y: PAGE_HEIGHT - 130,
      width: logoDims.width * 1.5,
      height: logoDims.height * 1.5,
    });

    // Navy & Orange geometric design band
    page.drawRectangle({
      x: 0,
      y: 180,
      width: PAGE_WIDTH,
      height: 400,
      color: navy,
    });

    // Orange accent bar
    page.drawRectangle({
      x: 0,
      y: 570,
      width: PAGE_WIDTH,
      height: 10,
      color: orange,
    });

    // Cover Titles
    page.drawText('PRODUCT CATALOGUE', {
      x: 50,
      y: 500,
      size: 32,
      font: fontBold,
      color: white,
    });

    page.drawText('INDUSTRIAL ELECTRIC MOTORS & AUTOMATION', {
      x: 50,
      y: 465,
      size: 14,
      font: fontBold,
      color: orange,
    });

    const coverBullets = [
      '• 3-Phase & 1-Phase Induction Motors (C.I. & Aluminium Body)',
      '• Flange Mounted Motors (B5 / B14 Gearbox Series)',
      '• Diamond Special High-RPM Polishing Motors',
      '• High Discharge Immersion Coolant Pumps',
      '• Self-Priming Heavy Duty Centrifugal Pumps',
      '• Custom Electrical Panels & Servo Stabilizers'
    ];
    let bY = 410;
    for (const b of coverBullets) {
      page.drawText(b, { x: 50, y: bY, size: 10.5, font: fontRegular, color: rgb(0.9, 0.93, 0.98) });
      bY -= 24;
    }

    // Lower white footer band
    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: 180,
      color: white,
    });

    page.drawText('POWERING INDUSTRY', { x: 50, y: 130, size: 18, font: fontBold, color: navy });
    page.drawText('Driving Performance', { x: 50, y: 110, size: 14, font: fontOblique, color: orange });

    page.drawText('SURGE SHORE POWERTECH LLP', { x: 50, y: 75, size: 11, font: fontBold, color: navy });
    page.drawText('Rajkot, Gujarat, India  |  IS 325 / IS 996 / IEC 60034 Certified', { x: 50, y: 58, size: 9, font: fontRegular, color: darkGray });
    page.drawText('www.surgeshorepowertech.com  |  surgeshorepowertech@gmail.com', { x: 50, y: 44, size: 9, font: fontRegular, color: darkGray });
  }

  // ==========================================
  // PAGE 2: COMPANY PROFILE & STATS
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(page);

    // Page Top Logo
    page.drawImage(logoImage, { x: 40, y: PAGE_HEIGHT - 120, width: logoDims.width * 1.1, height: logoDims.height * 1.1 });

    // Key Stats Boxes (07+ Years, 20+ Employees, 125+ Clients)
    const stats = [
      { num: '07+', label: 'Years Of Experience' },
      { num: '20+', label: 'Employees & Engineers' },
      { num: '125+', label: 'Industrial Clients' }
    ];

    let sX = 40;
    const statW = (PAGE_WIDTH - 80 - 20) / 3;
    for (const st of stats) {
      page.drawRectangle({
        x: sX,
        y: PAGE_HEIGHT - 230,
        width: statW,
        height: 85,
        color: lightGray,
        borderColor: borderGray,
        borderWidth: 1,
      });

      page.drawText(st.num, { x: sX + 20, y: PAGE_HEIGHT - 180, size: 26, font: fontBold, color: navy });
      page.drawText(st.label, { x: sX + 15, y: PAGE_HEIGHT - 210, size: 9, font: fontBold, color: darkGray });
      sX += statW + 10;
    }

    // Philosophy Quote
    page.drawRectangle({
      x: 40,
      y: PAGE_HEIGHT - 350,
      width: PAGE_WIDTH - 80,
      height: 95,
      color: navy,
    });
    page.drawText('CORE PHILOSOPHY', { x: 60, y: PAGE_HEIGHT - 280, size: 10, font: fontBold, color: orange });
    page.drawText('“We believe that Innovation is the driving force behind progress.”', {
      x: 60,
      y: PAGE_HEIGHT - 305,
      size: 13,
      font: fontBold,
      color: white,
    });
    page.drawText('Delivering precision-engineered 1-Phase & 3-Phase motors built for continuous duty cycles.', {
      x: 60,
      y: PAGE_HEIGHT - 325,
      size: 9.5,
      font: fontRegular,
      color: rgb(0.85, 0.9, 0.97),
    });

    // Since 2020 Overview
    page.drawText('Since 2020...', { x: 40, y: PAGE_HEIGHT - 380, size: 18, font: fontBold, color: orange });
    
    page.drawText('A Leading Manufacturer of High-Quality Pumps and Motors', {
      x: 40,
      y: PAGE_HEIGHT - 405,
      size: 13,
      font: fontBold,
      color: navy,
    });

    const bodyText = [
      'Surge Shore Powertech LLP is a premier engineering concern specializing in the design, tooling,',
      'and mass fabrication of high-torque, energy-efficient electric induction motors and industrial pumps.',
      '',
      'With a legacy of excellence spanning over 06+ years since 2020, we have established ourselves as',
      'a trusted partner in the machinery manufacturing ecosystem across Gujarat and all over India.',
      '',
      'Our commitment to continuous innovation, precision CNC engineering, and uncompromising',
      'customer satisfaction makes us the preferred OEM vendor for machine tool builders, agricultural',
      'equipment fabricators, and turnkey processing plants.'
    ];

    let tY = PAGE_HEIGHT - 435;
    for (const line of bodyText) {
      if (line === '') {
        tY -= 8;
        continue;
      }
      page.drawText(line, { x: 40, y: tY, size: 10, font: fontRegular, color: darkGray });
      tY -= 17;
    }

    // Key Highlights Grid
    const highlights = [
      { title: '100% Electrolytic Copper', desc: 'Class F (155°C) thermal insulation margin for 24/7 continuous duty S1 run.' },
      { title: 'Dynamic Computer Balancing', desc: 'ISO 1940 Grade G2.5 dual-plane balancing eliminates rotor vibrations.' },
      { title: 'EN8E High Tensile Shafts', desc: 'Ground alloy steel shafts precision machined to micrometer tolerance.' },
      { title: 'High Voltage Breakdown Tested', desc: 'Every unit passes 2.0 kV dielectric high-pot and locked-rotor tests.' }
    ];

    let hX = 40;
    let hY = PAGE_HEIGHT - 650;
    for (let i = 0; i < highlights.length; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const curX = 40 + col * (statW * 1.5 + 10);
      const curY = PAGE_HEIGHT - 630 - row * 75;

      page.drawRectangle({
        x: curX,
        y: curY - 50,
        width: statW * 1.5,
        height: 60,
        color: lightGray,
        borderColor: borderGray,
        borderWidth: 1,
      });

      page.drawText(highlights[i].title, { x: curX + 10, y: curY - 15, size: 10, font: fontBold, color: navy });
      page.drawText(highlights[i].desc, { x: curX + 10, y: curY - 32, size: 8, font: fontRegular, color: darkGray });
    }

    drawFooter(page, 1);
  }

  // ==========================================
  // PAGE 3: VISION, MISSION, PRODUCTS & INDUSTRIES
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(page);

    // Section 1: Quality and Certifications
    page.drawRectangle({
      x: 40,
      y: PAGE_HEIGHT - 90,
      width: 220,
      height: 24,
      color: navy,
    });
    page.drawText('Quality and Certifications', { x: 50, y: PAGE_HEIGHT - 75, size: 11, font: fontBold, color: white });

    page.drawText(
      'Surge Shore is committed to delivering motors of the highest quality. We adhere to international quality\nstandards and hold IS 325 / IS 996 / IEC 60034 certifications to demonstrate our commitment to excellence.',
      { x: 40, y: PAGE_HEIGHT - 110, size: 9, font: fontRegular, color: darkGray, lineHeight: 14 }
    );

    // Section 2: Vision & Mission Boxes
    // Vision
    page.drawRectangle({
      x: 40,
      y: PAGE_HEIGHT - 250,
      width: (PAGE_WIDTH - 90) / 2,
      height: 105,
      color: lightGray,
      borderColor: orange,
      borderWidth: 1.5,
    });
    page.drawText('Vision', { x: 55, y: PAGE_HEIGHT - 170, size: 13, font: fontBold, color: navy });
    page.drawText(
      'We believe that innovation is the driving force behind\nprogress. We are dedicated to pushing the boundaries\nof what\'s possible, continually seeking new solutions,\nand embracing change with open arms.',
      { x: 55, y: PAGE_HEIGHT - 195, size: 8.5, font: fontRegular, color: darkGray, lineHeight: 13 }
    );

    // Mission
    const mX = 40 + (PAGE_WIDTH - 90) / 2 + 10;
    page.drawRectangle({
      x: mX,
      y: PAGE_HEIGHT - 250,
      width: (PAGE_WIDTH - 90) / 2,
      height: 105,
      color: lightGray,
      borderColor: navy,
      borderWidth: 1.5,
    });
    page.drawText('Mission', { x: mX + 15, y: PAGE_HEIGHT - 170, size: 13, font: fontBold, color: orange });
    page.drawText(
      'Our mission is to design and produce the most\nefficient & reliable 1-Phase & 3-Phase Induction\nmotors in the industry. We are dedicated to driving\ntechnological advancements & sustainability.',
      { x: mX + 15, y: PAGE_HEIGHT - 195, size: 8.5, font: fontRegular, color: darkGray, lineHeight: 13 }
    );

    // Section 3: Our Product Range
    page.drawRectangle({
      x: 40,
      y: PAGE_HEIGHT - 290,
      width: 180,
      height: 24,
      color: navy,
    });
    page.drawText('Our Product Range', { x: 50, y: PAGE_HEIGHT - 275, size: 11, font: fontBold, color: white });

    const products = [
      { name: 'Induction Motors (C.I. Body)', desc: '0.25 HP to 10 HP | IS 325 Heavy Cast Iron' },
      { name: 'Induction Motors (Aluminum)', desc: '0.25 HP to 3.0 HP | High Heat Dissipation' },
      { name: 'Diamond Special Motors', desc: 'High RPM (2800 RPM) | Low Vibration Run' },
      { name: 'Coolant Pumps (PCP Series)', desc: '0.10 HP to 0.25 HP | Immersion Machine Tool' },
      { name: 'Self Priming Pumps (DELUX)', desc: '0.5 HP to 1.0 HP | Forged Brass Impeller' }
    ];

    let prY = PAGE_HEIGHT - 315;
    for (const pr of products) {
      page.drawRectangle({
        x: 40,
        y: prY - 26,
        width: PAGE_WIDTH - 80,
        height: 28,
        color: rgb(0.97, 0.98, 1),
        borderColor: borderGray,
        borderWidth: 1,
      });
      page.drawText(pr.name, { x: 55, y: prY - 12, size: 10, font: fontBold, color: navy });
      page.drawText(pr.desc, { x: 260, y: prY - 12, size: 9, font: fontRegular, color: darkGray });
      prY -= 34;
    }

    // Section 4: Industries We Served
    page.drawRectangle({
      x: 40,
      y: PAGE_HEIGHT - 505,
      width: 180,
      height: 24,
      color: navy,
    });
    page.drawText('Industries We Served', { x: 50, y: PAGE_HEIGHT - 490, size: 11, font: fontBold, color: white });

    const industries = [
      'Manufacturing & CNC', 'Agriculture & Irrigation', 'HVAC & Air Handling', 'Water & Wastewater',
      'Oil & Gas Fuel Transfer', 'Food & Dairy Processing', 'Renewable Energy Systems', 'Heat Treatment & Furnaces'
    ];

    let indY = PAGE_HEIGHT - 540;
    for (let i = 0; i < industries.length; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const curX = 40 + col * ((PAGE_WIDTH - 90) / 2 + 10);
      const curY = PAGE_HEIGHT - 540 - row * 32;

      page.drawRectangle({
        x: curX,
        y: curY - 20,
        width: (PAGE_WIDTH - 90) / 2,
        height: 26,
        color: lightGray,
        borderColor: borderGray,
        borderWidth: 1,
      });

      page.drawRectangle({ x: curX + 6, y: curY - 14, width: 8, height: 8, color: orange });
      page.drawText(industries[i], { x: curX + 22, y: curY - 11, size: 9.5, font: fontBold, color: navy });
    }

    drawFooter(page, 2);
  }

  // ==========================================
  // PAGE 4: CAST IRON INDUCTION MOTORS SHOWCASE
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(page);

    page.drawText('INDUCTION MOTORS (C.I. Body)', { x: 40, y: PAGE_HEIGHT - 85, size: 18, font: fontBold, color: navy });
    page.drawText('Heavy-Duty Cast Iron Construction for Maximum Rigidity and Continuous S1 Duty', {
      x: 40,
      y: PAGE_HEIGHT - 105,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
    });

    // 3-Phase & 1-Phase Badges
    page.drawRectangle({ x: 40, y: PAGE_HEIGHT - 145, width: 85, height: 26, color: navy, borderRadius: 4 });
    page.drawText('3-Phase', { x: 60, y: PAGE_HEIGHT - 132, size: 11, font: fontBold, color: white });

    page.drawRectangle({ x: 135, y: PAGE_HEIGHT - 145, width: 85, height: 26, color: orange, borderRadius: 4 });
    page.drawText('1-Phase', { x: 155, y: PAGE_HEIGHT - 132, size: 11, font: fontBold, color: white });

    // Technical Blueprint Card
    page.drawRectangle({
      x: 40,
      y: PAGE_HEIGHT - 440,
      width: PAGE_WIDTH - 80,
      height: 270,
      color: lightGray,
      borderColor: borderGray,
      borderWidth: 1.5,
    });

    // Motor Technical Specs Callouts
    page.drawText('DESIGN & CONSTRUCTION HIGHLIGHTS', { x: 60, y: PAGE_HEIGHT - 180, size: 12, font: fontBold, color: navy });

    const specsHighlights = [
      ['Frame Sizes', '71 to 132M (Cast Iron Heavy Housing)'],
      ['Power Rating', '0.25 HP to 10.0 HP (0.18 kW to 7.5 kW)'],
      ['Rated Speeds', '2-Pole (2880 RPM) & 4-Pole (1440 RPM)'],
      ['Winding Quality', '100% Dual Coated Electrolytic Grade Copper Wire'],
      ['Thermal Insulation', 'Class F (155°C) with Class B temperature rise limit'],
      ['Stator Lamination', 'Low-loss CRNO cold-rolled non-oriented electrical steel'],
      ['Shaft Material', 'Ground EN8E high-tensile carbon alloy steel'],
      ['Bearings', 'Deep groove C3 clearance pre-packed shielded ball bearings'],
      ['Protection Class', 'IP55 totally enclosed fan cooled (TEFC) standard'],
      ['Voltage Supply', '415V ±10% 50Hz 3-Phase | 230V ±10% 50Hz 1-Phase']
    ];

    let shY = PAGE_HEIGHT - 210;
    for (const [k, v] of specsHighlights) {
      page.drawText(k + ':', { x: 60, y: shY, size: 9, font: fontBold, color: navy });
      page.drawText(v, { x: 190, y: shY, size: 9, font: fontRegular, color: darkGray });
      shY -= 20;
    }

    // Bottom Summary Banner
    page.drawRectangle({
      x: 40,
      y: 80,
      width: PAGE_WIDTH - 80,
      height: 70,
      color: navy,
    });
    page.drawText('HEAVY CAST IRON HOUSING — ZERO FLUTTER & EXCELLENT HEAT SINK', {
      x: 60,
      y: 125,
      size: 10.5,
      font: fontBold,
      color: orange,
    });
    page.drawText(
      'Cast Iron body motors exhibit superior vibration absorption dampening harmonics on heavy machine tools.\nRecommended for air compressors, punch presses, stone crushers, flour mills, and continuous pumps.',
      { x: 60, y: 105, size: 8.5, font: fontRegular, color: white, lineHeight: 12 }
    );

    drawFooter(page, 3);
  }

  // Helper for drawing tables
  function drawTable(page, startY, headers, rows, colWidths) {
    const rowH = 18;
    let curY = startY;

    // Header Row
    page.drawRectangle({
      x: 40,
      y: curY - rowH,
      width: PAGE_WIDTH - 80,
      height: rowH,
      color: tableHeaderBg,
    });

    let curX = 40;
    for (let i = 0; i < headers.length; i++) {
      page.drawText(headers[i], { x: curX + 4, y: curY - 13, size: 7.5, font: fontBold, color: white });
      curX += colWidths[i];
    }
    curY -= rowH;

    // Data Rows
    for (let r = 0; r < rows.length; r++) {
      const isAlt = r % 2 === 1;
      if (isAlt) {
        page.drawRectangle({
          x: 40,
          y: curY - rowH,
          width: PAGE_WIDTH - 80,
          height: rowH,
          color: tableAltBg,
        });
      }

      curX = 40;
      for (let c = 0; c < rows[r].length; c++) {
        const val = String(rows[r][c]);
        page.drawText(val, { x: curX + 4, y: curY - 13, size: 7.5, font: fontRegular, color: darkGray });
        curX += colWidths[c];
      }
      curY -= rowH;
    }

    return curY;
  }

  // ==========================================
  // PAGE 5: CAST IRON SPECIFICATIONS TABLES (3-Phase & 1-Phase)
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(page);

    page.drawText('3-Phase Cast Iron Induction Motors Specification', { x: 40, y: PAGE_HEIGHT - 75, size: 12, font: fontBold, color: navy });

    const headers3P = ['Kw', 'Hp', 'Frame', 'Full Load RPM', 'Current (A)', 'Torque %', 'Start Cur %', 'Efficiency %', 'Power Factor'];
    const widths3P = [40, 35, 45, 75, 60, 60, 65, 70, 65];
    const data3P = [
      ['0.37', '0.5', '71', '1400', '1.15', '210', '320', '72.7', '0.65'],
      ['0.55', '0.75', '80', '1410', '1.35', '205', '420', '77.1', '0.74'],
      ['0.75', '1.0', '80', '1415', '1.90', '210', '430', '79.6', '0.73'],
      ['1.10', '1.5', '90S', '1410', '2.50', '210', '455', '81.4', '0.81'],
      ['1.50', '2.0', '90L', '1420', '3.20', '215', '460', '82.8', '0.82'],
      ['2.20', '3.0', '100L', '1425', '4.70', '200', '490', '84.3', '0.79'],
      ['3.70', '5.0', '112M', '1435', '7.50', '210', '540', '86.3', '0.81'],
      ['5.50', '7.5', '132S', '1450', '10.8', '160', '500', '83.9', '0.85'],
      ['7.50', '10.0', '132M', '1450', '14.3', '165', '510', '85.3', '0.86']
    ];

    let nextY = drawTable(page, PAGE_HEIGHT - 85, headers3P, data3P, widths3P);

    // 1-Phase Table
    nextY -= 20;
    page.drawText('1-Phase Cast Iron Induction Motors Specification', { x: 40, y: nextY, size: 12, font: fontBold, color: navy });
    nextY -= 10;

    const headers1P = ['Kw', 'Hp', 'Frame', 'RPM', 'Current', 'Torque %', 'Start %', 'Eff %', 'PF', 'Run Cap', 'Start Cap'];
    const widths1P = [32, 32, 40, 45, 45, 50, 50, 45, 40, 55, 61];
    const data1P = [
      ['0.18', '0.25', '71', '1450', '2.0', '270', '475', '63.0', '0.80', '15 uF', '-'],
      ['0.37', '0.50', '80', '1440', '3.4', '275', '500', '65.0', '0.79', '15 uF', '80-100 uF'],
      ['0.37', '0.50', '90S', '1445', '5.0', '300', '500', '65.0', '0.79', '15 uF', '80-100 uF'],
      ['0.75', '1.00', '90S', '1450', '6.7', '250', '475', '72.0', '0.75', '15 uF', '100-120 uF'],
      ['0.75', '1.00', '100L', '1450', '7.0', '275', '475', '72.0', '0.75', '8 uF', '120-150 uF'],
      ['1.10', '1.50', '90L', '1455', '7.8', '240', '525', '75.0', '0.85', '25 uF', '150-200 uF'],
      ['1.10', '1.50', '100M', '1455', '8.0', '255', '530', '75.0', '0.85', '25 uF', '150-200 uF'],
      ['1.50', '2.00', '100L', '1460', '9.1', '250', '500', '79.0', '0.91', '30 uF', '200-250 uF'],
      ['1.50', '2.00', '112M', '1460', '9.1', '255', '500', '79.0', '0.90', '36 uF', '200-250 uF'],
      ['2.20', '3.00', '112M', '1460', '12.5', '275', '550', '81.0', '0.95', '30+30 uF', '200-250 uF']
    ];

    nextY = drawTable(page, nextY, headers1P, data1P, widths1P);

    // Features Section
    nextY -= 20;
    page.drawText('FEATURES', { x: 40, y: nextY, size: 12, font: fontBold, color: orange });
    nextY -= 15;

    const feats = [
      '• CI Casting body with high vibration damping',
      '• High starting torque for instantaneous full-load start',
      '• CRNO electrical grade stator laminations (low iron losses)',
      '• High quality pre-packed shielded bearings (SKF / NBC equivalent)',
      '• Motor shaft precision ground from EN8E alloy steel',
      '• Electrolytic grade copper winding with thermal Class \'F\' insulation'
    ];

    for (const f of feats) {
      page.drawText(f, { x: 40, y: nextY, size: 8.5, font: fontRegular, color: darkGray });
      nextY -= 14;
    }

    drawFooter(page, 4);
  }

  // ==========================================
  // PAGE 6: ALUMINIUM BODY INDUCTION MOTORS
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(page);

    page.drawText('INDUCTION MOTORS (Aluminium Body)', { x: 40, y: PAGE_HEIGHT - 75, size: 18, font: fontBold, color: navy });
    page.drawText('High Thermal Conductivity & Compact Lightweight Construction for Clean-Room & Portable Machinery', {
      x: 40,
      y: PAGE_HEIGHT - 95,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
    });

    const headersAl = ['Kw', 'Hp', 'Frame', 'Full Load RPM', 'Current (A)', 'Torque %', 'Start %', 'Eff %', 'Power Factor'];
    const widthsAl = [40, 35, 45, 75, 60, 60, 65, 70, 65];
    const dataAl = [
      ['0.18', '0.25', '63', '1365', '0.80', '220', '280', '55.7', '0.64'],
      ['0.37', '0.50', '71', '1400', '1.15', '210', '320', '72.7', '0.65'],
      ['0.55', '0.75', '80', '1410', '1.35', '205', '420', '77.1', '0.74'],
      ['0.75', '1.00', '80', '1415', '1.90', '210', '430', '79.6', '0.73'],
      ['1.10', '1.50', '90S', '1410', '2.50', '210', '455', '81.4', '0.81'],
      ['1.50', '2.00', '90L', '1420', '3.20', '215', '460', '82.8', '0.82'],
      ['2.20', '3.00', '100L', '1425', '4.70', '200', '490', '84.3', '0.79']
    ];

    let nextY = drawTable(page, PAGE_HEIGHT - 120, headersAl, dataAl, widthsAl);

    // Aluminium features
    nextY -= 25;
    page.drawText('KEY ENGINEERING ADVANTAGES', { x: 40, y: nextY, size: 12, font: fontBold, color: orange });
    nextY -= 18;

    const alFeats = [
      ['40% Lighter Weight:', 'Facilitates direct mounting on cantilever arms, packaging lines & portable tools.'],
      ['Superior Heat Dissipation:', 'Extruded fin design runs significantly cooler under continuous operations.'],
      ['Corrosion-Resistant Housing:', 'Smooth surface finish ideal for pharmaceutical, food packaging & chemical plants.'],
      ['Detachable Feet (Multi-Mount):', 'Permits easy re-orientation of terminal box to top, left, or right sides.'],
      ['IP55 Moisture & Dust Sealed:', 'Reinforced end-shield oil seals protect windings against airborne contaminants.']
    ];

    for (const [t, d] of alFeats) {
      page.drawText(t, { x: 40, y: nextY, size: 9, font: fontBold, color: navy });
      page.drawText(d, { x: 180, y: nextY, size: 9, font: fontRegular, color: darkGray });
      nextY -= 20;
    }

    drawFooter(page, 5);
  }

  // ==========================================
  // PAGE 7: DIAMOND SPECIAL MOTORS
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(page);

    page.drawText('DIAMOND SPECIAL MOTORS', { x: 40, y: PAGE_HEIGHT - 75, size: 18, font: fontBold, color: navy });
    page.drawText('Ultra-High Precision Speeds (2800 RPM) for Diamond Cutting, Faceting, Gemstone & Tool Polishing', {
      x: 40,
      y: PAGE_HEIGHT - 95,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
    });

    // 3-Phase Table
    page.drawText('3-Phase Ratings', { x: 40, y: PAGE_HEIGHT - 120, size: 11, font: fontBold, color: orange });
    const headersDia3 = ['Kw', 'Hp', 'Frame', 'Full Load RPM', 'Current (A)', 'Torque %', 'Efficiency %', 'Power Factor'];
    const widthsDia3 = [45, 45, 55, 90, 70, 70, 70, 70];
    const dataDia3 = [
      ['0.18', '0.25', '71', '2790', '0.79', '200', '60.4', '0.49'],
      ['0.24', '0.33', '80', '2815', '0.84', '210', '64.8', '0.54'],
      ['0.37', '0.50', '80', '2840', '0.90', '225', '73.8', '0.84']
    ];
    let nextY = drawTable(page, PAGE_HEIGHT - 135, headersDia3, dataDia3, widthsDia3);

    // 1-Phase Table
    nextY -= 20;
    page.drawText('1-Phase Ratings', { x: 40, y: nextY, size: 11, font: fontBold, color: orange });
    nextY -= 10;
    const headersDia1 = ['Kw', 'Hp', 'Frame', 'Full Load RPM', 'Current (A)', 'Torque %', 'Efficiency %', 'Power Factor', 'Cap (uF)'];
    const widthsDia1 = [40, 40, 45, 80, 65, 65, 65, 60, 55];
    const dataDia1 = [
      ['0.18', '0.25', '71', '2790', '2.10', '200', '60.4', '0.49', '10 uF'],
      ['0.24', '0.33', '80', '2815', '2.60', '210', '64.8', '0.54', '12 uF'],
      ['0.37', '0.50', '80', '2840', '3.00', '225', '73.8', '0.84', '15 uF']
    ];
    nextY = drawTable(page, nextY, headersDia1, dataDia1, widthsDia1);

    // Features
    nextY -= 25;
    page.drawText('PRECISION ROTOR BALANCING FOR ZERO FACET CHATTER', { x: 40, y: nextY, size: 11, font: fontBold, color: navy });
    nextY -= 16;
    const diaPoints = [
      '• Specially extended threaded / tapered nose shafts for gemstone scaife and diamond laps',
      '• Ultra-low axial run-out under 5 microns ensures mirror facet cutting accuracy without scoring',
      '• Custom high-speed bearings pre-loaded with synthetic grease to withstand continuous high RPM heat',
      '• Rigid vibration-damped foot brackets engineered for Surat & Rajkot diamond processing benches'
    ];
    for (const dp of diaPoints) {
      page.drawText(dp, { x: 40, y: nextY, size: 9, font: fontRegular, color: darkGray });
      nextY -= 16;
    }

    drawFooter(page, 6);
  }

  // ==========================================
  // PAGE 8: FLANGE MOTORS (B5 / B14)
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(page);

    page.drawText('FLANGE MOUNTED MOTORS (B5 / B14)', { x: 40, y: PAGE_HEIGHT - 75, size: 18, font: fontBold, color: navy });
    page.drawText('Concentric Spigot Direct Bolt-On Drive for Gearboxes, Hydraulic Packs & Inline Blowers', {
      x: 40,
      y: PAGE_HEIGHT - 95,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
    });

    // Technical Description Box
    page.drawRectangle({
      x: 40,
      y: PAGE_HEIGHT - 280,
      width: PAGE_WIDTH - 80,
      height: 170,
      color: lightGray,
      borderColor: borderGray,
      borderWidth: 1.5,
    });

    page.drawText('DIRECT GEARBOX & PUMP COUPLING WITHOUT BELTS OR PULLEYS', {
      x: 60,
      y: PAGE_HEIGHT - 130,
      size: 11,
      font: fontBold,
      color: navy,
    });

    const flangeDetails = [
      'Surge Shore Flange-Mounted (B5 / B14) Motors are engineered with a precision-machined circular front end-shield.',
      'This permits immediate direct spigot alignment to industrial worm reduction, helical, and planetary gearboxes,',
      'hydraulic powerpack pump bell-housings, and inline air blowers without flexible couplings or belt tensioners.',
      '',
      '• B5 Large Flange: Outer through-holes for clearance bolt connection to large industrial machinery.',
      '• B14 Face Flange: Compact inner bolt circle with precision-tapped holes for space-restricted gearboxes (NMRV).',
      '• Zero Runout Guarantee: Eliminates angular misalignment, bearing fatigue, and gearbox seal leakage.',
      '• Integrated Oil Seal Recess: Nitrile rubber rotary shaft oil seals prevent gear oil ingress into motor windings.'
    ];

    let fdY = PAGE_HEIGHT - 155;
    for (const f of flangeDetails) {
      if (f === '') { fdY -= 6; continue; }
      page.drawText(f, { x: 60, y: fdY, size: 8.5, font: fontRegular, color: darkGray });
      fdY -= 14;
    }

    // Mounting Dimensions Summary
    page.drawText('FLANGE PCD & SHAFT TOLERANCE (IS 2223 / IEC 60072-1)', { x: 40, y: PAGE_HEIGHT - 310, size: 11, font: fontBold, color: orange });
    
    const hFlange = ['Frame', 'HP Rating', 'B5 Flange PCD', 'B14 Face PCD', 'Shaft Dia (mm)', 'Keyway'];
    const wFlange = [60, 75, 100, 100, 100, 80];
    const dFlange = [
      ['63', '0.25 HP', '115 mm', '75 mm', '11 mm (j6)', '4 x 4 mm'],
      ['71', '0.50 HP', '130 mm', '85 mm', '14 mm (k6)', '5 x 5 mm'],
      ['80', '0.75 - 1.0 HP', '165 mm', '100 mm', '19 mm (j6)', '6 x 6 mm'],
      ['90S/L', '1.5 - 2.0 HP', '165 mm', '115 mm', '24 mm (j6)', '8 x 7 mm'],
      ['100L', '3.0 HP', '215 mm', '130 mm', '28 mm (j6)', '8 x 7 mm'],
      ['112M', '5.0 HP', '215 mm', '130 mm', '28 mm (j6)', '8 x 7 mm']
    ];

    drawTable(page, PAGE_HEIGHT - 325, hFlange, dFlange, wFlange);

    drawFooter(page, 7);
  }

  // ==========================================
  // PAGE 9: FLANGE MOTORS TECHNICAL RATINGS
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(page);

    page.drawText('Flange Motors Technical Ratings & Electrical Characteristics', { x: 40, y: PAGE_HEIGHT - 75, size: 14, font: fontBold, color: navy });

    // 3-Phase Flange Table
    page.drawText('3-Phase 415V Flange Motor Series', { x: 40, y: PAGE_HEIGHT - 100, size: 11, font: fontBold, color: orange });
    const h3F = ['Kw', 'Hp', 'Frame', 'Full Load RPM', 'Current', 'Torque %', 'Start %', 'Eff %', 'PF'];
    const w3F = [40, 35, 45, 75, 60, 60, 65, 70, 65];
    const d3F = [
      ['0.37', '0.5', '71', '1400', '1.15', '210', '320', '72.7', '0.65'],
      ['0.55', '0.75', '80', '1410', '1.35', '205', '420', '77.1', '0.74'],
      ['0.75', '1.0', '80', '1415', '1.90', '210', '430', '79.6', '0.73'],
      ['1.10', '1.5', '90S', '1410', '2.50', '210', '455', '81.4', '0.81'],
      ['1.50', '2.0', '90L', '1420', '3.20', '215', '460', '82.8', '0.82'],
      ['2.20', '3.0', '100L', '1425', '4.70', '200', '490', '84.3', '0.79'],
      ['3.70', '5.0', '112M', '1435', '7.50', '210', '540', '86.3', '0.81'],
      ['5.50', '7.5', '132S', '1450', '10.8', '160', '500', '83.9', '0.85'],
      ['7.50', '10.0', '132M', '1450', '14.3', '165', '510', '85.3', '0.86']
    ];
    let nextY = drawTable(page, PAGE_HEIGHT - 115, h3F, d3F, w3F);

    // 1-Phase Flange Table
    nextY -= 20;
    page.drawText('1-Phase 230V Flange Motor Series', { x: 40, y: nextY, size: 11, font: fontBold, color: orange });
    nextY -= 10;
    const h1F = ['Kw', 'Hp', 'Frame', 'RPM', 'Current', 'Torque %', 'Start %', 'Eff %', 'PF', 'Run Cap', 'Start Cap'];
    const w1F = [32, 32, 40, 45, 45, 50, 50, 45, 40, 55, 61];
    const d1F = [
      ['0.18', '0.25', '71', '1450', '2.0', '270', '475', '63.0', '0.80', '15 uF', '-'],
      ['0.37', '0.50', '80', '1440', '3.4', '275', '500', '65.0', '0.79', '15 uF', '80-100 uF'],
      ['0.75', '1.00', '90S', '1450', '6.7', '250', '475', '72.0', '0.75', '15 uF', '100-120 uF'],
      ['1.10', '1.50', '90L', '1455', '7.8', '240', '525', '75.0', '0.85', '25 uF', '150-200 uF'],
      ['1.50', '2.00', '100L', '1460', '9.1', '250', '500', '79.0', '0.91', '30 uF', '200-250 uF'],
      ['2.20', '3.00', '112M', '1460', '12.5', '275', '550', '81.0', '0.95', '30+30 uF', '200-250 uF']
    ];
    nextY = drawTable(page, nextY, h1F, d1F, w1F);

    drawFooter(page, 8);
  }

  // ==========================================
  // PAGE 10: COOLANT PUMPS (PCP SERIES)
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(page);

    page.drawText('COOLANT PUMPS (PCP SERIES)', { x: 40, y: PAGE_HEIGHT - 75, size: 18, font: fontBold, color: navy });
    page.drawText('High-Flow Submerged Centrifugal Pumps for Machine Tool Lubrication & Continuous Chip Flushing', {
      x: 40,
      y: PAGE_HEIGHT - 95,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
    });

    // Specifications Table
    page.drawText('3-Phase Coolant Pump Models', { x: 40, y: PAGE_HEIGHT - 120, size: 11, font: fontBold, color: orange });
    const hCool = ['Model Name', 'Power (kW)', 'Power (HP)', 'Head Range (mtr)', 'Discharge (LPM)', 'Pipe Size', 'Stem Lengths'];
    const wCool = [75, 65, 65, 80, 85, 65, 80];
    const dCool = [
      ['PCP 15', '0.10 kW', '0.15 HP', '4.0 Meters', '50 LPM', '1/2" BSP', '120, 170, 220 mm'],
      ['PCP 25', '0.18 kW', '0.25 HP', '6.0 Meters', '80 LPM', '3/4" BSP', '120, 170, 270 mm']
    ];

    let nextY = drawTable(page, PAGE_HEIGHT - 135, hCool, dCool, wCool);

    // Application & Used On Cards
    nextY -= 25;
    page.drawRectangle({
      x: 40,
      y: nextY - 140,
      width: PAGE_WIDTH - 80,
      height: 140,
      color: lightGray,
      borderColor: borderGray,
      borderWidth: 1.5,
    });

    page.drawText('FLUID COMPATIBILITY & APPLICATIONS', { x: 60, y: nextY - 25, size: 11, font: fontBold, color: navy });
    
    const coolDetails = [
      '• Fluid Types: Water-soluble coolant emulsion, synthetic grinding fluid, semi-synthetic cutting oil & light lubricants.',
      '• Impeller & Stem: Semi-open thermoplastic & cast bronze non-clogging impeller handles metallic swarf & fine chips.',
      '• Motor Drive: High insulation Class F totally enclosed air-cooled motor positioned safely above tank fluid level.',
      '• Used On: CNC Turning Centers, VMC Milling Centers, Deep Hole Drilling, Surface Grinders, Bandsaws, Lathes.',
      '• Submersion Depths: Available in standardized immersion stem lengths: 120mm, 170mm, 220mm, and 270mm.'
    ];

    let cdY = nextY - 48;
    for (const c of coolDetails) {
      page.drawText(c, { x: 60, y: cdY, size: 9, font: fontRegular, color: darkGray });
      cdY -= 18;
    }

    drawFooter(page, 9);
  }

  // ==========================================
  // PAGE 11: SELF PRIMING CENTRIFUGAL PUMPS (DELUX)
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    drawHeader(page);

    page.drawText('SELF PRIMING PUMPS (DELUX SERIES)', { x: 40, y: PAGE_HEIGHT - 75, size: 18, font: fontBold, color: navy });
    page.drawText('Heavy-Duty Monoblock Self-Priming Water Lifting Pumps with Forged Brass Impeller', {
      x: 40,
      y: PAGE_HEIGHT - 95,
      size: 9.5,
      font: fontRegular,
      color: darkGray,
    });

    // Pump Specs Table
    page.drawText('Performance Specifications (3-Phase / 1-Phase)', { x: 40, y: PAGE_HEIGHT - 120, size: 11, font: fontBold, color: orange });
    const hPump = ['Model Name', 'Power (kW)', 'Power (HP)', 'Suction x Delivery', 'Head Range (m)', 'Discharge (LPH)', 'TOP Protected'];
    const wPump = [75, 65, 65, 95, 75, 75, 65];
    const dPump = [
      ['DELUX 50', '0.37 kW', '0.50 HP', '1/2" x 1/2" (13x13 mm)', '30 Meters', '725 - 1900 LPH', 'Yes (Built-in)'],
      ['DELUX 75', '0.55 kW', '0.75 HP', '1" x 1" (25x25 mm)', '40 Meters', '700 - 2450 LPH', 'Yes (Built-in)'],
      ['DELUX 100', '0.75 kW', '1.00 HP', '1" x 1" (25x25 mm)', '50 Meters', '575 - 2625 LPH', 'Yes (Built-in)']
    ];

    let nextY = drawTable(page, PAGE_HEIGHT - 135, hPump, dPump, wPump);

    // Pump Features
    nextY -= 25;
    page.drawText('FEATURES & CONSTRUCTION DETAILS', { x: 40, y: nextY, size: 12, font: fontBold, color: orange });
    nextY -= 18;

    const pumpFeats = [
      ['High Suction Lift Capability:', 'Rapid self-priming chamber pulls water up to 7.5 meters without manual foot-valve priming.'],
      ['Forged Brass Impeller:', 'Zero cavitation erosion and corrosion resistance ensures consistent pressure year after year.'],
      ['Thermal Overload Protector (TOP):', 'Built-in auto-reset thermal protector prevents motor burnout in abnormal voltage shifts.'],
      ['Superior Carbon-Ceramic Mechanical Seal:', 'Prevents shaft scoring and guarantees zero water leakage into motor housing.'],
      ['Ultra-Wide Operating Voltage:', 'Operates smoothly under Indian rural & urban supply fluctuations from 180V to 240V AC.']
    ];

    for (const [t, d] of pumpFeats) {
      page.drawText('• ' + t, { x: 40, y: nextY, size: 9, font: fontBold, color: navy });
      page.drawText(d, { x: 210, y: nextY, size: 9, font: fontRegular, color: darkGray });
      nextY -= 20;
    }

    drawFooter(page, 10);
  }

  // ==========================================
  // PAGE 12: BACK COVER & FACTORY CONTACT
  // ==========================================
  {
    const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

    // Top Dark Blue Header
    page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 260,
      width: PAGE_WIDTH,
      height: 260,
      color: navy,
    });

    page.drawImage(logoImage, {
      x: (PAGE_WIDTH - logoDims.width * 1.6) / 2,
      y: PAGE_HEIGHT - 120,
      width: logoDims.width * 1.6,
      height: logoDims.height * 1.6,
    });

    page.drawText('DIRECT MANUFACTURER PRICING & FACTORY DISPATCH', {
      x: 50,
      y: PAGE_HEIGHT - 165,
      size: 11,
      font: fontBold,
      color: orange,
    });

    page.drawText(
      'Surge Shore Powertech LLP welcomes OEM inquiries, machinery builder contracts,\nand authorized dealership applications across all states of India.',
      { x: 50, y: PAGE_HEIGHT - 195, size: 9.5, font: fontRegular, color: white, lineHeight: 14 }
    );

    // Factory Contact Information Card
    page.drawRectangle({
      x: 40,
      y: 180,
      width: PAGE_WIDTH - 80,
      height: 340,
      color: white,
      borderColor: borderGray,
      borderWidth: 1.5,
    });

    page.drawText('FACTORY & CORPORATE OFFICE', { x: 65, y: 480, size: 14, font: fontBold, color: navy });

    const cInfos = [
      ['Company Name', 'SURGE SHORE POWERTECH LLP'],
      ['Works Address', 'Plot No. 1/7, Copper Industrial Area,'],
      ['Landmark', 'Near Korat Chowk,'],
      ['City & State', 'Rajkot, Gujarat - 360022, India'],
      ['Direct Hotline', '+91 91739 59019'],
      ['WhatsApp Orders', '+91 91739 59019'],
      ['Official Email', 'surgeshorepowertech@gmail.com'],
      ['Web Portal', 'www.surgeshorepowertech.com'],
      ['Working Hours', 'Thu - Tue: 8:30 AM - 8:00 PM (Wednesday Weekly Off)']
    ];

    let ciY = 445;
    for (const [k, v] of cInfos) {
      page.drawText(k + ':', { x: 65, y: ciY, size: 9.5, font: fontBold, color: orange });
      page.drawText(v, { x: 190, y: ciY, size: 9.5, font: fontRegular, color: navy });
      ciY -= 25;
    }

    // Bottom Orange Accent
    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: 120,
      color: navy,
    });
    page.drawRectangle({ x: 0, y: 115, width: PAGE_WIDTH, height: 5, color: orange });

    page.drawText('SURGE SHORE POWERTECH LLP — POWERING INDUSTRY, DRIVING PERFORMANCE', {
      x: (PAGE_WIDTH - 420) / 2,
      y: 65,
      size: 10,
      font: fontBold,
      color: white,
    });
    page.drawText('ISO 9001:2015  |  IS 325  |  IS 996  |  IEC 60034 Standard Certified Quality', {
      x: (PAGE_WIDTH - 340) / 2,
      y: 45,
      size: 8.5,
      font: fontRegular,
      color: rgb(0.85, 0.9, 0.95),
    });
  }

  // Save PDF with universal compatibility (standard cross-reference table, no object streams)
  const pdfBytes = await doc.save({ useObjectStreams: false });
  const outputPath = path.join(__dirname, '../public/surge-shore-product-catalog.pdf');
  const downloadsPath = path.join(__dirname, '../public/downloads/Surge-Shore-Product-Catalog.pdf');
  const pdfDirPath = path.join(__dirname, '../public/pdf/Surge-Shore-Product-Catalog.pdf');
  
  fs.mkdirSync(path.dirname(downloadsPath), { recursive: true });
  fs.mkdirSync(path.dirname(pdfDirPath), { recursive: true });
  
  fs.writeFileSync(outputPath, pdfBytes);
  fs.writeFileSync(downloadsPath, pdfBytes);
  fs.writeFileSync(pdfDirPath, pdfBytes);
  
  console.log(`Generated 12-page PDF successfully at ${outputPath}, file size: ${pdfBytes.length} bytes.`);
}

generateCatalog().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
