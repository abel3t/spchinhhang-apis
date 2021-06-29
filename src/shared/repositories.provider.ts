import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';

import { MONGO_CONNECTION } from './database.provider';
import { ProductRepository } from './repositories/product.repesitory';
import { UserRepository } from './repositories/user.repository';

const repositories = [UserRepository, ProductRepository];

const RepositoriesProvider: Provider[] = [];

for (const repository of repositories) {
  RepositoriesProvider.push({
    provide: repository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(repository),
    inject: [MONGO_CONNECTION]
  });
}

export { RepositoriesProvider, repositories };
