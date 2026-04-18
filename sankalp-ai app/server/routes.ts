import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "node:http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";

// ── AI REPLY ENGINE ───────────────────────────────────────────────────────────
function generateAIReply(message: string, history: Array<{ role: string; content: string }>): string {
  const msg = message.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|namaste|namaskar|hey|hola|good morning|good evening|good afternoon|नमस्ते|नमस्कार)/.test(msg)) {
    return "🙏 Namaste! Welcome to SANKALP AI — Delhi's civic intelligence platform.\n\nI can help you with:\n• 📋 Reporting civic issues (potholes, garbage, electricity, water)\n• 🔍 Tracking complaint status\n• 🆘 Emergency SOS & helplines\n• 🏛️ Government schemes & services\n• 🗺️ Ward information\n• 📊 Delhi city statistics\n\nWhat would you like help with today?";
  }

  // Complaint reporting
  if (/report|complaint|issue|submit|file|lodge|दर्ज/.test(msg)) {
    if (/pothole|गड्ढा/.test(msg)) {
      return "🕳️ **Reporting a Pothole in Delhi**\n\nSteps:\n1. Go to the **Complaints** tab\n2. Tap **+** to add a new complaint\n3. Select category: **Pothole**\n4. Enable location or enter manually\n5. Add a photo (recommended)\n6. Submit — you'll get a ticket ID\n\n📞 Alternatively call **PWD Helpline: 1800-11-0073**\n\n⚡ Your report gets an AI priority score and is assigned to the nearest PWD team within 24 hours.";
    }
    if (/garbage|trash|waste|कूड़ा|जूठ/.test(msg)) {
      return "🗑️ **Garbage / Waste Complaint**\n\nReport garbage issues:\n1. Open **Complaints** → tap **+**\n2. Select **Garbage Collection**\n3. Pin your location on the map\n4. Photo proof speeds up resolution\n\n📱 Also available: **Swachh Delhi App**\n📞 MCD Helpline: **1533**\n\nYour ward's cleanliness score updates in real-time on the **Analytics** tab.";
    }
    if (/water|पानी|supply/.test(msg)) {
      return "💧 **Water Supply Complaint**\n\n1. Go to **Complaints** tab → **+**\n2. Category: **Water Supply**\n3. Specify: low pressure / no supply / contamination\n4. Add your colony/ward name\n\n📞 Delhi Jal Board 24×7: **1916**\n🌐 Online: djb.gov.in\n\nTypical resolution: **4-8 hours** for supply issues, **24 hours** for infrastructure.";
    }
    if (/electricity|power|current|बिजली|light/.test(msg)) {
      return "⚡ **Electricity / Power Complaint**\n\n1. Complaints tab → **+** → **Electricity**\n2. Select: power cut / low voltage / street light / transformer\n3. Mention landmark for faster dispatch\n\n📞 BSES Rajdhani: **19123** (South/West Delhi)\n📞 BSES Yamuna: **19122** (East/Central)\n📞 TPDDL: **19124** (North/Northwest)\n\n🔦 Street light issues: Usually resolved within **48 hours**.";
    }
    if (/streetlight|street light|lamp/.test(msg)) {
      return "💡 **Street Light Complaint**\n\nDark streets are a safety hazard. Report quickly:\n1. Complaints → **+** → **Street Light**\n2. Drop pin on the exact location\n3. Mention pole number if visible\n\n📞 MCD Electric Wing: **011-23234700**\nAverage fix time: **2-3 working days**\n\nTip: Multiple reports from the same area get **P1 priority** automatically.";
    }
    if (/drain|sewer|sewage|नाली/.test(msg)) {
      return "🌊 **Drain / Sewage Complaint**\n\nFor blocked drains or sewer overflow:\n1. Complaints → **+** → **Drain**\n2. Mark location precisely\n3. Photo helps the team locate the blockage\n\n📞 Delhi Jal Board Sewerage: **1800-11-8000**\nMonsoon season: Priority escalated automatically.";
    }
    if (/tree|पेड़|fallen|branch/.test(msg)) {
      return "🌳 **Tree / Branch Complaint**\n\nFor fallen trees, dangerous branches:\n1. Complaints → **+** → **Tree**\n2. Mark exact location\n3. Urgency is auto-assessed by AI\n\n📞 MCD Tree Emergency: **1800-11-8000**\n⚠️ For fallen trees blocking roads: also call **100** (Police)\n\nSafety tip: Stay away from fallen electric lines near trees.";
    }
    return "📋 **Reporting a Civic Issue**\n\nHere's how to file any complaint:\n1. Tap the **Complaints** tab (bottom nav)\n2. Press **+** button\n3. Choose your issue category\n4. Add location, description & photo\n5. Submit — AI assigns priority instantly\n\n📌 Ticket ID generated immediately\n📊 Track real-time status updates\n\nWhat type of issue are you facing? I can guide you further.";
  }

  // Complaint tracking
  if (/track|status|ticket|complaint id|pending|update|कहाँ/.test(msg)) {
    return "🔍 **Tracking Your Complaint**\n\nTo check status:\n1. Go to **Complaints** tab\n2. Find your complaint or search by ticket ID\n3. Status updates: **Pending → In Progress → Resolved**\n\n📬 You'll receive notifications for every status change.\n\n**Status meanings:**\n🟡 **Pending** — Received, queued for assignment\n🔵 **In Progress** — Field worker dispatched\n🟢 **Resolved** — Issue fixed, please verify\n\nNeed help with a specific ticket number?";
  }

  // SOS / Emergency
  if (/sos|emergency|help|danger|unsafe|attack|rape|harassment|महिला|women safety|woman/.test(msg)) {
    return "🆘 **EMERGENCY HELP — Delhi**\n\n**IMMEDIATE HELP:**\n📞 **100** — Police Emergency\n📞 **112** — Unified Emergency\n📞 **1090** — Women Helpline (24×7)\n📞 **181** — Delhi Commission for Women\n📞 **1091** — Women Safety\n\n**In the App:**\n→ Go to **SOS** tab → Tap the red button\n→ Your GPS location is shared instantly with nearest police station\n\n⚠️ The SOS alert notifies Delhi Command Center immediately. You are not alone — help is on the way.";
  }

  // Wards
  if (/ward|वार्ड|area|locality|zone/.test(msg)) {
    const wards = storage.getWards();
    const wardNames = wards.slice(0, 5).map(w => `• ${w.name} — Score: ${w.healthScore}/100`).join("\n");
    return `🗺️ **Delhi Ward Information**\n\nDelhi is divided into ${wards.length} wards, each monitored by SANKALP AI.\n\n**Sample Ward Health Scores:**\n${wardNames}\n\n📊 View all wards on the **Analytics** tab\n🗺️ See ward boundaries on the **Map** tab\n\nEach ward score reflects:\n• Pending complaints\n• Resolution speed\n• SOS frequency\n• Cleanliness rating`;
  }

  // Government schemes
  if (/scheme|yojana|benefit|welfare|subsidy|pension|सरकारी|government|योजना/.test(msg)) {
    return "🏛️ **Delhi Government Schemes**\n\n**Popular Schemes:**\n🔹 **Mukhyamantri Mahila Samman Yojana** — ₹1000/month for women\n🔹 **Delhi Ration Card** — Free/subsidized food grains\n🔹 **Ladli Scheme** — Financial aid for girl child education\n🔹 **Senior Citizen Card** — 50% bus fare concession\n🔹 **Jal Shakti** — Free 20KL water per household\n🔹 **PM Awas Yojana** — Housing for all\n\n🌐 For applications: **delhi.gov.in**\n📞 CM Helpline: **1031**\n\nWant details on any specific scheme?";
  }

  // Hospital / Health
  if (/hospital|health|doctor|medical|ambulance|illness|sick|अस्पताल/.test(msg)) {
    return "🏥 **Delhi Health Services**\n\n**Emergency:**\n🚑 Ambulance: **102** (free)\n🚑 CATS Ambulance: **1099**\n\n**Major Govt Hospitals:**\n• AIIMS — 011-26588500\n• Safdarjung — 011-26707444\n• GTB Hospital — 011-22516868\n• Lok Nayak Hospital — 011-23234242\n• RML Hospital — 011-23404567\n\n**Free OPD:** Available at all Mohalla Clinics (2500+ across Delhi)\n📍 Find nearest: **delhimohallaclininic.in**\n\n💊 Delhi Dispensaries offer free medicines with Aadhaar.";
  }

  // Statistics / data
  if (/statistic|data|report|count|how many|total|analytics|स्थिति/.test(msg)) {
    const complaints = storage.getComplaints();
    const sos = storage.getSosAlerts();
    const wards = storage.getWards();
    const resolved = complaints.filter(c => c.status === "resolved").length;
    const pending = complaints.filter(c => c.status === "pending").length;
    const active = sos.filter(s => s.status === "active").length;
    const avgHealth = wards.length ? Math.round(wards.reduce((s, w) => s + w.healthScore, 0) / wards.length) : 0;

    return `📊 **SANKALP AI — Live Delhi Stats**\n\n**Complaints:**\n• Total: ${complaints.length}\n• Resolved: ${resolved} (${Math.round(resolved/Math.max(complaints.length,1)*100)}%)\n• Pending: ${pending}\n\n**Safety:**\n• Active SOS Alerts: ${active}\n• Wards monitored: ${wards.length}\n• Avg City Health Score: ${avgHealth}/100\n\n**AI Performance:**\n• Auto-prioritization: Active\n• Real-time monitoring: ✅\n• Last updated: Just now\n\nView detailed analytics in the **Analytics** tab →`;
  }

  // Pollution
  if (/pollution|smog|aqi|air quality|प्रदूषण/.test(msg)) {
    return "🌫️ **Delhi Air Quality & Pollution**\n\n📊 **Real-time AQI:** Check SAFAR India App or safar.tropmet.res.in\n\n**Health Guidelines:**\n• AQI 0-50: Good ✅\n• AQI 51-100: Satisfactory 🟡\n• AQI 101-200: Moderate 🟠\n• AQI 201-300: Poor 🔴\n• AQI 300+: Hazardous ⛔\n\n**Report Pollution Sources:**\n📞 DPCC Helpline: **1800-11-8000**\n📱 Report via Complaints tab → Other\n\n**Odd-Even:** Check Delhi traffic website for active restrictions.";
  }

  // Transport
  if (/bus|metro|dtc|traffic|transport|यातायात|सड़क/.test(msg)) {
    return "🚌 **Delhi Transport Services**\n\n**Delhi Metro:**\n📞 DMRC Helpline: **155370**\n📱 App: Delhi Metro Rail\n\n**DTC Bus:**\n📞 DTC Helpline: **011-23386699**\n🗺️ Real-time tracking: dtc.delhigovt.nic.in\n\n**Auto/Cab Complaints:**\n📞 Transport Dept: **011-23902023**\n\n**Traffic Police:**\n📞 **1095** (Traffic helpline)\n📸 Report signal jumping: delhitrafficpolice.nic.in\n\n**Road damage** → Report via Complaints tab → Pothole";
  }

  // Education
  if (/school|education|college|teacher|study|शिक्षा|स्कूल/.test(msg)) {
    return "🎓 **Delhi Education Services**\n\n**Admission Queries:**\n📞 DoE Helpline: **011-23890181**\n🌐 edudel.nic.in\n\n**Key Schemes:**\n• Free education in govt schools (Class 1-12)\n• Free uniforms, books & mid-day meals\n• Mission Buniyaad — foundational literacy\n• Deshbhakt Curriculum\n\n**Scholarships:**\n📞 SC/ST cell: **011-23890177**\n🌐 scholarships.gov.in\n\n**Report School Issues:**\n→ Complaints tab → Other → describe the issue\n→ Or call **1800-11-0031** (Education helpline)";
  }

  // Thanks / bye
  if (/thank|thanks|goodbye|bye|धन्यवाद|शुक्रिया/.test(msg)) {
    return "🙏 **Dhanyavaad!** Thank you for using SANKALP AI.\n\nRemember — every complaint you report helps make Delhi cleaner, safer and smarter.\n\n🌟 Your civic participation earns points on our **Leaderboard**!\n\n_जन भागीदारी से बदलेगी दिल्ली_ — Delhi will change with public participation.\n\nStay safe and feel free to ask anything anytime! 🇮🇳";
  }

  // Leaderboard / points / gamification
  if (/point|badge|leaderboard|reward|rank|gamif/.test(msg)) {
    return "🏆 **SANKALP AI — Civic Rewards**\n\nEarn points for civic participation:\n🔹 Report a complaint: **+10 pts**\n🔹 Complaint resolved: **+5 pts**\n🔹 Upvote others: **+1 pt**\n🔹 First report in area: **+20 pts**\n\n**Badges:**\n🥇 New Citizen, Problem Solver, Community Hero, Ward Champion, Delhi Guardian\n\nView your rank on the **Profile** tab → Leaderboard.\n\n_Be the change you wish to see in Delhi!_ 🌟";
  }

  // Default smart fallback
  const responses = [
    `I understand you're asking about "${message.slice(0, 40)}". As SANKALP AI, I specialize in Delhi civic services.\n\nHere's what I can help with:\n• 📋 Filing complaints (potholes, garbage, water, electricity)\n• 🔍 Tracking complaint status\n• 🆘 Emergency helplines & SOS\n• 🏛️ Government schemes & services\n• 📊 Delhi statistics & ward data\n• 🗺️ Finding local facilities\n\nCould you rephrase or choose from the quick options below?`,
    `Great question! For "${message.slice(0, 30)}..." I recommend:\n\n1. **Check the Complaints tab** for civic issues\n2. **Call Delhi helpline 1031** for general government queries\n3. **Visit delhi.gov.in** for official information\n\nI'm continuously learning to serve Delhi citizens better. Is there a specific area I can help you with?`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

function getToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const user = storage.validateToken(token);
  if (!user) return res.status(401).json({ message: "Invalid or expired token" });
  (req as any).user = user;
  next();
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const user = storage.validateToken(token);
  if (!user || user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
  (req as any).user = user;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // ── WebSocket Server ──────────────────────────────────────────────────
  const wss = new WebSocketServer({ server: httpServer, path: "/ws" });

  const broadcast = (data: any) => {
    const msg = JSON.stringify(data);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  };

  storage.addWsListener(broadcast);

  wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ type: "connected", message: "SANKALP AI Real-time connected" }));
    ws.on("error", () => {});
  });

  // ── AUTH ──────────────────────────────────────────────────────────────
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, phone, pin } = req.body;
      if (!name || !phone || !pin) return res.status(400).json({ message: "Name, phone, and PIN required" });
      if (pin.length !== 6) return res.status(400).json({ message: "PIN must be 6 digits" });
      if (phone.length !== 10) return res.status(400).json({ message: "Phone must be 10 digits" });
      const existing = await storage.findUserByPhone(phone);
      if (existing) return res.status(400).json({ message: "Phone number already registered" });
      const user = await storage.createUser({ name, phone, pin, role: "citizen", points: 0, badges: ["new_citizen"], level: 1 });
      const token = storage.createToken(user.id);
      res.json({ user: { id: user.id, name: user.name, phone: user.phone, role: user.role, points: user.points, badges: user.badges, level: user.level }, token });
    } catch { res.status(500).json({ message: "Registration failed" }); }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { phone, pin } = req.body;
      if (!phone || !pin) return res.status(400).json({ message: "Phone and PIN required" });
      const user = await storage.findUserByPhone(phone);
      if (!user || user.pin !== pin) return res.status(401).json({ message: "Invalid phone or PIN" });
      const token = storage.createToken(user.id);
      res.json({ user: { id: user.id, name: user.name, phone: user.phone, role: user.role, points: user.points, badges: user.badges, level: user.level }, token });
    } catch { res.status(500).json({ message: "Login failed" }); }
  });

  app.get("/api/auth/me", requireAuth, (req, res) => {
    const u = (req as any).user;
    res.json({ id: u.id, name: u.name, phone: u.phone, role: u.role, points: u.points, badges: u.badges, level: u.level });
  });

  app.post("/api/auth/logout", requireAuth, (req, res) => {
    const token = getToken(req);
    if (token) storage.revokeToken(token);
    res.json({ success: true });
  });

  // ── COMPLAINTS ────────────────────────────────────────────────────────
  app.get("/api/complaints", requireAuth, (req, res) => {
    res.json(storage.getComplaints());
  });

  app.post("/api/complaints", requireAuth, (req, res) => {
    const user = (req as any).user;
    const { category, description, location, geo, ward, wardNumber, priority } = req.body;
    if (!category || !description || !location) return res.status(400).json({ message: "category, description, location required" });
    const complaint = storage.createComplaint({
      category, description, location,
      geo: geo || { lat: 28.6139, lng: 77.2090 },
      ward: ward || "Central Delhi",
      wardNumber: wardNumber || 1,
      priority: priority || "P3",
      status: "pending",
      submittedBy: user.name,
      submittedByPhone: user.phone,
      isCluster: false,
    }, user.id);
    res.status(201).json(complaint);
  });

  app.put("/api/complaints/:id/upvote", requireAuth, (req, res) => {
    const user = (req as any).user;
    const complaint = storage.upvoteComplaint(req.params.id, user.id);
    if (!complaint) return res.status(404).json({ message: "Not found" });
    res.json(complaint);
  });

  app.put("/api/complaints/:id/resolve", requireAuth, (req, res) => {
    const user = (req as any).user;
    const { rating, feedback, afterPhoto } = req.body;
    const complaint = storage.resolveComplaint(req.params.id, rating, feedback, afterPhoto, user.id);
    if (!complaint) return res.status(404).json({ message: "Not found" });
    res.json(complaint);
  });

  app.put("/api/complaints/:id/reject", requireAuth, (req, res) => {
    const user = (req as any).user;
    const complaint = storage.rejectResolution(req.params.id, user.id);
    if (!complaint) return res.status(404).json({ message: "Not found" });
    res.json(complaint);
  });

  // ── SOS ───────────────────────────────────────────────────────────────
  app.get("/api/sos", requireAuth, (req, res) => {
    res.json(storage.getSosAlerts());
  });

  app.post("/api/sos", requireAuth, (req, res) => {
    const user = (req as any).user;
    const { category, description, location, geo, ward, wardNumber } = req.body;
    if (!category) return res.status(400).json({ message: "category required" });
    const geoPoint = geo || { lat: 28.6139, lng: 77.2090 };
    const alert = storage.createSos({
      category,
      description: description || "Emergency reported via SANKALP AI",
      location: location || "Location via GPS",
      geo: geoPoint,
      ward: ward || "Central Delhi",
      wardNumber: wardNumber || 1,
      status: "active",
      triggeredBy: user.name,
    }, user.id);
    res.status(201).json(alert);
  });

  app.put("/api/sos/:id/location", requireAuth, (req, res) => {
    const { lat, lng } = req.body;
    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({ message: "lat and lng (numbers) required" });
    }
    const alert = storage.updateSosLocation(req.params.id, { lat, lng });
    if (!alert) return res.status(404).json({ message: "SOS alert not found" });
    res.json(alert);
  });

  app.put("/api/sos/:id/resolve", requireAdmin, (req, res) => {
    const alert = storage.resolveSos(req.params.id);
    if (!alert) return res.status(404).json({ message: "Not found" });
    res.json(alert);
  });

  // ── CITY DATA ─────────────────────────────────────────────────────────
  app.get("/api/wards", requireAuth, (req, res) => {
    res.json(storage.getWards());
  });

  app.get("/api/workers", requireAuth, (req, res) => {
    res.json(storage.getWorkers());
  });

  app.get("/api/police-stations", requireAuth, (req, res) => {
    res.json(storage.getPoliceStations());
  });

  app.get("/api/risk-zones", requireAuth, (req, res) => {
    res.json(storage.getRiskZones());
  });

  app.get("/api/nearest-police", requireAuth, (req, res) => {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: "lat and lng required" });
    const stations = storage.getNearestPoliceStations({ lat: parseFloat(lat as string), lng: parseFloat(lng as string) }, 3);
    res.json(stations);
  });

  app.get("/api/leaderboard", requireAuth, (req, res) => {
    res.json(storage.getLeaderboard());
  });

  // ── ADMIN ─────────────────────────────────────────────────────────────
  app.get("/api/admin/stats", requireAdmin, (req, res) => {
    res.json(storage.getAdminStats());
  });

  app.get("/api/admin/complaints", requireAdmin, (req, res) => {
    const { status, priority, ward } = req.query;
    let complaints = storage.getComplaints();
    if (status) complaints = complaints.filter(c => c.status === status);
    if (priority) complaints = complaints.filter(c => c.priority === priority);
    if (ward) complaints = complaints.filter(c => c.wardNumber === Number(ward));
    res.json(complaints);
  });

  app.get("/api/admin/alerts", requireAdmin, (req, res) => {
    res.json(storage.getSosAlerts());
  });

  app.get("/api/admin/workers", requireAdmin, (req, res) => {
    res.json(storage.getWorkers());
  });

  app.get("/api/admin/risk-zones", requireAdmin, (req, res) => {
    res.json(storage.getRiskZones());
  });

  // ── ADMIN EMERGENCY BROADCAST ────────────────────────────────────────
  app.post("/api/admin/emergency-broadcast", requireAdmin, (req, res) => {
    const { message, severity } = req.body;
    broadcast({
      type: "emergency_broadcast",
      message: message || "CITY-WIDE EMERGENCY ALERT: Take immediate precautions. Follow official instructions.",
      severity: severity || "high",
      timestamp: new Date().toISOString(),
    });
    res.json({ success: true });
  });

  // ── WOMEN SAFETY NOTIFY ───────────────────────────────────────────────
  app.post("/api/sos/women-safety", requireAuth, (req, res) => {
    const user = (req as any).user;
    const { geo, location, audioRecording } = req.body;
    const geoPoint = geo || { lat: 28.6139, lng: 77.2090 };
    const nearestStations = storage.getNearestPoliceStations(geoPoint, 2);
    const alert = storage.createSos({
      category: "women_safety",
      description: "PANIC SOS — Women Safety Emergency triggered by citizen app",
      location: location || `GPS: ${geoPoint.lat.toFixed(4)}, ${geoPoint.lng.toFixed(4)}`,
      geo: geoPoint,
      ward: "Central Delhi",
      wardNumber: 1,
      status: "active",
      triggeredBy: user.name,
      nearestPoliceStation: nearestStations[0]?.name,
      policeDistance: (nearestStations[0] as any)?.distance,
    }, user.id);
    broadcast({
      type: "women_safety_sos",
      alert,
      nearestStations: nearestStations.slice(0, 2),
      audioAvailable: !!audioRecording,
      timestamp: new Date().toISOString(),
    });
    res.status(201).json({ alert, nearestStations: nearestStations.slice(0, 2) });
  });

  // ── ANNOUNCEMENTS ─────────────────────────────────────────────────────
  app.get("/api/announcements", requireAuth, (req, res) => {
    storage.getAnnouncements().forEach(a => storage.incrementAnnouncementViews(a.id));
    res.json(storage.getAnnouncements());
  });

  app.post("/api/announcements", requireAdmin, (req, res) => {
    const user = (req as any).user;
    const { title, body, type, department, priority, targetWards, link, expiresAt } = req.body;
    if (!title || !body) return res.status(400).json({ message: "title and body required" });
    const ann = storage.createAnnouncement({
      title, body,
      type: type || "general",
      department: department || "Government of NCT of Delhi",
      priority: priority || "normal",
      postedBy: user.name,
      targetWards: targetWards || [],
      link,
      expiresAt,
    });
    res.status(201).json(ann);
  });

  app.delete("/api/announcements/:id", requireAdmin, (req, res) => {
    const ok = storage.deleteAnnouncement(req.params.id);
    if (!ok) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  });

  // ── AI CHAT ───────────────────────────────────────────────────────────
  app.post("/api/ai/chat", requireAuth, async (req, res) => {
    try {
      const { message, history } = req.body as {
        message: string;
        history?: Array<{ role: string; content: string }>;
      };
      if (!message) return res.status(400).json({ message: "Message required" });

      const reply = generateAIReply(message, history || []);
      res.json({ reply });
    } catch {
      res.status(500).json({ reply: "I'm unable to process your request right now. Please try again." });
    }
  });

  // ── POLLING ───────────────────────────────────────────────────────────
  // Polling endpoint for real-time updates
  app.get("/api/updates", requireAuth, (req, res) => {
    const { since } = req.query;
    const sinceTime = since ? new Date(since as string).getTime() : Date.now() - 60000;
    const complaints = storage.getComplaints().filter(c => new Date(c.submittedAt).getTime() > sinceTime);
    const sos = storage.getSosAlerts().filter(s => new Date(s.triggeredAt).getTime() > sinceTime);
    res.json({ complaints, sos, timestamp: new Date().toISOString() });
  });

  return httpServer;
}
