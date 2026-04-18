import { randomUUID } from "crypto";

export type UserRole = "citizen" | "worker" | "admin";
export type Priority = "P1" | "P2" | "P3" | "P4";
export type ComplaintStatus = "pending" | "in_progress" | "resolved" | "closed";
export type ComplaintCategory =
  | "pothole" | "garbage" | "streetlight" | "water"
  | "drain" | "electricity" | "tree" | "other";
export type SOSCategory =
  | "gas_leak" | "water_burst" | "electric_hazard"
  | "fire_risk" | "road_accident" | "infrastructure" | "women_safety" | "medical";

export interface AppUser {
  id: string;
  name: string;
  phone: string;
  pin: string;
  role: UserRole;
  points: number;
  badges: string[];
  level: number;
  createdAt: string;
}

export interface GeoPoint { lat: number; lng: number; }

export interface Complaint {
  id: string;
  ticketId: string;
  category: ComplaintCategory;
  description: string;
  location: string;
  geo: GeoPoint;
  ward: string;
  wardNumber: number;
  priority: Priority;
  status: ComplaintStatus;
  submittedAt: string;
  resolvedAt?: string;
  submittedBy?: string;
  submittedByPhone?: string;
  workerName?: string;
  upvotes: number;
  upvotedBy: string[];
  isCluster: boolean;
  clusterSize?: number;
  aiScore: number;
  aiConfidence: number;
  hasProof?: boolean;
  beforePhoto?: string;
  afterPhoto?: string;
  rating?: number;
  feedback?: string;
  rejectedBy?: string[];
  reopened?: boolean;
}

export interface SOSAlert {
  id: string;
  category: SOSCategory;
  description: string;
  location: string;
  geo: GeoPoint;
  liveGeo?: GeoPoint;
  liveUpdatedAt?: string;
  ward: string;
  wardNumber: number;
  triggeredAt: string;
  resolvedAt?: string;
  status: "active" | "responding" | "resolved";
  respondingWorker?: string;
  triggeredBy?: string;
  triggeredByPhone?: string;
  nearestPoliceStation?: string;
  nearestPolicePhone?: string;
  policeDistance?: number;
  notifiedStations?: { name: string; phone: string; distance: number; address: string }[];
  isWomenSafety?: boolean;
}

export interface Ward {
  id: string;
  name: string;
  number: number;
  healthScore: number;
  totalComplaints: number;
  resolvedComplaints: number;
  pendingComplaints: number;
  avgResolutionHours: number;
  population: number;
  area: string;
  center: GeoPoint;
  riskLevel: "low" | "medium" | "high" | "critical";
  satisfactionScore: number;
  reopenRate: number;
}

export interface Worker {
  id: string;
  name: string;
  phone: string;
  ward: string;
  wardNumber: number;
  score: number;
  resolvedToday: number;
  totalResolved: number;
  avgRating: number;
  status: "active" | "idle" | "on_leave";
  currentTask?: string;
  geo?: GeoPoint;
}

export interface PoliceStation {
  id: string;
  name: string;
  address: string;
  phone: string;
  geo: GeoPoint;
  ward: string;
}

export interface AuthToken {
  token: string;
  userId: string;
  expiresAt: number;
}

export interface RiskZone {
  id: string;
  type: "flood" | "garbage" | "infrastructure" | "crime";
  severity: "low" | "medium" | "high";
  geo: GeoPoint;
  radius: number;
  description: string;
  complaintCount: number;
}

export type AnnouncementType = "general" | "scheme" | "emergency" | "welfare" | "tender" | "holiday";

export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: AnnouncementType;
  department: string;
  postedAt: string;
  expiresAt?: string;
  postedBy: string;
  priority: "normal" | "important" | "urgent";
  targetWards?: number[];
  link?: string;
  views: number;
}

// Delhi ward centers with realistic geo
const WARDS_DATA = [
  { name: "Chandni Chowk",    number: 1,  area: "Central Delhi",    center: { lat: 28.6506, lng: 77.2303 }, pop: 210000 },
  { name: "Karol Bagh",       number: 2,  area: "West Delhi",       center: { lat: 28.6514, lng: 77.1907 }, pop: 310000 },
  { name: "Connaught Place",  number: 3,  area: "New Delhi",        center: { lat: 28.6328, lng: 77.2197 }, pop: 85000  },
  { name: "Saket",            number: 4,  area: "South Delhi",      center: { lat: 28.5244, lng: 77.2066 }, pop: 170000 },
  { name: "Rohini",           number: 5,  area: "North West Delhi", center: { lat: 28.7395, lng: 77.0686 }, pop: 420000 },
  { name: "Dwarka",           number: 6,  area: "South West Delhi", center: { lat: 28.5921, lng: 77.0460 }, pop: 390000 },
  { name: "Laxmi Nagar",      number: 7,  area: "East Delhi",       center: { lat: 28.6322, lng: 77.2777 }, pop: 280000 },
  { name: "Janakpuri",        number: 8,  area: "West Delhi",       center: { lat: 28.6217, lng: 77.0906 }, pop: 195000 },
  { name: "Shahdara",         number: 9,  area: "East Delhi",       center: { lat: 28.6720, lng: 77.2909 }, pop: 350000 },
  { name: "Vasant Kunj",      number: 10, area: "South Delhi",      center: { lat: 28.5204, lng: 77.1559 }, pop: 145000 },
];

const POLICE_STATIONS: PoliceStation[] = [
  { id: "ps1",  name: "Chandni Chowk PS",      address: "Chandni Chowk, Delhi 110006",                 phone: "011-23278300", geo: { lat: 28.6521, lng: 77.2310 }, ward: "Chandni Chowk"   },
  { id: "ps2",  name: "Karol Bagh PS",          address: "Pusa Road, Karol Bagh, Delhi 110005",         phone: "011-25711700", geo: { lat: 28.6518, lng: 77.1915 }, ward: "Karol Bagh"      },
  { id: "ps3",  name: "Parliament Street PS",   address: "Parliament Street, New Delhi 110001",          phone: "011-23747890", geo: { lat: 28.6220, lng: 77.2090 }, ward: "Connaught Place" },
  { id: "ps4",  name: "Saket PS",               address: "Panchsheel Marg, Saket, Delhi 110017",        phone: "011-26534500", geo: { lat: 28.5260, lng: 77.2075 }, ward: "Saket"           },
  { id: "ps5",  name: "Rohini PS",              address: "Sector 9, Rohini, Delhi 110085",              phone: "011-27059200", geo: { lat: 28.7400, lng: 77.0695 }, ward: "Rohini"          },
  { id: "ps6",  name: "Dwarka Sector 23 PS",    address: "Sector 23, Dwarka, Delhi 110075",             phone: "011-25086900", geo: { lat: 28.5930, lng: 77.0470 }, ward: "Dwarka"          },
  { id: "ps7",  name: "Laxmi Nagar PS",         address: "Vikas Marg, Laxmi Nagar, Delhi 110092",      phone: "011-22520078", geo: { lat: 28.6330, lng: 77.2790 }, ward: "Laxmi Nagar"     },
  { id: "ps8",  name: "Janakpuri PS",           address: "District Centre, Janakpuri, Delhi 110058",    phone: "011-28521900", geo: { lat: 28.6225, lng: 77.0915 }, ward: "Janakpuri"       },
  { id: "ps9",  name: "Shahdara PS",            address: "G.T. Road, Shahdara, Delhi 110032",           phone: "011-22313131", geo: { lat: 28.6730, lng: 77.2918 }, ward: "Shahdara"        },
  { id: "ps10", name: "Vasant Kunj PS",         address: "Nelson Mandela Marg, Vasant Kunj, Delhi",     phone: "011-26136700", geo: { lat: 28.5210, lng: 77.1567 }, ward: "Vasant Kunj"     },
  { id: "ps11", name: "Hauz Khas PS",           address: "Hauz Khas Village, Delhi 110016",             phone: "011-26966100", geo: { lat: 28.5495, lng: 77.2050 }, ward: "Saket"           },
  { id: "ps12", name: "Nehru Place PS",         address: "Nehru Place, New Delhi 110019",               phone: "011-26441100", geo: { lat: 28.5480, lng: 77.2520 }, ward: "Saket"           },
  { id: "ps13", name: "Civil Lines PS",         address: "Civil Lines, Delhi 110054",                   phone: "011-23993930", geo: { lat: 28.6814, lng: 77.2305 }, ward: "Chandni Chowk"  },
  { id: "ps14", name: "Paharganj PS",           address: "Main Bazar, Paharganj, Delhi 110055",         phone: "011-23583400", geo: { lat: 28.6448, lng: 77.2070 }, ward: "Connaught Place" },
  { id: "ps15", name: "ITO PS",                 address: "ITO, Vikas Bhawan, Delhi 110002",             phone: "011-23379100", geo: { lat: 28.6279, lng: 77.2430 }, ward: "Connaught Place" },
  { id: "ps16", name: "Malviya Nagar PS",       address: "Malviya Nagar, South Delhi 110017",           phone: "011-29551500", geo: { lat: 28.5336, lng: 77.2044 }, ward: "Saket"           },
  { id: "ps17", name: "Tilak Nagar PS",         address: "Tilak Nagar, West Delhi 110018",              phone: "011-25929700", geo: { lat: 28.6411, lng: 77.1073 }, ward: "Janakpuri"       },
  { id: "ps18", name: "Pitampura PS",           address: "Pitampura, Northwest Delhi 110034",           phone: "011-27311700", geo: { lat: 28.6999, lng: 77.1392 }, ward: "Rohini"          },
  { id: "ps19", name: "Narela PS",              address: "Narela, Delhi 110040",                        phone: "011-27785700", geo: { lat: 28.8538, lng: 77.0939 }, ward: "Rohini"          },
  { id: "ps20", name: "Vivek Vihar PS",         address: "Vivek Vihar, East Delhi 110095",              phone: "011-22014100", geo: { lat: 28.6727, lng: 77.3168 }, ward: "Shahdara"        },
  { id: "ps21", name: "Mayur Vihar PS",         address: "Mayur Vihar Phase-1, East Delhi 110091",      phone: "011-22754900", geo: { lat: 28.6122, lng: 77.2961 }, ward: "Laxmi Nagar"     },
  { id: "ps22", name: "Mehrauli PS",            address: "Mehrauli, South Delhi 110030",                phone: "011-26643700", geo: { lat: 28.5194, lng: 77.1864 }, ward: "Vasant Kunj"     },
  { id: "ps23", name: "Yamuna Vihar PS",        address: "Yamuna Vihar, Northeast Delhi 110053",        phone: "011-22906700", geo: { lat: 28.7022, lng: 77.2900 }, ward: "Shahdara"        },
  { id: "ps24", name: "Roop Nagar PS",          address: "Roop Nagar, Delhi 110007",                   phone: "011-27666700", geo: { lat: 28.6810, lng: 77.2140 }, ward: "Chandni Chowk"  },
  { id: "ps25", name: "Dwarka Sector 10 PS",    address: "Sector 10, Dwarka, Delhi 110075",             phone: "011-25086400", geo: { lat: 28.5821, lng: 77.0530 }, ward: "Dwarka"          },
];

const WORKER_NAMES = [
  "Rajesh Kumar","Amit Singh","Priya Sharma","Suresh Gupta","Neha Verma",
  "Vikram Rao","Anita Devi","Mohan Lal","Kavita Singh","Deepak Nair",
  "Sunita Yadav","Ravi Chandra","Pooja Mehta","Arun Kumar","Meena Kumari",
  "Sanjay Tiwari","Rekha Sharma","Lokesh Bajaj","Geeta Singh","Prakash Rao",
];

const COMPLAINT_DESCS: Record<ComplaintCategory, string[]> = {
  pothole: [
    "Large pothole causing accidents on main road, vehicles getting damaged",
    "Deep crater near school gate, children at serious risk",
    "Multiple potholes on hospital road, patient transport hampered",
    "Road completely broken near bus stand, flooding during rain",
    "Two-wheeler accident due to hidden pothole in dark street",
    "Pothole 3ft wide near market junction blocking traffic flow",
  ],
  garbage: [
    "Garbage not collected for 7 days, flies and rats breeding",
    "Overflowing municipality bin near school causing health hazard",
    "Illegal garbage dump near residential colony boundary",
    "Construction waste dumped on public footpath illegally",
    "Burning garbage creating toxic smoke in residential area",
    "Abandoned garbage attracts stray dogs, children attacked",
  ],
  streetlight: [
    "20 streetlights non-functional for 3 weeks, area unsafe at night",
    "Single working light in 500m stretch, women afraid to walk",
    "Lights sparking dangerously near children's park",
    "New LED poles installed but never switched on",
    "Lights on timer malfunction—running all day, off at night",
    "Multiple broken lights causing accidents at blind curve",
  ],
  water: [
    "No water supply for 5 days in scorching summer heat",
    "Brown dirty water flowing from taps, undrinkable and toxic",
    "Pipeline burst flooding 3 streets for 48 hours",
    "Water pressure critically low—4th floor residents getting nothing",
    "Sewage mixing with drinking water supply, disease risk",
    "Tanker not arriving despite 10-day payment, senior citizens suffering",
  ],
  drain: [
    "Clogged drain flooding entire street after 10 minutes of rain",
    "Sewage overflow entering homes, furniture and appliances damaged",
    "Open drain near primary school breeding dengue mosquitoes",
    "Blocked storm drain causing road waterlogging since monsoon",
    "Drain wall collapsed, children have fallen in twice",
    "Raw sewage smell making entire market area unbearable",
  ],
  electricity: [
    "Power cuts 8-10 hours daily, medical equipment affected",
    "Transformer sparking visibly, entire block at risk",
    "Exposed high-voltage wire fallen on footpath after storm",
    "Electricity bill payment but supply disconnected wrongly",
    "Short circuit causing fires in homes, 3 incidents in one week",
    "Meter tampering by officials causing inflated bills",
  ],
  tree: [
    "Massive dead tree leaning over house, will fall any day",
    "Fallen tree blocking major arterial road for 2 days",
    "Tree roots breaking water main pipe, causing water loss",
    "Hanging branch over school wall, could kill a child",
    "Tree fell on parked cars during storm, no response",
    "Uprooted tree blocking footpath for disabled citizens",
  ],
  other: [
    "Stray dog pack attacking residents at night regularly",
    "Broken footpath tiles causing injury to elderly citizens",
    "Unauthorized encroachment on public park land",
    "Abandoned vehicle blocking fire escape access for 2 weeks",
    "Construction noise violation at night disturbing residents",
    "Public toilet broken and overflowing near market",
  ],
};

const LOCATIONS_PREFIX = [
  "Near Metro Station", "Main Market", "Sector Road", "Colony Gate",
  "Hospital Road", "School Road", "Park Area", "Bus Stand Junction",
  "Railway Bridge", "Temple Road", "Residential Block", "Market Chowk",
];

function rnd<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rndInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
function rndFloat(min: number, max: number, decimals = 4): number {
  return parseFloat((min + Math.random() * (max - min)).toFixed(decimals));
}
function hoursAgo(h: number): string { return new Date(Date.now() - h * 3600000).toISOString(); }
function genId(): string { return randomUUID(); }
function genTicketId(): string { return `SAI-${rndInt(10000, 99999)}`; }

function perturbGeo(center: GeoPoint, radiusDeg = 0.025): GeoPoint {
  return {
    lat: rndFloat(center.lat - radiusDeg, center.lat + radiusDeg),
    lng: rndFloat(center.lng - radiusDeg, center.lng + radiusDeg),
  };
}

function distanceKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x = Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

class AppStorage {
  private users: Map<string, AppUser> = new Map();
  private tokens: Map<string, AuthToken> = new Map();
  private complaints: Complaint[] = [];
  private sosAlerts: SOSAlert[] = [];
  private wards: Ward[] = [];
  private workers: Worker[] = [];
  private policeStations: PoliceStation[] = POLICE_STATIONS;
  private riskZones: RiskZone[] = [];
  private announcements: Announcement[] = [];
  private wsListeners: Set<(event: any) => void> = new Set();

  constructor() { this.seed(); }

  addWsListener(fn: (event: any) => void) { this.wsListeners.add(fn); }
  removeWsListener(fn: (event: any) => void) { this.wsListeners.delete(fn); }
  broadcastEvent(event: any) { this.wsListeners.forEach(fn => fn(event)); }

  private seed() {
    // Admin
    const adminId = genId();
    this.users.set(adminId, { id: adminId, name: "SANKALP Admin", phone: "9999999999", pin: "000000", role: "admin", points: 9999, badges: ["system_admin"], level: 99, createdAt: new Date().toISOString() });

    // Demo citizen
    const citizenId = genId();
    this.users.set(citizenId, { id: citizenId, name: "Demo Citizen", phone: "9876543210", pin: "123456", role: "citizen", points: 350, badges: ["first_report", "active_citizen"], level: 4, createdAt: new Date().toISOString() });

    // More Delhi citizens
    const citizenSeeds: Omit<AppUser, "id" | "createdAt">[] = [
      { name: "Rahul Kumar Sharma", phone: "9811234567", pin: "112233", role: "citizen", points: 520, badges: ["first_report", "active_citizen", "civic_hero"], level: 6 },
      { name: "Priya Gupta", phone: "9711234568", pin: "223344", role: "citizen", points: 280, badges: ["first_report", "active_citizen"], level: 3 },
      { name: "Amit Verma", phone: "9911234569", pin: "334455", role: "citizen", points: 680, badges: ["first_report", "active_citizen", "civic_hero"], level: 7 },
      { name: "Sunita Devi", phone: "9611234570", pin: "445566", role: "citizen", points: 120, badges: ["first_report"], level: 2 },
      { name: "Ravi Singh", phone: "9511234571", pin: "556677", role: "citizen", points: 890, badges: ["first_report", "active_citizen", "civic_hero", "city_champion"], level: 9 },
      { name: "Deepa Malhotra", phone: "9411234572", pin: "667788", role: "citizen", points: 310, badges: ["first_report", "active_citizen"], level: 4 },
      { name: "Suresh Yadav", phone: "9311234573", pin: "778899", role: "citizen", points: 45, badges: ["new_citizen"], level: 1 },
      { name: "Kavita Aggarwal", phone: "9211234574", pin: "889900", role: "citizen", points: 750, badges: ["first_report", "active_citizen", "civic_hero"], level: 8 },
      { name: "Vikas Jain", phone: "8811234575", pin: "990011", role: "citizen", points: 195, badges: ["first_report"], level: 2 },
      { name: "Asha Kumari", phone: "8711234576", pin: "001122", role: "citizen", points: 430, badges: ["first_report", "active_citizen"], level: 5 },
    ];
    citizenSeeds.forEach(c => {
      const id = genId();
      this.users.set(id, { ...c, id, createdAt: new Date(Date.now() - rndInt(1, 365) * 86400000).toISOString() });
    });

    // Workers with geo positions
    WORKER_NAMES.forEach((name, i) => {
      const ward = WARDS_DATA[i % WARDS_DATA.length];
      const score = rndInt(55, 98);
      this.workers.push({
        id: `w${i}`,
        name,
        phone: `98${rndInt(10000000, 99999999)}`,
        ward: ward.name,
        wardNumber: ward.number,
        score,
        resolvedToday: rndInt(0, 8),
        totalResolved: rndInt(50, 500),
        avgRating: parseFloat((3 + Math.random() * 2).toFixed(1)),
        status: Math.random() < 0.7 ? "active" : Math.random() < 0.5 ? "idle" : "on_leave",
        currentTask: Math.random() < 0.6 ? rnd(["Inspecting pothole", "Garbage collection", "Fixing streetlight", "Pipeline repair", "Drain clearing", "Tree removal"]) : undefined,
        geo: perturbGeo(ward.center, 0.015),
      });
    });

    // 220 complaints with geo
    const cats: ComplaintCategory[] = ["pothole", "garbage", "streetlight", "water", "drain", "electricity", "tree", "other"];
    for (let i = 0; i < 220; i++) {
      const ward = rnd(WARDS_DATA);
      const category = rnd(cats);
      const hoursBack = rndInt(1, 720);
      const roll = Math.random();
      let status: ComplaintStatus =
        roll < 0.22 ? "pending" : roll < 0.42 ? "in_progress" : roll < 0.85 ? "resolved" : "closed";
      const pRoll = Math.random();
      let priority: Priority = pRoll < 0.08 ? "P1" : pRoll < 0.3 ? "P2" : pRoll < 0.65 ? "P3" : "P4";
      const isCluster = Math.random() < 0.15;
      const hasProof = status === "resolved" || status === "closed";
      const isDemo = i === 0; // first complaint from demo citizen

      this.complaints.push({
        id: genId(),
        ticketId: genTicketId(),
        category,
        description: rnd(COMPLAINT_DESCS[category]),
        location: `${rnd(LOCATIONS_PREFIX)}, ${ward.name}`,
        geo: perturbGeo(ward.center),
        ward: ward.name,
        wardNumber: ward.number,
        priority,
        status,
        submittedAt: hoursAgo(hoursBack),
        resolvedAt: hasProof ? hoursAgo(Math.max(1, hoursBack - rndInt(2, 48))) : undefined,
        submittedBy: isDemo ? "Demo Citizen" : WORKER_NAMES[rndInt(0, WORKER_NAMES.length - 1)],
        submittedByPhone: isDemo ? "9876543210" : undefined,
        workerName: status !== "pending" ? rnd(WORKER_NAMES) : undefined,
        upvotes: rndInt(0, 120),
        upvotedBy: [],
        isCluster,
        clusterSize: isCluster ? rndInt(5, 80) : undefined,
        aiScore: rndInt(62, 99),
        aiConfidence: rndInt(70, 98),
        hasProof,
        beforePhoto: hasProof ? `https://picsum.photos/seed/${i}/400/300` : undefined,
        afterPhoto: hasProof ? `https://picsum.photos/seed/${i + 300}/400/300` : undefined,
        rating: hasProof ? rndInt(2, 5) : undefined,
        feedback: hasProof && Math.random() < 0.5 ? rnd(["Good work!", "Could be better", "Very satisfied", "Quick resolution"]) : undefined,
        reopened: Math.random() < 0.08,
      });
    }
    this.complaints.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

    // SOS alerts
    const sosCats: SOSCategory[] = ["gas_leak", "water_burst", "electric_hazard", "fire_risk", "road_accident", "infrastructure", "women_safety", "medical"];
    const sosDescs: Record<SOSCategory, string> = {
      gas_leak: "Strong gas smell detected in residential block, evacuation needed",
      water_burst: "Major underground pipeline burst, road flooding and sinkhole risk",
      electric_hazard: "High-tension wire snapped and fallen across main road",
      fire_risk: "Smoke visible from 4th floor building window, fire confirmed",
      road_accident: "Multi-vehicle collision blocking NH-48, 3 injured",
      infrastructure: "Retaining wall collapse, debris blocking arterial road",
      women_safety: "Woman being harassed at Metro Station, immediate response needed",
      medical: "Elderly person collapsed on footpath, ambulance not reachable",
    };
    for (let i = 0; i < 8; i++) {
      const ward = rnd(WARDS_DATA);
      const cat = rnd(sosCats);
      const geo = perturbGeo(ward.center, 0.02);
      const near = this.getNearestPoliceStations(geo);
      let status: SOSAlert["status"] = i < 2 ? "active" : i < 5 ? "responding" : "resolved";
      this.sosAlerts.push({
        id: genId(),
        category: cat,
        description: sosDescs[cat],
        location: `${rnd(LOCATIONS_PREFIX)}, ${ward.name}`,
        geo,
        ward: ward.name,
        wardNumber: ward.number,
        triggeredAt: hoursAgo(rndInt(0, 24)),
        status,
        respondingWorker: status !== "active" ? rnd(WORKER_NAMES) : undefined,
        nearestPoliceStation: near[0]?.name,
        policeDistance: near[0] ? parseFloat(distanceKm(geo, near[0].geo).toFixed(2)) : undefined,
      });
    }

    this.recomputeWards();
    this.generateRiskZones();

    // Seed announcements
    const seedAnnouncements: Omit<Announcement, "id" | "postedAt" | "views">[] = [
      { title: "PM Awas Yojana — Urban Housing Applications Open", body: "Delhi Government invites applications for affordable housing under PM Awas Yojana Urban 2.0. Eligible families with annual income below ₹18 lakh can apply at DDA offices or online at dda.org.in. Last date: 31 March 2026.", type: "scheme", department: "Delhi Development Authority", priority: "important", postedBy: "SANKALP Admin", expiresAt: new Date(Date.now() + 30 * 86400000).toISOString() },
      { title: "Free Eye Checkup Camp — South Delhi Wards", body: "Delhi Health Department organising free eye checkup and spectacle distribution camps across South Delhi. Venue: Saket District Hospital, Timings: 9 AM–4 PM. Bring Aadhar card and ward resident proof.", type: "welfare", department: "Delhi Health Department", priority: "important", postedBy: "SANKALP Admin", targetWards: [4, 10] },
      { title: "MCD Property Tax Amnesty Scheme 2026", body: "Pay pending property tax dues with waiver of 100% penalty charges. Scheme valid till 31st March 2026. Visit nearest MCD zonal office or pay online at mcdonline.nic.in.", type: "scheme", department: "Municipal Corporation of Delhi", priority: "urgent", postedBy: "SANKALP Admin" },
      { title: "Water Supply Disruption — Rohini Sectors 4–9", body: "Due to emergency pipeline repair work, water supply will remain disrupted in Rohini Sectors 4–9 from 10 PM to 6 AM tonight. Water tankers will be deployed at designated points.", type: "emergency", department: "Delhi Jal Board", priority: "urgent", postedBy: "SANKALP Admin", targetWards: [5] },
      { title: "Skill Development Training for Youth — Free Enrollment", body: "Delhi Skill & Entrepreneurship University offering free vocational training in IT, beautician, electrician, plumbing trades for youth aged 18–35. Register at dseu.ac.in or call 1800-11-8899.", type: "welfare", department: "Delhi Skill & Entrepreneurship University", priority: "normal", postedBy: "SANKALP Admin" },
      { title: "Holi Public Holiday — All MCD Offices Closed", body: "All Municipal Corporation of Delhi offices and services will remain closed on Holi (14 March 2026). Emergency services including sanitation and water tankers will operate normally.", type: "holiday", department: "Government of NCT of Delhi", priority: "normal", postedBy: "SANKALP Admin" },
      { title: "Tender: LED Streetlight Installation Across 48 Wards", body: "MCD invites sealed tenders for supply and installation of 12,000 LED streetlights across 48 wards. Last date of submission: 10 April 2026. Download tender documents at mcdonline.nic.in/tenders.", type: "tender", department: "Municipal Corporation of Delhi", priority: "normal", postedBy: "SANKALP Admin" },
      { title: "Ration Card Digitisation Drive — Antyodaya Centers", body: "All ration cardholders are requested to visit their nearest Antyodaya Saral Kendra to link Aadhaar with ration card before 30 April 2026. Failure may result in suspension of ration benefits.", type: "general", department: "Food & Civil Supplies Department", priority: "important", postedBy: "SANKALP Admin" },
    ];
    seedAnnouncements.forEach(a => {
      this.announcements.push({ ...a, id: genId(), postedAt: hoursAgo(rndInt(1, 72)), views: rndInt(100, 5000) });
    });
    this.announcements.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }

  getNearestPoliceStations(geo: GeoPoint, count = 2): (PoliceStation & { distance: number })[] {
    return this.policeStations
      .map(ps => ({ ...ps, distance: parseFloat(distanceKm(geo, ps.geo).toFixed(2)) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, count);
  }

  private recomputeWards() {
    this.wards = WARDS_DATA.map(w => {
      const wc = this.complaints.filter(c => c.wardNumber === w.number);
      const resolved = wc.filter(c => c.status === "resolved" || c.status === "closed").length;
      const pending = wc.filter(c => c.status === "pending").length;
      const rated = wc.filter(c => c.rating !== undefined);
      const avgRating = rated.length > 0 ? rated.reduce((s, c) => s + (c.rating || 0), 0) / rated.length : 3;
      const reopened = wc.filter(c => c.reopened).length;
      const reopenRate = wc.length > 0 ? reopened / wc.length : 0;
      const resolutionPct = wc.length > 0 ? resolved / wc.length : 0;
      const healthScore = Math.min(100, Math.max(15, Math.round(
        resolutionPct * 50 +
        (avgRating / 5) * 25 +
        (1 - pending / Math.max(wc.length, 1)) * 15 +
        (1 - reopenRate) * 10
      )));
      const riskLevel: Ward["riskLevel"] = healthScore >= 75 ? "low" : healthScore >= 55 ? "medium" : healthScore >= 35 ? "high" : "critical";
      return {
        id: `ward${w.number}`,
        name: w.name,
        number: w.number,
        healthScore,
        totalComplaints: wc.length,
        resolvedComplaints: resolved,
        pendingComplaints: pending,
        avgResolutionHours: rndInt(4, 72),
        population: w.pop,
        area: w.area,
        center: w.center,
        riskLevel,
        satisfactionScore: parseFloat((avgRating * 20).toFixed(1)),
        reopenRate: parseFloat((reopenRate * 100).toFixed(1)),
      };
    });
  }

  private generateRiskZones() {
    this.riskZones = [];
    // Cluster complaint geos into risk zones
    const categories: Array<{ cat: ComplaintCategory; riskType: RiskZone["type"]; severity: RiskZone["severity"] }> = [
      { cat: "drain", riskType: "flood", severity: "high" },
      { cat: "garbage", riskType: "garbage", severity: "medium" },
      { cat: "pothole", riskType: "infrastructure", severity: "medium" },
      { cat: "electricity", riskType: "crime", severity: "low" },
    ];
    categories.forEach(({ cat, riskType, severity }) => {
      const catComplaints = this.complaints.filter(c => c.category === cat && c.status !== "resolved");
      WARDS_DATA.forEach(ward => {
        const wardCat = catComplaints.filter(c => c.wardNumber === ward.number);
        if (wardCat.length >= 3) {
          const avgLat = wardCat.reduce((s, c) => s + c.geo.lat, 0) / wardCat.length;
          const avgLng = wardCat.reduce((s, c) => s + c.geo.lng, 0) / wardCat.length;
          this.riskZones.push({
            id: genId(),
            type: riskType,
            severity: wardCat.length >= 8 ? "high" : wardCat.length >= 5 ? "medium" : "low",
            geo: { lat: avgLat, lng: avgLng },
            radius: Math.min(2, wardCat.length * 0.15),
            description: `${cat.charAt(0).toUpperCase() + cat.slice(1)} hotspot in ${ward.name}`,
            complaintCount: wardCat.length,
          });
        }
      });
    });
  }

  // Auth
  async findUserByPhone(phone: string): Promise<AppUser | undefined> {
    return Array.from(this.users.values()).find(u => u.phone === phone);
  }
  async createUser(data: Omit<AppUser, "id" | "createdAt">): Promise<AppUser> {
    const id = genId();
    const user: AppUser = { ...data, id, createdAt: new Date().toISOString() };
    this.users.set(id, user);
    return user;
  }
  async getUserById(id: string): Promise<AppUser | undefined> { return this.users.get(id); }

  createToken(userId: string): string {
    const token = randomUUID();
    this.tokens.set(token, { token, userId, expiresAt: Date.now() + 7 * 24 * 3600 * 1000 });
    return token;
  }
  validateToken(token: string): AppUser | null {
    const t = this.tokens.get(token);
    if (!t || t.expiresAt < Date.now()) return null;
    return this.users.get(t.userId) || null;
  }
  revokeToken(token: string) { this.tokens.delete(token); }

  // Points + badges
  awardPoints(userId: string, points: number, reason: string) {
    const user = this.users.get(userId);
    if (!user) return;
    user.points += points;
    user.level = Math.floor(user.points / 100) + 1;
    // Award badges
    if (user.points >= 50 && !user.badges.includes("active_citizen"))   user.badges.push("active_citizen");
    if (user.points >= 200 && !user.badges.includes("civic_hero"))      user.badges.push("civic_hero");
    if (user.points >= 500 && !user.badges.includes("city_champion"))   user.badges.push("city_champion");
    this.users.set(userId, user);
  }

  // Complaints
  getComplaints(): Complaint[] { return this.complaints; }
  getComplaintById(id: string): Complaint | undefined { return this.complaints.find(c => c.id === id); }

  createComplaint(data: Omit<Complaint, "id" | "ticketId" | "submittedAt" | "upvotes" | "upvotedBy" | "aiScore" | "aiConfidence">, userId?: string): Complaint {
    const c: Complaint = {
      ...data,
      id: genId(),
      ticketId: genTicketId(),
      submittedAt: new Date().toISOString(),
      upvotes: 0,
      upvotedBy: [],
      aiScore: rndInt(72, 96),
      aiConfidence: rndInt(75, 99),
    };
    this.complaints.unshift(c);
    if (userId) this.awardPoints(userId, 10, "complaint_filed");
    this.recomputeWards();
    this.generateRiskZones();
    this.broadcastEvent({ type: "new_complaint", complaint: c });
    return c;
  }

  upvoteComplaint(id: string, userId: string): Complaint | null {
    const idx = this.complaints.findIndex(c => c.id === id);
    if (idx === -1) return null;
    const c = this.complaints[idx];
    if (c.upvotedBy.includes(userId)) return c; // already upvoted
    this.complaints[idx] = { ...c, upvotes: c.upvotes + 1, upvotedBy: [...c.upvotedBy, userId] };
    this.awardPoints(userId, 2, "upvote");
    // Escalate priority if many upvotes
    if (this.complaints[idx].upvotes >= 20 && this.complaints[idx].priority === "P3") {
      this.complaints[idx] = { ...this.complaints[idx], priority: "P2" };
    }
    if (this.complaints[idx].upvotes >= 50 && this.complaints[idx].priority === "P2") {
      this.complaints[idx] = { ...this.complaints[idx], priority: "P1" };
    }
    this.broadcastEvent({ type: "upvote", complaintId: id, upvotes: this.complaints[idx].upvotes });
    return this.complaints[idx];
  }

  resolveComplaint(id: string, rating?: number, feedback?: string, afterPhoto?: string, userId?: string): Complaint | null {
    const idx = this.complaints.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.complaints[idx] = {
      ...this.complaints[idx],
      status: "resolved",
      resolvedAt: new Date().toISOString(),
      rating,
      feedback,
      afterPhoto: afterPhoto || this.complaints[idx].afterPhoto,
      hasProof: true,
    };
    if (userId) this.awardPoints(userId, 25, "complaint_resolved");
    this.recomputeWards();
    this.broadcastEvent({ type: "resolved", complaintId: id });
    return this.complaints[idx];
  }

  rejectResolution(id: string, userId: string): Complaint | null {
    const idx = this.complaints.findIndex(c => c.id === id);
    if (idx === -1) return null;
    const c = this.complaints[idx];
    const rejectedBy = [...(c.rejectedBy || []), userId];
    this.complaints[idx] = { ...c, status: "in_progress", rejectedBy, reopened: true };
    this.recomputeWards();
    return this.complaints[idx];
  }

  // SOS
  getSosAlerts(): SOSAlert[] { return this.sosAlerts; }

  createSos(data: Omit<SOSAlert, "id" | "triggeredAt">, userId?: string): SOSAlert {
    const near = this.getNearestPoliceStations(data.geo);
    const nearestPs = near[0];
    const user = userId ? this.users.get(userId) : undefined;
    const notifiedStations = near.slice(0, 2).map(ps => ({
      name: ps.name,
      phone: ps.phone,
      address: ps.address,
      distance: parseFloat(distanceKm(data.geo, ps.geo).toFixed(2)),
    }));
    const s: SOSAlert = {
      ...data,
      id: genId(),
      triggeredAt: new Date().toISOString(),
      triggeredByPhone: user?.phone,
      nearestPoliceStation: nearestPs?.name,
      nearestPolicePhone: nearestPs?.phone,
      policeDistance: nearestPs ? parseFloat(distanceKm(data.geo, nearestPs.geo).toFixed(2)) : undefined,
      notifiedStations,
      liveGeo: data.geo,
      liveUpdatedAt: new Date().toISOString(),
    };
    this.sosAlerts.unshift(s);
    if (userId) this.awardPoints(userId, 5, "sos_trigger");
    this.broadcastEvent({ type: "sos_new", alert: s });
    return s;
  }

  updateSosLocation(id: string, geo: GeoPoint): SOSAlert | null {
    const idx = this.sosAlerts.findIndex(s => s.id === id);
    if (idx === -1) return null;
    const near = this.getNearestPoliceStations(geo);
    const nearestPs = near[0];
    this.sosAlerts[idx] = {
      ...this.sosAlerts[idx],
      liveGeo: geo,
      liveUpdatedAt: new Date().toISOString(),
      nearestPoliceStation: nearestPs?.name || this.sosAlerts[idx].nearestPoliceStation,
      nearestPolicePhone: nearestPs?.phone || this.sosAlerts[idx].nearestPolicePhone,
      policeDistance: nearestPs ? parseFloat(distanceKm(geo, nearestPs.geo).toFixed(2)) : this.sosAlerts[idx].policeDistance,
    };
    this.broadcastEvent({ type: "sos_location_update", id, geo, liveUpdatedAt: this.sosAlerts[idx].liveUpdatedAt });
    return this.sosAlerts[idx];
  }

  resolveSos(id: string): SOSAlert | null {
    const idx = this.sosAlerts.findIndex(s => s.id === id);
    if (idx === -1) return null;
    this.sosAlerts[idx] = { ...this.sosAlerts[idx], status: "resolved", resolvedAt: new Date().toISOString() };
    this.broadcastEvent({ type: "sos_resolved", id });
    return this.sosAlerts[idx];
  }

  // Wards, Workers, Police, Risk
  getWards(): Ward[] { return this.wards; }
  getWorkers(): Worker[] { return this.workers; }
  getPoliceStations(): PoliceStation[] { return this.policeStations; }
  getRiskZones(): RiskZone[] { return this.riskZones; }

  // Leaderboard (top citizens by points)
  getLeaderboard(): { rank: number; name: string; phone: string; points: number; level: number; badges: string[] }[] {
    return Array.from(this.users.values())
      .filter(u => u.role === "citizen")
      .sort((a, b) => b.points - a.points)
      .slice(0, 20)
      .map((u, i) => ({ rank: i + 1, name: u.name, phone: u.phone.slice(0, 5) + "XXXXX", points: u.points, level: u.level, badges: u.badges }));
  }

  // Announcements
  getAnnouncements(): Announcement[] { return this.announcements; }

  createAnnouncement(data: Omit<Announcement, "id" | "postedAt" | "views">): Announcement {
    const ann: Announcement = { ...data, id: genId(), postedAt: new Date().toISOString(), views: 0 };
    this.announcements.unshift(ann);
    this.broadcastEvent({ type: "announcement", announcement: ann });
    return ann;
  }

  deleteAnnouncement(id: string): boolean {
    const idx = this.announcements.findIndex(a => a.id === id);
    if (idx === -1) return false;
    this.announcements.splice(idx, 1);
    return true;
  }

  incrementAnnouncementViews(id: string) {
    const idx = this.announcements.findIndex(a => a.id === id);
    if (idx !== -1) this.announcements[idx] = { ...this.announcements[idx], views: this.announcements[idx].views + 1 };
  }

  // Admin stats
  getAdminStats() {
    const total = this.complaints.length;
    const pending = this.complaints.filter(c => c.status === "pending").length;
    const inProgress = this.complaints.filter(c => c.status === "in_progress").length;
    const resolved = this.complaints.filter(c => c.status === "resolved" || c.status === "closed").length;
    const activeSos = this.sosAlerts.filter(s => s.status === "active").length;
    const avgHealth = this.wards.length ? Math.round(this.wards.reduce((s, w) => s + w.healthScore, 0) / this.wards.length) : 0;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todayComplaints = this.complaints.filter(c => new Date(c.submittedAt) >= today).length;
    const clusters = this.complaints.filter(c => c.isCluster).length;
    const p1Count = this.complaints.filter(c => c.priority === "P1").length;
    const avgAiScore = total ? Math.round(this.complaints.reduce((s, c) => s + c.aiScore, 0) / total) : 0;
    return { total, pending, inProgress, resolved, activeSos, avgHealth, todayComplaints, clusters, p1Count, avgAiScore, totalUsers: this.users.size, activeWorkers: this.workers.filter(w => w.status === "active").length };
  }
}

export const storage = new AppStorage();
