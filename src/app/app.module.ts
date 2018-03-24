import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

// List of components
import { MyApp } from './app.component';
import { StartMenuComponent } from '../components/start-menu/start-menu';
import { TabMenuComponent } from '../components/tab-menu/tab-menu';

// List of pages
import { HomePage } from '../pages/home/home';
import { CurrentLocationPage } from '../pages/current-location/current-location';
import { ListItemsPage } from '../pages/list-items/list-items';
import { ListLocationPage } from '../pages/list-location/list-location';
import { ListNpcPage } from '../pages/list-npc/list-npc';

// List of providers - provide services to the app
import { DataProvider } from '../providers/services/data.service';
import { ItemService } from '../providers/services/item.service';
import { LocationService } from '../providers/services/location.service';
import { SpeechService } from '../providers/services/speech.service';
import { CharacterService } from '../providers/services/character.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CurrentLocationPage,
    ListItemsPage,
    ListLocationPage,
    ListNpcPage,
    StartMenuComponent,
    TabMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    CharacterService,
    SpeechService,
    LocationService,
    ItemService
  ]
})
export class AppModule {}
