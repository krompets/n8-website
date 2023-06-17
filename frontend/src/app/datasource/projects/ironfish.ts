import { EProjectStatus, IProject } from '../../types/types';

export const IRONFISH: IProject = {
  icon: 'ironfish.png',
  title: 'IronFish',
  rating: 'Not rated',
  name: 'ironfish',
  description: 'Iron Fish encrypts every transaction, shielding your sensitive asset information from public view. ' +
    'With read-only view keys, you remain compliant and in control. <br><br>' +
    'IronFish provide Multi-asset functionality which enables bridge providers to transfer any crypto asset to the' +
    ' Iron Fish network for private transactions.',
  status: EProjectStatus.ended,
  dates: 'N/a',
  type: 'Tech',
  requirements: {
    cpu: '16 cores',
    ram: '16GB',
    storage: '128G',
    os: 'Ubuntu 20.04'
  },
  media: {
    website: 'https://ironfish.network/',
    discord: 'https://discord.ironfish.network/',
    twitter: 'https://twitter.com/ironfishcrypto',
    github: 'https://github.com/iron-fish'
  }
};
