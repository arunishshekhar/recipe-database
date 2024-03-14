import { Test, TestingModule } from '@nestjs/testing';
import { RecipeApiController } from './recipe-api.controller';

describe('RecipeApiController', () => {
  let controller: RecipeApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeApiController],
    }).compile();

    controller = module.get<RecipeApiController>(RecipeApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
