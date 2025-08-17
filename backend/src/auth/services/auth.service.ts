import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { allowedEmails } from '../../config/allowed-emails.config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllowedEmail } from '../../models/allowed-email.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AllowedEmail)
    private allowedEmailRepo: Repository<AllowedEmail>,
  ) {}

  async validateUser(email: string): Promise<boolean> {
    const inDb = await this.allowedEmailRepo.findOne({ where: { email } });
    if (inDb) return true;
    return allowedEmails.includes(email);
  }

  async generateToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
} 