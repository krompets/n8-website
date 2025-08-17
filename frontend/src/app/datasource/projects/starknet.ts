import { EProjectStatus, IProject } from '../../types/types';

export const STARKNET: IProject = {
  icon: 'starknet.png',
  title: 'Starknet',
  rating: 'Not rated',
  name: 'starknet',
  description: 'Starknet is a Validity Rollup Layer 2. It provides high throughput, low gas costs, and retains Ethereum Layer 1 levels of security\n' +
    '<br>' +
    '<br>' +
    'Given a sudoku puzzle, verifying a solution is easier than solving from scratch. If our goal is to convince people of the statement “this puzzle has been solved”, we can save a lot of computation by having one person compute a solution and then propagate it for others to verify. In this strategy, each computation of a solution becomes a one-time event which does not require replication by society. In a similar vein, Starknet scales Ethereum by replacing heavy L1 computation with lighter (hence cheaper!) L1 verification using STARK proofs computed off-chain.',
  status: EProjectStatus.ended,
  dates: 'N/a',
  type: 'Tech',
  requirements: {
    cpu: '4 cores',
    ram: '8GB',
    storage: '500G',
    os: 'Ubuntu 20.04'
  },
  media: {
    website: 'https://www.starknet.io/en',
    discord: 'https://starknet.io/discord',
    twitter: 'https://twitter.com/Starknet',
    github: 'https://github.com/starknet-io/starknet-website'
  }
};
