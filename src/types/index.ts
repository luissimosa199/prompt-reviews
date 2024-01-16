export interface UserInterface {
  type: string;
  name: string;
  email: string;
  image: string;
  _id: string;
  tags: string[];
  slug: string;
  online?: boolean;
  address?: string;
  hours?: string;
  phone?: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  image: string;
  photos: string[];
  bio: string;
  slug?: string;
  tags?: string[];
  type?: string;
  address?: string;
  hours?: string;
  phone?: string;
}

export type Tabs = "opiniones" | "informacion";

export interface Opinion {
  _id: string;
  name: string;
  email?: string;
  doctorName?: string;
  createdAt: string;
  rank: number;
  comment: string;
  files: string[];
  audio?: string;
}
