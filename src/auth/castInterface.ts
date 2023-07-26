import { RowDataPacket } from 'mysql2';
import { SignInAccountDTO } from 'src/dto/auth.dto';

export const castSignInDTO = (data: RowDataPacket): SignInAccountDTO => ({
  email: data.email,
  password: data.password,
});
