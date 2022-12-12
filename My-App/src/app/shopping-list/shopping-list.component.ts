import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { canComponentLeave } from '../can-deactivate-guard.service';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import { ActivatedRoute, Data } from '@angular/router';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, canComponentLeave {
  constructor(
    private store: Store<fromApp.AppState>,
    private activatedRoute: ActivatedRoute
  ) {}
  ingredients!: Ingredient[];
  routerData!: string;
  ingredientsListSubscription!: Subscription;
  allowleaving = false;

  ngOnInit(): void {
    this.ingredientsListSubscription = this.store
      .select('myShoppingList')
      .subscribe((data) => {
        this.ingredients = data.ingredients;
      });
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientsListSubscription =
    //   this.shoppingListService.ingredientsChanged.subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
    this.routerData = this.activatedRoute.snapshot.data['message'];
    this.activatedRoute.data.subscribe((myData: Data) => {
      this.routerData = myData['message'];
    });
  }

  canLeave(): boolean {
    if (!this.allowleaving) {
      return window.confirm('are you sure?');
    }
    return true;
  }

  onEditRecipe(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    this.ingredientsListSubscription.unsubscribe();
  }
}
