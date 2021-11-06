import { BrandWhereUniqueInput } from "./BrandWhereUniqueInput";
import { BrandUpdateInput } from "./BrandUpdateInput";

export type UpdateBrandArgs = {
  where: BrandWhereUniqueInput;
  data: BrandUpdateInput;
};
