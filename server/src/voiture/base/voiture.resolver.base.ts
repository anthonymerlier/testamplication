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
import { CreateVoitureArgs } from "./CreateVoitureArgs";
import { UpdateVoitureArgs } from "./UpdateVoitureArgs";
import { DeleteVoitureArgs } from "./DeleteVoitureArgs";
import { VoitureFindManyArgs } from "./VoitureFindManyArgs";
import { VoitureFindUniqueArgs } from "./VoitureFindUniqueArgs";
import { Voiture } from "./Voiture";
import { VoitureService } from "../voiture.service";

@graphql.Resolver(() => Voiture)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class VoitureResolverBase {
  constructor(
    protected readonly service: VoitureService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Voiture",
    action: "read",
    possession: "any",
  })
  async _voituresMeta(
    @graphql.Args() args: VoitureFindManyArgs
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

  @graphql.Query(() => [Voiture])
  @nestAccessControl.UseRoles({
    resource: "Voiture",
    action: "read",
    possession: "any",
  })
  async voitures(
    @graphql.Args() args: VoitureFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Voiture[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Voiture",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Voiture, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Voiture",
    action: "read",
    possession: "own",
  })
  async voiture(
    @graphql.Args() args: VoitureFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Voiture | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Voiture",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Voiture)
  @nestAccessControl.UseRoles({
    resource: "Voiture",
    action: "create",
    possession: "any",
  })
  async createVoiture(
    @graphql.Args() args: CreateVoitureArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Voiture> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Voiture",
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
        `providing the properties: ${properties} on ${"Voiture"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Voiture)
  @nestAccessControl.UseRoles({
    resource: "Voiture",
    action: "update",
    possession: "any",
  })
  async updateVoiture(
    @graphql.Args() args: UpdateVoitureArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Voiture | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Voiture",
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
        `providing the properties: ${properties} on ${"Voiture"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Voiture)
  @nestAccessControl.UseRoles({
    resource: "Voiture",
    action: "delete",
    possession: "any",
  })
  async deleteVoiture(
    @graphql.Args() args: DeleteVoitureArgs
  ): Promise<Voiture | null> {
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
