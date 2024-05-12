import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PaginationDto } from '../common';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @MessagePattern('createPost')
  create(
    @Payload() createPostDto: CreatePostDto
  ) {
    return this.postsService.create(createPostDto);
  }

  @MessagePattern('findAllPosts')
  findAll(
    @Payload() paginationDto: PaginationDto,
  ) {
    return this.postsService.findAll(paginationDto);
  }

  @MessagePattern('findOnePost')
  findOne(
    @Payload() id: string
  ) {
    return this.postsService.findOne(id);
  }

  @MessagePattern('updatePost')
  update(
    @Payload() updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(updatePostDto.id, updatePostDto);
  }

  @MessagePattern('togglePostState')
  toggleState(
    @Payload() id: string
  ) {
    return this.postsService.toggleState(id);
  }
}
