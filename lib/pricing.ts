/**
 * Single source of truth for vehicle pricing (GHS).
 * Used by booking page and admin vehicles/dashboard.
 */
export const VEHICLE_PRICES: Record<string, number> = {
  economy: 500,    // Sedan
  executive: 800,  // Mini SUV
  suv: 1600,       // Premium SUV
  van: 2300,       // Executive Mini Van
};

export const VEHICLE_LABELS: Record<string, string> = {
  economy: 'Sedan',
  executive: 'Mini SUV',
  suv: 'Premium SUV',
  van: 'Executive Mini Van',
};
