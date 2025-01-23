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
  dataInizio: any;
  dataFine: any;

  constructor(private service: ProgrammazioneService) {}

  ngOnInit() {
    this.getProgrammazione();
  }

  getProgrammazione(): void {
    this.service.getProgrammazione()
      .subscribe(proiezioni => (this.programmazione = proiezioni));
  }
  
  getStorico(): void {
    this.service.getStorico()
      .subscribe(proiezioni => (this.programmazione = proiezioni));
  }


  search(dataInizio: string, dataFine: string) {
    if (dataInizio && dataFine) {
      this.service
        .searchProgrammazione(dataInizio, dataFine)
        .subscribe(proiezioni => (this.programmazione = proiezioni));  

    } else {
      this.getProgrammazione();
    }
  }

  
}
