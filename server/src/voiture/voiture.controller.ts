import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { VoitureService } from "./voiture.service";
import { VoitureControllerBase } from "./base/voiture.controller.base";

@swagger.ApiTags("voitures")
@common.Controller("voitures")
export class VoitureController extends VoitureControllerBase {
  constructor(
    protected readonly service: VoitureService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
