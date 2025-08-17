import { EProjectStatus, IProject } from '../../types/types';

export const ALEO: IProject = {
  icon: 'aleo.png',
  title: 'Aleo',
  rating: 'Not rated',
  name: 'aleo',
  description: 'Founded in 2019, Aleo accelerates the integration of zero-knowledge into the web3 world. Aleo is the leading developer platform for building fully-private, scalable, and cost-effective decentralized applications. Using zero-knowledge cryptography, Aleo moves smart contract execution off-chain to enable new use cases like identity, finance, and gaming, scaling to thousands of transactions per second. Built on a decentralized and permissionless blockchain, Aleo brings the flexibility of Ethereum with a more scalable architecture that\'s designed from the ground up for privacy.' +
    '<br>' +
    '<br>' +
    'Aleo has raised $200M in a Series B funding round led by Kora Management LP and SoftBank Vision Fund 2, culminating in a valuation of the company at $1.45 billion.',
  status: EProjectStatus.ended,
  dates: 'N/a',
  type: 'Tech/Community',
  requirements: {
    cpu: '16 cores',
    ram: '16GB',
    storage: '128G',
    os: 'Ubuntu 20.04'
  },
  media: {
    website: 'https://www.aleo.org/',
    discord: 'https://discord.gg/aleohq',
    twitter: 'https://twitter.com/AleoHQ',
    github: 'https://github.com/AleoHQ'
  }
};
