import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';
import { Observable } from 'rxjs';
import { PlayerFormComponent } from '../../components/player-form/player-form.component';
import { PlayerTableComponent } from '../../components/player-table/player-table.component';

@Component({
  selector: 'app-check-in',
  imports: [CommonModule, PlayerFormComponent, PlayerTableComponent],
  templateUrl: './check-in.html',
  styleUrl: './check-in.scss',
})
export class CheckIn {
    
    players$!: Observable<Player[]>;

    constructor(private playerService: PlayerService) {
      this.players$ = this.playerService.players$;
    }

    onSave(player: Player): void {
        this.playerService.addPlayer(player);
    }

    onEdit(player: Player): void {
      console.log("check-in.ts: onEdit called with player:", player);
      this.playerService.updatePlayer(player);
    }

    onDelete(id: string): void {
      console.log("check-in.ts: onDelete called with id:", id);
      this.playerService.removePlayer(id);
    }
}
