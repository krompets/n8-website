import { EProjectStatus, IProject } from '../../types/types';

export const ARCHWAY: IProject = {
  icon: 'archway.png',
  title: 'Archway',
  rating: 'Not rated',
  name: 'archway',
  description: 'Archway is an incentivized L1 blockchain that allows developers ' +
    'to capture the value their dapps create, enabling ' +
    'sustainable economic models.',
  status: EProjectStatus.ended,
  dates: 'N/a',
  type: 'Tech',
  requirements: {
    cpu: '4 cores',
    ram: '8GB',
    storage: '200G',
    os: 'Ubuntu 20.04'
  },
  media: {
    website: 'https://archway.io/',
    discord: 'https://discord.gg/5FVvx3WGfa',
    twitter: 'https://twitter.com/archwayhq',
    telegram: 'https://t.me/archway_hq',
    github: 'https://github.com/archway-network'
  }
};
