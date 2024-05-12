import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Post, PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

import { CreatePostDto, UpdatePostDto } from './dto';
import { PaginationDto } from '../common';

@Injectable()
export class PostsService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger('Posts-Microservice')

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post: Post = await this.post.create({
      data: createPostDto,
    });

    return post;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 5, page = 1 } = paginationDto;
    
    const totalPages: number = await this.post.count({
      where: {
        isActive: true,
      },
    });

    const posts: Post[] = await this.post.findMany({
      where: {
        isActive: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      totalPages,
      posts,
    };
  }

  async findOne(id: string): Promise<Post> {
    const post: Post = await this.post.findFirst({
      where: {
        id,
      },
    });

    if (!post) {
      throw new RpcException({
        message: `Product with id ${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.findOne(id);

    const post: Post = await this.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });

    return post;
  }

  async toggleState(id: string): Promise<Post> {
    const postToUpdate: Post = await this.findOne(id);

    const post: Post = await this.post.update({
      where: {
        id,
      },
      data: {
        isActive: !postToUpdate.isActive,
      },
    });

    return post;
  }
}
