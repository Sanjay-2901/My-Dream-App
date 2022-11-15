import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipesList: Recipe[] = [];
  recipesListSubscription!: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    // this.recipesList = this.activatedRoute.snapshot.data['myData'];
    this.recipesListSubscription = this.recipeService.reicpesChanged.subscribe(
      (recipesListRecieved: Recipe[]) => {
        this.recipesList = recipesListRecieved;
      }
    );
  }

  ngOnDestroy() {
    this.recipesListSubscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
