import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammazioneComponent } from './programmazione.component';

describe('ProgrammazioneComponent', () => {
  let component: ProgrammazioneComponent;
  let fixture: ComponentFixture<ProgrammazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammazioneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
