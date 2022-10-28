import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipeItem!: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onAddtoShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipeItem.ingredients);
  }
}
