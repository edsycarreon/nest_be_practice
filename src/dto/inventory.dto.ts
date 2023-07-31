import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInventoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
