import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAccountDTO, SignInAccountDTO } from 'src/dto/auth.dto';
import { ApiResponse } from 'src/common/api-response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: RegisterAccountDTO): Promise<ApiResponse<any>> {
    return this.authService.signUp(body);
  }

  @Post('/signin')
  async signIn(@Body() body: SignInAccountDTO): Promise<ApiResponse<any>> {
    return this.authService.signIn(body);
  }
}
