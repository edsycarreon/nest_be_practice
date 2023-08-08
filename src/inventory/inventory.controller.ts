import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { ApiResponse } from 'src/common/api-response';
import { CreateInventoryDTO } from 'src/dto/inventory.dto';
import { CustomerDTO } from 'src/dto/customer.dto';
import { CurrentUser } from 'src/common/decorators';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('/create')
  async createInventory(
    @CurrentUser() user: CustomerDTO,
    @Body() body: CreateInventoryDTO,
  ): Promise<ApiResponse<any>> {
    return this.inventoryService.createInventory(user, body);
  }
}
