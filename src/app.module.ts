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
      useFactory: async (configService: ConfigService) => {
        return {
          type: "mysql",
          host: configService.get<string>("database.host"),
          port: 3306,
          username: configService.get<string>("database.user"),
          password: configService.get<string>("database.pass"),
          database: configService.get<string>("database.name"),
          entities: [Order],
          synchronize: true,
          retryAttempts: 50,
        }
      },
    }),
    OrderModule,
  ],
})
export class AppModule { }
