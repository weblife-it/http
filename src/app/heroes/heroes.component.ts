import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
  standalone: true,
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  imports: [ CommonModule, FormsModule ],
  providers: [HeroesService],
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  programmazione: Hero[] = [];
  storico: Hero[] = [];
  idFilm = '';

  constructor(private heroesService: HeroesService) {}

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
    this.heroesService.getProgrammazine()
      .subscribe(proiezioni => (this.programmazione = proiezioni));
  }
  
  getStorico(): void {
    this.heroesService.getStorico()
      .subscribe(proiezioni => (this.programmazione = proiezioni));
  }


  search(searchTerm: string) {

    if (searchTerm) {
      this.heroesService
        .searchFilm(searchTerm)
        .subscribe(proiezioni => (this.programmazione = proiezioni));
    } else {
      this.getStorico();
    }
  }

  
}
