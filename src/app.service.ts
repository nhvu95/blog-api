import { Injectable } from '@nestjs/common';
import {Prisma, post, comment} from '@prisma/client';
import {PrismaService} from "./prisma.service";
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async addPost(post: Prisma.postCreateInput): Promise<post> {
    return this.prisma.client.post.create({
      data: post
    });
  }

  async getPosts(): Promise<post[]> {
    return this.prisma.client.post.findMany();
  }

  async getCommentsBySlug(slug: string): Promise<comment[]> {
    return this.prisma.client.comment.findMany({
      where: {
        slug
      }
    });
  }

  async addComment(comment: Prisma.commentCreateInput): Promise<comment> {
    await this.prisma.client.post.update({
      where: {
        slug: comment.slug
      },
      data: {
        comment: {
          increment: 1
        }
      }
    });
    return this.prisma.client.comment.create({
      data: comment
    });
  }

  async likePost(slug: string): Promise<post> {
    return this.prisma.client.post.update({
      where: {
        slug
      },
      data: {
        liked: {
          increment: 1
        }
      }
    });
  }

  async viewPost(slug: string): Promise<post> {
    return this.prisma.client.post.update({
      where: {
        slug
      },
      data: {
        read: {
          increment: 1
        }
      }
    });
  }

  async likeComment(slug: string, commentId: number, liked: boolean): Promise<comment> {
    const incrementField = liked ? 'liked' : 'disliked';
    return this.prisma.client.comment.update({
      where: {
        slug_id: {
          slug: slug,
          id: commentId
        }
      },
      data: {
        [incrementField]: {
          increment: 1
        }
      }
    });
  }
}
