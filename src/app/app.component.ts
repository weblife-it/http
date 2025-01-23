import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesComponent } from './heroes/heroes.component';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    HeroesComponent,
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}
