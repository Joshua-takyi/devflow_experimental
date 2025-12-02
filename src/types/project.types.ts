type MetaData = {
  likes: Number;
  views: Number;
  projectId: string;
};

export interface ProjectDTO {
  id?: string;
  title: string;
  summary: string;
  userId: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  content: string;
  requirements: string[];
  coverImage?: string;
  tagName: string[];
  metaData: MetaData;
  projectSteps: ProjectStepDTO[];
}

export interface ProjectStepDTO {
  id?: string;
  projectId?: string;
  order?: number;
  title: string;
  content?: string;
  images?: string[];
}
