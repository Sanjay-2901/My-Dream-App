import { ActionReducerMap } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../authentication/store/auth.reducer';

export interface AppState {
  myShoppingList: fromShoppingList.InitialStateInterface;
  myAuth: fromAuth.MyAuthStateInterface;
}

export const reducers: ActionReducerMap<AppState, any> = {
  myShoppingList: fromShoppingList.shoppingListReducer,
  myAuth: fromAuth.authReducer,
};
