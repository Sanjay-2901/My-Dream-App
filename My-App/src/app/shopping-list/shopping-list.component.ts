import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { canComponentLeave } from '../can-deactivate-guard.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, canComponentLeave {
  constructor(
    private shoppingListService: ShoppingListService,
    private activatedRoute: ActivatedRoute
  ) {}
  ingredients!: Ingredient[];
  routerData!: string;
  ingredientsListSubscription!: Subscription;

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsListSubscription =
      this.shoppingListService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
    // this.routerData = this.activatedRoute.snapshot.data['message'];
    this.activatedRoute.data.subscribe((myData: Data) => {
      this.routerData = myData['message'];
    });
  }

  allowleaving = false;

  canLeave(): boolean {
    if (!this.allowleaving) {
      return window.confirm('are you sure?');
    }
    return true;
  }

  onEditRecipe(index: number) {
    this.shoppingListService.editIngredient.next(index);
  }

  ngOnDestroy() {
    this.ingredientsListSubscription.unsubscribe();
  }
}
