"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProvider = exports.MONGO_CONNECTION = void 0;
const typeorm_1 = require("typeorm");
exports.MONGO_CONNECTION = 'MONGO_CONNECTION';
exports.DatabaseProvider = [
    {
        provide: exports.MONGO_CONNECTION,
        useFactory: () => typeorm_1.createConnection({
            name: exports.MONGO_CONNECTION,
            type: 'mongodb',
            url: process.env.DB_URI,
            entities: [__dirname + '/entities/*.entity{.ts,.js}'],
            authSource: 'admin',
            readPreference: 'primary',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
];
//# sourceMappingURL=database.provider.js.map