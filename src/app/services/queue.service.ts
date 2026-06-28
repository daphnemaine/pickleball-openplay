import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  private queueSubject = new BehaviorSubject<Player[]>([]);
  public queue$ = this.queueSubject.asObservable();

  addPlayer(player: Player): void {
    const currentQueue = this.queueSubject.getValue();
    this.queueSubject.next([...currentQueue, player]);
  }
  
  removePlayer(playerId: string): void {
    this.queueSubject.next(
      this.queueSubject.value.
      filter(player => player.id !== playerId)  
    );
  }

  getNextPlayers(count = 4): Player[] {
    return this.queueSubject.value.slice(0, count);
  }

  dequeuePlayers(count = 4): void {
    this.queueSubject.next(
      this.queueSubject.value.slice(count)
    );
  }
}
