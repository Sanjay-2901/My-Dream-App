import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';
import { canDeactivateGuard } from '../can-deactivate-guard.service';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthGuard],
        canDeactivate: [canDeactivateGuard],
        component: ShoppingListComponent,
        data: { message: 'This particular message is from route data' },
      },
    ]),
  ],
})
export class ShoppingListModule {}
