import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { ReactionsModule } from './postsReactions/reactions.module';
import { CommentariesModule } from './commentaries/commentaries.module';
import { CommentariesReactionsModule } from './commentaries-reactions/commentaries-reactions.module';

@Module({
  imports: [PostsModule, ReactionsModule, CommentariesModule, CommentariesReactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
