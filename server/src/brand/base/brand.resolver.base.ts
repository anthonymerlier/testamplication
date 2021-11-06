import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateBrandArgs } from "./CreateBrandArgs";
import { UpdateBrandArgs } from "./UpdateBrandArgs";
import { DeleteBrandArgs } from "./DeleteBrandArgs";
import { BrandFindManyArgs } from "./BrandFindManyArgs";
import { BrandFindUniqueArgs } from "./BrandFindUniqueArgs";
import { Brand } from "./Brand";
import { BrandService } from "../brand.service";

@graphql.Resolver(() => Brand)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class BrandResolverBase {
  constructor(
    protected readonly service: BrandService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Brand",
    action: "read",
    possession: "any",
  })
  async _brandsMeta(
    @graphql.Args() args: BrandFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Brand])
  @nestAccessControl.UseRoles({
    resource: "Brand",
    action: "read",
    possession: "any",
  })
  async brands(
    @graphql.Args() args: BrandFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Brand[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Brand",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Brand, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Brand",
    action: "read",
    possession: "own",
  })
  async brand(
    @graphql.Args() args: BrandFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Brand | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Brand",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Brand)
  @nestAccessControl.UseRoles({
    resource: "Brand",
    action: "create",
    possession: "any",
  })
  async createBrand(
    @graphql.Args() args: CreateBrandArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Brand> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Brand",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Brand"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Brand)
  @nestAccessControl.UseRoles({
    resource: "Brand",
    action: "update",
    possession: "any",
  })
  async updateBrand(
    @graphql.Args() args: UpdateBrandArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Brand | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Brand",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Brand"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Brand)
  @nestAccessControl.UseRoles({
    resource: "Brand",
    action: "delete",
    possession: "any",
  })
  async deleteBrand(
    @graphql.Args() args: DeleteBrandArgs
  ): Promise<Brand | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
