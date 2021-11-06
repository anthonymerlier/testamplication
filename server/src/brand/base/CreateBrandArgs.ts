import { ArgsType, Field } from "@nestjs/graphql";
import { BrandCreateInput } from "./BrandCreateInput";

@ArgsType()
class CreateBrandArgs {
  @Field(() => BrandCreateInput, { nullable: false })
  data!: BrandCreateInput;
}

export { CreateBrandArgs };
