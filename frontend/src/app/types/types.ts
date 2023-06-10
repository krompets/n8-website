export enum EAnchor {
  about = 'aboutAnchor',
  networks = 'networksAnchor',
  contacts = 'contactsAnchor',
}

export interface IProject {
  icon: string;
  title: string;
  rating: string;
  name: string;
  description: string;
  status: EProjectStatus;
  dates: string;
  type: string;
  requirements: ISystemRequirements;
  media: IMedia
}

export interface ISystemRequirements {
  cpu: string;
  ram: string;
  storage: string;
  os: string;
}

export interface IMedia {
  twitter?: string;
  facebook?: string;
  discord?: string;
  telegram?: string;
  github?: string;
  youtube?: string;
  email?: string;
}

export interface IProjects {
  [name: string]: IProject
}

export enum EProjectStatus {
  active = 'active',
  upcoming = 'upcoming',
  ended = 'ended'
}

export interface IFilters {
  status: EProjectStatus,
  pageSize: number
}
