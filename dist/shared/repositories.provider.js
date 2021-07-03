"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositories = exports.RepositoriesProvider = void 0;
const database_provider_1 = require("./database.provider");
const category_repository_1 = require("./repositories/category.repository");
const product_repesitory_1 = require("./repositories/product.repesitory");
const user_repository_1 = require("./repositories/user.repository");
const repositories = [user_repository_1.UserRepository, product_repesitory_1.ProductRepository, category_repository_1.CategoryRepository];
exports.repositories = repositories;
const RepositoriesProvider = [];
exports.RepositoriesProvider = RepositoriesProvider;
for (const repository of repositories) {
    RepositoriesProvider.push({
        provide: repository,
        useFactory: (connection) => connection.getCustomRepository(repository),
        inject: [database_provider_1.MONGO_CONNECTION]
    });
}
//# sourceMappingURL=repositories.provider.js.map