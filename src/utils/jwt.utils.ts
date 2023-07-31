import { JwtService } from '@nestjs/jwt';

export const generateAccessToken = (
  jwtService: JwtService,
  payload: any,
): string => {
  return jwtService.sign(payload, { expiresIn: '1h', secret: 'secret' });
};
