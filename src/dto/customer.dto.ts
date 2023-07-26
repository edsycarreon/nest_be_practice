import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDTO } from './base.dto';

export class GetCustomerDTO extends BaseDTO {
  @IsOptional()
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  token?: string;
}
