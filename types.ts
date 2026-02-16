
export type UserRole = 'User' | 'Moderator' | 'Admin';

export interface UserSession {
  username: string;
  role: UserRole;
  lastLogin: string;
  publishedCount: number;
  id: string;
}

export enum Technology {
  REACT = 'React',
  TAILWIND = 'Tailwind CSS',
  VANILLA = 'Vanilla JS',
  BOOTSTRAP = 'Bootstrap',
  CSS = 'Plain CSS'
}

export interface UIComponent {
  id: string;
  name: string;
  description: string;
  category: string; // Dynamic string instead of Enum
  technology: Technology[];
  tags: string[];
  imageUrl: string;
  code: {
    html?: string;
    css?: string;
    javascript?: string;
    react?: string;
  };
  author: string;
  dateAdded: string;
}

export interface FilterState {
  search: string;
  category: string | 'All';
  technology: Technology | 'All';
}

export const DEFAULT_CATEGORIES = [
  'Headers', 'Footers', 'Hero Sections', 'Forms', 
  'Buttons', 'Cards', 'Navigation', 'Pricing', 
  'Team', 'Testimonials'
];
