export interface ProjectDTO {
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  description: string;
}

export interface ProjectFeedItem {
  id: string;
  title: string;
  userId: string;
  upvotes: number;
  createdAt: Date;
}
