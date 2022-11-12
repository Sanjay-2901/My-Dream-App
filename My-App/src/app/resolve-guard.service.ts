import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Recipe } from './recipes/recipe.model';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class ResolveGuard implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}
  resolve() {
    return this.dataStorageService.fetchRecipes();
  }
}
