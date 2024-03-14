import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IngredientDTO } from '../recipe-api/dto/createRecipe.dto';

@Entity()
export class Data {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('json')
  ingredients: IngredientDTO[];

  @Column('json')
  steps: string[];
}
