import { ProductItem, IndustryItem } from '../types';

export const COMPANY_INFO = {
  name: "SURGE SHORE POWERTECH LLP",
  tagline: "Powering Industry, Driving Performance",
  foundedYear: 2011,
  yearsOfExperience: "14+",
  activeYearsCatalog: "07+",
  employees: "20+",
  clients: "125+",
  phone: "+91 91739 59019",
  email: "surgeshorepowertech@gmail.com",
  address: "Plot No. 1/7, Copper Ind. Area, Nr. Korat Chowk, Rajkot, Gujarat - 360022, India",
  googleMapsUrl: "https://maps.google.com/?q=Copper+Industrial+Area+Rajkot+Gujarat+360022",
  specialization: "All Type Of Electrical Panel, Automation, Industrial Motor, Gear Motor, Stabilizer, Coolant Pumps, etc.",
  workingHours: "Thu - Tue: 8:30 AM - 8:00 PM (Wednesday Closed / Off)",
  vision: "We believe that innovation is the driving force behind progress. We are dedicated to pushing the boundaries of what's possible, continually seeking new solutions, and embracing change with open arms.",
  mission: "Our mission is to design and produce the most efficient & reliable 1-Phase & 3-Phase Induction motors in the industry. We are dedicated to driving technological advancements, promoting sustainability & serving unique needs of clients.",
  qualityCommitment: "Surge Shore is committed to delivering motors and electrical systems of the highest quality. We adhere to stringent national and international quality standards with strict IS specifications, thermal testing, dynamic balancing, and high-pot insulation breakdown tests."
};

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "ci-induction-motors",
    name: "INDUCTION MOTOR (C.I. BODY)",
    subtitle: "Heavy-Duty Cast Iron Industrial Electric Motors (1-Phase & 3-Phase)",
    category: "ci-induction-motors",
    phase: "Both",
    powerRange: "0.25 HP to 10.0 HP (0.18 kW to 7.5 kW)",
    description: "Engineered to perfection for harsh industrial environments. Surge Shore Cast Iron (C.I.) motors deliver exceptional thermal inertia, robust mechanical dampening, and rugged reliability for continuous duty S1 applications.",
    type: "motor",
    badge: "Industrial Workhorse",
    features: [
      "Heavy Duty C.I. Casting body for minimum vibration and superior mechanical rigidity",
      "High starting torque engineered for heavy load startup without stalling",
      "High permeability CRNO electrical grade silicon steel stator laminations",
      "Aluminum terminal box with high dielectric terminal block and dual earthing points",
      "High quality pre-packed shielded deep-groove ball bearings (6200/6300 series)",
      "Motor shaft precisely machined from high tensile EN8E steel",
      "High purity electrolytic 99.9% copper wire winding with Class 'F' insulation (155°C temperature rise class 'B')",
      "Totally Enclosed Fan Cooled (TEFC) with bi-directional aerodynamic cooling fan",
      "IP55 degree of ingress protection against dust and water jets"
    ],
    specs3Phase: [
      { kw: 0.37, hp: 0.5, frame: "71", rpm: 1400, current: 1.15, torquePercent: 210, startingCurrentPercent: 320, efficiencyPercent: 72.7, powerFactor: 0.65 },
      { kw: 0.55, hp: 0.75, frame: "80", rpm: 1410, current: 1.35, torquePercent: 205, startingCurrentPercent: 420, efficiencyPercent: 77.1, powerFactor: 0.74 },
      { kw: 0.75, hp: 1.0, frame: "80", rpm: 1415, current: 1.90, torquePercent: 210, startingCurrentPercent: 430, efficiencyPercent: 79.6, powerFactor: 0.73 },
      { kw: 1.10, hp: 1.5, frame: "90S", rpm: 1410, current: 2.50, torquePercent: 210, startingCurrentPercent: 455, efficiencyPercent: 81.4, powerFactor: 0.81 },
      { kw: 1.50, hp: 2.0, frame: "90L", rpm: 1420, current: 3.20, torquePercent: 215, startingCurrentPercent: 460, efficiencyPercent: 82.8, powerFactor: 0.82 },
      { kw: 2.20, hp: 3.0, frame: "100L", rpm: 1425, current: 4.70, torquePercent: 200, startingCurrentPercent: 490, efficiencyPercent: 84.3, powerFactor: 0.79 },
      { kw: 3.70, hp: 5.0, frame: "112M", rpm: 1435, current: 7.50, torquePercent: 210, startingCurrentPercent: 540, efficiencyPercent: 86.3, powerFactor: 0.81 },
      { kw: 5.50, hp: 7.5, frame: "132S", rpm: 1450, current: 10.80, torquePercent: 160, startingCurrentPercent: 500, efficiencyPercent: 83.9, powerFactor: 0.85 },
      { kw: 7.50, hp: 10.0, frame: "132M", rpm: 1450, current: 14.30, torquePercent: 165, startingCurrentPercent: 510, efficiencyPercent: 85.33, powerFactor: 0.86 },
    ],
    specs1Phase: [
      { kw: 0.18, hp: 0.25, frame: "71", rpm: 1450, current: 2.0, torquePercent: 270, startingCurrentPercent: 475, efficiencyPercent: 63.0, powerFactor: 0.80, runningCapacitor: 15, startingCapacitor: "N/A" },
      { kw: 0.37, hp: 0.5, frame: "80", rpm: 1440, current: 3.4, torquePercent: 275, startingCurrentPercent: 500, efficiencyPercent: 65.0, powerFactor: 0.79, runningCapacitor: 15, startingCapacitor: "80-100" },
      { kw: 0.37, hp: 0.5, frame: "90S", rpm: 1445, current: 5.0, torquePercent: 300, startingCurrentPercent: 500, efficiencyPercent: 65.0, powerFactor: 0.79, runningCapacitor: 15, startingCapacitor: "80-100" },
      { kw: 0.75, hp: 1.0, frame: "90S", rpm: 1450, current: 6.7, torquePercent: 250, startingCurrentPercent: 475, efficiencyPercent: 72.0, powerFactor: 0.75, runningCapacitor: 15, startingCapacitor: "100-120" },
      { kw: 0.75, hp: 1.0, frame: "100L", rpm: 1450, current: 7.0, torquePercent: 275, startingCurrentPercent: 475, efficiencyPercent: 72.0, powerFactor: 0.75, runningCapacitor: 8, startingCapacitor: "120-150" },
      { kw: 1.10, hp: 1.5, frame: "90L", rpm: 1455, current: 7.8, torquePercent: 240, startingCurrentPercent: 525, efficiencyPercent: 75.0, powerFactor: 0.85, runningCapacitor: 25, startingCapacitor: "150-200" },
      { kw: 1.10, hp: 1.5, frame: "100M", rpm: 1455, current: 8.0, torquePercent: 255, startingCurrentPercent: 530, efficiencyPercent: 75.0, powerFactor: 0.85, runningCapacitor: 25, startingCapacitor: "150-200" },
      { kw: 1.50, hp: 2.0, frame: "100L", rpm: 1460, current: 9.1, torquePercent: 250, startingCurrentPercent: 500, efficiencyPercent: 79.0, powerFactor: 0.91, runningCapacitor: 30, startingCapacitor: "200-250" },
      { kw: 1.50, hp: 2.0, frame: "112M", rpm: 1460, current: 9.1, torquePercent: 255, startingCurrentPercent: 500, efficiencyPercent: 79.0, powerFactor: 0.90, runningCapacitor: 36, startingCapacitor: "200-250" },
      { kw: 2.20, hp: 3.0, frame: "112M", rpm: 1460, current: 12.5, torquePercent: 275, startingCurrentPercent: 550, efficiencyPercent: 81.0, powerFactor: 0.95, runningCapacitor: "30+30", startingCapacitor: "200-250" }
    ],
    applications: [
      "Industrial Compressors & Blowers",
      "Pumps & Hydraulic Powerpacks",
      "Conveyor Belt Systems & Material Handling",
      "Lathe & Milling Machine Tool Drives",
      "Stone Crushers & Grain Mills",
      "Textile Machinery & Looms"
    ],
    subCategories: [
      {
        id: "foot-mounted",
        name: "Foot Mounted (B3)",
        code: "B3 Rigid Foot Mount",
        subtitle: "Rigid integral base mounting feet for base-plates, belt pulleys & machinery foundations",
        description: "Surge Shore Foot-Mounted (B3) Cast Iron Motors feature heavy-duty integral casting feet engineered for maximum mechanical rigidity, severe vibration absorption, and secure bolt-down on machine bedplates or slide rails. Standard slotted foot holes facilitate quick belt tensioning and drive alignment.",
        features: [
          "Heavy cast iron integral feet capable of enduring high radial belt pull without resonance",
          "Precision slotted mounting holes (A x B) for effortless belt alignment and tensioning",
          "Ground shaft with standard keyway for direct V-belt pulleys, sprockets, and pin-bush couplings",
          "Standard shaft centerline heights (H = 71mm to 132mm) strictly matching IS 1231 standards",
          "Universal mounting compatibility: horizontal floor, wall bracket, or ceiling mount"
        ],
        dimensions: [
          { frame: "71", hp: "0.5 HP", mountingSpec: "Foot Hole: 112 x 90 mm (A x B)", shaftDiameter: "14 mm (k6)", standard: "IS 1231 / IEC 60072-1" },
          { frame: "80", hp: "0.75 - 1.0 HP", mountingSpec: "Foot Hole: 125 x 100 mm (A x B)", shaftDiameter: "19 mm (j6)", standard: "IS 1231 / IEC 60072-1" },
          { frame: "90S / 90L", hp: "1.5 - 2.0 HP", mountingSpec: "Foot Hole: 140 x 100/125 mm (A x B)", shaftDiameter: "24 mm (j6)", standard: "IS 1231 / IEC 60072-1" },
          { frame: "100L", hp: "3.0 HP", mountingSpec: "Foot Hole: 160 x 140 mm (A x B)", shaftDiameter: "28 mm (j6)", standard: "IS 1231 / IEC 60072-1" },
          { frame: "112M", hp: "5.0 HP", mountingSpec: "Foot Hole: 190 x 140 mm (A x B)", shaftDiameter: "28 mm (j6)", standard: "IS 1231 / IEC 60072-1" },
          { frame: "132S / 132M", hp: "7.5 - 10.0 HP", mountingSpec: "Foot Hole: 216 x 140/178 mm (A x B)", shaftDiameter: "38 mm (k6)", standard: "IS 1231 / IEC 60072-1" }
        ],
        applications: [
          "Industrial Air Compressors & Blowers",
          "Belt-Driven Centrifugal Pumps",
          "Lathes, Milling & Heavy Machine Tools",
          "Conveyor Belts & Bucket Elevators",
          "Stone Crushers & Agro Flour Mills"
        ]
      },
      {
        id: "flange-mounted",
        name: "Flange Mounted (B5 / B14)",
        code: "B5 / B14 Flange Mount",
        subtitle: "Direct bolt-on concentric flange coupling for reduction gearboxes, pumps & hydraulic packs",
        description: "Surge Shore Flange-Mounted (B5 / B14) Cast Iron Motors are designed with a precision-machined round front end-shield flange. This permits direct spigot-piloted coupling to industrial worm, helical, and planetary gearboxes, hydraulic pump bell-housings, and inline blowers without belts or pulleys.",
        features: [
          "Precision concentric spigot piloting eliminates angular misalignment and bearing vibration",
          "Available in B5 (Large Outer Clearance Flange) and B14 (Compact Face Mounting with tapped holes)",
          "Direct coupling eliminates belt slippage, saves installation footprint, and zero maintenance",
          "High thermal dissipation cast iron end shield with integrated oil seal recess for gearbox wet-ends",
          "Full IEC / IS 2223 dimensional interchangeability with all standard European & Indian gearboxes"
        ],
        dimensions: [
          { frame: "71", hp: "0.5 HP", mountingSpec: "B5 Flange PCD: 130mm | B14 PCD: 85mm", shaftDiameter: "14 mm (k6)", standard: "IS 2223 / IEC 60072-1" },
          { frame: "80", hp: "0.75 - 1.0 HP", mountingSpec: "B5 Flange PCD: 165mm | B14 PCD: 100mm", shaftDiameter: "19 mm (j6)", standard: "IS 2223 / IEC 60072-1" },
          { frame: "90S / 90L", hp: "1.5 - 2.0 HP", mountingSpec: "B5 Flange PCD: 165mm | B14 PCD: 115mm", shaftDiameter: "24 mm (j6)", standard: "IS 2223 / IEC 60072-1" },
          { frame: "100L", hp: "3.0 HP", mountingSpec: "B5 Flange PCD: 215mm | B14 PCD: 130mm", shaftDiameter: "28 mm (j6)", standard: "IS 2223 / IEC 60072-1" },
          { frame: "112M", hp: "5.0 HP", mountingSpec: "B5 Flange PCD: 215mm | B14 PCD: 130mm", shaftDiameter: "28 mm (j6)", standard: "IS 2223 / IEC 60072-1" },
          { frame: "132S / 132M", hp: "7.5 - 10.0 HP", mountingSpec: "B5 Flange PCD: 265mm (Outer Dia 300mm)", shaftDiameter: "38 mm (k6)", standard: "IS 2223 / IEC 60072-1" }
        ],
        applications: [
          "Worm, Helical & Planetary Gearbox Reduction Units",
          "Hydraulic Powerpack Direct-Coupled Bell-Housings",
          "Direct-Flange Coolant & Inline Circulation Pumps",
          "Chemical Stirrers, Agitators & Mixers",
          "Packaging, Bottling & Material Handling Conveyors"
        ]
      }
    ],
    galleryFoot: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        title: "Cast Iron Foot Mounted (B3) - Studio Shot",
        angleLabel: "Main Angle (B3)",
        description: "Heavy-duty cast iron body with robust dual integral mounting feet, heavy cooling fins and top terminal box."
      },
      {
        url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
        title: "Foot Base & Shaft Alignment View",
        angleLabel: "Foot Base & Shaft",
        description: "Slotted anchor bolt holes (A × B) for precise belt tensioning with EN8E precision machined keyed shaft."
      },
      {
        url: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80",
        title: "Terminal Box & Industrial Casing Close-Up",
        angleLabel: "Terminal & Casing",
        description: "Dielectric aluminum terminal box, Class F high purity copper winding with bi-directional aerodynamic fan cowl."
      }
    ],
    galleryFlange: [
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        title: "Cast Iron Flange Mounted (B5 / B14) - Face View",
        angleLabel: "Flange Face (B5/B14)",
        description: "Machined circular mounting flange with precision concentric spigot pilot for direct coupling to industrial gearboxes."
      },
      {
        url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
        title: "Flange Concentric Pilot & Drive Shaft",
        angleLabel: "Shaft & Spigot Alignment",
        description: "Ground EN8E shaft perfectly centered to IS 2223 / IEC pitch circle diameter bolt holes."
      },
      {
        url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80",
        title: "Direct Flange Coupled Side Profile",
        angleLabel: "Flange Body Profile",
        description: "Compact totally enclosed cast iron body with integrated oil-seal recess for direct hydraulic/gearbox installation."
      }
    ]
  },
  {
    id: "aluminium-induction-motors",
    name: "INDUCTION MOTOR ( ALUMINIUM BODY)",
    subtitle: "Lightweight High Thermal-Dissipation Motors (1-Phase & 3-Phase)",
    category: "aluminium-induction-motors",
    phase: "Both",
    powerRange: "0.25 HP to 3.0 HP (0.18 kW to 2.2 kW)",
    description: "Designed for weight-sensitive machinery, food processing, portable equipment, and clean industrial environments. Aluminium housing provides superior heat dissipation rate and aesthetic corrosion resistance.",
    type: "motor",
    badge: "Lightweight & Fast Cool",
    features: [
      "High-pressure die-cast aluminum body for 40% lighter weight than cast iron",
      "Enhanced fin design offering rapid heat dissipation and cool running temperature",
      "High starting torque with CANO electrical grade magnetic steel stator",
      "Aluminum terminal box with multi-directional conduit entry points",
      "High quality pre-packed shielded bearings for whisper-quiet operation",
      "EN8E precision-ground alloy steel shaft with dynamic balance",
      "Class 'F' vacuum-impregnated copper winding with moisture-resistant varnish",
      "Smooth finish resistant to rust, oils, and chemical vapors"
    ],
    specs3Phase: [
      { kw: 0.18, hp: 0.25, frame: "63", rpm: 1365, current: 0.80, torquePercent: 220, startingCurrentPercent: 280, efficiencyPercent: 55.7, powerFactor: 0.64 },
      { kw: 0.37, hp: 0.50, frame: "71", rpm: 1400, current: 1.15, torquePercent: 210, startingCurrentPercent: 320, efficiencyPercent: 72.7, powerFactor: 0.65 },
      { kw: 0.55, hp: 0.75, frame: "80", rpm: 1410, current: 1.35, torquePercent: 205, startingCurrentPercent: 420, efficiencyPercent: 77.1, powerFactor: 0.74 },
      { kw: 0.75, hp: 1.00, frame: "80", rpm: 1415, current: 1.90, torquePercent: 210, startingCurrentPercent: 430, efficiencyPercent: 79.6, powerFactor: 0.73 },
      { kw: 1.10, hp: 1.50, frame: "90S", rpm: 1410, current: 2.50, torquePercent: 210, startingCurrentPercent: 455, efficiencyPercent: 81.4, powerFactor: 0.81 },
      { kw: 1.50, hp: 2.00, frame: "90L", rpm: 1420, current: 3.20, torquePercent: 215, startingCurrentPercent: 460, efficiencyPercent: 82.8, powerFactor: 0.82 },
      { kw: 2.20, hp: 3.00, frame: "100L", rpm: 1425, current: 4.70, torquePercent: 200, startingCurrentPercent: 490, efficiencyPercent: 84.3, powerFactor: 0.79 },
    ],
    specs1Phase: [
      { kw: 0.18, hp: 0.25, frame: "63", rpm: 1450, current: 2.0, torquePercent: 260, startingCurrentPercent: 460, efficiencyPercent: 62.0, powerFactor: 0.80, runningCapacitor: 15 },
      { kw: 0.37, hp: 0.50, frame: "71", rpm: 1440, current: 3.4, torquePercent: 270, startingCurrentPercent: 490, efficiencyPercent: 65.0, powerFactor: 0.79, runningCapacitor: 15, startingCapacitor: "80-100" },
      { kw: 0.75, hp: 1.00, frame: "80", rpm: 1450, current: 6.7, torquePercent: 250, startingCurrentPercent: 475, efficiencyPercent: 72.0, powerFactor: 0.75, runningCapacitor: 15, startingCapacitor: "100-120" },
      { kw: 1.50, hp: 2.00, frame: "90L", rpm: 1460, current: 9.1, torquePercent: 250, startingCurrentPercent: 500, efficiencyPercent: 78.0, powerFactor: 0.90, runningCapacitor: 30, startingCapacitor: "200-250" },
      { kw: 2.20, hp: 3.00, frame: "100L", rpm: 1460, current: 12.5, torquePercent: 270, startingCurrentPercent: 540, efficiencyPercent: 80.0, powerFactor: 0.94, runningCapacitor: "30+30", startingCapacitor: "200-250" }
    ],
    applications: [
      "Food Processing & Dairy Machinery",
      "Packaging & Bottling Machines",
      "HVAC Ventilation Fans & Air Handling Units",
      "Portable Power Equipment & Pressure Washers",
      "Pharmaceutical Clean Rooms & Conveyors"
    ],
    subCategories: [
      {
        id: "foot-mounted",
        name: "Foot Mounted (B3)",
        code: "B3 Aluminium Foot Mount",
        subtitle: "Multi-mount detachable aluminium feet for ultra-compact machinery frames",
        description: "Surge Shore Aluminium Foot-Mounted (B3) Motors offer 40% weight reduction compared to cast iron, high aesthetic finish, and multi-mount detachable feet that can be bolted at 0°, 90°, or 180° for terminal box repositioning on compact machine frames.",
        features: [
          "Ultra-lightweight high pressure die-cast aluminium feet with vibration dampening pads",
          "Detachable and repositionable feet design (allows top, left, or right terminal box orientation)",
          "Smooth corrosion-resistant exterior suitable for food, beverage, and pharma machinery",
          "Low inertia rotor design for fast start/stop response in automated machinery",
          "Standard IS 1231 / IEC 60072-1 mounting dimensions for drop-in interchangeability"
        ],
        dimensions: [
          { frame: "63", hp: "0.25 HP", mountingSpec: "Foot Hole: 100 x 80 mm (A x B)", shaftDiameter: "11 mm (j6)", standard: "IS 1231 / IEC 60072-1" },
          { frame: "71", hp: "0.5 HP", mountingSpec: "Foot Hole: 112 x 90 mm (A x B)", shaftDiameter: "14 mm (k6)", standard: "IS 1231 / IEC 60072-1" },
          { frame: "80", hp: "0.75 - 1.0 HP", mountingSpec: "Foot Hole: 125 x 100 mm (A x B)", shaftDiameter: "19 mm (j6)", standard: "IS 1231 / IEC 60072-1" },
          { frame: "90S / 90L", hp: "1.5 - 2.0 HP", mountingSpec: "Foot Hole: 140 x 100/125 mm (A x B)", shaftDiameter: "24 mm (j6)", standard: "IS 1231 / IEC 60072-1" },
          { frame: "100L", hp: "3.0 HP", mountingSpec: "Foot Hole: 160 x 140 mm (A x B)", shaftDiameter: "28 mm (j6)", standard: "IS 1231 / IEC 60072-1" }
        ],
        applications: [
          "Dairy & Milk Processing Equipment",
          "Commercial Bakery & Food Preparation Machinery",
          "Clean-Room Pharmaceutical Conveyors",
          "Ventilation & Dust Extraction Blowers",
          "Portable High-Pressure Washers"
        ]
      },
      {
        id: "flange-mounted",
        name: "Flange Mounted (B5 / B14)",
        code: "B5 / B14 Aluminium Flange",
        subtitle: "Precision lightweight flange mount for direct gearbox & compact pump coupling",
        description: "Surge Shore Aluminium Flange-Mounted (B5 / B14) Motors deliver optimum weight balance and thermal conductivity for direct coupling with aluminium worm and helical gearboxes (NMRV type). The precision machined front flange ensures perfect concentricity and whisper-quiet operation.",
        features: [
          "Direct mounting to NMRV and helical aluminium gearboxes with zero alignment hassle",
          "Die-cast aluminium flange with precision spigot for vibration-free shaft coupling",
          "Available in B5 (large flange) and B14 (compact face flange with M6/M8 threaded holes)",
          "Superior heat transfer rate keeps gearbox oil temperature cooler and extends lubricant life",
          "IP55 ingress sealed with oil-resistant NBR seal ring for wet environment endurance"
        ],
        dimensions: [
          { frame: "63", hp: "0.25 HP", mountingSpec: "B5 PCD: 115mm | B14 PCD: 75mm", shaftDiameter: "11 mm (j6)", standard: "IS 2223 / IEC 60072-1" },
          { frame: "71", hp: "0.5 HP", mountingSpec: "B5 PCD: 130mm | B14 PCD: 85mm", shaftDiameter: "14 mm (k6)", standard: "IS 2223 / IEC 60072-1" },
          { frame: "80", hp: "0.75 - 1.0 HP", mountingSpec: "B5 PCD: 165mm | B14 PCD: 100mm", shaftDiameter: "19 mm (j6)", standard: "IS 2223 / IEC 60072-1" },
          { frame: "90S / 90L", hp: "1.5 - 2.0 HP", mountingSpec: "B5 PCD: 165mm | B14 PCD: 115mm", shaftDiameter: "24 mm (j6)", standard: "IS 2223 / IEC 60072-1" },
          { frame: "100L", hp: "3.0 HP", mountingSpec: "B5 PCD: 215mm | B14 PCD: 130mm", shaftDiameter: "28 mm (j6)", standard: "IS 2223 / IEC 60072-1" }
        ],
        applications: [
          "NMRV Aluminium Worm Gearbox Reducers",
          "Food Packaging & Bagging Automation",
          "Bottling & Labeling Conveyor Drives",
          "Textile & Yarn Processing Machinery",
          "Dosing & Chemical Dispensing Pumps"
        ]
      }
    ],
    galleryFoot: [
      {
        url: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80",
        title: "Aluminium Body Foot Mounted (B3) - Studio Shot",
        angleLabel: "Main Angle (B3)",
        description: "Extruded lightweight aluminium casing with detachable multi-position foot brackets for compact machine frames."
      },
      {
        url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
        title: "Thermal Dissipation Extruded Cooling Fins & Foot Base",
        angleLabel: "Cooling Fins & Base",
        description: "High thermal conductivity aluminium alloy with rapid heat dissipation and anti-corrosive finish."
      },
      {
        url: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80",
        title: "Top Terminal Box & Drive Bearing Shield",
        angleLabel: "Terminal & Bearings",
        description: "IP55 sealed aluminum terminal box with multi-directional conduit entries and whisper-quiet shielded bearings."
      }
    ],
    galleryFlange: [
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        title: "Aluminium Flange Mounted (B5 / B14) - Face View",
        angleLabel: "Flange Face (B5/B14)",
        description: "Precision CNC-machined aluminium front flange engineered for direct coupling to NMRV worm gearboxes."
      },
      {
        url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
        title: "Machined Spigot Pilot Center & Balanced Shaft",
        angleLabel: "Spigot Alignment",
        description: "Zero runout precision concentric spigot with high-tensile EN8E alloy shaft for whisper-quiet direct drives."
      },
      {
        url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80",
        title: "Compact Lightweight Flange Motor Assembly",
        angleLabel: "Flange Profile",
        description: "Ultra-compact profile with 40% weight reduction compared to cast iron for weight-sensitive food and pharma automation."
      }
    ]
  },
  {
    id: "vibrator-motors",
    name: "VIBRATOR MOTOR",
    subtitle: "Heavy-Duty Adjustable Centrifugal Force Vibratory Motors",
    category: "vibrator-motors",
    phase: "Both",
    powerRange: "0.25 HP to 5.0 HP (0.18 kW to 3.7 kW)",
    description: "Surge Shore Industrial Vibrator Motors are engineered with heavy-duty ductile iron bodies and adjustable unbalance weights on both shaft ends. Built for continuous operation in vibrating screens, hoppers, feeders, and compaction tables.",
    type: "motor",
    badge: "High Centrifugal Force",
    features: [
      "Adjustable eccentric unbalance weights for 0% to 100% stepless centrifugal force tuning",
      "Reinforced heavy-duty ductile iron casting body with high mechanical shock resistance",
      "Specialized high-load spherical/cylindrical roller bearings lubricated with high-temperature grease",
      "Dual O-ring sealed end covers ensuring IP66 dust-tight and pressurized washdown protection",
      "Class 'H' copper winding with vacuum pressure impregnation for extreme mechanical vibration endurance",
      "Available in 2-Pole (2880 RPM) for high frequency and 4-Pole (1440 RPM) for heavy amplitude material transfer"
    ],
    specs3Phase: [
      { kw: 0.18, hp: 0.25, frame: "63V", rpm: 2880, current: 0.65, torquePercent: 220, startingCurrentPercent: 350, efficiencyPercent: 68.0, powerFactor: 0.72 },
      { kw: 0.37, hp: 0.50, frame: "71V", rpm: 2880, current: 1.10, torquePercent: 230, startingCurrentPercent: 400, efficiencyPercent: 73.5, powerFactor: 0.76 },
      { kw: 0.75, hp: 1.00, frame: "80V", rpm: 2880, current: 1.85, torquePercent: 240, startingCurrentPercent: 430, efficiencyPercent: 78.2, powerFactor: 0.79 },
      { kw: 1.50, hp: 2.00, frame: "90V", rpm: 2880, current: 3.30, torquePercent: 235, startingCurrentPercent: 460, efficiencyPercent: 82.0, powerFactor: 0.81 },
      { kw: 2.20, hp: 3.00, frame: "100V", rpm: 1440, current: 4.80, torquePercent: 220, startingCurrentPercent: 480, efficiencyPercent: 83.5, powerFactor: 0.82 },
      { kw: 3.70, hp: 5.00, frame: "112V", rpm: 1440, current: 7.60, torquePercent: 225, startingCurrentPercent: 510, efficiencyPercent: 85.5, powerFactor: 0.84 }
    ],
    specs1Phase: [
      { kw: 0.18, hp: 0.25, frame: "63V", rpm: 2880, current: 1.80, torquePercent: 210, startingCurrentPercent: 380, efficiencyPercent: 62.0, powerFactor: 0.75, runningCapacitor: 10 },
      { kw: 0.37, hp: 0.50, frame: "71V", rpm: 2880, current: 3.10, torquePercent: 220, startingCurrentPercent: 420, efficiencyPercent: 66.0, powerFactor: 0.78, runningCapacitor: 15 },
      { kw: 0.75, hp: 1.00, frame: "80V", rpm: 2880, current: 5.80, torquePercent: 230, startingCurrentPercent: 450, efficiencyPercent: 71.0, powerFactor: 0.80, runningCapacitor: 25 }
    ],
    applications: [
      "Vibrating Screens & Sifters (Sand, Mining, Food)",
      "Bin & Hopper Discharge Anti-Bridging Flow Aids",
      "Vibratory Feeders & Linear Conveyors",
      "Concrete Moulds & Paver Block Compaction Tables",
      "Foundry Sand Shakeout & Dewatering Screens",
      "Packaging Densification & Bag Settling Stations"
    ],
    galleryDefault: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        title: "Industrial Vibrator Motor with Twin Unbalance Covers",
        angleLabel: "Main Angle",
        description: "Heavy-duty ductile iron body with sealed end-covers for extreme G-force continuous vibration."
      },
      {
        url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
        title: "Adjustable Centrifugal Force Weight Indicator",
        angleLabel: "Weights & Shaft",
        description: "Graduated scale for stepless 0-100% vibration amplitude calibration."
      },
      {
        url: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80",
        title: "Vibration Absorbing 4-Bolt Cast Base",
        angleLabel: "Mount Base",
        description: "Heavy-gauge reinforced ductile base designed for screening plants and compaction tables."
      }
    ]
  },
  {
    id: "voltage-stabilizers",
    name: "VOLTAGE STABILIZER",
    subtitle: "Automatic Voltage Regulators (Relay Type & Servo Type | 1-Phase & 3-Phase)",
    category: "voltage-stabilizers",
    phase: "Both",
    powerRange: "0.5 kVA to 500 kVA (Air Cooled & Oil Cooled)",
    description: "Surge Shore Automatic Voltage Stabilizers protect electrical and industrial equipment from damaging voltage fluctuations, surges, and brownouts. Available in fast Relay-Based Step Regulators for commercial/residential loads and Microcontroller-Driven Servo Stabilizers with ±1% precision for heavy industrial machinery.",
    type: "stabilizer",
    badge: "Relay & Servo Models",
    features: [
      "Available in dual topologies: Fast Relay-Based Step Regulators and Ultra-Precise Servo Motor Variacs",
      "Wide input voltage correction window: 90V–290V (1-Phase) and 280V–480V (3-Phase)",
      "High efficiency toroidal & vertical autotransformers wound with 99.9% electrolytic grade copper",
      "Comprehensive digital telemetry: Multi-line digital display for Input/Output Volts, Amps, & Frequency",
      "Automatic High/Low Voltage Cutoff, Short-Circuit, Overload, and Intelligent Time-Delay restart",
      "Zero waveform distortion in Servo models with fast correction speed (<10ms response)",
      "Built with heavy-duty CRCA powder-coated industrial enclosures with IP31/IP54 ingress options"
    ],
    applications: [
      "CNC Machining Centers, VMCs, EDM & Fiber Laser Cutting Systems",
      "Plastic Injection Moulding, Extruders & Blow Moulding Plants",
      "Air Conditioners, Commercial Chillers & Refrigeration Units",
      "Medical Diagnostic Equipment, MRI, CT Scanners & Lab Analyzers",
      "Textile Spinning, Weaving, Embroidery & Packaging Machinery",
      "Complete Factory Main Incomer Central Power Conditioning"
    ],
    subCategories: [
      {
        id: "relay-type",
        name: "Relay Type Voltage Stabilizer",
        code: "Relay Type (Step AVR)",
        subtitle: "Rapid stepped automatic voltage regulator utilizing high-grade electromagnetic relays",
        description: "Surge Shore Relay-Type Automatic Voltage Stabilizers utilize ultra-fast electronic switching relays coupled to multi-tapped copper autotransformers. Engineered for rapid stepped voltage correction against sudden grid drops and spikes, ideal for commercial appliances, air conditioning, single-phase office equipment, and residential mainlines.",
        features: [
          "Ultra-fast stepped correction using sealed high-amperage electromagnetic relays (<15ms switching)",
          "Multi-tap primary transformer wound with 99.9% pure electrolytic copper for low heat loss",
          "Solid-state electronic comparator PCB with high-precision voltage sensing circuit",
          "Built-in High Voltage & Low Voltage automatic cutoff with smart time-delay restart feature",
          "Compact wall-mountable or tabletop footprint with powder-coated rustproof CRCA sheet cabinet",
          "Dual-mode Digital/Analog voltmeter indicating live input and stabilized output voltage"
        ],
        dimensions: [
          { frame: "0.5 kVA - 1.0 kVA", hp: "0.5 - 1.0 kVA (1-PH)", mountingSpec: "Input: 130V - 280V | Output: 220V ±8%", shaftDiameter: "Wall / Table Mount", standard: "IS 8448" },
          { frame: "2.0 kVA - 3.0 kVA", hp: "2.0 - 3.0 kVA (1-PH)", mountingSpec: "Input: 110V - 280V | Output: 220V ±8%", shaftDiameter: "Wall / Floor Mount", standard: "IS 8448" },
          { frame: "4.0 kVA - 5.0 kVA", hp: "4.0 - 5.0 kVA (1-PH)", mountingSpec: "Input: 90V - 290V | Output: 220V ±8%", shaftDiameter: "Floor Heavy Duty", standard: "IS 8448" },
          { frame: "7.5 kVA - 10.0 kVA", hp: "7.5 - 10.0 kVA (1-PH)", mountingSpec: "Input: 90V - 290V | Output: 220V ±8%", shaftDiameter: "Floor with Castors", standard: "IS 8448" }
        ],
        applications: [
          "Split & Window Air Conditioners (0.75 Ton to 2.5 Ton)",
          "Commercial Refrigerators, Deep Freezers & Beverage Coolers",
          "Residential Mainline Incomers & Home Electrical Networks",
          "Commercial Photocopiers, Treadmills & Lab Equipment",
          "Single-Phase Agricultural Monoblock Pump Feeders"
        ]
      },
      {
        id: "servo-type",
        name: "Servo Type Voltage Stabilizer",
        code: "Servo Type (±1% Precision)",
        subtitle: "Microcontroller-driven continuous variable autotransformer (Variac) with high-torque servo motor",
        description: "Surge Shore Industrial Servo Voltage Stabilizers deliver stepless, ultra-precise ±1% output voltage stability through a high-torque synchronous servo motor driving a copper toroidal/column variac. Designed for heavy industrial loads, CNC machinery, laser cutters, medical imaging, and whole-plant incomers with zero waveform distortion.",
        features: [
          "Microcontroller-driven continuous stepless regulation with ±1% rock-solid output voltage accuracy",
          "Zero electrical waveform distortion (THD < 1%) safe for sensitive CNCs and PLC automation",
          "High-purity 99.9% electrolytic copper toroidal & vertical column variac with carbon brush arm",
          "Ultra-wide input voltage windows (e.g., 300V - 470V to 415V ±1% 3-Phase; 140V - 280V 1-Phase)",
          "Comprehensive digital multifunction LCD display: Phase Volts, Line Currents, Frequency, Faults",
          "Complete industrial protection suite: Overload, Short-Circuit, Single Phasing & Phase Reversal",
          "Available in Natural Air Cooled (up to 50 kVA) and Heavy-Duty Oil Cooled Radiator (up to 500+ kVA)"
        ],
        dimensions: [
          { frame: "3.0 kVA - 10 kVA (1-PH/3-PH)", hp: "3 - 10 kVA", mountingSpec: "Input: 140V-280V / 300V-470V | Out: ±1%", shaftDiameter: "Air Cooled Floor Mount", standard: "IS 9815" },
          { frame: "15 kVA - 30 kVA (3-PH)", hp: "15 - 30 kVA", mountingSpec: "Input: 300V-470V | Out: 415V ±1%", shaftDiameter: "Air Cooled Floor Mount", standard: "IS 9815" },
          { frame: "50 kVA - 100 kVA (3-PH)", hp: "50 - 100 kVA", mountingSpec: "Input: 280V-480V | Out: 415V ±1%", shaftDiameter: "Air/Oil Cooled Heavy Base", standard: "IS 9815" },
          { frame: "150 kVA - 500 kVA (3-PH)", hp: "150 - 500 kVA", mountingSpec: "Input: 260V-490V | Out: 415V ±1%", shaftDiameter: "Oil Cooled with Radiator Tank", standard: "IS 9815" }
        ],
        applications: [
          "CNC Machining Centers, VMCs, EDM & Fiber Laser Cutting Machines",
          "Plastic Injection Moulding & Extruder Processing Plants",
          "Hospital MRI, CT Scan & Diagnostic Imaging Suites",
          "Textile Spinning, Weaving & Auto-Loom Complexes",
          "Printing, Packaging & Automated Food Processing Lines",
          "Total Factory & Industrial Facility Central Power Conditioning"
        ]
      }
    ],
    galleryFoot: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        title: "Relay Type Voltage Stabilizer - Compact Industrial Cabinet",
        angleLabel: "Front View (Relay Type)",
        description: "Compact wall-mount / tabletop powder-coated CRCA steel cabinet with digital output voltmeter and status LEDs."
      },
      {
        url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
        title: "Multi-Tap Copper Transformer & Sealed Relay Array",
        angleLabel: "Relay & Transformer Core",
        description: "99.9% pure copper multi-tapped autotransformer coupled to high-duty sealed electromagnetic switching relays."
      },
      {
        url: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80",
        title: "Protected Terminal Block & Time-Delay Controls",
        angleLabel: "Terminals & Controls",
        description: "Heavy-duty screw terminal block with high-voltage cutoff bypass toggle and surge protection varistors."
      }
    ],
    galleryFlange: [
      {
        url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
        title: "Industrial Servo Voltage Stabilizer - Floor Standing Enclosure",
        angleLabel: "Front Panel (Servo Type)",
        description: "Heavy-duty floor-mounted CRCA industrial cubicle with digital LCD/LED phase voltage & current telemetry."
      },
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        title: "Precision Toroidal Variac & Servo Motor Drive Assembly",
        angleLabel: "Internal Variac & Motor",
        description: "High-grade electrolytic copper toroidal variac driven by high-torque AC synchronous servo motor for ±1% continuous regulation."
      },
      {
        url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80",
        title: "Industrial Busbars, Protection Relays & Manual Bypass Switch",
        angleLabel: "Busbars & Bypass",
        description: "Solid electrolytic copper busbars, phase reversal protection, and heavy-duty automatic bypass switchgear."
      }
    ],
    galleryDefault: [
      {
        url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
        title: "Industrial Servo Voltage Stabilizer Enclosure",
        angleLabel: "Front Panel",
        description: "Heavy-duty CRCA powder-coated cabinet with digital LCD/LED voltage & current telemetry."
      },
      {
        url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
        title: "Toroidal Copper Variac & Servo Mechanism",
        angleLabel: "Internal Variac",
        description: "99.9% electrolytic copper variac driven by high-response precision servo carbon brush motor."
      },
      {
        url: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80",
        title: "Heavy-Duty Brass Terminals & Circuit Protection",
        angleLabel: "Terminals & Bypass",
        description: "Solid brass terminal lugs, automatic bypass switch, and surge protection modules."
      }
    ]
  },
  {
    id: "electrical-panels",
    name: "ELECTRICAL AUTOMATION & CONTROL PANEL",
    subtitle: "Custom Engineered APFC, MCC, PLC & VFD Automation Panels",
    category: "electrical-panels",
    phase: "3-Phase",
    powerRange: "Custom Built: 5 kVA to 500+ kVA",
    description: "Complete turnkey design, fabrication, wiring, and commissioning of industrial electrical panels. From intelligent APFC power factor correction to multi-motor control centers and PLC-automated smart panels.",
    type: "panel",
    badge: "Custom Engineering",
    features: [
      "APFC (Automatic Power Factor Correction) panels to maintain 0.99 PF and eliminate utility penalty",
      "MCC (Motor Control Center) with Star-Delta, Soft Starter, and DOL starters",
      "VFD Control Panels with Schneider/ABB/Siemens drives for precise multi-speed control",
      "PLC & HMI Automation Panels for turnkey industrial machinery processes",
      "CRCA 14/16 Gauge Sheet Steel enclosure with 7-tank powder coating process (RAL 7035 / 7032)",
      "High conductivity electrolytic grade copper / aluminum busbars with heat shrink sleeves",
      "Complete short circuit withstand test rating & comprehensive digital energy metering",
      "Smart IoT telemetry enabled with RS-485 Modbus / Ethernet connectivity"
    ],
    applications: [
      "Factory Main Power Distribution & Substation Panels",
      "Water Treatment & Sewage Plant Automation",
      "Textile Processing & Spinning Mills",
      "Plastic Injection & Extrusion Plants",
      "Cold Storage & Industrial HVAC Plants",
      "Pharma & Chemical Processing Lines"
    ],
    galleryDefault: [
      {
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        title: "Floor-Standing Industrial Control Panel Enclosure",
        angleLabel: "Enclosure",
        description: "IP55 CRCA sheet steel enclosure with 7-tank powder coating, safety interlocks and pilot lamps."
      },
      {
        url: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
        title: "Internal Busbar System & Switchgear Wiring",
        angleLabel: "Internal Wiring",
        description: "Electrolytic grade copper busbars, Schneider/Siemens contactors, and neat wiring ducting."
      },
      {
        url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        title: "HMI Touchscreen & Front Door Metering",
        angleLabel: "HMI & Controls",
        description: "Intuitive touch interface, digital power analyzers, illuminated pushbuttons and safety emergency stops."
      }
    ]
  }
];

export const INDUSTRIES_SERVED: IndustryItem[] = [
  {
    id: "manufacturing",
    title: "Manufacturing & Heavy Engineering",
    iconName: "Factory",
    description: "Reliable motive power for continuous production lines, machining plants, sheet metal presses, and automated assembly fixtures.",
    typicalEquipment: ["Induction Motors C.I.", "VFD Control Panels", "Gear Motors", "Main Distribution Boards"],
    applications: ["CNC Machine Drives", "Conveyor Belts", "Hydraulic Presses", "Overhead Cranes"]
  },
  {
    id: "agriculture",
    title: "Agriculture & Irrigation",
    iconName: "Wheat",
    description: "High suction capacity self-priming pumps and wide-voltage-tolerant motors designed to withstand rural electrical variations.",
    typicalEquipment: ["DELUX Self Priming Pumps", "1-Phase & 3-Phase Motors", "Motor Starter Panels", "Voltage Stabilizers"],
    applications: ["Borewell Water Lifting", "Drip Irrigation", "Agricultural Shredders", "Flour & Grain Mills"]
  },
  {
    id: "hvac",
    title: "HVAC & Air Handling",
    iconName: "Fan",
    description: "Smooth-running low-vibration motors for air conditioning chillers, centrifugal blowers, ventilation exhaust, and cooling towers.",
    typicalEquipment: ["Aluminium Induction Motors", "Flange Motors", "Cooling Tower Pumps", "VFD Panels"],
    applications: ["Exhaust Blowers", "Chiller Compressors", "Air Handling Units (AHU)", "Cooling Tower Fans"]
  },
  {
    id: "water-treatment",
    title: "Water & Wastewater Treatment",
    iconName: "Droplets",
    description: "Corrosion-resistant TEFC motors and automatic pump control panels for municipal RO plants, effluent treatment, and sewage management.",
    typicalEquipment: ["Self Priming Pumps", "APFC Panels", "PLC Automation Panels", "Flange Motors"],
    applications: ["RO High Pressure Pumps", "Sludge Agitators", "Effluent Aerators", "Chemical Dosing Pumps"]
  },
  {
    id: "oil-gas",
    title: "Oil & Gas Refineries",
    iconName: "Fuel",
    description: "Rugged cast iron explosion-resistant frame designs with Class F insulation for fuel transfer pumps and refinery process skids.",
    typicalEquipment: ["C.I. Induction Motors", "Flameproof Panels", "Special Servo Stabilizers", "High-head Pumps"],
    applications: ["Petroleum Fluid Transfer", "Pipeline Boosting", "Gas Compressors", "Refinery Process Mixers"]
  },
  {
    id: "food-processing",
    title: "Food Processing & Dairy",
    iconName: "Utensils",
    description: "Clean aluminum body motors with smooth exterior coatings and sanitary coolant pumps for dairy homogenizers, bottling lines, and bakeries.",
    typicalEquipment: ["Aluminium Motors", "Stainless Shaft Motors", "Washdown Ingress Panels", "Gear Motors"],
    applications: ["Milk Homogenizers", "Bottling Conveyors", "Grain Sifters", "Commercial Dough Mixers"]
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy & Solar",
    iconName: "SunMedium",
    description: "High-efficiency motor drives, solar pump inverters, and automatic grid-tie synchronizing panels for solar farms and green energy setups.",
    typicalEquipment: ["Solar VFD Panels", "High Efficiency Motors", "APFC Power Factor Panels", "DC-AC Inverters"],
    applications: ["Solar Water Pumping", "Solar Tracker Actuators", "Biomass Feeders", "Grid Substation Systems"]
  },
  {
    id: "heat-treatment",
    title: "Heat Treatment & Furnaces",
    iconName: "Flame",
    description: "High-temperature rated motors and heavy duty coolant circulation pumps for metallurgical furnaces, quenching tanks, and hardening baths.",
    typicalEquipment: ["Coolant Pumps (PCP25)", "High Temperature Motors", "MCC Control Panels", "Furnace Blowers"],
    applications: ["Furnace Air Circulation", "Quenching Oil Agitation", "Continuous Heat Treat Conveyors", "Cooling Loop Recirculation"]
  },
  {
    id: "cnc-automation",
    title: "CNC Tooling & Precision Machining",
    iconName: "Cpu",
    description: "Submersible coolant pumps and high-speed diamond motors for CNC lathes, vertical machining centers, EDM machines, and surface grinders.",
    typicalEquipment: ["Coolant Pumps PCP15/PCP25", "Diamond Special Motors", "Servo Stabilizers", "Spindle Drives"],
    applications: ["Through-tool Coolant Delivery", "Lathe Coolant Delivery", "Spindle Diamond Grinding", "Deep Hole Boring"]
  }
];

export const MOTOR_APPLICATIONS_LIST = [
  { label: "Centrifugal Pump / Water Supply", startingLoad: "Light", factor: 1.15, typicalType: "ci-induction-motors", suggestedRPM: 1440 },
  { label: "Air Compressor / High Pressure Blower", startingLoad: "Heavy", factor: 1.35, typicalType: "ci-induction-motors", suggestedRPM: 1440 },
  { label: "CNC Lathe / Machining Center Coolant", startingLoad: "Moderate", factor: 1.10, typicalType: "coolant-pumps", suggestedRPM: 1400 },
  { label: "Conveyor Belt / Material Handling", startingLoad: "Heavy", factor: 1.25, typicalType: "gear-motors-stabilizers", suggestedRPM: 1420 },
  { label: "Diamond Polishing / High Speed Grinder", startingLoad: "Moderate", factor: 1.20, typicalType: "diamond-special-motors", suggestedRPM: 2840 },
  { label: "Food Processing / Clean Room Agitator", startingLoad: "Light", factor: 1.15, typicalType: "aluminium-induction-motors", suggestedRPM: 1400 },
  { label: "Self Priming Overhead Tank Lifting", startingLoad: "Moderate", factor: 1.20, typicalType: "self-priming-pumps", suggestedRPM: 1440 },
  { label: "Direct Gearbox Driven Mixer / Extruder", startingLoad: "Heavy", factor: 1.30, typicalType: "flange-motors", suggestedRPM: 1420 },
  { label: "Turnkey Plant Power Distribution / MCC", startingLoad: "Varies", factor: 1.20, typicalType: "electrical-panels", suggestedRPM: 0 }
];
