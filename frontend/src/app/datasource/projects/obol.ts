import { EProjectStatus, IProject } from '../../types/types';

export const OBOL: IProject = {
  icon: 'obol.png',
  title: 'Obol',
  rating: 'Not rated',
  name: 'obol',
  description: 'The Obol Network is an ecosystem for trust minimized staking that enables people to create, test,' +
    ' run & co-ordinate distributed validators',
  status: EProjectStatus.active,
  dates: 'N/a',
  type: 'Tech',
  requirements: {
    cpu: '4 cores',
    ram: '8GB',
    storage: '200G',
    os: 'Ubuntu 20.04'
  },
  media: {
    website: 'https://obol.tech/',
    discord: 'https://discord.com/invite/n6ebKsX46w',
    twitter: 'https://twitter.com/ObolNetwork',
    github: 'https://github.com/ObolNetwork'
  }
};
