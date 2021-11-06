import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
@InputType()
class VoitureCreateInput {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  immatriculation!: string;
}
export { VoitureCreateInput };
