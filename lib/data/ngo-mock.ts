
export const NGO_USER = {
  name: "Aditi Sharma",
  title: "Executive Director & Field Commander",
  organization: "Jodhpur Seva & Green Foundation",
  avatar: "AS",
  avatarImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
  location: "Jodhpur, Rajasthan",
  email: "aditi.sharma@jodhpurseva.org",
  phone: "+91 98290 14820",
  darpanId: "RJ/2022/0319482",
  regNumber: "80G/12A-JOD-2021",
  bio: "Leading grassroot community volunteers, urban waste reduction, and lake ecosystem restoration drives across Jodhpur Municipal Corporation wards.",
  establishedYear: 2018,
};

export interface NgoVolunteer {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  skills: string[];
  status: "Available" | "Deployed" | "On Leave";
  hours: number;
  drivesCompleted: number;
  assignedDrive?: string;
  rating: number;
}

export const NGO_VOLUNTEERS: NgoVolunteer[] = [
  {
    id: "v1",
    name: "Ravi Kumar",
    phone: "+91 94140 32189",
    avatar: "RK",
    skills: ["Field Survey", "Tree Planting", "Crowd Safety"],
    status: "Deployed",
    hours: 85,
    drivesCompleted: 14,
    assignedDrive: "Kaylana Lake Cleanliness Drive",
    rating: 4.9,
  },
  {
    id: "v2",
    name: "Priya Singh",
    phone: "+91 98280 44210",
    avatar: "PS",
    skills: ["Community Outreach", "Medical First Aid", "Data Logging"],
    status: "Available",
    hours: 140,
    drivesCompleted: 22,
    rating: 5.0,
  },
  {
    id: "v3",
    name: "Amit Patel",
    phone: "+91 97830 55192",
    avatar: "AP",
    skills: ["Waste Segregation", "Heavy Tool Logistics", "Drone Recon"],
    status: "Deployed",
    hours: 112,
    drivesCompleted: 18,
    assignedDrive: "Sector 8 Drainage Clearance",
    rating: 4.8,
  },
  {
    id: "v4",
    name: "Sneha Desai",
    phone: "+91 96020 88204",
    avatar: "SD",
    skills: ["First Aid", "Awareness Camps", "Social Photography"],
    status: "Available",
    hours: 68,
    drivesCompleted: 9,
    rating: 4.7,
  },
  {
    id: "v5",
    name: "Manish Solanki",
    phone: "+91 94600 77123",
    avatar: "MS",
    skills: ["Masonry Patching", "Traffic Control", "Sanitation"],
    status: "Deployed",
    hours: 94,
    drivesCompleted: 15,
    assignedDrive: "Ratanada Flyover Pedestrian Safety",
    rating: 4.9,
  },
  {
    id: "v6",
    name: "Deepika Bhati",
    phone: "+91 98299 11984",
    avatar: "DB",
    skills: ["Water Sampling", "Lab Coordination", "Youth Mobilization"],
    status: "Available",
    hours: 104,
    drivesCompleted: 16,
    rating: 4.8,
  },
];

export interface NgoDrive {
  id: string;
  title: string;
  category: "Sanitation & Waste" | "Water Body Revival" | "Green Cover" | "Disaster Relief" | "Public Safety";
  location: string;
  ward: string;
  scheduledDate: string;
  status: "Active Now" | "Scheduled" | "Completed";
  volunteersRequired: number;
  volunteersRegistered: number;
  budgetAllocated: number;
  budgetSpent: number;
  equipment: string[];
  csrSponsor: string;
  description: string;
}

export const NGO_DRIVES: NgoDrive[] = [
  {
    id: "drv-101",
    title: "Kaylana Lake Shoreline Plastic & Debris Clearance",
    category: "Water Body Revival",
    location: "Kaylana Lake West Shore",
    ward: "Ward 4 (Kaylana Catchment)",
    scheduledDate: "Today · 08:00 AM – 02:00 PM",
    status: "Active Now",
    volunteersRequired: 25,
    volunteersRegistered: 28,
    budgetAllocated: 20000,
    budgetSpent: 16800,
    equipment: ["Bio-degradable bags", "Floating trash booms", "Protective gloves", "Water testing kits"],
    csrSponsor: "Tata Steel CSR Foundation",
    description: "Multi-squad mobilization removing floating plastics and industrial runoff debris to protect drinking water supply foundation.",
  },
  {
    id: "drv-102",
    title: "Sector 8 Stormwater Canal Sludge Clearance",
    category: "Sanitation & Waste",
    location: "Sector 8 Main Road Junction",
    ward: "Ward 8 (Old City)",
    scheduledDate: "Tomorrow · 07:30 AM",
    status: "Scheduled",
    volunteersRequired: 15,
    volunteersRegistered: 12,
    budgetAllocated: 12500,
    budgetSpent: 4200,
    equipment: ["Long-arm rakes", "Sludge pumps", "Safety boots", "Lime powder"],
    csrSponsor: "GreenCity Environmental SPV",
    description: "Pre-monsoon de-clogging of storm drainage canal preventing overflow into nearby residential basements.",
  },
  {
    id: "drv-103",
    title: "Mehrangarh Foot-Trail Native Flora Reforestation",
    category: "Green Cover",
    location: "Rao Jodha Desert Rock Park Border",
    ward: "Ward 1 (Heritage Zone)",
    scheduledDate: "Sat 20 Sep 2026",
    status: "Scheduled",
    volunteersRequired: 35,
    volunteersRegistered: 31,
    budgetAllocated: 35000,
    budgetSpent: 8000,
    equipment: ["500 Native saplings (Kair & Khejri)", "Drip pipes", "Digging augers", "Organic compost"],
    csrSponsor: "City Power Grid Sustainability CSR",
    description: "Planting drought-resistant native arid trees on ridge slopes to stop soil erosion and restore microclimate.",
  },
  {
    id: "drv-104",
    title: "Ratanada Bridge Pedestrian Safety & Pothole Cold-Patching",
    category: "Public Safety",
    location: "Ratanada Overpass",
    ward: "Ward 7",
    scheduledDate: "Completed 3 days ago",
    status: "Completed",
    volunteersRequired: 10,
    volunteersRegistered: 10,
    budgetAllocated: 15000,
    budgetSpent: 14200,
    equipment: ["Cold mix asphalt bags", "Hand tampers", "Reflective cones"],
    csrSponsor: "Metro Roads CSR Wing",
    description: "Community-assisted rapid patching of 6 critical potholes while IIT Jodhpur civil squad verified structural deflection.",
  },
];

export interface NgoGrant {
  id: string;
  projectTitle: string;
  funderName: string;
  funderLogo: string;
  amountRequested: number;
  amountApproved: number;
  amountDisbursed: number;
  status: "Approved & Active" | "Under CSR Review" | "Completed";
  progressPct: number;
  targetDate: string;
  milestoneDescription: string;
}

export const NGO_GRANTS: NgoGrant[] = [
  {
    id: "gr-01",
    projectTitle: "Project Neer: Kaylana Lake Water Quality Restoration",
    funderName: "Tata Steel CSR Foundation",
    funderLogo: "TS",
    amountRequested: 350000,
    amountApproved: 350000,
    amountDisbursed: 240000,
    status: "Approved & Active",
    progressPct: 68,
    targetDate: "Dec 2026",
    milestoneDescription: "Phase 2 Bio-retention swales installed & 12,000kg plastic waste diverted.",
  },
  {
    id: "gr-02",
    projectTitle: "Clean Air Corridor: 2,500 Native Tree Plantations",
    funderName: "GreenCity Environmental SPV",
    funderLogo: "GC",
    amountRequested: 180000,
    amountApproved: 180000,
    amountDisbursed: 180000,
    status: "Completed",
    progressPct: 100,
    targetDate: "Aug 2026",
    milestoneDescription: "All 2,500 saplings planted with 92% verified survival rate on geotagged dashboard.",
  },
  {
    id: "gr-03",
    projectTitle: "Rapid Ward Monsoon Emergency Response Van",
    funderName: "City Power Grid CSR",
    funderLogo: "CP",
    amountRequested: 220000,
    amountApproved: 200000,
    amountDisbursed: 100000,
    status: "Approved & Active",
    progressPct: 50,
    targetDate: "Oct 2026",
    milestoneDescription: "Vehicle equipped with submersible pumps, cutting saws, and volunteer first aid kits.",
  },
  {
    id: "gr-04",
    projectTitle: "Smart Waste Segregation Centers in Old City Wards",
    funderName: "Municipal Innovation Grant",
    funderLogo: "MI",
    amountRequested: 400000,
    amountApproved: 0,
    amountDisbursed: 0,
    status: "Under CSR Review",
    progressPct: 15,
    targetDate: "Jan 2027",
    milestoneDescription: "AI Proposal submitted; waiting for Municipal Commissioner committee sign-off.",
  },
];

export interface NgoImpactProof {
  id: string;
  issueTitle: string;
  location: string;
  ward: string;
  resolvedDate: string;
  beneficiaries: number;
  beforeImage: string;
  afterImage: string;
  verifiedBy: string;
  category: string;
}

export const NGO_IMPACT_PROOFS: NgoImpactProof[] = [
  {
    id: "imp-01",
    issueTitle: "Hazardous Industrial Sludge Spill & Overflow",
    location: "Near Basni Phase II Drain",
    ward: "Ward 9",
    resolvedDate: "12 Sep 2026",
    beneficiaries: 3400,
    beforeImage: "https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg?auto=compress&cs=tinysrgb&w=300",
    afterImage: "https://images.pexels.com/photos/1578750/pexels-photo-1578750.jpeg?auto=compress&cs=tinysrgb&w=300",
    verifiedBy: "AI Vision + Municipal Inspector Sharma",
    category: "Drainage & Safety",
  },
  {
    id: "imp-02",
    issueTitle: "Open Waste Dump Converted to Community Herb Garden",
    location: "Sector 14 Corner Plot",
    ward: "Ward 14",
    resolvedDate: "04 Sep 2026",
    beneficiaries: 1800,
    beforeImage: "https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg?auto=compress&cs=tinysrgb&w=300",
    afterImage: "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=300",
    verifiedBy: "Citizen Ward Council Upvotes",
    category: "Zero-Waste & Green Space",
  },
];

export const NGO_ACHIEVEMENTS = [
  {
    id: "ach-1",
    title: "NITI Aayog Darpan Gold Star",
    description: "100% compliant audited NGO for 4 consecutive years",
    icon: "ShieldCheck",
    color: "amber",
  },
  {
    id: "ach-2",
    title: "Zero-Waste City Vanguard",
    description: "Diverted over 45 metric tons of municipal plastic from landfills",
    icon: "Award",
    color: "emerald",
  },
  {
    id: "ach-3",
    title: "Rapid Emergency First-Fix",
    description: "Executed 12 field repairs in under 24 hours during storm alert",
    icon: "Zap",
    color: "teal",
  },
];


