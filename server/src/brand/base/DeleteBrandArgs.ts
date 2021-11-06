import { ArgsType, Field } from "@nestjs/graphql";
import { BrandWhereUniqueInput } from "./BrandWhereUniqueInput";

@ArgsType()
class DeleteBrandArgs {
  @Field(() => BrandWhereUniqueInput, { nullable: false })
  where!: BrandWhereUniqueInput;
}

export { DeleteBrandArgs };
