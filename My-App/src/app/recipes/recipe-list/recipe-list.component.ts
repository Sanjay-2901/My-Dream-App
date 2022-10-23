import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipesList: Recipe[] = [
    new Recipe('Tea', 'Just a Test', '/assets/images/ai-lab.webp'),
    new Recipe('Cofee', 'Just a Test', '/assets/images/ai-lab.webp'),
  ];

  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  recipeWasSelected(i: Recipe) {
    this.selectedRecipe.emit(i);
  }
}
