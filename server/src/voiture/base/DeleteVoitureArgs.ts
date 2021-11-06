import { ArgsType, Field } from "@nestjs/graphql";
import { VoitureWhereUniqueInput } from "./VoitureWhereUniqueInput";

@ArgsType()
class DeleteVoitureArgs {
  @Field(() => VoitureWhereUniqueInput, { nullable: false })
  where!: VoitureWhereUniqueInput;
}

export { DeleteVoitureArgs };
