import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authenticationService: AuthenticationService
  ) {}
  token: string | null = null;

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
    // this.authenticationService.emitUser.pipe(take(1)).subscribe((user) => {
    //   this.token = user!.token!;
    //   console.log(this.token);
    // });

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
      );
    //   .subscribe((recipes) => {
    //     this.recipeService.setRecipesFromData(recipes);
    //   });
  }
}
