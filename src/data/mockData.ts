import { Issue, DiscussionComment, UniversityMatch, GovMetrics } from '../types';

export const PRIMARY_ISSUE: Issue = {
  id: 'lok-001',
  title: 'Water supply not available in Village X, Ranchi',
  category: 'Water Resources',
  description: 'The main pipeline feeding the community water tap has been fractured for 3 weeks, leaving over 50 families without clean municipal drinking water. Villagers currently commute 4 km to fetch untreated pond water.',
  location: 'Village X, Ranchi, Jharkhand',
  distance: '2.4 km',
  peopleAffected: 50,
  severity: 'High',
  status: 'In progress',
  reportedBy: 'Priya Sharma',
  reportedDaysAgo: 3,
  imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  upvotes: 48,
  commentsCount: 14,
  updatesCount: 3,
  assignedUniversity: 'BIT Mesra',
  matchScore: 94
};

export const NEARBY_ISSUES: Issue[] = [
  {
    id: 'lok-002',
    title: 'Water pipeline fractured at Sector 12',
    category: 'Water Resources',
    description: 'Pipe leakage causing zero pressure at community standposts in Sector 12.',
    location: 'Sector 12, Ward 5',
    distance: '2.4 km',
    peopleAffected: 28,
    severity: 'High',
    status: 'In progress',
    reportedBy: 'Ravi Kumar',
    reportedDaysAgo: 5,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    upvotes: 32,
    commentsCount: 9,
    updatesCount: 2
  },
  {
    id: 'lok-003',
    title: 'Garbage not collected near playground',
    category: 'Sanitation',
    description: 'Municipal waste has accumulated for 10 days near the children playground.',
    location: 'Near Green Park Area',
    distance: '1.2 km',
    peopleAffected: 17,
    severity: 'Medium',
    status: 'Under review',
    reportedBy: 'Anita Roy',
    reportedDaysAgo: 2,
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    upvotes: 21,
    commentsCount: 4,
    updatesCount: 1
  },
  {
    id: 'lok-004',
    title: 'Streetlights not working on Maple Road',
    category: 'Infrastructure',
    description: 'Entire 800m stretch is completely dark, safety hazard for pedestrians at night.',
    location: 'Maple Road, Phase 2',
    distance: '3.1 km',
    peopleAffected: 12,
    severity: 'Low',
    status: 'New',
    reportedBy: 'Aman Verma',
    reportedDaysAgo: 1,
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    upvotes: 15,
    commentsCount: 3,
    updatesCount: 0
  }
];

export const RELATED_DUPLICATE_ISSUES: Issue[] = [
  {
    id: 'lok-rel-1',
    title: 'Water tap broken in Ward 5, Sector 12',
    category: 'Water Resources',
    description: 'Community brass tap snapped off, continuous water wastage for two weeks.',
    location: 'Ward 5, Sector 12',
    distance: '2.1 km',
    peopleAffected: 30,
    severity: 'Medium',
    status: 'In progress',
    reportedBy: 'Gopal Mehra',
    reportedDaysAgo: 12,
    imageUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=500&q=80',
    upvotes: 42,
    commentsCount: 8,
    updatesCount: 2
  },
  {
    id: 'lok-rel-2',
    title: 'No water supply for 2 weeks in nearby village',
    category: 'Water Resources',
    description: 'Distribution borewell motor burned out due to voltage fluctuations.',
    location: 'Bariatu Sub-division',
    distance: '3.4 km',
    peopleAffected: 65,
    severity: 'High',
    status: 'Under review',
    reportedBy: 'Kavita Soren',
    reportedDaysAgo: 15,
    imageUrl: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=500&q=80',
    upvotes: 56,
    commentsCount: 17,
    updatesCount: 3
  },
  {
    id: 'lok-rel-3',
    title: 'Hand pump not working near school',
    category: 'Water Resources',
    description: 'Primary school handpump handle broken, students have no drinking source.',
    location: 'Govt Primary School, Ward 9',
    distance: '4.8 km',
    peopleAffected: 120,
    severity: 'High',
    status: 'In progress',
    reportedBy: 'Headmaster S. K. Jha',
    reportedDaysAgo: 20,
    imageUrl: 'https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&w=500&q=80',
    upvotes: 78,
    commentsCount: 23,
    updatesCount: 4
  }
];

export const INITIAL_COMMENTS: DiscussionComment[] = [
  {
    id: 'c1',
    authorName: 'Ravi Kumar',
    authorRole: 'Resident, Sector 12',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    daysAgo: '3 days ago',
    text: 'We are facing the same issue in Sector 12. No water since Monday. Is anyone else from this area affected?',
    upvotes: 12,
    hasUpvoted: false,
    repliesCount: 5
  },
  {
    id: 'c2',
    authorName: 'Anita Singh',
    authorRole: 'Community Representative',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    daysAgo: '2 days ago',
    text: "Yes, same here. We've also raised a complaint at the local sub-divisional office. They cited pipe maintenance but gave no estimated date.",
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=400&q=80',
    upvotes: 8,
    hasUpvoted: true,
    repliesCount: 2
  },
  {
    id: 'c3',
    authorName: 'Suresh Patel',
    authorRole: 'Local Plumber / Volunteer',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    daysAgo: '1 day ago',
    text: "I've inspected the main manifold junction. The PVC flange is completely cracked. We need a 4-inch heavy grade replacement pipe to bypass the damaged valve.",
    upvotes: 19,
    hasUpvoted: false,
    repliesCount: 7
  }
];

export const BIT_MESRA_MATCH: UniversityMatch = {
  institution: 'BIT Mesra',
  department: 'Environmental Engineering Department',
  matchScore: 94,
  rationale: [
    'Recognized regional leaders in rural water purification & hydraulics',
    '3 similar decentralized community filtration projects completed in Jharkhand',
    'Certified ISO water quality testing laboratories and field sensor kits available',
    'Active student engineering chapter ready for field pilot deployment'
  ],
  completedProjectsCount: 3,
  activeResearchers: 14,
  leadContact: 'Dr. Alok Mukherjee (Head of Environmental Tech)'
};

export const GOV_METRICS: GovMetrics = {
  totalReports: 1247,
  validated: 892,
  inProgress: 345,
  deployed: 89,
  categories: [
    { name: 'Water', percentage: 42, count: 524, color: '#0284c7' },
    { name: 'Healthcare', percentage: 22, count: 274, color: '#16a34a' },
    { name: 'Agriculture', percentage: 15, count: 187, color: '#eab308' },
    { name: 'Roads', percentage: 10, count: 125, color: '#f97316' },
    { name: 'Others', percentage: 11, count: 137, color: '#8b5cf6' }
  ],
  monthlyTrends: [
    { month: 'Apr', submissions: 110, resolved: 70 },
    { month: 'May', submissions: 145, resolved: 95 },
    { month: 'Jun', submissions: 190, resolved: 120 },
    { month: 'Jul', submissions: 230, resolved: 165 },
    { month: 'Aug', submissions: 280, resolved: 210 },
    { month: 'Sep', submissions: 345, resolved: 280 }
  ],
  districtBreakdown: [
    { district: 'Ranchi', reports: 412, status: 'urgent' },
    { district: 'Dhanbad', reports: 285, status: 'urgent' },
    { district: 'Jamshedpur', reports: 210, status: 'moderate' },
    { district: 'Bokaro', reports: 148, status: 'moderate' },
    { district: 'Hazaribagh', reports: 104, status: 'stable' },
    { district: 'Deoghar', reports: 88, status: 'stable' }
  ]
};

export const TOP_VOLUNTEERS = [
  {
    id: 'vol-1',
    name: 'Aarav Mehta',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    role: 'Civic Engineer',
    solvedCount: 38,
    xp: 4850,
    badge: '🏆 Champion',
    rank: 1,
    category: 'Clean Water'
  },
  {
    id: 'vol-2',
    name: 'Dr. Sunita Rao',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    role: 'Biochemist / Lead',
    solvedCount: 29,
    xp: 3920,
    badge: '⭐ Gold Contributor',
    rank: 2,
    category: 'Healthcare'
  },
  {
    id: 'vol-3',
    name: 'Vikramaditya S.',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    role: 'Urban Planner',
    solvedCount: 24,
    xp: 3140,
    badge: '🛡️ Guardian',
    rank: 3,
    category: 'Infrastructure'
  },
  {
    id: 'vol-4',
    name: 'Pooja Bhatt',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    role: 'Community Activist',
    solvedCount: 19,
    xp: 2600,
    badge: '🌟 Rising Star',
    rank: 4,
    category: 'Sanitation'
  }
];

export const PLATFORM_STATS = {
  totalResolved: '2,500',
  resolvedGrowth: '+14.5%',
  activeVolunteers: '1,120',
  volunteersGrowth: '+8.2%',
  csrFundsMobilized: '₹8,42,200',
  fundsGrowth: '+22.4%',
  aiAccuracy: '96.8%',
  accuracyGrowth: '+3.1%'
};

