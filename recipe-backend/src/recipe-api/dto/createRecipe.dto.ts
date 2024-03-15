import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class IngredientDTO {
  name: string;
  quantity: string;
  quantityValue: string;
}

export class CreateRecipeDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['veg', 'nonVeg', 'egg'], {
    message: 'Valid recipe type required',
  })
  @IsNotEmpty()
  type: 'veg' | 'nonVeg' | 'egg';

  ingredients: IngredientDTO[];
  steps: string[];
}
