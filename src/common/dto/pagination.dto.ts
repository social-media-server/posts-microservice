import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  public limit: number = 10;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  public page: number = 1;
}