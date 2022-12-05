import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../authentication/auth.guard';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';
// import { ResolveGuard } from './resolve-guard.service';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    // resolve: { myData: ResolveGuard },
    canActivate: [AuthenticationGuard],
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
