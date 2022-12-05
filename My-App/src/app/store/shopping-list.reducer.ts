import { ActionReducerMap } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { ShoppingListActionsTypes } from './shopping-list.actions';

export interface InitialStateInterface {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

export interface MyAppState {
  myShoppingList: InitialStateInterface;
}

export const reducers: ActionReducerMap<MyAppState, ShoppingListActionsTypes> =
  {
    myShoppingList: shoppingListReducer,
  };

const initialState: InitialStateInterface = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Orange', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: InitialStateInterface = initialState,
  action: ShoppingListActionsTypes
): InitialStateInterface {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredientToBeUpdated =
        state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredientToBeUpdated,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIndex: action.payload,
      };

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    default:
      return initialState;
  }
}
