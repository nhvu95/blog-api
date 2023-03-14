import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';
import {ICommentInfo} from "./app.model";

@Controller('posts')
export class AppController {
  constructor(private readonly blogService: AppService) {}

  @Get()
  getPosts() {
    return this.blogService.getPosts();
  }

  @Get(':slug/comments')
  getCommentsBySlug(@Param('slug') slug: string) {
    return this.blogService.getCommentsBySlug(slug);
  }

  @Post(':slug/comments')
  addComment(@Param('slug') slug: string, @Body() comment: ICommentInfo) {
    comment.slug = slug;
    this.blogService.addComment(comment);
  }

  @Put(':slug/like')
  likePost(@Param('slug') slug: string) {
    this.blogService.likePost(slug);
  }

  @Put(':slug/view')
  viewPost(@Param('slug') slug: string) {
    this.blogService.viewPost(slug);
  }

  @Put(':slug/comments/:id/like')
  likeComment(@Param('slug') slug: string, @Param('id') id: string, @Body() body: { liked: boolean }) {
    this.blogService.likeComment(slug, Number(id), body.liked);
  }
}
