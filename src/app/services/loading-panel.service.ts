import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoadingPanelService {

    private $loadingStatus: BehaviorSubject<boolean> = new BehaviorSubject<any>({});
    private isLoading = false;
    constructor() {
    }

    public getLoadingStatus() {
        return this.$loadingStatus.asObservable();
    }

    public showLoadingPanel() {
        this.isLoading = true;
        this.$loadingStatus.next(true);
    }

    public showTimeoutLoadingPanel(numberOfMilisecond: number) {
        setTimeout(() => {
            this.isLoading = true;
            this.$loadingStatus.next(true);
        }, numberOfMilisecond);

    }

    public hideLoadingPanel() {
        this.isLoading = false;
        this.$loadingStatus.next(false);
    }

    public isLoadingVisible() {
        return this.isLoading;
    }
}