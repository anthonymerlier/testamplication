import { ArgsType, Field } from "@nestjs/graphql";
import { BrandWhereUniqueInput } from "./BrandWhereUniqueInput";
import { BrandUpdateInput } from "./BrandUpdateInput";

@ArgsType()
class UpdateBrandArgs {
  @Field(() => BrandWhereUniqueInput, { nullable: false })
  where!: BrandWhereUniqueInput;
  @Field(() => BrandUpdateInput, { nullable: false })
  data!: BrandUpdateInput;
}

export { UpdateBrandArgs };
