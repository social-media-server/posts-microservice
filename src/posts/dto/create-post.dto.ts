import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsUUID()
  public userId: string;

  @IsOptional()
  @IsUUID()
  public fileId: string;

  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  public commentIds: string[];
}