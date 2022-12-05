import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as shoppingListActions from '../../store/shopping-list.actions';
import * as fromShoppingList from '../../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromShoppingList.MyAppState>) {}

  @ViewChild('f') shoppingListForm!: NgForm;
  editIngredientSubscription!: Subscription;
  isEditMode = false;
  editedItem!: Ingredient | null;

  ngOnInit(): void {
    this.editIngredientSubscription = this.store
      .select('myShoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.isEditMode = true;
          this.editedItem = stateData.editedIngredient;
          this.shoppingListForm.setValue({
            name: this.editedItem?.name,
            amount: this.editedItem?.amount,
          });
        } else {
          this.isEditMode = false;
        }
      });
  }

  onSubmit(myForm: NgForm) {
    const value = myForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.isEditMode) {
      this.store.dispatch(
        new shoppingListActions.UpdateIngredient(newIngredient)
      );
      this.isEditMode = false;
    } else {
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }
    myForm.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.isEditMode = false;
    this.store.dispatch(new shoppingListActions.StopEdit());
  }

  onDelete() {
    // this.shoppingListService.deletingIngredient(this.editedItemIndex);
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editIngredientSubscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
}
