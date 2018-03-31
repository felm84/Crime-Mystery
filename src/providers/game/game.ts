import { Injectable } from '@angular/core';
import { PlayerProvider } from '../player/player';
import { NpcProvider } from '../npc/npc';
import { LocationProvider } from '../location/location';

@Injectable()
export class GameProvider {

  constructor(
    public player: PlayerProvider,
    public npc: NpcProvider,
    public location: LocationProvider
    ) { console.log('Hello GameProvider Provider'); }

}
