import { Recipe } from './recipe.model';

export interface CartItem {
    id: number;
    itemName: string;
    quantity: number;
    recipeId: number;
    recipeName: string;
    recipeImage?: string;
    ingredients: string;
}