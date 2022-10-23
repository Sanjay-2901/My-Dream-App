import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients = [new Ingredient('Apple', 5)];

  constructor() {}

  ngOnInit(): void {}

  itemAdded(recievedItem: Ingredient) {
    if (recievedItem.name !== '' && recievedItem.amount !== undefined) {
      this.ingredients.push(recievedItem);
    }
  }
}
