import { EProjectStatus, IProject } from '../../types/types';

export const MASSA: IProject = {
  icon: 'massa.svg',
  title: 'Massa',
  rating: 'Not rated',
  name: 'massa',
  description: 'Massa technology has been in development since 2017. The company was incorporated in 2020, in Paris, France. Massa concluded a first (private) token sale, for €5 million, in 2021.\n' +
    '<br>' +
    '<br>' +
    'Massa is the leading decentralized and scaled blockchain. It is based on a parallel block technology able to process thousands of operations per second with minimal energy consumption. Through a fair ICO and other crucial decisions ensuring decentralization, Massa is the first blockchain with a Nakamoto decentralization coefficient above 1000. Currently in testnet phase with over 5000 nodes, Massa will be the first blockchain to feature autonomous smart contracts and decentralized web hosting.',
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
    website: 'https://massa.net/',
    discord: 'https://discord.gg/massa',
    twitter: 'https://twitter.com/massalabs',
    telegram: 'https://t.me/massanetwork',
    email: 'communication@massa.net'
  }
};
