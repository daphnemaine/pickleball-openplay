import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player';
@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  private players = new BehaviorSubject<Player[]>([]);

  players$ = this.players.asObservable();

  addPlayer(player: Player): void {
    const currentPlayers = this.players.getValue();
    this.players.next([
        ...currentPlayers, 
        player
      ]);
  }
  
  removePlayer(playerId: string): void {
    const currentPlayers = this.players.getValue();
    this.players.next(currentPlayers.filter(player => player.id !== playerId));
  }

  updatePlayer(updatedPlayer: Player): void {
    const currentPlayers = this.players.getValue();
    const index = currentPlayers.findIndex(player => player.id === updatedPlayer.id);
    if (index !== -1) {
      currentPlayers[index] = updatedPlayer;
      this.players.next([...currentPlayers]);
    }
  }
}
