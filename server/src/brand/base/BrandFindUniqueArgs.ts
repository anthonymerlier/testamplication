import { ArgsType, Field } from "@nestjs/graphql";
import { BrandWhereUniqueInput } from "./BrandWhereUniqueInput";

@ArgsType()
class BrandFindUniqueArgs {
  @Field(() => BrandWhereUniqueInput, { nullable: false })
  where!: BrandWhereUniqueInput;
}

export { BrandFindUniqueArgs };
