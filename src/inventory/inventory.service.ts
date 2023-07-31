import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { ApiResponse } from 'src/common/api-response';
import { PG_CONNECTION } from 'src/constants/constants';
import { CustomerDTO } from 'src/dto/customer.dto';
import { CreateInventoryDTO } from 'src/dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(@Inject(PG_CONNECTION) private readonly conn: Connection) {}

  async createInventory(user: CustomerDTO, body: CreateInventoryDTO) {
    const { name } = body;

    const query = `
      INSERT INTO inventory (owner_id, inventory_name) 
      VALUES ('${user.id}', '${name}')`;

    try {
      const response = await this.conn.query(query);
      console.log('response', response);
      if (response) {
        return new ApiResponse<any>(
          HttpStatus.CREATED,
          'Inventory created successfully',
          response,
        );
      }
    } catch (e) {
      console.error(e);
      throw new HttpException(
        new ApiResponse<any>(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Error creating account',
          null,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
