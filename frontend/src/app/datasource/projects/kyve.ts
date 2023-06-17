import { EProjectStatus, IProject } from '../../types/types';

export const KYVE: IProject = {
  icon: 'kyve.svg',
  title: 'KYVE',
  rating: 'Not rated',
  name: 'kyve',
  description: 'KYVE Network is revolutionizing customized access to on- and off-chain data by providing fast and easy' +
    ' tooling for decentralized data validation, immutability, and retrieval.',
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
    website: 'https://www.kyve.network/',
    discord: 'https://discord.gg/PATvZvEmxF',
    twitter: 'https://twitter.com/KYVENetwork',
    telegram: 'https://t.me/kyvenet',
    github: 'https://github.com/KYVENetwork'
  }
};
