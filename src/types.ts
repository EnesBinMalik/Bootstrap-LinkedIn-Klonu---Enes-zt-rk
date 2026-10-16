export interface UserProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  coverImage: string;
  location: string;
  connectionsCount: number;
  profileViewsCount: number;
  postImpressionsCount: number;
  company: string;
  school: string;
}

export interface PostReaction {
  type: 'like' | 'celebrate' | 'love';
  count: number;
  userReacted?: boolean;
}

export interface PostComment {
  id: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  content: string;
  timeAgo: string;
}

export interface FeedPost {
  id: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  timeAgo: string;
  isPublic: boolean;
  content: string;
  imageUrl?: string;
  likesCount: number;
  celebratesCount: number;
  lovesCount: number;
  userReaction?: 'like' | 'celebrate' | 'love' | null;
  comments: PostComment[];
  sharesCount: number;
}

export interface NewsItem {
  id: string;
  title: string;
  timeAgo: string;
  readersCount: string;
}

export interface CourseItem {
  id: string;
  title: string;
  author: string;
  viewersCount: string;
}

export interface MessageItem {
  id: string;
  senderName: string;
  senderAvatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  online: boolean;
}

export interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  implemented: boolean;
}
