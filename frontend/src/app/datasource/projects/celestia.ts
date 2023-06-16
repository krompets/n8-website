import { EProjectStatus, IProject } from '../../types/types';

export const CELESTIA: IProject = {
  icon: 'celestia.png',
  title: 'Celestia',
  rating: 'Not rated',
  name: 'celestia',
  description: 'Celestia is a modular consensus and data network, built to enable anyone to easily deploy their own ' +
    'blockchain with minimal overhead.',
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
    website: 'https://celestia.org/',
    discord: 'https://discord.com/invite/YsnTPcSfWQ',
    twitter: 'https://twitter.com/CelestiaOrg',
    telegram: 'https://t.me/CelestiaCommunity',
    github: 'https://github.com/celestiaorg'
  }
};
