import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { ReactionsModule } from './postsReactions/reactions.module';

@Module({
  imports: [PostsModule, ReactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
