import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgrammazioneComponent } from "./programmazione/programmazione.component";


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    ProgrammazioneComponent
],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
}
