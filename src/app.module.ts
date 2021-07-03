import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from 'modules/auth/auth.module';
import { JwtStrategy } from 'modules/auth/jwt.strategy';
import { CategoryModule } from 'modules/category/category.module';
import { ProductModule } from 'modules/product/product.module';
import { SharedModule } from 'shared/shared.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    })
  ],
  controllers: [AppController],
  providers: [JwtStrategy]
})
export class AppModule {}
