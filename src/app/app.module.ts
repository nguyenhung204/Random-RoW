import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';
import { HttpClientModule } from '@angular/common/http';
import { AppLoadingPanelModule } from './shared-components/loading-panel/app-loading-panel.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppLoadingPanelModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    {
      provide: API_KEY,
      useValue: environment.googleApisKeys.googleSheet,
    },
    GoogleSheetsDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
