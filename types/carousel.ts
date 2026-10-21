export type ProjectIconType = 'avatr' | 'youtube' | 'gaudi' | 'watch' | 'tech' | 'ai';

export interface Project {
  id: number;
  line1: string;
  line2: string;
  category: string;
  image: string;
  icon: ProjectIconType;
}