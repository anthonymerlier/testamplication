import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { VoitureServiceBase } from "./base/voiture.service.base";

@Injectable()
export class VoitureService extends VoitureServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
