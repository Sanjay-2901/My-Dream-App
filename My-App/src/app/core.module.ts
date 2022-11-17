import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './authentication/auth-interceptor.service';
import { canDeactivateGuard } from './can-deactivate-guard.service';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { ResolveGuard } from './resolve-guard.service';


@NgModule({
  providers: [
    ShoppingListService,
    AuthGuard,
    AuthService,
    canDeactivateGuard,
    // ResolveGuard,
    RecipeService,
    DataStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
