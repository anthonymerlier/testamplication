import { ArgsType, Field } from "@nestjs/graphql";
import { VoitureWhereUniqueInput } from "./VoitureWhereUniqueInput";
import { VoitureUpdateInput } from "./VoitureUpdateInput";

@ArgsType()
class UpdateVoitureArgs {
  @Field(() => VoitureWhereUniqueInput, { nullable: false })
  where!: VoitureWhereUniqueInput;
  @Field(() => VoitureUpdateInput, { nullable: false })
  data!: VoitureUpdateInput;
}

export { UpdateVoitureArgs };
