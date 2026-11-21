import { BugoHazardZone, HazardCategory, HazardRiskLevel } from '../types';

export const BUGO_MAP_CENTER = { lat: 8.5089, lng: 124.7568 };

export const BUGO_MAP_BOUNDS = {
  north: 8.538,
  south: 8.478,
  west: 124.728,
  east: 124.792
};

export interface HazardCategoryStyle {
  label: string;
  shortDesc: string;
  pinBg: string;
  pinBorder: string;
  pinGlyph: string;
  circleFill: string;
  circleStroke: string;
  badgeClass: string;
  dotClass: string;
}

export const HAZARD_CATEGORY_META: Record<HazardCategory, HazardCategoryStyle> = {
  Flood: {
    label: 'Flood',
    shortDesc: 'Low-lying river & coastal overflow',
    pinBg: '#2563eb',
    pinBorder: '#1d4ed8',
    pinGlyph: 'F',
    circleFill: '#3b82f6',
    circleStroke: '#1d4ed8',
    badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
    dotClass: 'bg-blue-600'
  },
  Landslide: {
    label: 'Landslide',
    shortDesc: 'Steep slopes & soil erosion risk',
    pinBg: '#d97706',
    pinBorder: '#b45309',
    pinGlyph: 'L',
    circleFill: '#f59e0b',
    circleStroke: '#b45309',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    dotClass: 'bg-amber-600'
  },
  Earthquake: {
    label: 'Earthquake',
    shortDesc: 'Fault line & ground shaking zone',
    pinBg: '#7c3aed',
    pinBorder: '#6d28d9',
    pinGlyph: 'E',
    circleFill: '#8b5cf6',
    circleStroke: '#6d28d9',
    badgeClass: 'bg-purple-50 text-purple-800 border-purple-200',
    dotClass: 'bg-purple-600'
  },
  Fire: {
    label: 'Fire',
    shortDesc: 'Dense housing & industrial fire risk',
    pinBg: '#dc2626',
    pinBorder: '#b91c1c',
    pinGlyph: 'R',
    circleFill: '#ef4444',
    circleStroke: '#b91c1c',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
    dotClass: 'bg-red-600'
  },
  Other: {
    label: 'Other Hazard',
    shortDesc: 'Storm surge, drainage, or local hazard',
    pinBg: '#0d9488',
    pinBorder: '#0f766e',
    pinGlyph: 'H',
    circleFill: '#14b8a6',
    circleStroke: '#0f766e',
    badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
    dotClass: 'bg-teal-600'
  }
};

export const RISK_LEVEL_BADGES: Record<HazardRiskLevel, string> = {
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
  High: 'bg-rose-50 text-rose-700 border-rose-200'
};

export const DEFAULT_BUGO_HAZARD_ZONES: BugoHazardZone[] = [
  {
    id: 'hz-bugo-flood-1',
    name: 'Zone 1 Flood Basin',
    disasterType: 'Flood',
    riskLevel: 'High',
    purok: 'Zone 1',
    lat: 8.5112,
    lng: 124.7535,
    radiusMeters: 220,
    description: 'Riverbank overflow area during heavy monsoon rain.',
    affectedHouseholdsEst: 140,
    updatedAt: '2026-11-01'
  },
  {
    id: 'hz-bugo-coastal-2',
    name: 'Zone 9 Coastal Surge Belt',
    disasterType: 'Flood',
    riskLevel: 'Moderate',
    purok: 'Zone 9',
    lat: 8.5162,
    lng: 124.7524,
    radiusMeters: 200,
    description: 'High-tide and storm-drainage backflow area near Macajalar Bay.',
    affectedHouseholdsEst: 95,
    updatedAt: '2026-11-01'
  },
  {
    id: 'hz-bugo-landslide-3',
    name: 'Zone 6 Slope Hazard Sector',
    disasterType: 'Landslide',
    riskLevel: 'High',
    purok: 'Zone 6',
    lat: 8.4978,
    lng: 124.7642,
    radiusMeters: 260,
    description: 'Steep hillside terrain prone to soil saturation and mudslides.',
    affectedHouseholdsEst: 80,
    updatedAt: '2026-11-01'
  },
  {
    id: 'hz-bugo-quake-4',
    name: 'Zone 3 Seismic Fault Sector',
    disasterType: 'Earthquake',
    riskLevel: 'Moderate',
    purok: 'Zone 3',
    lat: 8.5045,
    lng: 124.7601,
    radiusMeters: 240,
    description: 'Soft alluvial ground with heightened shaking sensitivity.',
    affectedHouseholdsEst: 110,
    updatedAt: '2026-11-01'
  },
  {
    id: 'hz-bugo-fire-5',
    name: 'Zone 5 Market Fire Zone',
    disasterType: 'Fire',
    riskLevel: 'High',
    purok: 'Zone 5',
    lat: 8.5094,
    lng: 124.7575,
    radiusMeters: 160,
    description: 'High-density market stalls and narrow residential alleys.',
    affectedHouseholdsEst: 125,
    updatedAt: '2026-11-01'
  }
];

export interface BugoMonthlyDisasterStat {
  month: string;
  monthIndex: number;
  flood: number;
  fire: number;
  landslide: number;
  earthquake: number;
  typhoon: number;
  affectedHouseholds: number;
  evacuatedIndividuals: number;
  remarks: string;
}

export const BUGO_MONTHLY_DISASTER_STATS: BugoMonthlyDisasterStat[] = [
  { month: 'January', monthIndex: 1, flood: 3, fire: 1, landslide: 1, earthquake: 1, typhoon: 1, affectedHouseholds: 68, evacuatedIndividuals: 245, remarks: 'Shear-line rains (Bugo River, Zone 1)' },
  { month: 'February', monthIndex: 2, flood: 2, fire: 2, landslide: 0, earthquake: 0, typhoon: 0, affectedHouseholds: 34, evacuatedIndividuals: 112, remarks: 'Market electrical fires (Zone 5)' },
  { month: 'March', monthIndex: 3, flood: 0, fire: 3, landslide: 0, earthquake: 1, typhoon: 0, affectedHouseholds: 42, evacuatedIndividuals: 158, remarks: 'Summer heat fires (Zones 4 & 5)' },
  { month: 'April', monthIndex: 4, flood: 0, fire: 4, landslide: 0, earthquake: 1, typhoon: 0, affectedHouseholds: 59, evacuatedIndividuals: 218, remarks: 'Peak fire season & M4.2 tremor' },
  { month: 'May', monthIndex: 5, flood: 1, fire: 2, landslide: 0, earthquake: 0, typhoon: 0, affectedHouseholds: 29, evacuatedIndividuals: 96, remarks: 'Thunderstorms & cooking fire' },
  { month: 'June', monthIndex: 6, flood: 3, fire: 1, landslide: 1, earthquake: 1, typhoon: 1, affectedHouseholds: 61, evacuatedIndividuals: 224, remarks: 'Habagat floods (Zones 1 & 9)' },
  { month: 'July', monthIndex: 7, flood: 4, fire: 1, landslide: 2, earthquake: 0, typhoon: 1, affectedHouseholds: 88, evacuatedIndividuals: 340, remarks: 'Monsoon rain & Upper Bugo runoff' },
  { month: 'August', monthIndex: 8, flood: 3, fire: 1, landslide: 2, earthquake: 1, typhoon: 1, affectedHouseholds: 74, evacuatedIndividuals: 279, remarks: 'Suntingcahon creek rise & tremor' },
  { month: 'September', monthIndex: 9, flood: 3, fire: 1, landslide: 1, earthquake: 0, typhoon: 1, affectedHouseholds: 64, evacuatedIndividuals: 230, remarks: 'Coastal surge (Macajalar Bay)' },
  { month: 'October', monthIndex: 10, flood: 4, fire: 2, landslide: 2, earthquake: 1, typhoon: 2, affectedHouseholds: 97, evacuatedIndividuals: 382, remarks: 'Storm troughs & minor slope slips' },
  { month: 'November', monthIndex: 11, flood: 5, fire: 1, landslide: 2, earthquake: 1, typhoon: 2, affectedHouseholds: 118, evacuatedIndividuals: 446, remarks: 'Peak monsoon & Bugo River overflow' },
  { month: 'December', monthIndex: 12, flood: 3, fire: 2, landslide: 1, earthquake: 0, typhoon: 1, affectedHouseholds: 71, evacuatedIndividuals: 265, remarks: 'Holiday fires & year-end rains' }
];

export interface BugoEarthquakeZoneInfo {
  id: string;
  sectorName: string;
  purok: string;
  riskLevel: HazardRiskLevel;
  soilProfile: string;
  peisIntensityEstimate: string;
  faultProximityKm: number;
  exposedHouseholds: number;
  safeAssemblySite: string;
  lat: number;
  lng: number;
  notes: string;
}

export const BUGO_EARTHQUAKE_DATA: BugoEarthquakeZoneInfo[] = [
  {
    id: 'eq-zone-3',
    sectorName: 'Suntingcahon Valley Pocket',
    purok: 'Zone 3',
    riskLevel: 'High',
    soilProfile: 'Soft alluvial sediment (higher shaking)',
    peisIntensityEstimate: 'PEIS VII',
    faultProximityKm: 4.8,
    exposedHouseholds: 165,
    safeAssemblySite: 'Bugo NHS Open Oval',
    lat: 8.5045,
    lng: 124.7601,
    notes: 'Priority monitoring near eastern fault splay.'
  },
  {
    id: 'eq-zone-9',
    sectorName: 'Bayside Coastal Strip',
    purok: 'Zone 9',
    riskLevel: 'Moderate',
    soilProfile: 'Sandy coastal fill (mild liquefaction)',
    peisIntensityEstimate: 'PEIS VI–VII',
    faultProximityKm: 5.6,
    exposedHouseholds: 130,
    safeAssemblySite: 'Bugo Central Elem. Grounds',
    lat: 8.5162,
    lng: 124.7524,
    notes: 'Coastal evacuation & tsunami readiness zone.'
  },
  {
    id: 'eq-zone-6',
    sectorName: 'Upper Bugo Hills Ridge',
    purok: 'Zone 6',
    riskLevel: 'High',
    soilProfile: 'Fractured slope (quake-induced slide risk)',
    peisIntensityEstimate: 'PEIS VI–VII',
    faultProximityKm: 4.2,
    exposedHouseholds: 92,
    safeAssemblySite: 'Upper Bugo Covered Court',
    lat: 8.4978,
    lng: 124.7642,
    notes: 'High slide risk during wet-season tremors.'
  },
  {
    id: 'eq-zone-10',
    sectorName: 'San Miguel Industrial Belt',
    purok: 'Zone 10',
    riskLevel: 'Moderate',
    soilProfile: 'Compacted coastal terrace',
    peisIntensityEstimate: 'PEIS VI',
    faultProximityKm: 5.9,
    exposedHouseholds: 118,
    safeAssemblySite: 'Bugo Plaza & Barangay Hall',
    lat: 8.5138,
    lng: 124.7492,
    notes: 'Routine structural checks for facilities.'
  }
];

export interface BugoFireProneArea {
  id: string;
  areaName: string;
  purok: string;
  frequencyLabel: string;
  incidentsLast3Years: number;
  affectedStructuresEst: number;
  riskLevel: HazardRiskLevel;
  primaryCauses: string;
  accessConstraint: string;
  hydrantStatus: string;
  lat: number;
  lng: number;
}

export const BUGO_FIRE_PRONE_AREAS: BugoFireProneArea[] = [
  {
    id: 'fire-zone-5',
    areaName: 'Lower Bugo Market & Alleys',
    purok: 'Zone 5',
    frequencyLabel: 'Top Hotspot',
    incidentsLast3Years: 11,
    affectedStructuresEst: 145,
    riskLevel: 'High',
    primaryCauses: 'Overloaded stalls, jumper wires, LPG',
    accessConstraint: 'Narrow 1.5m–2m pedestrian alleys',
    hydrantStatus: '2 perimeter hydrants (BFP 350m away)',
    lat: 8.5094,
    lng: 124.7575
  },
  {
    id: 'fire-zone-4',
    areaName: 'Highway View Wooden Compounds',
    purok: 'Zone 4',
    frequencyLabel: 'Frequent',
    incidentsLast3Years: 7,
    affectedStructuresEst: 98,
    riskLevel: 'High',
    primaryCauses: 'Overloaded outlets & kitchen stoves',
    accessConstraint: 'Peak-hour highway congestion',
    hydrantStatus: '1 roadside hydrant at crossing',
    lat: 8.5082,
    lng: 124.7586
  },
  {
    id: 'fire-zone-1',
    areaName: 'Centro Riverside Housing',
    purok: 'Zone 1',
    frequencyLabel: 'Frequent',
    incidentsLast3Years: 6,
    affectedStructuresEst: 112,
    riskLevel: 'High',
    primaryCauses: 'Light-material houses & faulty wiring',
    accessConstraint: 'Single-lane riverbank road',
    hydrantStatus: 'BDRRMC water pump & tanker staging',
    lat: 8.5112,
    lng: 124.7535
  },
  {
    id: 'fire-zone-10',
    areaName: 'San Miguel Industrial Perimeter',
    purok: 'Zone 10',
    frequencyLabel: 'Moderate',
    incidentsLast3Years: 4,
    affectedStructuresEst: 64,
    riskLevel: 'Moderate',
    primaryCauses: 'Transformer sparks & grass fires',
    accessConstraint: 'Night gate coordination required',
    hydrantStatus: 'Plant brigade & industrial hydrants',
    lat: 8.5138,
    lng: 124.7492
  }
];

