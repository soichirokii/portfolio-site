export interface Work {
  id: string;
  title: string;
  slug: string;
  type: "Work" | "Project";
  category: string[];
  period: string;
  role: string;
  target: string;
  overview: string;
  designProcess: string;
  learnings: string;
  results: string;
  problem: string;
  mainImage: string | null;
  processImages: string[];
  order: number;
  status: string;
}
