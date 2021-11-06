import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { VoitureResolverBase } from "./base/voiture.resolver.base";
import { Voiture } from "./base/Voiture";
import { VoitureService } from "./voiture.service";

@graphql.Resolver(() => Voiture)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class VoitureResolver extends VoitureResolverBase {
  constructor(
    protected readonly service: VoitureService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
