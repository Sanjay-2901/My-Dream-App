import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  reicpesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tea', 'Just a Test', '/assets/images/ai-lab.webp', [
      new Ingredient('tea bag', 2),
      new Ingredient('lemon', 2),
    ]),
    new Recipe('Cofee', 'Just a Test', '/assets/images/ai-lab.webp', [
      new Ingredient('cofee beans', 2),
      new Ingredient('sugar', 2),
    ]),
  ];

  constructor( private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.reicpesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.reicpesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.reicpesChanged.next(this.recipes.slice());
  }
}
