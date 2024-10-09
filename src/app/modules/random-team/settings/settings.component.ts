import { Component, OnInit } from '@angular/core';
import { LoadingPanelService } from 'src/app/services/loading-panel.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private loadingSvc: LoadingPanelService) { }

  ngOnInit(): void {
    this.loadingSvc.hideLoadingPanel();
  }

}
