import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameService } from '../../services/game.service';
import { QueueService } from '../../services/queue.service';
import { Observable } from 'rxjs';
import { Game } from '../../models/game';

@Component({
  selector: 'app-court',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './court.html',
  styleUrl: './court.scss',
})
export class Court {

  activeGame$: Observable<Game | null>;
  
  constructor(
    private gameService: GameService,
    private queueService: QueueService
  ) {
    this.activeGame$ = this.gameService.activeGame$;
  }

  startNextGame(): void {
  
    const players = this.queueService.getNextPlayers(4);
    if (players.length < 4) {
      console.error('Not enough players to start a game.');
      return;
    }

    this.gameService.startGame(players);
    this.queueService.dequeuePlayers(4);
  
  }

  endCurrentGame(winners: string[]): void {
    const currentGame = this.gameService.currentGame;
    if (!currentGame) {
      console.error('No active game to end.');
      return;
    }

    const winnerPlayers = currentGame.players.filter(player => winners.includes(player.id));
    this.gameService.endGame(winnerPlayers);
  }
  

}
