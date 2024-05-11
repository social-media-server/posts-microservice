import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { CreatePostDto, UpdatePostDto } from './dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PostsService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger('Posts-Microservice')

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  create(createPostDto: CreatePostDto) {
    
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
