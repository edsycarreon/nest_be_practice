import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { ApiResponse } from 'src/common/api-response';
import { PG_CONNECTION } from 'src/constants/constants';
import { RegisterAccountDTO, SignInAccountDTO } from 'src/dto/auth.dto';
import { castToArray, comparePasswords, hashPassword } from 'src/utils';
import { GetCustomerDTO } from 'src/dto/customer.dto';

@Injectable()
export class AuthService {
  constructor(@Inject(PG_CONNECTION) private readonly conn: Connection) {}

  async signUp(body: RegisterAccountDTO) {
    const { firstName, lastName, email, password } = body;

    const hashedPassword = await hashPassword(password);

    const query = `
      INSERT INTO customer (first_name, last_name, email, password) 
      VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}')`;

    try {
      const response = await this.conn.query(query);
      if (response) {
        return new ApiResponse<number>(
          HttpStatus.CREATED,
          'Account created successfully',
          null,
        );
      }
    } catch (e) {
      throw new HttpException(
        new ApiResponse<number>(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Error creating account',
          null,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(body: SignInAccountDTO) {
    const { email, password } = body;

    const query = `SELECT * FROM customer WHERE email = '${email}'`;

    try {
      const [rows] = await this.conn.query(query);
      const res: SignInAccountDTO[] = castToArray(rows);
      if (res.length > 0) {
        const hashedPassword = res[0].password;
        const isPasswordMatched = await comparePasswords(
          password,
          hashedPassword,
        );
        if (isPasswordMatched) {
          return new ApiResponse<GetCustomerDTO>(
            HttpStatus.OK,
            'Login successful',
            res[0],
          );
        }
      }
    } catch (e) {
      throw new HttpException(
        new ApiResponse<GetCustomerDTO>(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Error logging in',
          null,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
