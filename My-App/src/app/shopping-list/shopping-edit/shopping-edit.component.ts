import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('amountInput') amountInput!: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddingItem() {
    if (
      this.nameInput.nativeElement.value != '' &&
      this.amountInput.nativeElement.value != ''
    ) {
      this.shoppingListService.onAddingIngredient(
        new Ingredient(
          this.nameInput.nativeElement.value,
          this.amountInput.nativeElement.value
        )
      );
    }
    this.nameInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
