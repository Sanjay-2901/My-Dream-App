import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class ResolveGuard implements Resolve<Recipe[]> {
  constructor(private recipeService: RecipeService) {}
  resolve() {
    return this.recipeService.getRecipes();
  }
}
