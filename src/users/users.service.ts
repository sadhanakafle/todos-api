import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(createUserDto: CreateUserDto) {
    let user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) {
      throw new BadRequestException('This email is already registered');
    }

    user = await this.prisma.user.findUnique({
      where: {
        mobile: createUserDto.mobile,
      },
    });

    if (user) {
      throw new BadRequestException('this mobile is already register');
    }
    createUserDto.password = await hash(createUserDto.password, 10); //imported from bycrypt //evaluated from right hand side
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Todo not found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user: User | null;//user value is user data or null
    await this.findOne(id);

    if (updateUserDto.email) {
      user = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (user && user.id !== id) {
        throw new BadRequestException('this email is already registered');
      }
    }

    if (updateUserDto.mobile) {
      user = await this.prisma.user.findUnique({
        where: { mobile: updateUserDto.mobile },
      });

      if (user && user.id !== id) {
        throw new BadRequestException('this mobile is already registered');
      }
    }
    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
