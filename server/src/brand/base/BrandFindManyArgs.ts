import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BrandWhereInput } from "./BrandWhereInput";
import { Type } from "class-transformer";
import { BrandOrderByInput } from "./BrandOrderByInput";

@ArgsType()
class BrandFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => BrandWhereInput,
  })
  @Field(() => BrandWhereInput, { nullable: true })
  @Type(() => BrandWhereInput)
  where?: BrandWhereInput;

  @ApiProperty({
    required: false,
    type: BrandOrderByInput,
  })
  @Field(() => BrandOrderByInput, { nullable: true })
  @Type(() => BrandOrderByInput)
  orderBy?: BrandOrderByInput;

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

export { BrandFindManyArgs };
