import { EProjectStatus, IProject } from '../../types/types';

export const BASE: IProject = {
  icon: 'base.png',
  title: 'Base',
  rating: 'Not rated',
  name: 'base',
  description: 'Base is a secure, low-cost, developer-friendly Ethereum L2 built to bring the next billion users to web3.',
  status: EProjectStatus.active,
  dates: 'N/a',
  type: 'Tech/Community',
  requirements: {
    cpu: '4 cores',
    ram: '8GB',
    storage: '500G',
    os: 'Ubuntu 20.04'
  },
  media: {
    website: 'https://base.org/',
    discord: 'https://base.org/discord',
    twitter: 'https://twitter.com/buildonbase',
    github: 'https://github.com/base-org'
  }
};
