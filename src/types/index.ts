export interface Note {
  id: string;
  title: string;
  content: string;
  image?: string;
  tags?: string[];
  category?: string;
  createdAt: Date;
  updatedAt: Date;
} 