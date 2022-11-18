import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropDownDirective } from './shared/dropdown.directive';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './authentication/auth.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, DropDownDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
