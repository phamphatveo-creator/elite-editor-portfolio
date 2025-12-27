
export interface VideoProject {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  category: string;
  date: string;
}

export enum Section {
  Home = 'home',
  Services = 'services',
  Skills = 'skills',
  Portfolio = 'portfolio',
  Contact = 'contact'
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: number;
}
