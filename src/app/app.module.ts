import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

// List of pages (components)
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PresentationPage } from '../pages/presentation/presentation';
import { CurrentLocationPage, PlusMenu } from '../pages/current-location/current-location';
import { ItemListPage } from '../pages/item-list/item-list';
import { LocationListPage } from '../pages/location-list/location-list';
import { ContactListPage } from '../pages/contact-list/contact-list';
import { MenuPage } from '../pages/menu/menu';
import { OptionsPage } from '../pages/options/options';
import { TabsPage } from '../pages/tabs/tabs';
import { ModalContentPage } from '../pages/modal-content/modal-content';

// List of providers - provide services to the app
import { DataProvider } from '../providers/data/data';
import { PlayerProvider } from '../providers/player/player';
import { LocationProvider } from '../providers/location/location';
import { NpcProvider } from '../providers/npc/npc';
import { GameProvider } from '../providers/game/game';
import { ItemProvider } from '../providers/item/item';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PresentationPage,
    CurrentLocationPage,
    PlusMenu,
    ItemListPage,
    LocationListPage,
    ContactListPage,
    MenuPage,
    OptionsPage,
    TabsPage,
    ModalContentPage
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
    PresentationPage,
    CurrentLocationPage,
    PlusMenu,
    ItemListPage,
    LocationListPage,
    ContactListPage,
    MenuPage,
    OptionsPage,
    TabsPage,
    ModalContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    PlayerProvider,
    LocationProvider,
    NpcProvider,
    GameProvider,
    ItemProvider
  ]
})
export class AppModule {}
