import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeApiService } from './recipe-api.service';
import { CreateRecipeDTO } from './dto/createRecipe.dto';
import { UpdateRecipeDTO } from './dto/updateRecipe.dto';

@Controller('recipe-api')
export class RecipeApiController {
  constructor(private readonly recipeService: RecipeApiService) {}

  @Get('getRecipes')
  findAll(
    @Query('type') type?: 'simple' | 'detailed',
    @Query('name') name?: string,
  ) {
    return this.recipeService.findAll(type, name);
  }

  @Get('getRecipe/:id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }

  @Post('createRecipe')
  async create(@Body(ValidationPipe) createRecipeDto: CreateRecipeDTO) {
    return await this.recipeService.create(createRecipeDto);
  }

  @Patch('updateRecipe/:id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDTO) {
    return this.recipeService.update(id, updateRecipeDto);
  }

  @Delete('deleteRecipe/:id')
  delete(@Param('id') id: string) {
    return this.recipeService.delete(id);
  }
}
