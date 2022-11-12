import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService implements OnInit {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  ngOnInit() {
    this.fetchRecipes();
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(
        'https://recipe-book-3a49f-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
   return this.http
      .get<Recipe[]>(
        'https://recipe-book-3a49f-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipesFromData(recipes);
        })
      )
    //   .subscribe((recipes) => {
    //     this.recipeService.setRecipesFromData(recipes);
    //   });
  }
}
