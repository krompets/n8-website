import { EProjectStatus, IProject } from '../../types/types';

export const NAMADA: IProject = {
  icon: 'namada.png',
  title: 'Namada',
  rating: 'Not rated',
  name: 'namada',
  description: 'Namada is a proof-of-stake L1 for interchain asset-agnostic privacy. Namada interoperates with ' +
    'fast-finality chains via IBC and with Ethereum via a trustless two-way bridge. ' +
    'Namada is Anoma\'s first fractal instance, a first step towards the multi-chain vision of homogeneous ' +
    'architecture, heterogeneous security.',
  status: EProjectStatus.active,
  dates: 'N/a',
  type: 'Tech',
  requirements: {
    cpu: '4 cores',
    ram: '8GB',
    storage: '500G',
    os: 'Ubuntu 20.04'
  },
  media: {
    website: 'https://namada.net/',
    discord: 'https://discord.com/invite/namada',
    twitter: 'https://twitter.com/namada',
    github: 'https://github.com/anoma/namada'
  }
};
