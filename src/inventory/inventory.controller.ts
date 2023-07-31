import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { ApiResponse } from 'src/common/api-response';
import { CreateInventoryDTO } from 'src/dto/inventory.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CustomerDTO } from 'src/dto/customer.dto';

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
