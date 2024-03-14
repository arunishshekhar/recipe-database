import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDTO } from './dto/createRecipe.dto';
import { UpdateRecipeDTO } from './dto/updateRecipe.dto';
import { AppDataSource } from '../data-source';
import { Data } from '../entity/data';

export interface Ingredient {
  name?: string;
  quantity?: string;
}

export interface Recipe {
  id?: string;
  name?: string;
  type?: 'veg' | 'nonVeg' | 'egg';
  ingredients?: Ingredient[];
  steps?: string[];
}

@Injectable()
export class RecipeApiService {
  async findAll(type?: 'simple' | 'detailed', name?: string) {
    const dataRepository = AppDataSource.getRepository(Data);
    const allRecipes = await dataRepository.find();
    if (type && type === 'simple') {
      const selectedProperties = allRecipes.map(({ id, name }) => ({
        id,
        name,
      }));
      if (name) {
        return (
          selectedProperties.filter((data) => data.name.includes(name)) || []
        );
      }
      return selectedProperties;
    } else {
      if (name) {
        return allRecipes.filter((data) => data.name.includes(name));
      }
      return allRecipes;
    }
  }

  async findOne(id: string) {
    const dataRepository = AppDataSource.getRepository(Data);
    const dataToFind = await dataRepository.findOneBy({
      id: id,
    });
    if (!dataToFind) throw new NotFoundException('Recipe not found');

    return dataToFind;
  }

  async create(createRecipeDto: CreateRecipeDTO) {
    const newRecipe = new Data();
    newRecipe.id = crypto.randomUUID();
    newRecipe.name = createRecipeDto.name;
    newRecipe.type = createRecipeDto.type;
    newRecipe.ingredients = createRecipeDto.ingredients;
    newRecipe.steps = createRecipeDto.steps;
    await AppDataSource.manager.save(newRecipe);
    return newRecipe;
  }

  async update(id: string, updatedRecipeDto: UpdateRecipeDTO) {
    const dataRepository = AppDataSource.getRepository(Data);
    const dataToUpdate = await dataRepository.findOneBy({
      id: id,
    });
    dataToUpdate.ingredients = updatedRecipeDto.ingredients;
    dataToUpdate.name = updatedRecipeDto.name;
    dataToUpdate.steps = updatedRecipeDto.steps;
    dataToUpdate.type = updatedRecipeDto.type;
    await dataRepository.save(dataToUpdate);
    return dataToUpdate;
  }

  async delete(id: string) {
    const dataRepository = AppDataSource.getRepository(Data);
    const dataToRemove = await dataRepository.findOneBy({
      id: id,
    });
    await dataRepository.remove(dataToRemove);
    return dataToRemove;
  }
}
