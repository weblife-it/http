import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config, ConfigTicketAlfresco, ConfigService } from './config.service';

@Component({
  standalone: true,
  selector: 'app-config',
  templateUrl: './config.component.html',
  imports: [ CommonModule ],
  providers: [ ConfigService ],
  styles: ['.error { color: #b30000; }']
})

export class ConfigComponent {
  error: any;
  headers: string[] = [];
  config: Config | undefined;
  configTicketAlfresco: ConfigTicketAlfresco | undefined;
  configAny: any | undefined;

  constructor(private configService: ConfigService) {}

  showDemo() {
    this.configService.getDemo()
      .subscribe(data => this.config = {
          heroesUrl: '?',
          textfile:   JSON.stringify(data),
          date:  new Date(),
      });
  } 

  showProgrammazione() {
    this.configService.getProgrammazione()
      .subscribe(data => this.config = {
          heroesUrl: '?',
          textfile:   JSON.stringify(data),
          date:  new Date(),
      });
  }

  showStorico() {
    this.configService.getStorico()
      .subscribe(data => this.config = {
          heroesUrl: '?',
          textfile:   JSON.stringify(data),
          date:  new Date(),
      });
  }

  clear() {
    this.config = undefined;
    this.configTicketAlfresco = undefined;
    this.error = undefined;
    this.headers = [];
  }


  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body! };
      });
  }
  makeError() {
    this.configService.makeIntentionalError().subscribe({ error: error => this.error = error.message });
  }

  getType(val: any): string {
    return val instanceof Date ? 'date' : Array.isArray(val) ? 'array' : typeof val;
  }
}

