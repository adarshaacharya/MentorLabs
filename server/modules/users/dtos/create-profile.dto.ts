import { ArrayMaxSize, ArrayMinSize, IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Channel } from '../../../common/interfaces/channel.interface';

export class CreateProfileInput {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  description: string;

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(5)
  @IsString({
    each: true,
  })
  tags: string[];

  @IsString()
  country: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  @IsString({
    each: true,
  })
  languages: string[];

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  channels: Channel[];
}

export class CreateProfileOutput {}
