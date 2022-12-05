import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  reicpesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Tea', 'Just a Test', '/assets/images/ai-lab.webp', [
  //     new Ingredient('tea bag', 2),
  //     new Ingredient('lemon', 2),
  //   ]),
  //   new Recipe('Cofee', 'Just a Test', '/assets/images/ai-lab.webp', [
  //     new Ingredient('cofee beans', 2),
  //     new Ingredient('sugar', 2),
  //   ]),
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromShoppingList.MyAppState>) {}

  setRecipesFromData(recipesRecievedFromData: Recipe[]) {
    this.recipes = recipesRecievedFromData;
    this.reicpesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
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
