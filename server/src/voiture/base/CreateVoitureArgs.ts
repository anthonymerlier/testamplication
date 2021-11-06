import { ArgsType, Field } from "@nestjs/graphql";
import { VoitureCreateInput } from "./VoitureCreateInput";

@ArgsType()
class CreateVoitureArgs {
  @Field(() => VoitureCreateInput, { nullable: false })
  data!: VoitureCreateInput;
}

export { CreateVoitureArgs };
