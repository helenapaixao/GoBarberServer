import { container } from 'tsyringe';

import IStorageProviver from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProviver>(
  'StorageProviver',
  providers.disk,
);
