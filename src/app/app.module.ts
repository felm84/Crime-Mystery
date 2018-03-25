import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

// List of pages (components)
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CurrentLocationPage } from '../pages/current-location/current-location';
import { MenuPage } from '../pages/menu/menu';
import { TabsPage } from '../pages/tabs/tabs';

// List of providers - provide services to the app
import { CharacterProvider } from '../providers/character/character';
import { ItemProvider } from '../providers/item/item';
import { SpeechProvider } from '../providers/speech/speech';
import { LocationProvider } from '../providers/location/location';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CurrentLocationPage,
    MenuPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CurrentLocationPage,
    MenuPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CharacterProvider,
    ItemProvider,
    SpeechProvider,
    LocationProvider
  ]
})
export class AppModule {}
