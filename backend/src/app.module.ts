import { Module } from '@nestjs/common';
import { AppController } from './app.controller';//AppController は / に "Hello World" を返します。今後、トップページで簡単なステータス表示などに使ってもOK
import { AppService } from './app.service'; //AppControllerと同様。削除してもOK
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';

@Module({
  imports: [],
  controllers: [AppController, ProfileController],
  providers: [AppService, ProfileService],
})
export class AppModule {}
