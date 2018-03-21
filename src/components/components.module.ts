import { NgModule } from '@angular/core';
import { TabMenuComponent } from './tab-menu/tab-menu';
import { StartMenuComponent } from './start-menu/start-menu';
@NgModule({
	declarations: [TabMenuComponent,
    StartMenuComponent],
	imports: [],
	exports: [TabMenuComponent,
    StartMenuComponent]
})
export class ComponentsModule {}
