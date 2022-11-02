import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { relative } from 'path';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipeItem!: Recipe;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.selectedRecipeItem = this.recipeService.getRecipe(this.id);
    });
  }

  onAddtoShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.selectedRecipeItem.ingredients
    );
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], { relativeTo: this.activatedRoute });   // we can do this method. We no need the 'id' here.
    this.router.navigate(['../', this.id, 'edit'], {
      relativeTo: this.activatedRoute,
    });
    // here we are going one step up and giving 'id' and 'edit'.
  }
}
