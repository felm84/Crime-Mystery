import { NgModule } from '@angular/core';
import { TabMenuComponent } from './tab-menu/tab-menu';
import { StartMenuComponent } from './start-menu/start-menu';
import { NpcListComponent } from './npc-list/npc-list';
@NgModule({
	declarations: [TabMenuComponent,
    StartMenuComponent,
    NpcListComponent],
	imports: [],
	exports: [TabMenuComponent,
    StartMenuComponent,
    NpcListComponent]
})
export class ComponentsModule {}
