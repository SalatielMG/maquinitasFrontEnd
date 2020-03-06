import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ConfirmNewPasswordDirective } from './Validaciones/ConfirmNewPassword/confirm-new-password.directive';
import localeMX from '@angular/common/locales/es-MX';
import { registerLocaleData, HashLocationStrategy, LocationStrategy } from '@angular/common';
registerLocaleData(localeMX);

@NgModule({
  declarations: [AppComponent, ConfirmNewPasswordDirective],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe,
    CurrencyPipe,
    StatusBar,
    SplashScreen,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
