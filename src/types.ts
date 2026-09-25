export type MotorPhase = '1-Phase' | '3-Phase' | 'Both';

export type MountingType = 'foot-mounted' | 'flange-mounted' | 'relay-type' | 'servo-type' | string;

export interface MountingSubCategory {
  id: 'foot-mounted' | 'flange-mounted' | 'relay-type' | 'servo-type' | string;
  name: string;
  code: string; // e.g. "B3 (Foot Mounted)" or "Relay-Based AVR"
  subtitle: string;
  description: string;
  features: string[];
  dimensions: {
    frame: string;
    hp: string;
    mountingSpec: string; // Foot hole spacing (A x B) or Flange PCD or Input/Output spec
    shaftDiameter: string;
    standard: string;
  }[];
  applications: string[];
}

export type ProductCategory = 
  | 'all'
  | 'ci-induction-motors'
  | 'aluminium-induction-motors'
  | 'vibrator-motors'
  | 'voltage-stabilizers'
  | 'electrical-panels';

export interface MotorSpec {
  kw: number;
  hp: number;
  frame: string;
  rpm: number;
  current: number; // in Amps
  torquePercent: number;
  startingCurrentPercent?: number;
  efficiencyPercent: number;
  powerFactor: number;
  runningCapacitor?: string | number;
  startingCapacitor?: string;
}

export interface PumpSpec {
  modelName: string;
  kw: number;
  hp: number;
  pipeSize: string;
  headRangeMtr: string;
  dischargeRangeLphOrLpm: string;
  phase: '3-Phase' | '1-Phase';
  fluidType?: string;
  applications?: string[];
}

export interface ProductPhoto {
  url: string;
  title: string;
  angleLabel: string;
  description?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  phase: MotorPhase;
  powerRange: string;
  description: string;
  features: string[];
  specs3Phase?: MotorSpec[];
  specs1Phase?: MotorSpec[];
  pumpSpecs?: PumpSpec[];
  subCategories?: MountingSubCategory[];
  badge?: string;
  applications: string[];
  imageUrl?: string;
  galleryFoot?: ProductPhoto[];
  galleryFlange?: ProductPhoto[];
  galleryDefault?: ProductPhoto[];
  type: 'motor' | 'pump' | 'panel' | 'stabilizer';
}

export interface RfqItem {
  product: ProductItem;
  quantity: number;
  selectedSpec?: string;
  customNotes?: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  iconName: string;
  description: string;
  typicalEquipment: string[];
  applications: string[];
}
