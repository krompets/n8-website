import { EProjectStatus, IProject } from '../../types/types';

export const LAMINA1: IProject = {
  icon: 'lamina1.png',
  title: 'Lamina1',
  rating: 'Not rated',
  name: 'lamina1',
  description: 'LAMINA1 is the fabric of the open metaverse — a blockchain providing builders and creators a usable framework to create a better online future.',
  status: EProjectStatus.active,
  dates: 'N/a',
  type: 'Tech',
  requirements: {
    cpu: '4 cores',
    ram: '8GB',
    storage: '200G',
    os: 'Ubuntu 22.04'
  },
  media: {
    website: 'https://www.lamina1.com/',
    discord: 'https://discord.gg/lamina1',
    twitter: 'https://twitter.com/Lamina1official'
  }
};
