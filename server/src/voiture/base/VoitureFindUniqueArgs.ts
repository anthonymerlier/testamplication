import { ArgsType, Field } from "@nestjs/graphql";
import { VoitureWhereUniqueInput } from "./VoitureWhereUniqueInput";

@ArgsType()
class VoitureFindUniqueArgs {
  @Field(() => VoitureWhereUniqueInput, { nullable: false })
  where!: VoitureWhereUniqueInput;
}

export { VoitureFindUniqueArgs };
