import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { VoitureWhereInput } from "./VoitureWhereInput";
import { Type } from "class-transformer";
import { VoitureOrderByInput } from "./VoitureOrderByInput";

@ArgsType()
class VoitureFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => VoitureWhereInput,
  })
  @Field(() => VoitureWhereInput, { nullable: true })
  @Type(() => VoitureWhereInput)
  where?: VoitureWhereInput;

  @ApiProperty({
    required: false,
    type: VoitureOrderByInput,
  })
  @Field(() => VoitureOrderByInput, { nullable: true })
  @Type(() => VoitureOrderByInput)
  orderBy?: VoitureOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { VoitureFindManyArgs };
