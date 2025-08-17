import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllowedEmail } from '../../models/allowed-email.model';

@Injectable()
export class AllowedEmailsService {
  constructor(
    @InjectRepository(AllowedEmail)
    private allowedEmailRepo: Repository<AllowedEmail>,
  ) {}

  findAll(): Promise<AllowedEmail[]> {
    return this.allowedEmailRepo.find({ order: { createdAt: 'DESC' } });
  }

  async add(email: string): Promise<AllowedEmail> {
    const entity = this.allowedEmailRepo.create({ email });
    return this.allowedEmailRepo.save(entity);
  }

  async remove(id: number): Promise<void> {
    const res = await this.allowedEmailRepo.delete(id);
    if (!res.affected) {
      throw new NotFoundException('Email not found');
    }
  }
}


