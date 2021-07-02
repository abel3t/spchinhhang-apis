import type {
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { EventSubscriber } from 'typeorm';

import { UtilsService } from '../providers/utils.service';
import { User } from '../shared/entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    if (event.entity.password) {
      event.entity.password = UtilsService.generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<User>) {
    if (event.entity.password !== event.databaseEntity.password) {
      event.entity.password = UtilsService.generateHash(event.entity.password);
    }
  }
}
