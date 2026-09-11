export type Role = 'citizen' | 'ngo' | 'company';

export type ScreenId =
  | 'auth'
  | 'home'
  | 'issues_feed'
  | 'issue_details'
  | 'report'
  | 'profile';

export type ThemeMode = 'dark' | 'light' | 'emerald';

export type IssueStatus = 'New' | 'Under review' | 'In progress' | 'Resolved';

export interface Issue {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  distance?: string;
  peopleAffected: number;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: IssueStatus;
  reportedBy: string;
  reportedDaysAgo: number;
  imageUrl: string;
  upvotes: number;
  commentsCount: number;
  updatesCount: number;
  coordinates?: { lat: number; lng: number };
}

export interface DiscussionComment {
  id: string;
  authorName: string;
  authorRole?: string;
  avatarUrl?: string;
  daysAgo: string;
  text: string;
  upvotes: number;
  hasUpvoted?: boolean;
  repliesCount: number;
  imageUrl?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  avatar: string;
  role: string;
  solvedCount: number;
  xp: number;
  badge: string;
  rank: number;
}
