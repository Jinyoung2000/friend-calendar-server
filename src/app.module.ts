import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import User from './user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      // FIXME: env 사용
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        port: 3306,
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: 'memo',
        entities: [User],
        // MEMO: production에서는 사용하면 안됨
        synchronize: true,
      }),
    }),
    ConfigModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
