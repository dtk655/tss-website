# Traffic Safety Service: Content Digest (from Shopify theme)

Source: Shopify theme `gid://shopify/OnlineStoreTheme/168875819073` (unpublished copy of the live theme), read-only extraction on 2026-11-05.
Image URL pattern: `shopify://shop_images/NAME` -> `https://cdn.shopify.com/s/files/1/0587/7701/0241/files/NAME`.
Disabled sections/blocks are skipped (a few are noted as "reference only" where they contain useful copy). Copy is verbatim, including original typos (flagged with [sic] or a note).

Not in the theme: the body text of Shopify Pages (rendered by "main-page" sections on About, Sign Shop, Equipment, VMS, Trailer, Python pages), form fields of the Powerful Form Builder app forms, and Shopify-hosted video file URLs. Fetch those separately if needed.

---

## Logo

- **Main logo (desktop and mobile):** https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TSS_LOGO_2000_x_250_px_2.svg
  - Wide horizontal SVG wordmark (2000x250 px artboard). Displayed at 260px wide on desktop, 100px on mobile.
- **Favicon:** https://cdn.shopify.com/s/files/1/0587/7701/0241/files/VMS_WHITE_NO_BG__1_-removebg-preview.png (white VMS board icon, transparent background)
- **WATERCADE sub-brand logos:**
  - Desktop: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SHOPIFY_DESKTOP_LOGO_3.svg
  - Mobile: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_SHOPIFY_MOBILE_LOGO_2.svg
- **"The Trusted Leader" brand banner:** https://cdn.shopify.com/s/files/1/0587/7701/0241/files/The_Trusted_Leader_12_x_4_in.png (also `.svg` and a `_12_x_2_in_4.png` variant)

## Brand colors and type

| Role | Value | Where used |
|---|---|---|
| Primary red | `#b60606` | Buttons, scheme "background-2" background, accents, How It Works borders |
| Red hover / dark red | `#8f0505` | Button hover |
| Alt reds | `#b30000`, `#c20000` / `#a10000`, `#dd1d1d` | Lane closure accent bars, mobile quote CTA, badges |
| Safety yellow | `#f2c537`, `#f4c506`, `#f5c320` | Product tab pills, arrow hover |
| Amber | `#f2a900` | Trust bar check icons |
| Charcoal | `#1f2933` | Trust bar background, headings |
| Slate gray text | `#52606d` | Body copy in How It Works |
| Near-black section | `#161616` | Dark color scheme (contact tiles) |
| Text | `#000000` / `#111` / `#121212` | Body text |
| Background | `#ffffff`, light panel `#f5f6f8` | |
| Secondary blue | `#0062ee` | Secondary buttons/links in some schemes |
| WATERCADE blue | `#28a1ce`; WATERCADE navy `#0c2d45` | WATERCADE page |

Fonts: theme headings **Archivo 600**, body **Cabin 400**. Custom sections use **Barlow Semi Condensed 600/700** (lane closure services list), **Josefin Sans** (home hero/body), **Baskervville** (home hero heading).

Social links: all empty in theme settings.

---

## Key facts

1. Traffic Safety Service (TSS), founded **1971**, based in **South Plainfield, NJ**; began as a small, family-owned business.
2. Over five decades in business (About page counter hard-codes "53 Years in the Industry"; that is 55 in 2026).
3. Full-service provider: traffic control product **sales, rentals, and services**.
4. Services: Lane/Road Closures, Flagging Operations, 24/7 Emergency Response, Sign & Barricade Installs, Traffic Control Plans, Special Events, Equipment Sales & Rentals.
5. Specializes in Maintenance and Protection of Traffic (MPT) for large and small projects.
6. Lane closure division: **25+ years**, **10,000+ lane closure jobs** (About counter: **10,578**) across the tri-state and surrounding areas, "From the Garden State Parkway to the G.W. Bridge."
7. Lane closure service area: **NJ, NY, PA, CT, DE** and surrounding areas (other locations on request).
8. **Rentals, delivery, setup and pickup in NJ, NY, PA & CT; products ship nationwide.**
9. Certifications: **OSHA Trained & Certified**, **ATSSA Flagger Certified** (the lane closure page has the typo "ATTSA"), **Rutgers-Certified TCCs** (each crew led by a Rutgers-Certified Traffic Control Captain), **S.W.A.C. Clearance**, **MUTCD Compliant**, **MASH Tested Equipment**.
10. **Union crews** (home trust bar).
11. Agency experience: NJDOT, NJ Turnpike Authority (NJTA), Garden State Parkway (GSP), Port Authority of NY & NJ (PANYNJ), NYSDOT, NYS Thruway Authority (NYSTA), PennDOT, plus local roads and special venues (concerts, sporting events).
12. Crews of all sizes; modern fleet including truck mounted attenuators (TMA/crash trucks), VMS boards, arrow boards.
13. Response times: free quotes with feedback **within 1 business day**; booking replies "typically within 24 hours"; **24/7 service**.
14. Stats (About page): **35,017 customers served**, **10,578 lane closures completed**, **3,100,345 cones sold**.
15. Contact: phone **908-561-4800**, email **info@trafficsafetyservice.com**.
16. Accounts: free contractor/municipal accounts with **NET30 / NET60 terms**, PO ordering, volume/contract pricing, bid and project quotes; multiple users per account; application takes under 2 minutes.
17. How it works: (1) tell us the job, (2) get a formal quote (PO or Net terms), (3) we deliver and set up.
18. **WATERCADE™** water-filled barrier: "The Nation's Premier Water-Filled Barrier"; **MASH TL-3** crash tested for longitudinal applications and approved for the National Highway System.
19. WATERCADE specs: **5 ft long x 3 ft high**, **~50 lbs empty**, **up to 650 lbs filled**, integrated **90° swivel pin**, large top fill cap, drain plug, fence panel and swing gate attachments, stackable for **full truckload delivery**.
20. WATERCADE customization: multiple colors, company name/logo, dual lower panels for messaging, **3M reflective striping** (Engineer Grade or High-Intensity).
21. Custom stenciling on any product (cones, barricades, safety gear, signs) at a low per-unit cost; full-capability in-house **sign shop**.
22. VMS boards: daily, monthly and long-term rentals plus sales and servicing; solar or battery units; custom logos and department names.
23. Other products: Emergency Response Trailer (bundled equipment) and TSS Python Cable Protector (heavy-duty, drop- and pressure-tested, drive-over rated).
24. Customers served: contractors, municipalities, utility crews, government agencies, private enterprises, and special events.

---

## Lane Closure page (`templates/page.lane-closure.json`)

Enabled sections, in page order. (Disabled sections skipped: "Swipe For Certifications" icon strip, main page body, an older "Our Services" multirow, a placeholder "Lane Closure Services" multicolumn, and a second banner.)

### 1. Hero banner (image only, no text overlay)
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/The_Trusted_Leader_12_x_4_in_12_x_2_in_4.png
  - Wide hero graphic, presumably "The Trusted Leader" branded banner (filename says 12x4 / 12x2 in). Text is baked into the image.

### 2. Services list (custom HTML)
Bold list with red accent bars:
- Lane/Road Closures
- Flagging Operations
- 24/7 Emergency Response
- Sign & Barricade Installs
- Traffic Control Plans
- Special Events
- Equipment Sales & Rentals

Styling notes: font Barlow Semi Condensed 600/700; accent bar color `#b30000`; faded red divider `rgba(179,0,0,0.2)`; text `#111`.

### 3. Quote form (app block)
- Powerful Form Builder (Globo) form, data-id `ODg2Njk=`. Form fields are stored in the app, not in the theme. Rebuild as a native quote form.

### 4. "Our Certifications" (heading, italic)
Six columns, each an image with a bold caption:

| Caption | Image | Shows |
|---|---|---|
| OSHA Trained & Certified | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_14.png | OSHA badge/logo |
| ATTSA Flagger Certified | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_18.png | ATSSA flagger certification badge |
| Rutgers-Certified TCCs | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_16.png | Rutgers (CAIT) certification badge |
| S.W.A.C. Clearance | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_15.png | S.W.A.C. clearance badge |
| MUTCD Compliant | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_17.png | MUTCD badge |
| MASH Tested Equipment | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_22.png | MASH-tested equipment badge |

Note: the live caption reads "ATTSA" (typo for ATSSA, American Traffic Safety Services Association). Consider correcting on the new site.

(Faded red divider follows.)

### 5. "Our Job Experience" (heading, italic)
Seven columns, each an agency logo with a bold caption:

| Caption | Image | Shows |
|---|---|---|
| NJ Garden State Parkway | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_23.png | Garden State Parkway logo/shield |
| Port Authority of NY & NJ | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_28.png | Port Authority logo |
| PennDOT Roadways & Interstates | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_30.png | PennDOT logo |
| New York State Thruway Authority | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_24.png | NYS Thruway logo |
| NJ DOT Roadways & Interstates | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_27.png | NJDOT logo |
| NY DOT Roadways & Interstates | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_29.png | NYSDOT logo |
| NJ Turnpike Authority | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_26.png | NJ Turnpike Authority logo |

### 6. Floating mobile CTA (mobile only)
- Button: **"Need a Quote? Tap Here"** -> `#quote-form` (anchor to quote form). Color `#c20000`, hover `#a10000`.

### 7. Second quote form (anchor `#quote-form`)
- Powerful Form Builder form, data-id `0bG2qjNkc`.

### 8. Divider heading
- **"Learn More About Our Crews and Certifications"** (red 2px rule `#b30000` above)

### 9. Alternating image/text rows (multirow)

**Row 1**
- Caption: Traffic Safety Service
- Heading: **On The Road, Experience Matters.**
- Body:
  - "For the last 25 years, our lane closure division has been dedicated to providing reliable and professional services in traffic control management. With a focus on safety and efficiency, our highly trained crews ensure that each project is handled with precision. We take pride in our team's expertise and are proud to say we have Rutgers-Certified TCCs and S.W.A.C Clearance."
  - "Over the years, we've built a reputation for excellence, prioritizing the well-being of both our workers and the public. Our commitment to safety and operational compliance with the MUTCD remains at the core of everything we do."
- Button: no label (link set to https://calendly.com/dylan-trafficsafetyservice/30min, but hidden because label is empty)
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_Safety_Day_Team_Photo.jpg (team group photo from a Safety Day)

**Row 2**
- Caption: Traffic Safety Service
- Heading: **Modern Fleet of Equipment and Vehicles**
- Body: "With state-of-the-art truck mounted attenuators (TMA) and a variety of new, efficient lane closure equipment, we ensure an effective job."
- Button: **"Explore Our Certfied Fleet"** [sic, "Certified"] -> Shopify collection `equipment-rentals` (/collections/equipment-rentals)
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/tss.jpg (TSS trucks/fleet photo)

**Row 3**
- Caption: Traffic Safety Service
- Heading: **25+ Years. 10,000+ Closures. Zero Excuses.**
- Body: "Over the last 25 years, we have completed upwards of 10,000 lane closure jobs across the tri-state and other surrounding areas. From the Garden State Parkway to the G.W. Bridge, we have been tested in all areas."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_0308.jpg (field photo of a lane closure job)

**Row 4**
- Caption: Traffic Safety Service
- Heading: **Start Planning Your Next Project With Certified Traffic Experts**
- Body: "We offer free quotes and you can expect to receive feedback on your inquiry within 1 business day of submittal. We handle both large and small projects for all types of businesses."
- Button: **"Reserve a Certified Crew"** -> NetSuite lead form: https://9787422.extforms.netsuite.com/app/site/crm/externalleadpage.nl?compid=9787422&formid=21&h=AAFdikaI6ps3EaBWaxlFIV0oDzBZx0FuePKEIbhXnHc66j7ftwA
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TMA_192_Rear.jpg (rear view of TMA crash truck #192)

**Row 5**
- Caption: Traffic Safety Service
- Heading: **Plan Your Lane Closure With a Certified Specialist — Call Now**
- Body: "Get in touch with one of our specialists to discuss your next job and its requirements. We offer a quote after the conclusion of the call!"
- Button: **"Talk to a Safety Coordinator"** -> `tel:9085614800`
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Road_Closures_1.svg (road closure illustration/graphic)

### 10. FAQ
**Q: What Is The Furthest TSS Will Go For a Job?**
A: We complete lane closures within the states of New Jersey, New York, Pennsylvania, Connecticut, Delaware, and other surrounding areas. If you are located elsewhere, please call or submit an inquiry and we can discuss further.

**Q: What Size Crews Does TSS Offer?**
A: We provide crews of all sizes depending on the job and needs of our customer.

**Q: How Can I Book a Job?**
A: Either call our team at 908-561-4800 or refer to the form above to submit an inquiry with a description of what your job entails. We typically get back to you within 24 hours.

**Q: Does TSS Supply Traffic Control Devices?**
A: Yes- we are a full service provider offering sales and rentals on all traffic control devices for your next job. These devices include traffic cones, crash trucks, arrow boards, water barriers, signs, and much more.

**Q: What Certifications Does TSS Have?**
A: Each crew is led by a Rutgers-Certified Traffic Control Captain (TCC) and all crew members are OSHA trained. We follow all guidelines enlisted by the MUTCD and remain compliant with each state's regulations. In addition, our lane closure division has S.W.A.C clearance.

**Q: What Type of Experience Does TSS Have?**
A: We have had extensive work on all major roadways and interstates including the NJDOT, NJTA, GSP, PANYNJ, NYSDOT, NYSTA, and PennDOT. In addition, we have performed closures on many local roads and special venues for concerts and sporting events.

### Copy found only in disabled sections (not live; for reference)
- "We specialize in Maintenance and Protection of Traffic (MPT). With a commitment to safety and efficiency, we offer comprehensive traffic control solutions for both large and small projects." (disabled row, caption "Lane Closure Experts", image https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_7041_98e15159-1e86-4b04-9da2-0308665c2a89.jpg)
- "Lane Closure Services / For Both Large and Small Projects" (disabled heading)

---

## Home page (`templates/index.json`)

### 1. Hero (scrolling background images, dark overlay)
- Eyebrow: **SINCE 1971 · NJ · NY · PA · CT**
- Heading: **Traffic Control Products, Rentals & Lane Closure Crews** (font: Baskervville, white)
- Subtext: "Rent or buy everything your work zone needs. Products ship nationwide."
- Button: **"Get a Free Quote"** -> /pages/request-a-quote (bg `#b60606`, hover `#8f0505`, radius 6px)
- Background images:
  - https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_5.svg (safety products banner graphic)
  - https://cdn.shopify.com/s/files/1/0587/7701/0241/files/LANE_CLOSURE_MOBILE_BANNER_3.svg (lane closure banner, desktop)
  - https://cdn.shopify.com/s/files/1/0587/7701/0241/files/LANE_CLOSURE_MOBILE_BANNER_4.svg (lane closure banner, mobile variant)
  - https://cdn.shopify.com/s/files/1/0587/7701/0241/files/LANE_CLOSURE_MOBILE_BANNER_5.svg (lane closure banner)

### 2. Trust bar (dark `#1f2933` strip, amber `#f2a900` check icons)
- Serving contractors & agencies since 1971
- ATSSA-certified flaggers
- Union crews
- Net terms for agencies & contractors
- Rentals in NJ, NY, PA & CT
- Link: **"Shop products →"** -> /collections/safety-products

### 3. Four tiles (media grid, 2 columns, 60% dark overlay)

| Title | Text | Button -> link | Image |
|---|---|---|---|
| Shop Safety Products | Cones, Barricades, Signs, & More | "Order Today" -> /collections/safety-products | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER.svg (safety products graphic) |
| Contractor & Municipality Accounts | NET Terms, Bulk Orders, State Contracts | "Open an Account" -> /pages/create-c-m-account | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_2.svg (accounts tile graphic) |
| Traffic Control Services | Closures, Flagging Crews, Control Plans | "Request Quote" -> /pages/lane-closure | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_4.svg (lane closure / crew graphic) |
| Fleet & Equipment Rentals | Crash Trucks, VMS Boards, Arrow boards, & More | "Reserve Yours" -> /collections/equipment-rentals | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_1.svg (fleet/equipment graphic) |

(Red gradient divider follows.)

### 4. Product tabs
- Heading: **Best-Selling Traffic Control Products**
- Sublines: *Stocked for Contractors, Municipalities & Utility Crews* / *Bulk Pricing • Pallet Quantities • Rent or Buy*
- Tab "Safety Products": WATERCADE barrier (`waterbarriertss590rparent`), 28" cone (`cone28inch`), 36" cone (`cone36inch`), Type III breakaway barricade, hi-intensity, left stripes (`type-iii-breakaway-barricade-hi-intensity-left-stripes`), traffic drum with 4"-6" hi-intensity stripes and tire ring (`traffic-drum-4-6-hi-intensity-reflective-stripes-w-tire-ring`)
- Tab "Fleet & Equipment Rentals": bucket van (`bucket-van`), truck mounted attenuator (`truck-mounted-attenuator-tma`), VMS board (`variable-message-sign-vms-board`)
- Buttons: "Shop now" per product, "Shop all"
- Tab colors: bg `#f2c537`, active `#f4c506` (safety yellow); arrows `#b60606`

### 5. Heading
- **Book Traffic Control Services**

### 6. Service slider

| Title | Button -> link | Image |
|---|---|---|
| ATSSA-Certified Flaggers | "Get a Quote" -> /pages/lane-closure | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_12.png (flagger graphic) |
| MUTCD Compliant Lane Closures | "Get a Quote" -> /pages/lane-closure | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_4.svg (lane closure graphic) |
| 24/7 Emergency Response Teams | "Learn More" -> /pages/lane-closure | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_3.svg (emergency response graphic) |
| Large Scale Project Planning | "Speak with an Expert" -> (no button link; card links to /pages/lane-closure) | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/LANE_CLOSURE_MOBILE_BANNER_4.svg (lane closure graphic) |
| Special Events & WATERCADE | "Get a Quote" -> /pages/water-filled-barrier | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Water-Filled-Barricades-In-Use-3-1.png (water-filled barriers in use at an event) |

### 7. How It Works
- Heading: **How It Works**
- Sub: "Products, rentals or a full crew, the process is the same."
1. **Tell us the job** - "What you need, where, and when. Use the quote form, call us, or ask our AI assistant."
2. **Get your quote** - "A team member sends a formal quote. Agencies and contractors can pay by PO or Net terms."
3. **We deliver and set up** - "Delivery, setup and pickup across NJ, NY, PA and CT. Products ship anywhere in the U.S."
- Button: **"Get a Free Quote"** -> /pages/request-a-quote
- Styling: cards `#f5f6f8` with 4px top border `#b60606`; headings `#1f2933`; body `#52606d`

### 8. Shop by Category

| Label | Link | Image |
|---|---|---|
| (collection title: Cones) | /collections/cones | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/CONEE.png (traffic cone product image) |
| Barricades | /collections/barricades | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SHOPIFYTYPElllRIGHTFRONT.png (Type III barricade, right front view) |
| WATERCADE™ | /pages/water-filled-barrier | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERBARRIER_ORANGE.png (orange water barrier) |
| Road Signs | /collections/sign-shop | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SHOPIFYSTOPSIGN_f5c72dfc-20a8-4312-bebb-08b79e63ba0c.png (stop sign) |
| Equipment Rentals | /collections/equipment-rentals | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/1742906746_0.jpg (VMS board trailer) |
| Fleet Rentals | /collections/truck-rentals | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/1743010145_0.png (rental truck) |

### 9. Closing banner (image only)
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/The_Trusted_Leader_12_x_4_in.png ("The Trusted Leader" branded banner; text baked into image)

---

## WATERCADE Water-Filled Barrier page (`templates/page.water-filled-barrier.json`)

### 1. Hero logo banner
- Desktop image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SHOPIFY_DESKTOP_LOGO_3.svg (WATERCADE wordmark/logo, desktop size; capped at 130px tall)
- Mobile image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_SHOPIFY_MOBILE_LOGO_2.svg (WATERCADE logo, mobile layout)

### 2. Heading
- **The Nation's Premier Water-Filled Barrier** (H1)

### 3. Product carousel (featured collection tabs)
- Products shown: `waterbarriertss590rparent` (WATERCADE barrier, TSS-590R) and `waterbarrierpin` (barrier connecting pin)
- Buttons: "Shop now" (per product), "Shop all"
- Accent color used: `#28a1ce` (WATERCADE blue)

### 4. Heading
- **What To Know About WATERCADE™** (H0)

### 5. Alternating feature rows (caption on each: "WATERCADE™")

**MASH Approved**
- "Our WATERCADE™ barriers are MASH crash tested to Test Level 3 (TL-3) for longitudinal barricade applications and are approved for use on the National Highway System in accordance with this standard."
- "These water-filled barriers can replace many traditional traffic control devices, providing added protection in active work zones. They may also substitute for concrete barriers in certain applications."
- "Please consult our sales team for guidance on specific use limitations and project requirements."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_MASH.svg (WATERCADE MASH-approved graphic)

**90° Swivel Pin Technology**
- "Every WATERCADE™ barrier includes our integrated 90° swivel pin, allowing each unit to securely interlock with the next while maintaining the flexibility to follow curves, corners, and changing road alignments. This built-in connection system lets you quickly create straight runs, angles, or fully enclosed work zones without special hardware — delivering continuous protection for virtually any roadway or project layout."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_CUSTOMS_5.svg (swivel pin / interlocking graphic)

**Custom Options**
- "Make WATERCADE™ your own with high-visibility custom options built for the jobsite. Choose from multiple color configurations, add your company name or logo for clear identification, and utilize the dual lower panels for project information, safety messaging, or branding. For maximum visibility day or night, we offer premium 3M reflective striping in Engineer Grade or High-Intensity sheeting."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_CUSTOMS_1.svg (custom color/logo barrier graphic)

**Dimensions & Weight**
- "The WATERCADE™ barrier is engineered for easy transport, fast deployment, and maximum on-site performance. Measuring 5 feet in length and 3 feet in height, each unit weighs approximately 50 lbs empty for efficient handling and positioning. Once filled, the barrier reaches up to 650 lbs, providing the mass needed for reliable longitudinal channelization and work-zone protection. A large top fill cap allows quick filling, while the integrated drain plug ensures fast, controlled emptying when it's time to move."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_CUSTOMS_4.svg (dimension diagram)

**Fence Panel Attachment**
- "Turn your WATERCADE™ barrier into a complete perimeter system with the fence panel attachment. Standard fence posts install directly into the swivel pin connection point, allowing you to mount fence panels of virtually any height for added jobsite security and pedestrian control. Swing gates can also be integrated to create controlled access points for crews, equipment, and deliveries without breaking the barrier line."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_ORANGE_1.svg (orange WATERCADE barrier, fence attachment context)

**Full Truck Delivery**
- "WATERCADE™ barriers are engineered for maximum freight efficiency, allowing full truckload quantities to ship safely and economically to your jobsite or yard. Their stackable design minimizes transportation costs, speeds up loading and unloading, and ensures you receive large volumes ready for rapid deployment. Whether supplying a major project or stocking your fleet, our full truck delivery option keeps your operation on schedule."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_TRUCK.svg (truckload of stacked barriers)

### 6. Featured product
- Product `waterbarriertss590rparent` with vendor, title, price, variant picker (color swatches), buy buttons, "Share".

### Disabled (not live, reference only)
- Tagline: "Safety that flows with you — the nation's go-to water-filled barrier system." (color `#0c2d45`)
- Icon banner with WATERCADE_WHITE.svg and WATERCADE_ORANGE.svg images and "ORDER NOW" buttons -> /products/waterbarriertss590rparent
  - https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_WHITE.svg (white barrier)
  - https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_ORANGE.svg (orange barrier)

---

## About Us page (`templates/page.about-us.json`)

### 1. Main page body
- Renders the Shopify Page's own title/body (stored in the Page object, not the theme file). Not captured here.

### 2. Alternating rows (caption on each: "Traffic Safety Service")

**Our History**
- "Founded in 1971, Traffic Safety Service (TSS) has been at the forefront of traffic safety solutions for over five decades. Located in South Plainfield, NJ, we began as a small, family-owned business dedicated to providing top-quality traffic control products to local municipalities and contractors. Over the years, we've grown into a full-service provider, offering a wide range of safety equipment rentals, sales, and services across New Jersey, New York, and the surrounding areas."
- "Our company's rich history is built on a foundation of innovation, reliability, and a commitment to safety. From humble beginnings with basic traffic cones and barricades, we've expanded our offerings to include advanced solutions such as electronic message boards, crash trucks, and work zone safety devices. As the industry has evolved, so have we, always staying ahead of the curve with the latest technologies and best practices."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_1125.jpg (company/yard or equipment photo)

**Our Goal**
- "At TSS, we pride ourselves on being a trusted partner to our clients. Whether you're managing a large construction project, planning a special event, or overseeing road maintenance, our expert team is here to help you create safer environments for workers, drivers, and pedestrians. We offer 24/7 service and customized solutions to meet the specific needs of each job, ensuring safety is never compromised."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_1180.jpg (field/equipment photo)

**Our Mission**
- "Our long-standing reputation for excellence, customer satisfaction, and competitive pricing has made us a go-to resource for municipalities, contractors, and private enterprises throughout the region. We continue to grow while remaining true to our core mission: to provide innovative, dependable, and cost-effective traffic safety solutions that protect the lives of everyone on the road."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_1133_c2839bba-db54-470f-80d2-804e82e3fd23.jpg (field/equipment photo)

### 3. Stats counter
- **53** Years in the Industry (hard-coded; 1971 to 2024. Should read 55 in 2026; compute from 1971 on the new site)
- **35,017** Customers Served
- **10,578** Lane Closures Completed
- **3,100,345** Cones Sold

---

## Custom Stenciling page (`templates/page.custom-stenciling.json`)

### 1. Intro
- Heading: **Customized Products & Services** (H0)
- Body: "We offer full customization on all our products, allowing you to add your logo or business/department name with ease. Personalization comes at a low cost per unit, making it simple and affordable to represent your brand or agency."

### 2. "Custom Offerings" (H0)
- Subheading: **We can stencil any product!**

| Title | Text (verbatim) | Image | Shows |
|---|---|---|---|
| Custom Cones | Personalize traffic cones with business/department names and logos so that your equipment stands out in all environment. | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_0141_f25c7165-4733-4438-9391-0687acaa7c46.jpg | Stenciled traffic cones |
| Custom Barricades | Bring visibility and dependability to your work site with custom barricades, personalized with business/ department names and logs | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_2840.jpg | Custom-stenciled barricades |
| Personalized Safety Gear | Have your team wearing gear that represents your company in a professional way | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/construction-worker-holding-blueprints.jpg | Stock photo: construction worker holding blueprints |
| Custom Signage | Our full capability sign shop allows you to create the perfect sign for your next job. | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_1158.jpg | Custom signs from the in-house sign shop |

(Minor typos in source: "all environment" -> "all environments"; "logs" -> "logos".)

### 3. Inquiry form
- Powerful Form Builder form, data-id `ODkzODE=` (fields stored in app).

### Disabled (reference only)
- "Call Now!" / "Talk to one of our expert salesmen or leave us an inquiry and we will get back to you within one business day!" / Button "Call Now" -> tel:9085614800. Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_0081_1209517d-0120-4e7d-b1dd-18ee0f120532.jpg

---

## Sign Shop page (`templates/page.sign-shop.json`)

Mostly theme placeholder content. Real content:
- Main page body (from Shopify Page object; not in theme)
- Heading: **WELCOME TO OUR SIGN SHOP** (H1)
- Section title: **Schedule a call with one of our Lane Closure Specialists** (copied from lane closure; likely not intended for sign shop)
- Contact form: Name, Email (required), Phone (required), Message. Side text: "Got Questions?" / "If you'd like to learn more about us and our products, contact us!"

Placeholder text to ignore: "Share information about your brand...", "Button label", "Heading", "Add details on availability...", "Frequently asked question / Use this text to answer questions...", "Find a nearest Store location", "+01 122 334 566" (theme demo phone, not real).

No images.

---

## Equipment page (`templates/page.equipment.json`)

Mostly placeholder. Real content:
- Main page body (from Shopify Page object)
- Countdown heading: **VMS BOARD SALE!** (description is placeholder "Description"; no end date set)
- Featured product block with no product selected
- Contact form: Name, Email (required), Phone (required), Message; "Got Questions?" / "If you'd like to learn more about us and our products, contact us!"
- FAQ section is all placeholder ("Frequently asked question").

No images.

---

## Variable Message Signs page (`templates/page.variable-message-signs.json`)

- Main page body (from Shopify Page object; not in theme)

### Alternating rows (caption on each: "Traffic Safety Service")

**VMS Boards**
- "Our VMS Board are equipped with state-of-the-art technology that ensures your message is both highly visible and understandable"
- Button: **"Get a Quote"** -> /pages/contact-us
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/1742906746_0.jpg (VMS message board trailer photo)

**Rentals - Sales - Service**
- "With a fleet of VMS Boards, we offer daily, monthly, and long-term rentals. We also have units available for purchase. With any rental or purchase, you can call our experienced team for any servicing needs."
- Button: **"Get a Quote"** -> /pages/contact-us
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Copy_of_Copy_of_Copy_of_Untitled.png (VMS board graphic)

**Customized Units**
- "We offer units that are tailored to your exact needs. From solar or battery to customized boards with logos and department names, we provide a personalized unit ready for you to use."
- Button: **"Get A Quote"** -> /pages/contact-us
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Copy_of_Copy_of_Untitled.png (customized VMS board graphic)

### Pricing CTA (shared block, also on Trailer and Python pages)
- Heading: **Contact Our Sales Team For Pricing!**
- "Inquire for pricing through phone call (908-561-4800) or email at info@trafficsafetyservice.com"
- Button: **"Call Now"** -> tel:9085614800

---

## Emergency Response Trailer page (`templates/page.emergencyresponse-trailer.json`)

- Main page body (from Shopify Page object; not in theme)
- Video: Shopify-hosted file `0208 (1).mp4` (autoplay, loop). Fallback/alt video URL: https://www.youtube.com/watch?v=_9VUPq3SxOc
  - Note: the Shopify video file URL is not in the theme JSON; get it from Content > Files if needed.

### Rows (caption on each: "Traffic Safety Service"; headings only, no body text)
- **Emergency Response** - Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TRAILER15.jpg (emergency response trailer)
- **Stand Out in Any Environment** - Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TRAILER8.jpg (trailer, high-visibility exterior)
- **Build Your Product Bundle** - Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TRAILER13.jpg (trailer interior/stocked equipment)

### Pricing CTA
- **Contact Our Sales Team For Pricing!** / "Inquire for pricing through phone call (908-561-4800) or email at info@trafficsafetyservice.com" / **"Call Now"** -> tel:9085614800

---

## Python Cable Protector page (`templates/page.python-cable-protector.json`)

- Main page body (from Shopify Page object; not in theme)
- Banner image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/55gkkjKw.jpg (Python cable protector product/banner image)

### Rows (caption on each: "Traffic Safety Service")

**Python Cable Protector**
- "Our TSS Python Cable Protector provides superior durability and reliability for safeguarding your cables. Made from heavy-duty materials, it resists abrasion, tangling, and crushing, ensuring long-lasting performance."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/9c0ivsRw.jpg (cable protector product photo)

**Any Environment**
- "The Python Cable Protector's sleek design makes it ideal for indoor and outdoor industrial use, keeping your cables safe in any environment. Its changeable length allows for use in smaller areas such as an office or home."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Screenshot_2024-12-05_112102.png (cable protector in use, screenshot)

**Battle Tested**
- "Through rigorous testing, the Python Cable Protector has surpassed all requirements. From drop tests to pressure tests, the assurance of reliability is undoubted. Check out some of the test footage below."
- Image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Screenshot_2024-12-05_114100.jpg (test footage still)

### Pricing CTA
- **Contact Our Sales Team For Pricing!** / "Inquire for pricing through phone call (908-561-4800) or email at info@trafficsafetyservice.com" / **"Call Now"** -> tel:9085614800

### Test footage slideshow
- Video: Shopify-hosted file `Truck Drive Over 3  12-11-13.MOV` (truck drive-over test); fallback YouTube https://www.youtube.com/watch?v=_9VUPq3SxOc
- Poster image: https://cdn.shopify.com/s/files/1/0587/7701/0241/files/PYTHON_1.png (Python cable protector graphic)

---

## Contact page (`templates/page.contact.json`)

### 1. Contact form
- Powerful Form Builder form, data-id `ODk4NDU=` (fields stored in app).

### 2. "Other Ways To Get In Touch" (H0), three image tiles with 50% dark overlay

| Heading | Text | Button -> link | Image | Shows |
|---|---|---|---|---|
| Call Our Office | 908-561-4800 | "Click To Call" -> `tel: 908-561-4800` | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/business-woman-talking-phone_23-2148336886.jpg | Stock photo: businesswoman on the phone |
| Email Our Support Team | info@trafficsafetyservice.com | "Click To Email" -> `mailto:info@trafficsafetyservice.com` | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/depositphotos_231857118-stock-photo-cropped-view-businesswoman-typing-laptop.webp | Stock photo: hands typing on a laptop |
| Subscribe To Our Newsletter | Get Updates on TSS News & Sales | "Click To Subscribe" -> (no link set) | https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Screenshot_2024-12-19_120916.png | Screenshot graphic (newsletter tile background) |

### Disabled (reference only)
- "Contact Us Through Our Online Form Or One Of The Options Below!" / "Click below to fill out our TSS contact form for any inquiry regarding your needs" / Button "CLICK FOR ONLINE FORM" -> NetSuite lead form (formid=3): https://9787422.extforms.netsuite.com/app/site/crm/externalleadpage.nl/compid.9787422/.f?formid=3&h=AAFdikaIgoJH-dqwpI4rFsU2On3CnUtVI6i8uUWvsUqrFyOW9jE
- Image (stock call center photo): https://cdn.shopify.com/s/files/1/0587/7701/0241/files/stock-photo-handsome-call-center-manager-headphones-mike-sitting-workplace-while-his.jpg

---

## FAQ page (`templates/page.faq.json`)

Placeholder only: four "Frequently asked question / Use this text to answer questions..." rows with heading "Heading". No real content. Use the lane closure FAQ and the account FAQ instead.

---

## Create Customer / Municipal Account page (`templates/page.create-c-m-account.json`)

### 1. Account application form
- Powerful Form Builder form, data-id `MTM0NzUx` (fields stored in app).

### 2. FAQ: **Any Questions Before Creating an Account?**

**Q: What do I need to complete this form?**
A: Have the following ready:
- Company contact info
- Company address
- Preferred ordering and payment terms
- Tax exempt form (if applicable)

Takes less than 2 minutes.

**Q: Why should I open an account?**
A: Creating an account allows you to:
- Place orders faster
- Work directly with a TSS rep for all orders and questions
- Use purchase orders
- Apply for NET terms
- Save billing & shipping info
- Access contractor / municipal pricing
- Cost-effective shipping rates

**Q: Is there a cost to open an account?**
A: No- opening an account is completely free. Its purpose is to give our team and customers a quicker, more efficient sales/delivery process.

**Q: How do I place orders after my account is created?**
A: Once you submit your account details, one of our team members will finalize your account in our system. We will reach out to you with confirmation and any questions regarding your preferred payment terms.

You'll be able to:
- Call in orders to our sales team and speak with any specific rep you'd like
- Email orders and quote requests
- Submit POs by email

**Q: Do you offer NET terms?**
A: Yes- we offer NET30 and NET60 terms depending on your credit application or if you are a government agency

**Q: What is the difference in pricing?**
A: Approved accounts may receive:
- Volume pricing
- Contract pricing
- Bid & project quotes

**Q: Do you offer project-based pricing?**
A: Yes — we provide quotes for:
- Traffic control setups
- Long-term rentals
- Large material orders

**Q: Can multiple people from my company use the same account?**
A: Yes- anyone from your team can use the account to place orders

No images.

---

## All image URLs (deduplicated, in order of first appearance)

Includes a few images that only appear in disabled sections (WATERCADE_WHITE.svg, WATERCADE_ORANGE.svg, thumbnail_IMG_7041..., thumbnail_IMG_0081..., stock call-center photo). See each page section for what each image shows.

- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TSS_LOGO_2000_x_250_px_2.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/VMS_WHITE_NO_BG__1_-removebg-preview.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SHOPIFY_DESKTOP_LOGO_3.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_SHOPIFY_MOBILE_LOGO_2.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/The_Trusted_Leader_12_x_4_in.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/The_Trusted_Leader_12_x_4_in_12_x_2_in_4.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_14.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_18.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_16.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_15.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_17.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_22.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_23.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_28.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_30.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_24.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_27.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_29.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_26.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_Safety_Day_Team_Photo.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/tss.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_0308.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TMA_192_Rear.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Road_Closures_1.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_7041_98e15159-1e86-4b04-9da2-0308665c2a89.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_5.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/LANE_CLOSURE_MOBILE_BANNER_3.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/LANE_CLOSURE_MOBILE_BANNER_4.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/LANE_CLOSURE_MOBILE_BANNER_5.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_2.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_4.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_1.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Untitled_design_12.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SAFETY_PRODUCTS_MOBILE_BANNER_3.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Water-Filled-Barricades-In-Use-3-1.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/CONEE.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SHOPIFYTYPElllRIGHTFRONT.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERBARRIER_ORANGE.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/SHOPIFYSTOPSIGN_f5c72dfc-20a8-4312-bebb-08b79e63ba0c.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/1742906746_0.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/1743010145_0.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_MASH.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_CUSTOMS_5.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_CUSTOMS_1.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_CUSTOMS_4.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_ORANGE_1.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_TRUCK.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_WHITE.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/WATERCADE_ORANGE.svg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_1125.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_1180.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_1133_c2839bba-db54-470f-80d2-804e82e3fd23.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_0141_f25c7165-4733-4438-9391-0687acaa7c46.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_2840.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/construction-worker-holding-blueprints.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_1158.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/thumbnail_IMG_0081_1209517d-0120-4e7d-b1dd-18ee0f120532.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Copy_of_Copy_of_Copy_of_Untitled.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Copy_of_Copy_of_Untitled.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TRAILER15.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TRAILER8.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/TRAILER13.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/55gkkjKw.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/9c0ivsRw.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Screenshot_2024-12-05_112102.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Screenshot_2024-12-05_114100.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/PYTHON_1.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/business-woman-talking-phone_23-2148336886.jpg
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/depositphotos_231857118-stock-photo-cropped-view-businesswoman-typing-laptop.webp
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/Screenshot_2024-12-19_120916.png
- https://cdn.shopify.com/s/files/1/0587/7701/0241/files/stock-photo-handsome-call-center-manager-headphones-mike-sitting-workplace-while-his.jpg
