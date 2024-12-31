import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class authCustomRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async justRegisteredUser(params) {
    const loggedUser = await this.usersRepository.findOne({
      where: { email: params.email },
    });

    return loggedUser;
  }
}
