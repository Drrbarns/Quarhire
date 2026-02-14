/**
 * Single source of truth for vehicle pricing (GHS).
 * Used by booking page and admin vehicles/dashboard.
 */
export const VEHICLE_PRICES: Record<string, number> = {
  economy: 800,   // Sedan
  executive: 1100, // Mini SUV
  suv: 2000,      // Premium SUV
  van: 2500,      // Executive Mini Van
};

export const VEHICLE_LABELS: Record<string, string> = {
  economy: 'Sedan',
  executive: 'Mini SUV',
  suv: 'Premium SUV',
  van: 'Executive Mini Van',
};
