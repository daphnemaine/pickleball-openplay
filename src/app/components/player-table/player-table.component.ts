import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../models/player';

@Component({
  selector: 'app-player-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-table.component.html',
  styleUrl: './player-table.component.scss',
})
export class PlayerTableComponent {
  @Input() players: Player[] | null = [];

  @Output() edit = new EventEmitter<Player>();
  @Output() delete = new EventEmitter<string>();
  @Output() checkInChanged = new EventEmitter<Player>();

  onEdit(player: Player): void {
    this.edit.emit(player);
  }

  onDelete(playerId: string): void {
    console.log("player-table.component.ts: onDelete called with playerId:", playerId);
    this.delete.emit(playerId);
  }

  onCheckInChanged(player: Player): void {
    const updatedPlayer: Player = {
      ...player,
      checkedIn: !player.checkedIn,
    };
    this.checkInChanged.emit(updatedPlayer);
    }
  }

