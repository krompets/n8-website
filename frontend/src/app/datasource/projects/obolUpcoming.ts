import { EProjectStatus, IProject } from '../../types/types';

export const OBOLUPCOM: IProject = {
  icon: 'obol.png',
  title: 'Obol',
  rating: 'Not rated',
  name: 'obol',
  description: 'Supported by over one hundred contributors globally, Cascadia is a layer-1 blockchain built to' +
    ' explore the nature of incentives on network effects, starting with ve-tokenomics.',
  status: EProjectStatus.upcoming,
  dates: 'N/a',
  type: 'Tech',
  requirements: {
    cpu: '4 cores',
    ram: '8GB',
    storage: '200G',
    os: 'Ubuntu 20.04'
  },
  media: {
    discord: 'https://discord.gg/rffhKQ8pzJ',
    email: 'mail@mail.com'
  }
};
