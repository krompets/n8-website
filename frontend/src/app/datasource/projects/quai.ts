import { EProjectStatus, IProject } from '../../types/types';

export const QUAI: IProject = {
  icon: 'quai.png',
  title: 'Quai',
  rating: 'Not rated',
  name: 'quai',
  description: 'Building the world’s cryptocurrency on a scalable PoW EVM compatible merged mined hierarchy of blockchains',
  status: EProjectStatus.ended,
  dates: 'N/a',
  type: 'Tech/Community',
  requirements: {
    cpu: '4+ cores',
    ram: '16GB',
    storage: '128G SSD',
    os: 'Ubuntu 20.04'
  },
  media: {
    website: 'https://qu.ai',
    discord: 'https://discord.com/invite/ngw88VXXnV',
    twitter: 'https://twitter.com/QuaiNetwork',
    github: 'https://github.com/spruce-solutions'
  }
};
