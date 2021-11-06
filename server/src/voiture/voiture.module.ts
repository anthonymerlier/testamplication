import { Module } from "@nestjs/common";
import { VoitureModuleBase } from "./base/voiture.module.base";
import { VoitureService } from "./voiture.service";
import { VoitureController } from "./voiture.controller";
import { VoitureResolver } from "./voiture.resolver";

@Module({
  imports: [VoitureModuleBase],
  controllers: [VoitureController],
  providers: [VoitureService, VoitureResolver],
  exports: [VoitureService],
})
export class VoitureModule {}
