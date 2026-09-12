// ---------------------------------------------------------------------------
// Samadhan AI University Portal — mock data
// Ported from "Sarthak's App" (js/data.js: universities/teams/reports/caseStudies).
// University portal scope only — no citizen phone mockup.
// ---------------------------------------------------------------------------

export interface UniversityCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
}

export const UNIVERSITY_CATEGORIES: UniversityCategory[] = [
  { id: "roads", name: "Roads & Infrastructure", icon: "truck", color: "#059669", bg: "#ecfdf5" },
  { id: "water", name: "Water & Sanitation", icon: "droplet", color: "#0284c7", bg: "#f0f9ff" },
  { id: "electricity", name: "Electricity", icon: "zap", color: "#eab308", bg: "#fefce8" },
  { id: "garbage", name: "Garbage Management", icon: "trash-2", color: "#16a34a", bg: "#f0fdf4" },
  { id: "environment", name: "Environment", icon: "leaf", color: "#10b981", bg: "#ecfdf5" },
  { id: "transport", name: "Public Transport", icon: "bus", color: "#0ea5e9", bg: "#f0f9ff" },
  { id: "health", name: "Health & Hygiene", icon: "heart", color: "#e11d48", bg: "#fff1f2" },
  { id: "education", name: "Education", icon: "graduation-cap", color: "#4f46e5", bg: "#eef2ff" },
  { id: "other", name: "Other", icon: "more-horizontal", color: "#64748b", bg: "#f8fafc" },
];

export interface University {
  id: string;
  name: string;
  type: string;
  location: string;
  expertise: string;
  logo: string;
  matchScore: string;
  isRecommended: boolean;
}

export const UNIVERSITIES: University[] = [
  {
    id: "iit-jodhpur",
    name: "IIT Jodhpur",
    type: "Central / Premier",
    location: "Jodhpur, Rajasthan",
    expertise: "Civil, Environmental",
    logo: "https://images.pexels.com/photos/5147366/pexels-photo-5147366.jpeg?auto=compress&cs=tinysrgb&w=600",
    matchScore: "98% Match",
    isRecommended: true,
  },
  {
    id: "mody-univ",
    name: "Mody University",
    type: "Private",
    location: "Lakshmangarh, Rajasthan",
    expertise: "Water, Sanitation, Civil",
    logo: "https://images.pexels.com/photos/31039051/pexels-photo-31039051.jpeg?auto=compress&cs=tinysrgb&w=600",
    matchScore: "89% Match",
    isRecommended: false,
  },
  {
    id: "govt-poly",
    name: "Govt. Polytechnic College",
    type: "State",
    location: "Jodhpur, Rajasthan",
    expertise: "Infrastructure, Electrical",
    logo: "https://images.pexels.com/photos/8500353/pexels-photo-8500353.jpeg?auto=compress&cs=tinysrgb&w=600",
    matchScore: "84% Match",
    isRecommended: false,
  },
  {
    id: "aiims-jodhpur",
    name: "AIIMS Jodhpur",
    type: "Central / Medical",
    location: "Jodhpur, Rajasthan",
    expertise: "Health, Sanitation",
    logo: "https://images.pexels.com/photos/4421486/pexels-photo-4421486.jpeg?auto=compress&cs=tinysrgb&w=600",
    matchScore: "78% Match",
    isRecommended: false,
  },
  {
    id: "dr-sr-univ",
    name: "Dr. S. R. Rajasthan University",
    type: "State",
    location: "Jodhpur, Rajasthan",
    expertise: "Research & Innovation",
    logo: "https://images.pexels.com/photos/39234285/pexels-photo-39234285.jpeg?auto=compress&cs=tinysrgb&w=600",
    matchScore: "75% Match",
    isRecommended: false,
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  selected: boolean;
}

export interface UniversityTeam {
  id: string;
  name: string;
  studentCount: number;
  facultyAdvisor: string;
  students: string[];
  members: TeamMember[];
  status: "Available" | "On Assignment";
  selected: boolean;
}

export const UNIVERSITY_TEAMS: UniversityTeam[] = [
  {
    id: "civil-team",
    name: "Civil Engineering Team",
    studentCount: 4,
    facultyAdvisor: "Dr. Ananya Sharma (Prof., Civil Engg Dept)",
    students: [
      "Rahul Meena (Team Lead - B.Tech Final Year)",
      "Priya Verma (Structural Analysis)",
      "Amit Joshi (Materials & Asphalt Testing)",
      "Sneha Roy (Survey & Geotechnical)",
    ],
    members: [
      { id: "m1", name: "Rahul Meena", role: "Team Lead", selected: true },
      { id: "m2", name: "Priya Verma", role: "Structural Analysis", selected: false },
      { id: "m3", name: "Amit Joshi", role: "Materials Testing", selected: false },
      { id: "m4", name: "Sneha Roy", role: "Survey & Geotech", selected: false },
    ],
    status: "Available",
    selected: true,
  },
  {
    id: "env-team",
    name: "Environmental Team",
    studentCount: 5,
    facultyAdvisor: "Prof. Vikramaditya Patel (Assoc. Prof., Environmental Engg)",
    students: [
      "Neha Sharma (Lead - M.Tech)",
      "Rohan Gupta (Drainage & Hydrology)",
      "Aryan Sen (Environmental Impact)",
      "Kavita Rao (GIS Mapping)",
      "Divya Iyer (Waste & Soil Assessment)",
    ],
    members: [
      { id: "m5", name: "Neha Sharma", role: "Lead - M.Tech", selected: false },
      { id: "m6", name: "Rohan Gupta", role: "Drainage & Hydrology", selected: false },
      { id: "m7", name: "Aryan Sen", role: "Environmental Impact", selected: false },
      { id: "m8", name: "Kavita Rao", role: "GIS Mapping", selected: false },
      { id: "m9", name: "Divya Iyer", role: "Waste & Soil", selected: false },
    ],
    status: "Available",
    selected: false,
  },
  {
    id: "infra-team",
    name: "Infrastructure Team",
    studentCount: 4,
    facultyAdvisor: "Dr. K. R. Verma (Assistant Prof., Urban Planning)",
    students: [
      "Siddharth Rao (Lead - B.Tech)",
      "Ananya Singh (Pavement Design)",
      "Vikas Kumar (Traffic & Safety)",
      "Manish Dave (Field Operations)",
    ],
    members: [
      { id: "m10", name: "Siddharth Rao", role: "Lead - B.Tech", selected: false },
      { id: "m11", name: "Ananya Singh", role: "Pavement Design", selected: false },
      { id: "m12", name: "Vikas Kumar", role: "Traffic & Safety", selected: false },
      { id: "m13", name: "Manish Dave", role: "Field Ops", selected: false },
    ],
    status: "Available",
    selected: false,
  },
];

export type UniversityReportStatus = "In Progress" | "Assigned" | "Pending" | "Resolved";

export interface ReportTimelineItem {
  title: string;
  time: string;
  done: boolean;
}

export interface UniversityReport {
  id: string;
  title: string;
  location: string;
  category: string;
  status: UniversityReportStatus;
  statusColor: "amber" | "blue" | "gray" | "emerald";
  assignedTo: string;
  assignedTeam: string;
  updatedAgo: string;
  thumbnail: string;
  banner: string;
  description: string;
  urgency: "High" | "Medium" | "Low";
  progressStep: number;
  timeline: ReportTimelineItem[];
  sitePhotos: string[];
}

export const UNIVERSITY_REPORTS: UniversityReport[] = [
  {
    id: "rep-001",
    title: "Road Damage Near Main Market",
    location: "Ratanda, Jodhpur, Rajasthan",
    category: "Roads & Infrastructure",
    status: "In Progress",
    statusColor: "amber",
    assignedTo: "IIT Jodhpur",
    assignedTeam: "Civil Engineering Team (4 students + Dr. A. Sharma)",
    updatedAgo: "Updated 2 days ago",
    thumbnail: "https://images.pexels.com/photos/6333640/pexels-photo-6333640.jpeg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/34053335/pexels-photo-34053335.jpeg?auto=compress&cs=tinysrgb&w=1200",
    description:
      "The road near the main market has large potholes and it is difficult for vehicles and pedestrians to move. It also causes water logging during rain.",
    urgency: "Medium",
    progressStep: 2,
    timeline: [
      { title: "Team visited the location", time: "2 hours ago", done: true },
      { title: "Assessment in progress", time: "1 day ago", done: true },
      { title: "Initial review completed", time: "2 days ago", done: true },
      { title: "Issue assigned to IIT Jodhpur", time: "3 days ago", done: true },
    ],
    sitePhotos: [
      "https://images.pexels.com/photos/9960982/pexels-photo-9960982.png?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3876465/pexels-photo-3876465.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/22880409/pexels-photo-22880409.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: "rep-002",
    title: "Garbage Overflow in Ward No. 12",
    location: "Shastri Nagar, Jodhpur",
    category: "Garbage Management",
    status: "Assigned",
    statusColor: "blue",
    assignedTo: "Mody University",
    assignedTeam: "Waste Management Cell (5 students + Prof. V. Patel)",
    updatedAgo: "Updated 4 days ago",
    thumbnail: "https://images.pexels.com/photos/19156793/pexels-photo-19156793.jpeg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/19156793/pexels-photo-19156793.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Public bins have overflowed for over a week, leading to stray animal nuisance and hygiene risk.",
    urgency: "High",
    progressStep: 0,
    timeline: [{ title: "Assigned to Mody University Team", time: "4 days ago", done: true }],
    sitePhotos: [
      "https://images.pexels.com/photos/15085131/pexels-photo-15085131.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: "rep-003",
    title: "Water Leakage in Sector 5",
    location: "Sector 5, Chopasni Road, Jodhpur",
    category: "Water & Sanitation",
    status: "Pending",
    statusColor: "gray",
    assignedTo: "AIIMS Jodhpur",
    assignedTeam: "Sanitation Taskforce (4 students + Dr. K. Verma)",
    updatedAgo: "Updated 6 days ago",
    thumbnail: "https://images.pexels.com/photos/15206136/pexels-photo-15206136.jpeg?auto=compress&cs=tinysrgb&w=800",
    banner: "https://images.pexels.com/photos/15206136/pexels-photo-15206136.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Underground main pipeline rupture causing pure drinking water flooding across street.",
    urgency: "Medium",
    progressStep: 0,
    timeline: [{ title: "Issue registered & verification in queue", time: "6 days ago", done: true }],
    sitePhotos: [
      "https://images.pexels.com/photos/8481931/pexels-photo-8481931.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
];

export interface UniversityCaseStudy {
  id: string;
  title: string;
  university: string;
  subtitle: string;
  likes: number;
  comments: number;
  image: string;
}

export const UNIVERSITY_CASE_STUDIES: UniversityCaseStudy[] = [
  {
    id: "cs-1",
    title: "Pothole Repair Initiative",
    university: "IIT Jodhpur",
    subtitle:
      "How students and faculty worked with municipal engineers to pioneer eco-friendly cold-mix bitumen patching.",
    likes: 120,
    comments: 15,
    image: "https://images.pexels.com/photos/12002262/pexels-photo-12002262.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "cs-2",
    title: "Waste Segregation Drive",
    university: "Mody University",
    subtitle:
      "A community-led waste management campaign recycling 4.5 tons of organic residential waste.",
    likes: 89,
    comments: 12,
    image: "https://images.pexels.com/photos/7434587/pexels-photo-7434587.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "cs-3",
    title: "Rainwater Harvesting Project",
    university: "RTU Kota",
    subtitle:
      "Groundwater recharge system designed by civil faculty and student teams combating summer water scarcity.",
    likes: 76,
    comments: 9,
    image: "https://images.pexels.com/photos/35249003/pexels-photo-35249003.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const UNIVERSITY_AI_RECOMMENDATIONS = [
  { num: 1, text: "Request road repair through Municipal Corporation portal." },
  { num: 2, text: "Use temporary patching (cold mix asphalt) for urgent relief." },
  { num: 3, text: "Involve civil engineering department of local university for detailed assessment." },
  { num: 4, text: "Crowd-source the issue to get more support from the community." },
];

export const UNIVERSITY_USER = {
  name: "Aarav Mehta",
  title: "PMMMC Coordinator",
  location: "Jodhpur, Rajasthan",
  avatar: "AM",
  greeting: "Good Morning, Aarav! Let's build a better tomorrow",
};

export const UNIVERSITY_REPORT_STEPS = ["Assigned", "On Site", "In Progress", "Resolved"];