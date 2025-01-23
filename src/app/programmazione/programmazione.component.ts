import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Film } from './film';
import { ProgrammazioneService } from './programmazione.service';

@Component({
  selector: 'app-programmazione',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  providers: [ProgrammazioneService],
  templateUrl: './programmazione.component.html',
  styleUrl: './programmazione.component.css'
})
export class ProgrammazioneComponent implements OnInit {
  programmazione: Film[] = [];
  storico: Film[] = [];
  idFilm = '';

  constructor(private service: ProgrammazioneService) {}

  @ViewChild('heroEditInput')
  set heroEditInput(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  ngOnInit() {
    this.getProgrammazine();
  }

  getProgrammazine(): void {
    this.service.getProgrammazine()
      .subscribe(proiezioni => (this.programmazione = proiezioni));
  }
  
  getStorico(): void {
    this.service.getStorico()
      .subscribe(proiezioni => (this.programmazione = proiezioni));
  }


  search(searchTerm: string) {

    if (searchTerm) {
      this.service
        .searchFilm(searchTerm)
        .subscribe(proiezioni => (this.programmazione = proiezioni));
    } else {
      this.getStorico();
    }
  }

  
}
