import { PrismaService } from "nestjs-prisma";
import { Prisma, Voiture } from "@prisma/client";

export class VoitureServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.VoitureFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.VoitureFindManyArgs>
  ): Promise<number> {
    return this.prisma.voiture.count(args);
  }

  async findMany<T extends Prisma.VoitureFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.VoitureFindManyArgs>
  ): Promise<Voiture[]> {
    return this.prisma.voiture.findMany(args);
  }
  async findOne<T extends Prisma.VoitureFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.VoitureFindUniqueArgs>
  ): Promise<Voiture | null> {
    return this.prisma.voiture.findUnique(args);
  }
  async create<T extends Prisma.VoitureCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.VoitureCreateArgs>
  ): Promise<Voiture> {
    return this.prisma.voiture.create<T>(args);
  }
  async update<T extends Prisma.VoitureUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.VoitureUpdateArgs>
  ): Promise<Voiture> {
    return this.prisma.voiture.update<T>(args);
  }
  async delete<T extends Prisma.VoitureDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.VoitureDeleteArgs>
  ): Promise<Voiture> {
    return this.prisma.voiture.delete(args);
  }
}
