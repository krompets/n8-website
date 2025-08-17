import { EProjectStatus, IProject } from '../../types/types';

export const SHARDEUM: IProject = {
  icon: 'shardeum.png',
  title: 'Shardeum',
  rating: 'Not rated',
  name: 'shardeum',
  description: 'Shardeum is an EVM-based, linearly scalable smart contract platform that provides low gas fees ' +
    'forever while maintaining true decentralization and solid security through dynamic state sharding.',
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
    website: 'https://shardeum.org/',
    twitter: 'https://twitter.com/shardeum',
    discord: 'https://discord.gg/shardeum',
    telegram: 'https://telegram.me/shardeum',
    youtube: 'https://www.youtube.com/channel/UCO20LJZBF-lYbc6PWVvwkMA',
    github: 'https://github.com/shardeum/'
  }
};
