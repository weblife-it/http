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
 
  ticketAlfresco() {
    this.configService.getTicketAlfresco()
      .subscribe(data => this.configTicketAlfresco = {
     
        entry: {
          id: data.entry.id,
          userId: data.entry.userId,
        }
      });
      console.log('configTicketAlfresco: '+this.configTicketAlfresco);
      console.log('configTicketAlfresco id: '+this.configTicketAlfresco?.entry.id);
      
}


  infoDemo() {
      this.configService.getProgrammazione()
        .subscribe(data => this.config = {
            heroesUrl: '?',
            textfile:   JSON.stringify(data),
            date:  new Date(),
        });
  }

  provaAlfrescoTicket(id: any) {
    this.configService.getConfigAlfrescoTicket(id)
      .subscribe(data => this.config = {
          heroesUrl: '?',
          textfile:   JSON.stringify(data),
          date:  new Date(),
      });
}

  /*
  provaAlfresco() {
    
    this.configService.getConfigAlfresco()
    .subscribe({
      next: data => this.configAlfresco = { ...data }, // success path
      error: error => this.error = error, // error path
    });
  }*/


  clear() {
    this.config = undefined;
    this.configTicketAlfresco = undefined;
    this.error = undefined;
    this.headers = [];
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe({
        next: data => this.config = { ...data }, // success path
        error: error => this.error = error, // error path
      });
  }
  showConfig_v1() {
    this.configService.getConfig_1()
      .subscribe(data => this.config = {
          heroesUrl: data.heroesUrl,
          textfile:  data.textfile,
          date: data.date,
      });
  }

  showConfig_untyped_response() {
    this.configService.getConfig_untyped_response()
      .subscribe(data => this.config = {
          heroesUrl: (data as any).heroesUrl,
          textfile:  (data as any).textfile,
          date: (data as any).date,
      });
    }



  showConfig_v2() {
    this.configService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe(data => this.config = { ...data });
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

