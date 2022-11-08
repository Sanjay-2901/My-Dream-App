import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService) {}
  @ViewChild('f') shoppingListForm!: NgForm;
  editIngredientSubscription!: Subscription;
  editedItemIndex!: number;
  isEditMode = false;
  editedItem!: Ingredient;

  ngOnInit(): void {
    this.editIngredientSubscription =
      this.shoppingListService.editIngredient.subscribe((index) => {
        this.editedItemIndex = index;
        this.isEditMode = true;
        this.editedItem = this.shoppingListService.getIngredientbyIndex(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      });
  }

  onSubmit(myForm: NgForm) {
    const value = myForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.isEditMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
      this.isEditMode = false;
    } else {
      this.shoppingListService.onAddingIngredient(
        new Ingredient(value.name, value.amount)
      );
    }
    myForm.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.isEditMode = false;
  }

  onDelete() {
    this.shoppingListService.deletingIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editIngredientSubscription.unsubscribe();
  }
}
