// Photos and videos for the full equipment and fleet pages, keyed by Shopify handle.
// hero: what fills the top of the page (a looping video, or a real photo). Without one, the product cut-out is shown on a stage.
// gallery: extra real photos and videos shown in the Gallery section, after the hero.
// To add new media: drop the file in /public/photos or /public/video and list it here.
const P = (src, alt) => ({ src, alt });
const V = (src, poster, alt, pos, ar) => ({ src: poster, video: src, alt, pos, ar });

export const UNIT_MEDIA = {
  'speed-limit-trailer': {
    hero: V('/video/speed-limit-trailer-hero.mp4', '/video/speed-limit-trailer-hero.webp', 'Speed limit trailer showing passing drivers their speed under a 25 mph limit sign', '62% 50%', '1280 / 960'),
    heroSm: '/video/speed-limit-trailer-hero-sm.mp4'
  },
  'ground-mount-attenuator-gma': {
    hero: V('/video/gma-hero.mp4', '/video/gma-hero.webp', 'Ground mount attenuator protecting the end of a barrier run as highway traffic passes', '0% 50%', '1280 / 928'),
    heroSm: '/video/gma-hero-sm.mp4'
  },
  'arrow-board': {
    hero: V('/video/arrow-board-hero.mp4', '/video/arrow-board-hero.webp', 'Arrow board flashing a left arrow beside a lane closure at dusk as traffic passes', '76% 50%', '1920 / 1072'),
    heroSm: '/video/arrow-board-hero-sm.mp4'
  },
  'truck-mounted-attenuator-tma': {
    hero: V('/video/tma-hero.mp4', '/video/tma-hero.webp', 'TSS crash truck unfolding its scorpion attenuator'),
    heroSm: '/video/tma-hero-sm.mp4',
    gallery: [
      V('/video/tma-unfold.mp4', '/video/tma-unfold.webp', 'Scorpion attenuator unfolding'),
      P('/photos/tma-917-side.webp', 'TSS crash truck 917 with its attenuator folded up'),
      P('/photos/tma-917-front.webp', 'TSS crash truck 917 parked in the yard'),
      P('/photos/tma-crash-row.webp', 'A row of TSS crash trucks with arrow boards'),
      P('/fleet/tma-191-rear.webp', 'Rear of TMA truck 191 with the chevron attenuator'),
      P('/photos/tma-fleet-lineup.webp', 'Line of TSS crash trucks in the yard'),
      P('/fleet/sv-tma.webp', 'TSS crash truck with arrow board'),
      P('/fleet/tma-dusk.jpg', 'TMA on a job at dusk'),
      P('/fleet/fleet-sunset.webp', 'TSS crash trucks lined up at sunset')
    ]
  },
  'bucket-van': {
    hero: P('/photos/bucket-van-side.webp', 'TSS bucket van 334 in the yard'),
    gallery: [
      P('/photos/bucket-van-row.webp', 'A row of TSS bucket vans'),
      P('/photos/bucket-van-rear.webp', 'Rear of a TSS bucket van with the bucket'),
      P('/photos/bucket-van-row2.webp', 'TSS bucket vans lined up'),
      P('/photos/bucket-van-yard.webp', 'TSS bucket van in the yard'),
      P('/fleet/lineup-trucks.webp', 'TSS bucket truck, crash truck and bucket van')
    ]
  },
  'bucket-truck': {
    hero: P('/fleet/fleet-buckets.webp', 'TSS bucket trucks lined up in the yard'),
    gallery: [
      P('/photos/bucket-truck-row.webp', 'A row of TSS bucket trucks'),
      P('/photos/bucket-truck-close.webp', 'TSS bucket trucks 618 and 619'),
      P('/photos/bucket-truck-pair.webp', 'TSS bucket trucks with the baskets up front'),
      P('/fleet/fleet-hero.webp', 'The TSS yard with bucket trucks and crash trucks'),
      P('/fleet/lineup-trucks.webp', 'TSS bucket truck, crash truck and bucket van')
    ]
  },
  'variable-message-sign-vms-board': {
    hero: P('/photos/vms-new.webp', 'Full-matrix message board on a trailer'),
    gallery: [
      P('/photos/vms-396.webp', 'TSS message board 396'),
      P('/photos/vms-side.webp', 'Message board trailer in the yard'),
      P('/fleet/vms-yard.webp', 'Message boards ready in the TSS yard')
    ]
  },
  'light-tower': {
    hero: P('/photos/light-towers-row.webp', 'A row of light towers in the TSS yard'),
    gallery: [
      P('/photos/light-tower-319.webp', 'Light tower 319 with four LED heads'),
      P('/photos/light-towers-wanco.webp', 'Light towers lined up'),
      P('/photos/light-tower-319-rear.webp', 'Rear of light tower 319'),
      P('/fleet/sv-night.webp', 'A night lane closure lit by light towers')
    ]
  }
};

export const mediaFor = (handle) => UNIT_MEDIA[handle] || {};
