import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const isAllowed = await this.authService.validateUser(req.user?.email);
    if (!isAllowed) {
      return res.redirect(`${process.env.FRONTEND_URL}/admin?error=forbidden`);
    }
    const token = await this.authService.generateToken(req.user);
    return res.redirect(`${process.env.FRONTEND_URL}/admin?token=${token}`);
  }
} 