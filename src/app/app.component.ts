import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigComponent } from './config/config.component';
import { DownloaderComponent } from './downloader/downloader.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { PackageSearchComponent } from './package-search/package-search.component';
import { UploaderComponent } from './uploader/uploader.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,

    ConfigComponent,
    DownloaderComponent,
    HeroesComponent,
    MessagesComponent,
    PackageSearchComponent,
    UploaderComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHeroes = false;
  showConfig = true;
  showDownloader = false;
  showUploader = false;
  showSearch = false;

  toggleHeroes() { this.showHeroes = !this.showHeroes; }
  toggleConfig() { this.showConfig = !this.showConfig; }
  toggleDownloader() { this.showDownloader = !this.showDownloader; }
  toggleUploader() { this.showUploader = !this.showUploader; }
  toggleSearch() { this.showSearch = !this.showSearch; }
}
