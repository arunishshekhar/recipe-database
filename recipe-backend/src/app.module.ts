import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeApiModule } from './recipe-api/recipe-api.module';

@Module({
  imports: [RecipeApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
