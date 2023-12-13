import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { loadDatabaseSecrets } from "./google-cloud";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadDatabaseSecrets],
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}
