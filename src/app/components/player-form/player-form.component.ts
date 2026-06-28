import { 
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
 } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Player } from '../../models/player';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.scss',
})
export class PlayerFormComponent implements OnChanges {

  @Input() player: Player | null = null;

  @Output() save = new EventEmitter<Player>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  skillLevels = [
    'Beginner', 
    'Beginner-Intermediate', 
    'Intermediate', 
    'Intermediate-Advanced', 
    'Advanced'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      skillLevel: ['', Validators.required],
      checkedIn: [false, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['player'] && this.player) {
          this.form.patchValue({
              name: this.player.name,
              skillLevel: this.player.skillLevel,
              checkedIn: this.player.checkedIn,
          });
      } else {
          this.form.reset();
      }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const player: Player = {
      id: this.player?.id ?? crypto.randomUUID(),
      ...this.form.value,
      gamesPlayed: this.player?.gamesPlayed ?? 0,
    }

    this.save.emit(player);

    if(!this.player) {
      this.form.reset();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

}