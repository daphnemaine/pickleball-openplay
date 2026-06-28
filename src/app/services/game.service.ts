import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private activeGame = new BehaviorSubject<Game | null>(null);

  //Observable for the current game
  activeGame$ = this.activeGame.asObservable();

  //Current game getter
  get currentGame(): Game | null {
    return this.activeGame.value;
  }

  startGame (players: Player[]): void {
    const game: Game = {
      id: crypto.randomUUID(),
      players,
      winners: [],
      startTime: new Date(),
    };

    this.activeGame.next(game);

  }

    endGame (winners: Player[]): void {
      const currentGame = this.activeGame.value;
      if (!currentGame) return;

      currentGame.winners = winners;
      currentGame.endTime = new Date();

      this.activeGame.next(null);
  }

  hasActiveGame(): boolean {
    return this.activeGame.value !== null;
  } 
}

