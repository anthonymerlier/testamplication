import { Module } from "@nestjs/common";
import { BrandModuleBase } from "./base/brand.module.base";
import { BrandService } from "./brand.service";
import { BrandController } from "./brand.controller";
import { BrandResolver } from "./brand.resolver";

@Module({
  imports: [BrandModuleBase],
  controllers: [BrandController],
  providers: [BrandService, BrandResolver],
  exports: [BrandService],
})
export class BrandModule {}
