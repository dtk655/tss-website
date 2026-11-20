// Lane closure division: one page per service. Content only; layout lives in src/pages/services/[slug].astro.
const Q = '/pages/request-a-quote?type=lane-closure';
export const SERVICE_QUOTE = Q;
export const SERVICES = [
  {
    slug: 'lane-and-road-closures', title: 'Lane And Road Closures', short: 'Single lane to full detours.',
    img: '/fleet/lc-scene.webp', pos: '50% 50%',
    h1: ['Every Closure, Set Right.', 'From One Lane To Full Detours.'],
    lede: 'Certified, experienced crews set up, maintain and remove MUTCD-compliant closures on local streets, county roads and the region’s busiest highways.',
    stats: [['25,000+', 'Closures set'], ['Since 1971', 'In traffic control'], ['5 States', 'NJ, NY, PA, CT and DE']],
    typesK: 'Types of closures', typesH: ['Whatever The Road Needs.', 'We Close It Safely.'], diagrams: true,
    types: [
      ['single', 'Single Lane Closures', 'One lane taken with a full taper, advance warning signs and an arrow board.'],
      ['multi', 'Multi-Lane Closures', 'Two or more lanes closed in stages, so traffic merges once at a time.'],
      ['shoulder', 'Shoulder Closures', 'Protected room to work on guide rail, drainage, signs and roadside jobs.'],
      ['full', 'Full Road Closures And Detours', 'The road closed end to end, with a signed detour route around the work.'],
      ['ramp', 'Ramp Closures', 'Entrance and exit ramps closed and signed, with advance notice upstream.'],
      ['alternating', 'Alternating One-Lane Traffic', 'Two-way traffic shares one lane, controlled by certified flaggers at each end.'],
      ['mobile', 'Mobile Operations', 'Moving closures for paving, striping and sweeping, with crash trucks behind the work.'],
      ['intersection', 'Intersection Work', 'Turn lanes, crosswalks and approaches controlled while the work moves through.']
    ],
    inclH: 'What Every Closure Includes',
    incl: ['A crew led by a Rutgers-certified Traffic Control Captain', 'Advance warning signs, tapers and buffers set to MUTCD and state standards', 'Arrow boards, message boards and crash trucks from our own yard', 'Setup, monitoring for the full shift, and complete removal', 'Coordination with the road authority and police where required', 'One point of contact from the first call to the last cone'],
    steps: [['Tell Us About The Job', 'Road, location, dates and the work being done.'], ['We Plan The Closure', 'The right setup for the road, speed and traffic volume.'], ['Our Crew Sets It', 'Signs, tapers, trucks and people in place before your crew starts.'], ['We Take It Down', 'Everything removed and the road reopened on schedule.']],
    faqs: [['Which roads do you work on?', 'Local streets, county roads, state highways and toll roads across NJ, NY, PA, CT and DE, including the region’s major highway authorities.'], ['Can you handle the permit drawings too?', 'Yes. Our traffic control plans are drawn for the road authority that has to approve them. See Traffic Control Plans.'], ['Do you supply the equipment?', 'Yes. Signs, cones, drums, arrow boards, message boards and crash trucks all come from our own yard.'], ['How do I get a price?', 'Send the job through the Quote Builder or call our office. We price by the shift or by the job.']]
  },
  {
    slug: 'tma-protection', title: 'TMA Protection', short: 'Crash trucks with certified operators.',
    img: '/fleet/tma-rear-2.jpg', pos: '60% 40%',
    h1: ['A Crash Truck Between', 'Your Crew And Traffic.'],
    lede: 'Truck mounted attenuators with certified operators, positioned behind your work zone to absorb an impact before it reaches your people.',
    stats: [['MASH', 'Tested attenuators'], ['Certified', 'TMA operators'], ['Since 1971', 'In traffic control']],
    typesK: 'Where TMAs work', typesH: ['Protection For', 'Every Kind Of Work Zone.'],
    types: [['', 'Stationary Lane Closures', 'A crash truck parked in the closed lane, upstream of the crew.'], ['', 'Mobile Operations', 'Shadow trucks that follow paving, striping, sweeping and patching crews.'], ['', 'Shoulder Work', 'Cover for guide rail, drainage, sign and tree work beside live lanes.'], ['', 'Bridge And Overhead Work', 'Protection under and beside structures where there is no room to escape.'], ['', 'Night Work', 'Lighted arrow panels and high-visibility markings for overnight closures.'], ['', 'Utility And Emergency Repairs', 'Fast protection around open cuts and repairs in the roadway.']],
    inclH: 'What Comes With Every TMA',
    incl: ['A MASH-tested truck mounted attenuator', 'A certified, experienced operator in the seat', 'Arrow panel and warning lights', 'Correct buffer spacing behind the work area', 'Trucks maintained in our own yard', 'Available with a full closure crew or on its own'],
    steps: [['Tell Us About The Job', 'Road, speed, dates and how the work moves.'], ['We Size The Protection', 'How many trucks and where they sit.'], ['Operators Arrive Ready', 'On site before your crew steps into the road.'], ['We Stay With The Work', 'The truck moves as the work moves, until the lane reopens.']],
    faqs: [['Can I rent a TMA without a crew?', 'Yes. Crash trucks are available with a certified operator, or as part of a full lane closure.'], ['What does MASH tested mean?', 'The attenuator has passed the crash tests in AASHTO’s Manual for Assessing Safety Hardware.'], ['Do you rent by the day?', 'Yes. Daily, weekly and monthly rentals are available.']]
  },
  {
    slug: 'flagging-operations', title: 'Flagging Operations', short: 'ATSSA-certified flaggers.',
    img: '/fleet/team-photo.webp', pos: '50% 62%',
    h1: ['Certified Flaggers.', 'Traffic That Keeps Moving.'],
    lede: 'ATSSA-certified flaggers who control traffic through your work zone, keep drivers informed and keep your crew safe.',
    stats: [['ATSSA', 'Certified flaggers'], ['OSHA', 'Trained crews'], ['5 States', 'NJ, NY, PA, CT and DE']],
    typesK: 'Where flaggers work', typesH: ['The Right People', 'At Every Approach.'],
    types: [['', 'Alternating One-Lane Traffic', 'Two-way traffic taking turns through a single open lane.'], ['', 'Utility Work', 'Water, gas, electric and telecom jobs on local streets.'], ['', 'Paving And Milling', 'Flaggers who move with the paving train and hold side streets.'], ['', 'Intersections And Driveways', 'Control at side roads, driveways and business entrances.'], ['', 'Truck And Equipment Crossings', 'Traffic held while trucks enter and leave the work area.'], ['', 'Special Events', 'Crossings, closures and parking controlled on event day.']],
    inclH: 'What You Get With Our Flaggers',
    incl: ['Flaggers certified by ATSSA', 'OSHA safety training for every crew member', 'Stop/Slow paddles, radios and high-visibility gear', 'Advance warning signs set ahead of each flagger station', 'A crew lead who coordinates with your foreman', 'Coverage sized to the road and the length of the work zone'],
    steps: [['Tell Us About The Job', 'Street, dates, hours and the kind of work.'], ['We Size The Crew', 'How many flaggers and where they stand.'], ['Flaggers Arrive Ready', 'Signed in, briefed and in position before work starts.'], ['We Stay For The Shift', 'Traffic controlled until the road is fully open again.']],
    faqs: [['Are your flaggers certified?', 'Yes. Our flaggers are certified by the American Traffic Safety Services Association.'], ['Can I book flaggers without a full closure?', 'Yes. Flaggers can be booked on their own or with signs, cones and trucks.'], ['Is there a minimum?', 'Call our office or use the Quote Builder and we will go over the options for your job.']]
  },
  {
    slug: 'sign-and-barricade-installs', title: 'Sign And Barricade Installs', short: 'Delivered, set and maintained.',
    img: '/fleet/sv-signs.webp', pos: '60% 50%',
    h1: ['Signs And Barricades.', 'Delivered, Set And Maintained.'],
    lede: 'We deliver, install and look after the signs, barricades and devices your project needs, for a day or for the life of the job.',
    stats: [['MUTCD', 'Compliant setups'], ['Own Yard', 'Signs and devices in stock'], ['Since 1971', 'In traffic control']],
    typesK: 'What we install', typesH: ['Everything The Plan Calls For.', 'Set Where It Belongs.'],
    types: [['', 'Advance Warning Signs', 'Road Work Ahead, lane closed, detour and custom signs on stands or posts.'], ['', 'Type III Barricades', 'Road Closed setups with the right signs and lights.'], ['', 'Drums, Cones And Delineators', 'Channelizing devices set at the correct spacing.'], ['', 'Water-Filled Barriers', 'WATERCADE barrier runs delivered, placed and filled.'], ['', 'Message And Arrow Boards', 'Boards delivered, programmed and positioned.'], ['', 'Long-Term Maintenance', 'Regular checks to reset, clean and replace devices.']],
    inclH: 'What The Install Includes',
    incl: ['Delivery from our own yard', 'Placement to the plan, the MUTCD and state standards', 'Sandbags, stands, lights and hardware', 'Scheduled maintenance for long-term setups', 'Custom signs made in our own sign shop', 'Pickup when the job is done'],
    steps: [['Send Us The Plan', 'Or tell us the job and we will work out what it needs.'], ['We Pull The Equipment', 'Signs and devices loaded from our own stock.'], ['Our Crew Installs It', 'Everything set, weighted and checked.'], ['We Maintain And Remove', 'Kept in shape for the job, then picked up.']],
    faqs: [['Can you make custom signs?', 'Yes. Our sign shop makes custom signs of any size, color and legend.'], ['Do I rent or buy the equipment?', 'Either. Everything we sell can also be rented in NJ, NY, PA and CT.'], ['Can you maintain a long-term setup?', 'Yes. We schedule regular checks for the life of the project.']]
  },
  {
    slug: 'special-events', title: 'Special Events', short: 'Parades, races and game days.',
    img: 'https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Water-Filled-Barricades-In-Use-3-1.png', pos: '50% 60%',
    h1: ['Streets Closed. Crowds Safe.', 'Events That Run On Time.'],
    lede: 'Road closures, detours, barricades and crews for parades, races, festivals and game days, planned with the town and its police.',
    stats: [['Since 1971', 'In traffic control'], ['Certified', 'And experienced crews'], ['Own Yard', 'Barricades and barriers']],
    typesK: 'Events we handle', typesH: ['From Main Street Parades', 'To Stadium Game Days.'],
    types: [['', 'Parades', 'Route closures, side-street barricades and detours.'], ['', 'Races And Charity Walks', 'Rolling and fixed closures along the course.'], ['', 'Festivals And Street Fairs', 'Streets closed to cars and opened to people.'], ['', 'Stadiums And Game Days', 'Lane control and barrier runs for arrivals and departures.'], ['', 'Concerts And Venues', 'Drop-off lanes, pedestrian routes and parking control.'], ['', 'Town And Community Events', 'Simple, tidy closures for local celebrations.']],
    inclH: 'What We Bring To An Event',
    incl: ['A closure and detour layout for the event footprint', 'Barricades, water-filled barriers, cones and signs', 'Certified flaggers and crews where needed', 'Coordination with the municipality and police', 'Setup before the crowd arrives', 'Full removal after the event ends'],
    steps: [['Tell Us About The Event', 'Date, location, route and expected crowd.'], ['We Lay It Out', 'Closures, detours and where every device goes.'], ['We Set Up Early', 'Streets closed and signed before the first arrival.'], ['We Reopen The Streets', 'Everything removed once the event is over.']],
    faqs: [['Do you work with the town and police?', 'Yes. Event closures are planned with the municipality and its police department.'], ['Can we just rent the barricades?', 'Yes. Barricades and WATERCADE barriers can be rented, delivered and picked up.'], ['How far ahead should we book?', 'As early as you can. Call our office and we will go over the timing for your date.']]
  },
  {
    slug: 'night-and-weekend-work', title: 'Night And Weekend Work', short: 'Off-peak closure windows.',
    img: '/fleet/tma-dusk.jpg', pos: '50% 62%',
    h1: ['Closed After Dark.', 'Open By Morning.'],
    lede: 'Overnight and weekend closures that fit the hours the road authority allows, set up on time and cleared before traffic returns.',
    stats: [['25,000+', 'Closures set'], ['Nights', 'And weekends'], ['Certified', 'And experienced crews']],
    typesK: 'Off-peak work', typesH: ['When The Road Is Quiet,', 'We Go To Work.'],
    types: [['', 'Overnight Highway Closures', 'Lanes taken after the evening rush and returned before the morning one.'], ['', 'Weekend Closures', 'Longer windows for work that cannot fit in one night.'], ['', 'Paving And Milling Nights', 'Closures and crash trucks that move with the paving train.'], ['', 'Bridge And Overhead Work', 'Full and partial closures under structures in low-traffic hours.'], ['', 'Utility Cutovers', 'Planned overnight work around open cuts and crossings.'], ['', 'Multi-Night Projects', 'The same setup rebuilt and removed night after night.']],
    inclH: 'Built For Night Work',
    incl: ['Crews scheduled for nights and weekends', 'Lighted arrow boards and message boards', 'Retroreflective signs, drums and cones', 'Crash trucks with certified operators', 'Setup and removal timed to the permitted window', 'A crew lead on site for the whole shift'],
    steps: [['Share The Work Window', 'The hours the road authority allows.'], ['We Plan The Shift', 'Setup, work time and removal mapped to the window.'], ['We Set Up On Time', 'Closure in place as soon as the window opens.'], ['We Reopen On Time', 'Lanes cleared before traffic returns.']],
    faqs: [['Can you work the same closure for several nights?', 'Yes. We set up and remove the closure each night for as long as the project runs.'], ['Do you provide lighting?', 'Our closures use lighted arrow boards, message boards and retroreflective devices. Ask us about light towers for your work area.'], ['Is weekend work available?', 'Yes. Weekend closures are a regular part of our schedule.']]
  },
  {
    slug: 'traffic-control-plans', title: 'Traffic Control Plans', short: 'Permit-ready drawings.',
    img: 'https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_7041_98e15159-1e86-4b04-9da2-0308665c2a89.jpg', pos: '50% 50%',
    h1: ['Permit-Ready Plans.', 'Drawn By People Who Set Them.'],
    lede: 'Traffic control plans drawn to the MUTCD and state standards by the same team that builds closures in the field every day.',
    stats: [['MUTCD', 'And state standards'], ['25,000+', 'Closures behind every plan'], ['Free', 'Closure plan for your job']],
    typesK: 'Plans we draw', typesH: ['A Clear Plan', 'For Every Kind Of Job.'],
    types: [['', 'Lane Closure Plans', 'Tapers, buffers, sign spacing and device counts for single and multi-lane closures.'], ['', 'Detour Plans', 'A signed route around a full closure, turn by turn.'], ['', 'Site-Specific Plans', 'Drawn on your actual road, with its driveways, ramps and intersections.'], ['', 'Pedestrian Routes', 'Sidewalk closures and safe walking paths around the work.'], ['', 'Event Layouts', 'Street closures and barricade placement for parades and events.'], ['', 'Staged Plans', 'A plan for each phase as the work moves down the road.']],
    inclH: 'What Is On Every Plan',
    incl: ['Sign types, sizes and spacing', 'Taper and buffer lengths for the road’s speed', 'Device counts, so nothing is missing on the day', 'Notes and details the road authority asks for', 'Revisions when the reviewer comments', 'A crew that can build exactly what is drawn'],
    steps: [['Tell Us About The Job', 'Location, road, dates and the work being done.'], ['We Draw The Plan', 'Laid out to the MUTCD and the state’s standards.'], ['You Submit It', 'Ready for your permit application, with revisions if needed.'], ['We Can Build It', 'The same team can set the closure in the field.']],
    faqs: [['Is the closure plan really free?', 'Yes. Use the free closure plan tool to get a starting plan for your job.'], ['Who do you draw plans for?', 'Contractors, utilities, towns and event organizers working in NJ, NY, PA, CT and DE.'], ['Can you also set the closure?', 'Yes. Our crews build what we draw, with our own equipment.']],
    cta2: ['Get A Free Closure Plan', '/tools/lane-closure-plan']
  }
];
