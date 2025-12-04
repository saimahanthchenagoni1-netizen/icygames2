export interface Game {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number; // 0-5
  plays: string; // e.g. "1.2M"
  description: string;
  isHot?: boolean;
  isNew?: boolean;
  romUrl?: string;
  customHtml?: string;
  url?: string;
}

export type Category = 
  | 'All' 
  | 'Action' 
  | 'Puzzle' 
  | 'Racing' 
  | 'Strategy' 
  | 'Sports' 
  | 'Adventure'
  | 'Apps';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}