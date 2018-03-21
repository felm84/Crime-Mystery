import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CurrentLocationPage } from '../pages/current-location/current-location';
import { ListItemsPage } from '../pages/list-items/list-items';
import { ListLocationPage } from '../pages/list-location/list-location';
import { ListNpcPage } from '../pages/list-npc/list-npc';
import { StartMenuComponent } from '../components/start-menu/start-menu';
import { TabMenuComponent } from '../components/tab-menu/tab-menu';

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
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CurrentLocationPage,
    ListItemsPage,
    ListLocationPage,
    ListNpcPage,
    StartMenuComponent,
    TabMenuComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
