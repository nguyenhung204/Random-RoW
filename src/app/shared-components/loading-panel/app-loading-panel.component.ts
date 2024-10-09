import { Component, OnDestroy, OnInit } from "@angular/core";
import { LoadingPanelService } from "src/app/services/loading-panel.service";

@Component({
  selector: "app-loading-panel",
  templateUrl: "./app-loading-panel.component.html",
  styleUrls: ["./app-loading-panel.component.scss"],
})
export class AppLoadingPanelComponent implements OnInit, OnDestroy {
  isLoadingVisible = false;
  loadingSubscriber: any;
  constructor(private loadingPanelService: LoadingPanelService) {
  }
  ngOnDestroy(): void {
    if (this.loadingSubscriber) {
      this.loadingSubscriber.next();
      this.loadingSubscriber.complete();
    }
  }
  ngOnInit(): void {
    this.loadingSubscriber = this.loadingPanelService.getLoadingStatus().subscribe({
      next: (isVisible) => {
        this.isLoadingVisible = isVisible;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
