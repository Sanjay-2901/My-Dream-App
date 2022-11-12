import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { canDeactivateGuard } from './can-deactivate-guard.service';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ResolveGuard } from './resolve-guard.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: { myData: ResolveGuard },

    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService], //Actually We no need to have this resolve since we are using resolve in the 'recipes' route and fetch all the data there itself. So obviously all the data will be fetched even before the 'recipes' component is loaded which is the home component of this application.
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService], // same as above comment !!
      },
    ],
  },
  {
    path: 'shopping-list',
    canActivate: [AuthGuard],
    canDeactivate: [canDeactivateGuard],
    component: ShoppingListComponent,
    data: { message: 'This particular message is from route data' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
