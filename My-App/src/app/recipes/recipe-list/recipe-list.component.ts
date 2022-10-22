import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipesList: Recipe[] = [
    new Recipe('Test recipe', 'Just a Test', '/assets/images/ai-lab.webp'),
    new Recipe('Test recipe', 'Just a Test', '/assets/images/ai-lab.webp'),
  ];

  constructor() {}

  ngOnInit(): void {}
}
