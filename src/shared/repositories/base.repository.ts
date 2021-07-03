import { ICustomPagination } from 'decorators/paging.decorator';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FindConditions, FindManyOptions, MongoRepository } from 'typeorm';

export class BaseRepository<T> extends MongoRepository<T> {
  paginate(
    options?: ICustomPagination,
    searchOptions?: FindConditions<T> | FindManyOptions<T>
  ): Promise<Pagination<T>> {
    return paginate<T>(this, options, searchOptions);
  }
}
