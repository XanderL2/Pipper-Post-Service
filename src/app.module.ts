import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { ReactionsModule } from './postsReactions/reactions.module';
import { CommentariesModule } from './commentaries/commentaries.module';

@Module({
  imports: [PostsModule, ReactionsModule, CommentariesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
