export interface Ingredient {
    name: string;
    quantity: string;
    quantityValue: string;
}

export interface Steps {
    stepDetail: string;
}
export interface Recipe {
    id?: string;
    name: string;
    type: 'veg' | 'nonVeg' | 'egg';

    ingredients: Ingredient[];
    steps: Steps[];
}
