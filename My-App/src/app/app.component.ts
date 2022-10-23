import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  feature: string = 'rec';
  onNav(data: string) {
    this.feature = data;
  }
}
