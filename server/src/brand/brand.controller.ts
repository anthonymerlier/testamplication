import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BrandService } from "./brand.service";
import { BrandControllerBase } from "./base/brand.controller.base";

@swagger.ApiTags("brands")
@common.Controller("brands")
export class BrandController extends BrandControllerBase {
  constructor(
    protected readonly service: BrandService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
