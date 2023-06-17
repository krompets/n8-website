import { EProjectStatus, IProject } from '../../types/types';

export const NIBIRU: IProject = {
  icon: 'nibiru.png',
  title: 'Nibiru',
  rating: 'Not rated',
  name: 'nibiru',
  description: 'Nibiru is a sovereign proof-of-stake blockchain, open-source platform, and member of a family of ' +
    'interconnected blockchains that comprise the Cosmos Ecosystem.<br>' +
    'Nibiru unifies leveraged derivatives trading, spot trading, staking, and bonded liquidity provision into a ' +
    'seamless user experience, enabling users of over 40 blockchains to trade with leverage using a suite of ' +
    'composable decentralized applications.',
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
    website: 'https://nibiru.fi/',
    discord: 'https://discord.gg/nibirufi',
    twitter: 'https://twitter.com/NibiruChain',
    github: 'https://github.com/NibiruChain'
  }
};
