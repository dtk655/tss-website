// Display names for equipment and fleet on the website only (Shopify and NetSuite titles stay as they are).
// name: the page headline; short: cards, breadcrumbs and lists.
export const UNIT_NAMES = {
  'arrow-board': { name: 'Trailer-Mounted Arrow Board', short: 'Arrow Board Trailer' },
  'variable-message-sign-vms-board': { name: 'Variable Message Signs', short: 'Variable Message Signs' },
  'light-tower': { name: 'Mobile Light Tower', short: 'Mobile Light Tower' },
  'portable-traffic-light': { name: 'Portable Traffic Signal System', short: 'Portable Traffic Signal' },
  'speed-limit-trailer': { name: 'Radar Speed Display Trailer', short: 'Speed Display Trailer' },
  'scorpion-trailer-with-arrow-board': { name: 'Trailer-Mounted Attenuator with Arrow Board', short: 'Trailer Attenuator (TTMA)' },
  'ground-mount-attenuator-gma': { name: 'Ground-Mounted Crash Attenuator', short: 'Ground Crash Attenuator' },
  'concrete-barrier': { name: 'Precast Concrete Barrier', short: 'Concrete Barrier' },
  'truck-mounted-attenuator-tma': { name: 'Truck-Mounted Attenuator (TMA)', short: 'Truck-Mounted Attenuator' },
  'bucket-truck': { name: 'Aerial Bucket Truck, 45 to 85 ft', short: 'Aerial Bucket Truck' },
  'bucket-van': { name: 'Aerial Bucket Van, 30 ft', short: 'Aerial Bucket Van' },
  'basket-truck': { name: 'Aerial Basket Truck', short: 'Aerial Basket Truck' },
  'flatbed-truck': { name: 'Flatbed Work Truck', short: 'Flatbed Work Truck' }
};
const clean = (t = '') => t.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+-\s+.*$/, '').trim();
export const unitName = (p) => UNIT_NAMES[p.handle]?.name || p.title;
export const unitShort = (p) => UNIT_NAMES[p.handle]?.short || clean(p.title);
