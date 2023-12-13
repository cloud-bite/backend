import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModule } from "./order/order.module";
import { Order } from "./order/order.entity";
import { loadDatabaseSecrets } from "./google-cloud";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CustomConfigModule } from "./custom-config.module";

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DB_HOST"),
        port: 3306,
        username: configService.get<string>("DB_USER"),
        password: configService.get<string>("DB_PASS"),
        database: configService.get<string>("DB_NAME"),
        entities: [Order],
        synchronize: true,
        retryAttempts: 50,
      }),
    }),
    OrderModule,
  ],
})
export class AppModule {}
