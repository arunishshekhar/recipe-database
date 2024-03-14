import { Test, TestingModule } from '@nestjs/testing';
import { RecipeApiService } from './recipe-api.service';

describe('RecipeApiService', () => {
  let service: RecipeApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeApiService],
    }).compile();

    service = module.get<RecipeApiService>(RecipeApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
