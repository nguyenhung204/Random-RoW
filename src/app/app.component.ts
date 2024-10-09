import { Component } from '@angular/core';
import { LoadingPanelService } from './services/loading-panel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weken-web';
  constructor(private loadingSvc: LoadingPanelService) {
    loadingSvc.hideLoadingPanel();
  }
}
