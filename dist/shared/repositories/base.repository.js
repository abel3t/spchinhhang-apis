"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const paging_decorator_1 = require("../../decorators/paging.decorator");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_1 = require("typeorm");
class BaseRepository extends typeorm_1.MongoRepository {
    paginate(options, searchOptions) {
        return nestjs_typeorm_paginate_1.paginate(this, options, searchOptions);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map