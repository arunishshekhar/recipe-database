import { Module } from '@nestjs/common';
import { RecipeApiController } from './recipe-api.controller';
import { RecipeApiService } from './recipe-api.service';

@Module({
  controllers: [RecipeApiController],
  providers: [RecipeApiService],
})
export class RecipeApiModule {}
