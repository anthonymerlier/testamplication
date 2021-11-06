import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { BrandResolverBase } from "./base/brand.resolver.base";
import { Brand } from "./base/Brand";
import { BrandService } from "./brand.service";

@graphql.Resolver(() => Brand)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class BrandResolver extends BrandResolverBase {
  constructor(
    protected readonly service: BrandService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
