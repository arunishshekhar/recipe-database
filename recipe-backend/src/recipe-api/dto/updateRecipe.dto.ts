import { CreateRecipeDTO } from './createRecipe.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRecipeDTO extends PartialType(CreateRecipeDTO) {
  id: string;
}
